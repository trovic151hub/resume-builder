import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_PAGES = 10

const sectionDefinitions = [
  { key: "summary", pattern: /^(professional\s+)?(summary|profile|objective|about me)$/i },
  { key: "experience", pattern: /^(work\s+)?(experience|employment|work history|career history)$/i },
  { key: "education", pattern: /^(education|academic background|qualifications)$/i },
  { key: "skills", pattern: /^(?:(technical\s+)?skills|core competencies|areas of expertise)$/i },
  { key: "certifications", pattern: /^(certifications?|licenses|accreditations)$/i },
  { key: "languages", pattern: /^(languages?)$/i },
  { key: "projects", pattern: /^(?:(selected\s+)?projects|portfolio)$/i },
]

function textLinesFromItems(items, pageWidth) {
  const positioned = items
    .filter((item) => typeof item.str === "string" && item.str.trim())
    .map((item) => ({
      text: item.str.trim(),
      x: item.transform?.[4] || 0,
      y: item.transform?.[5] || 0,
    }))
    .sort((a, b) => b.y - a.y || a.x - b.x)

  const xPositions = [...new Set(positioned.map((item) => Math.round(item.x)))].sort((a, b) => a - b)
  let columnSplit
  let largestGap = 0
  for (let index = 1; index < xPositions.length; index += 1) {
    const gap = xPositions[index] - xPositions[index - 1]
    const split = (xPositions[index] + xPositions[index - 1]) / 2
    if (gap > largestGap && gap > pageWidth * 0.12 && split > pageWidth * 0.22 && split < pageWidth * 0.78) {
      largestGap = gap
      columnSplit = split
    }
  }

  if (columnSplit) {
    positioned.forEach((item) => { item.column = item.x < columnSplit ? 0 : 1 })
    positioned.sort((a, b) => a.column - b.column || b.y - a.y || a.x - b.x)
  }

  const lines = []
  for (const item of positioned) {
    let line = lines.at(-1)
    if (!line || line.column !== item.column || Math.abs(line.y - item.y) > 3) {
      line = { y: item.y, column: item.column, items: [] }
      lines.push(line)
    }
    line.items.push(item)
  }

  return lines.map((line) => line.items.sort((a, b) => a.x - b.x).map((item) => item.text).join(" "))
}

function isUsefulText(text) {
  const words = text.match(/[a-z]{2,}/gi) || []
  return text.trim().length >= 50 && words.length >= 8
}

export async function extractPdfText(file, onProgress = () => {}) {
  if (file.size > MAX_FILE_SIZE) throw new Error("Choose a PDF smaller than 20 MB.")

  const pdfDocument = await getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise
  const pageCount = pdfDocument.numPages
  let worker
  const pageTexts = []
  let ocrPages = 0

  try {
    if (pageCount > MAX_PAGES) throw new Error(`This importer supports up to ${MAX_PAGES} pages at a time.`)

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      const page = await pdfDocument.getPage(pageNumber)
      const content = await page.getTextContent()
      const pageWidth = page.getViewport({ scale: 1 }).width
      const textLayer = textLinesFromItems(content.items, pageWidth).join("\n")

      if (isUsefulText(textLayer)) {
        pageTexts.push(textLayer)
        onProgress({ phase: "Reading text", progress: Math.round((pageNumber / pageCount) * 100) })
        continue
      }

      if (!worker) {
        onProgress({ phase: "Loading OCR engine", progress: 0 })
        const { createWorker } = await import("tesseract.js")
        worker = await createWorker("eng", 1, {
          logger: (message) => {
            if (message.status === "recognizing text") {
              const progress = Math.round(((pageNumber - 1 + message.progress) / pageCount) * 100)
              onProgress({ phase: `Reading scanned page ${pageNumber}`, progress })
            } else if (message.status) {
              onProgress({ phase: `Preparing OCR: ${message.status}`, progress: 0 })
            }
          },
        })
      }

      const viewport = page.getViewport({ scale: 2 })
      const canvas = globalThis.document.createElement("canvas")
      canvas.width = Math.ceil(viewport.width)
      canvas.height = Math.ceil(viewport.height)
      const context = canvas.getContext("2d", { willReadFrequently: true })
      if (!context) throw new Error("Your browser could not prepare the PDF page for OCR.")

      await page.render({ canvasContext: context, viewport }).promise
      const recognized = await worker.recognize(canvas)
      pageTexts.push(recognized.data.text || "")
      ocrPages += 1
      canvas.width = 0
      canvas.height = 0
      onProgress({ phase: `Read page ${pageNumber} of ${pageCount}`, progress: Math.round((pageNumber / pageCount) * 100) })
    }
  } finally {
    await worker?.terminate()
    await pdfDocument.destroy()
  }

  const text = pageTexts.join("\n\n").trim()
  if (!text) throw new Error("No readable text was found. Try a clearer scan or a higher-quality PDF.")
  return { text, ocrPages, pageCount }
}

function normalizeLine(line) {
  return line.replace(/^[\s\u2022\u25aa\u25e6*-]+/, "").replace(/\s+/g, " ").trim()
}

function getHeading(line) {
  const cleaned = normalizeLine(line).replace(/[:|]+$/, "").trim()
  return sectionDefinitions.find((section) => section.pattern.test(cleaned))?.key
}

function getSections(lines) {
  const sections = {}
  let current

  for (const line of lines) {
    const heading = getHeading(line)
    if (heading) {
      current = heading
      sections[current] ||= []
    } else if (current) {
      sections[current].push(line)
    }
  }

  return sections
}

function sectionItems(lines) {
  return lines
    .flatMap((line) => line.split(/[\u2022\u25aa\u25e6,;|]+/))
    .map(normalizeLine)
    .filter((item) => item.length > 1 && item.length < 100)
}

function parseDateRange(line) {
  const month = "(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)"
  const date = `(?:${month}\\.?\\s*)?(?:19|20)\\d{2}|present|current`
  const match = line.match(new RegExp(`(${date})\\s*(?:-|\\u2013|\\u2014|to)\\s*(${date})`, "i"))
  if (!match) return null
  return {
    startDate: normalizeLine(match[1]),
    endDate: /present|current/i.test(match[2]) ? "" : normalizeLine(match[2]),
    current: /present|current/i.test(match[2]),
  }
}

function parseExperience(lines) {
  const entries = []
  let waitingLines = []
  let current

  for (const originalLine of lines) {
    const line = normalizeLine(originalLine)
    if (!line) continue

    const dateRange = parseDateRange(line)
    if (dateRange) {
      const inlineTitle = normalizeLine(line.replace(/(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s*(?:19|20)\d{2}\s*(?:-|\u2013|\u2014|to)\s*(?:(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s*)?(?:19|20)\d{2}|present|current/i, ""))
      const headers = waitingLines.filter((item) => !/^[\u2022\u25aa\u25e6*-]/.test(item))
      current = {
        id: Date.now() + entries.length,
        jobTitle: inlineTitle || headers[0] || "",
        company: headers.length > 1 ? headers.at(-1) : "",
        ...dateRange,
        description: "",
      }
      entries.push(current)
      waitingLines = []
    } else if (/^[\u2022\u25aa\u25e6*-]/.test(originalLine)) {
      if (current) current.description = [current.description, line].filter(Boolean).join("\n")
      else waitingLines.push(originalLine)
    } else {
      waitingLines.push(line)
    }
  }

  if (!entries.length) {
    const content = lines.map(normalizeLine).filter(Boolean)
    if (!content.length) return []
    const bullets = content.filter((line) => /^[\u2022\u25aa\u25e6*-]/.test(line))
    const nonBullets = content.filter((line) => !/^[\u2022\u25aa\u25e6*-]/.test(line))
    return [{
      id: Date.now(),
      jobTitle: nonBullets[0] || "",
      company: nonBullets[1] || "",
      startDate: "",
      endDate: "",
      current: false,
      description: (bullets.length ? bullets : nonBullets.slice(2)).join("\n"),
    }]
  }

  if (waitingLines.length && current) {
    current.description = [current.description, ...waitingLines.map(normalizeLine)].filter(Boolean).join("\n")
  }
  return entries
}

function parseEducation(lines) {
  const content = lines.map(normalizeLine).filter(Boolean)
  if (!content.length) return []
  const yearIndex = content.findIndex((line) => /\b(?:19|20)\d{2}\b/.test(line))
  const year = yearIndex >= 0 ? content[yearIndex].match(/\b(?:19|20)\d{2}\b/)?.[0] || "" : ""
  const degreeIndex = content.findIndex((line) => !/\b(?:19|20)\d{2}\b/.test(line))
  const schoolIndex = content.findIndex((line, index) => index > degreeIndex && !/\b(?:19|20)\d{2}\b/.test(line))
  return [{
    id: Date.now(),
    degree: degreeIndex >= 0 ? content[degreeIndex] : "",
    school: schoolIndex >= 0 ? content[schoolIndex] : "",
    year,
    gpa: "",
  }]
}

function parseProjects(lines) {
  const projects = []
  let current
  const finishProject = () => {
    if (current && (current.name || current.description)) projects.push(current)
  }

  for (const originalLine of lines) {
    const line = normalizeLine(originalLine)
    if (!line) continue
    const isBullet = /^[\u2022\u25aa\u25e6*-]/.test(originalLine)
    const url = line.match(/(?:https?:\/\/|www\.)?[^\s,;]+\.[a-z]{2,}(?:\/[^\s,;]*)?/i)?.[0]

    if (!current || (current.url && !isBullet && !url)) {
      finishProject()
      current = { id: Date.now() + projects.length, name: line, type: "", technologies: "", url: "", description: "" }
    } else if (url && !current.url) {
      current.url = url
    } else if (isBullet) {
      current.description = [current.description, line].filter(Boolean).join("\n")
    } else if (!current.technologies) {
      current.technologies = line
    } else {
      current.description = [current.description, line].filter(Boolean).join("\n")
    }
  }

  finishProject()
  return projects
}

export function parseResumeText(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  const sections = getSections(lines)
  const imported = {}
  const flatText = lines.join(" ")
  const email = flatText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]
  const phone = flatText.match(/(?:\+?\d[\d\s().-]{7,}\d)/)?.[0]?.trim()
  const linkedin = flatText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,;]+/i)?.[0]
  const github = flatText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s,;]+/i)?.[0]
  const website = flatText.match(/(?<![@\w])(?:https?:\/\/|www\.)?[a-z\d-]+(?:\.[a-z\d-]+)*\.[a-z]{2,}(?:\/[^\s,;]*)?/i)?.[0]

  if (email) imported.email = email.replace(/[),.;]+$/, "")
  if (phone) imported.phone = phone
  if (linkedin) imported.linkedin = linkedin.replace(/[),.;]+$/, "")
  if (github) imported.github = github.replace(/[),.;]+$/, "")
  if (website && !/linkedin|github/i.test(website)) imported.website = website.replace(/[),.;]+$/, "")

  const nameIndex = lines.findIndex((line, index) => {
    if (index > 12 || getHeading(line) || /@|https?:\/\//.test(line) || /\d{7,}/.test(line)) return false
    const words = normalizeLine(line).split(/\s+/)
    return words.length >= 2 && words.length <= 5 && line.length <= 60
  })
  if (nameIndex >= 0) {
    imported.name = normalizeLine(lines[nameIndex])
    const title = lines.slice(nameIndex + 1, Math.min(nameIndex + 5, lines.length)).find((line) =>
      !getHeading(line) && !/^(contact|personal details|phone|email|location)$/i.test(normalizeLine(line)) &&
      !/@|https?:\/\//.test(line) && !/\d{7,}/.test(line) && normalizeLine(line).split(/\s+/).length <= 8
    )
    if (title) imported.title = normalizeLine(title)
  }

  if (sections.summary?.length) imported.summary = sections.summary.map(normalizeLine).filter(Boolean).join(" ")
  if (sections.skills?.length) imported.skills = sectionItems(sections.skills)
  if (sections.certifications?.length) imported.certifications = sectionItems(sections.certifications)
  if (sections.languages?.length) imported.languages = sectionItems(sections.languages)
  if (sections.experience?.length) imported.experience = parseExperience(sections.experience)
  if (sections.education?.length) imported.education = parseEducation(sections.education)
  if (sections.projects?.length) imported.projects = parseProjects(sections.projects)

  return imported
}
