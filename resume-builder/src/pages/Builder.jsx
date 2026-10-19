import React from "react"
import { Link } from "react-router-dom"
import { useResume } from "../context/ResumeContext"
import { templateComponents as templates, templateOptions } from "../data/templates"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Eye, Plus, Pencil, Mail, Phone, MapPin, Link2, Globe, Save, Check, Grid3x3, Image, X, Award, Languages, GitFork, ExternalLink } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import ConfirmDialog from "../components/ConfirmDialog"

const visibleTemplateOptions = templateOptions.slice(0, 3)

const accentColors = [
  { label: "Indigo", value: "#4f46e5" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Sky", value: "#0284c7" },
  { label: "Teal", value: "#0d9488" },
  { label: "Rose", value: "#e11d48" },
  { label: "Slate", value: "#475569" },
]

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"

const formSections = [
  { id: "section-template", label: "Template & Style" },
  { id: "section-personal", label: "Personal Info" },
  { id: "section-summary", label: "Summary" },
  { id: "section-skills", label: "Skills" },
  { id: "section-certifications", label: "Certifications" },
  { id: "section-languages", label: "Languages" },
  { id: "section-experience", label: "Experience" },
  { id: "section-projects", label: "Projects" },
  { id: "section-education", label: "Education" },
]

function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
      <input {...props} className={`${props.className} pl-8`} />
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 mb-4 pt-1">
      <h3 className="font-display text-base font-semibold text-slate-800">{title}</h3>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  )
}

function FormSectionNav({ activeSection, onNavigate }) {
  const railRef = React.useRef(null)
  const activeRef = React.useRef(null)

  React.useEffect(() => {
    const rail = railRef.current
    const active = activeRef.current
    if (!rail || !active) return

    const railRect = rail.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    rail.scrollTo({
      left: rail.scrollLeft + activeRect.left - railRect.left - (rail.clientWidth - active.clientWidth) / 2,
      behavior: "smooth",
    })
  }, [activeSection])

  return (
    <div ref={railRef} className="sticky top-16 lg:top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-4 sm:px-6 py-2 flex gap-1.5 overflow-x-auto">
      {formSections.map((s) => {
        const isActive = activeSection === s.id
        return (
          <button
            key={s.id}
            ref={isActive ? activeRef : null}
            onClick={() => onNavigate(s.id)}
            className={`whitespace-nowrap flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              isActive ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

function computeProgress(data) {
  const checks = [
    data.name, data.title, data.email, data.phone, data.location,
    data.linkedin, data.website, data.summary,
    data.skills.filter(Boolean).length > 0,
    data.certifications.filter(Boolean).length > 0,
    data.languages.filter(Boolean).length > 0,
    data.experience.some(e => e.jobTitle || e.company || e.description),
    (data.projects || []).some(project => project.name || project.description),
    data.education.some(e => e.degree || e.school),
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export default function Builder() {
  const { resumeData, setResumeData, resetData, saveToCloud, saving, activeResumeId, activeLabel, setActiveLabel } = useResume()
  const { user } = useAuth()
  const SelectedTemplate = templates[resumeData.template]
  const progress = computeProgress(resumeData)
  const [justSaved, setJustSaved] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState(formSections[0].id)
  const formPanelRef = React.useRef(null)
  const [showClearConfirm, setShowClearConfirm] = React.useState(false)

  const [skillsRaw, setSkillsRaw] = React.useState(resumeData.skills.join(", "))
  const [certificationsRaw, setCertificationsRaw] = React.useState(resumeData.certifications.join(", "))
  const [languagesRaw, setLanguagesRaw] = React.useState(resumeData.languages.join(", "))

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const nextSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (nextSection) setActiveSection(nextSection.target.id)
      },
      {
        root: window.matchMedia("(min-width: 1024px)").matches ? formPanelRef.current : null,
        rootMargin: "-120px 0px -70% 0px",
        threshold: 0,
      }
    )
    formSections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const panel = formPanelRef.current
    const section = document.getElementById(id)
    if (!panel || !section) return

    if (window.matchMedia("(min-width: 1024px)").matches) {
      const panelTop = panel.getBoundingClientRect().top + panel.clientTop
      const sectionTop = section.getBoundingClientRect().top
      const navHeight = panel.querySelector("[data-section-nav]")?.getBoundingClientRect().height || 0
      panel.scrollTo({
        top: panel.scrollTop + sectionTop - panelTop - navHeight,
        behavior: "smooth",
      })
      return
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleSave = async () => {
    await saveToCloud()
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2000)
  }

  React.useEffect(() => {
    const parsed = skillsRaw.split(",").map(s => s.trim()).filter(Boolean)
    const current = resumeData.skills
    if (parsed.join(",") !== current.join(",")) {
      setSkillsRaw(current.join(", "))
    }
    // This effect syncs external resume loads without fighting in-progress typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData.skills])

  React.useEffect(() => {
    const parsed = certificationsRaw.split(",").map(s => s.trim()).filter(Boolean)
    const current = resumeData.certifications
    if (parsed.join(",") !== current.join(",")) {
      setCertificationsRaw(current.join(", "))
    }
    // This effect syncs external resume loads without fighting in-progress typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData.certifications])

  React.useEffect(() => {
    const parsed = languagesRaw.split(",").map(s => s.trim()).filter(Boolean)
    const current = resumeData.languages
    if (parsed.join(",") !== current.join(",")) {
      setLanguagesRaw(current.join(", "))
    }
    // This effect syncs external resume loads without fighting in-progress typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData.languages])

  const set = (field, value) => setResumeData({ ...resumeData, [field]: value })

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = () => set("photo", reader.result)
    reader.readAsDataURL(file)
    event.target.value = ""
  }

  const updateExp = (id, field, value) =>
    set("experience", resumeData.experience.map(e => e.id === id ? { ...e, [field]: value } : e))
  const addExp = () =>
    set("experience", [...resumeData.experience, { id: Date.now(), jobTitle: "", company: "", startDate: "", endDate: "", current: false, description: "" }])
  const removeExp = (id) =>
    set("experience", resumeData.experience.filter(e => e.id !== id))

  const updateProject = (id, field, value) =>
    set("projects", (resumeData.projects || []).map(project => project.id === id ? { ...project, [field]: value } : project))
  const addProject = () =>
    set("projects", [...(resumeData.projects || []), { id: Date.now(), name: "", type: "", technologies: "", url: "", description: "" }])
  const removeProject = (id) =>
    set("projects", (resumeData.projects || []).filter(project => project.id !== id))

  const updateEdu = (id, field, value) =>
    set("education", resumeData.education.map(e => e.id === id ? { ...e, [field]: value } : e))
  const addEdu = () =>
    set("education", [...resumeData.education, { id: Date.now(), degree: "", school: "", year: "", gpa: "" }])
  const removeEdu = (id) =>
    set("education", resumeData.education.filter(e => e.id !== id))

  const progressColor = progress < 40 ? "bg-rose-400" : progress < 75 ? "bg-amber-400" : "bg-emerald-500"
  const progressLabel = progress < 40 ? "Just started" : progress < 75 ? "Coming along" : progress < 100 ? "Almost there!" : "Complete!"

  return (
    <div className="min-h-screen bg-paper lg:h-[calc(100vh-4rem)] lg:min-h-0 lg:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:flex lg:h-full lg:flex-col lg:py-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-semibold text-slate-900">Resume Builder</h1>
            {user ? (
              <div className="flex items-center gap-1.5 mt-1">
                <Pencil className="w-3 h-3 text-slate-300 flex-shrink-0" />
                <input
                  value={activeLabel}
                  onChange={(e) => setActiveLabel(e.target.value)}
                  placeholder="Untitled Resume"
                  className="text-sm text-slate-500 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-brand-400 focus:outline-none transition-colors"
                />
              </div>
            ) : (
              <p className="text-sm text-slate-500 mt-1">Fill in your details and watch your resume come to life.</p>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {user && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 text-slate-600 hover:text-brand-600 text-sm font-medium border border-slate-200 hover:border-brand-200 disabled:opacity-60 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors"
              >
                {justSaved ? <Check className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {saving ? "Saving..." : justSaved ? "Saved" : activeResumeId ? "Update" : "Save"}
                </span>
              </button>
            )}
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
            <Link
              to="/preview"
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview &amp; Export</span>
              <span className="sm:hidden">Preview</span>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 lg:grid-rows-1 gap-6 lg:gap-8 items-start lg:items-stretch lg:flex-1 lg:min-h-0">

          {/* FORM */}
          <div ref={formPanelRef} className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain">

            {/* Progress bar */}
            <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-slate-100 rounded-t-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">Resume Completeness</span>
                <span className="text-xs font-bold" style={{ color: resumeData.accentColor }}>
                  {progress}% — {progressLabel}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${progressColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div data-section-nav>
              <FormSectionNav activeSection={activeSection} onNavigate={scrollToSection} />
            </div>

            {/* Template picker */}
            <div id="section-template" className="scroll-mt-28 px-4 sm:px-6 pt-5 pb-5 border-b border-slate-100">
              <SectionHeader title="Choose Template" />
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                {visibleTemplateOptions.map((t) => {
                  const isActive = resumeData.template === t.value
                  return (
                    <button
                      key={t.value}
                      onClick={() => set("template", t.value)}
                      className={`rounded-xl border-2 p-2 text-left transition-all flex flex-col gap-2 ${
                        isActive ? "border-brand-500 bg-brand-50 shadow-sm shadow-brand-100" : "border-slate-200 hover:border-brand-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-full rounded-lg overflow-hidden h-14 sm:h-16 flex items-center justify-center ${isActive ? "bg-white" : "bg-slate-50"}`}>
                        <div className="w-10 h-12 sm:w-12 sm:h-14">
                          <t.Thumb />
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isActive ? "text-brand-600" : "text-slate-700"}`}>{t.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5 hidden sm:block leading-tight">{t.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <Link
                to="/templates"
                className="flex items-center justify-between gap-2 w-full rounded-xl border-2 border-dashed border-slate-200 hover:border-brand-300 hover:bg-slate-50 px-3 py-2.5 transition-all mb-4"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Grid3x3 className="w-4 h-4" />
                  See all {templateOptions.length} templates
                </span>
                {!visibleTemplateOptions.some((t) => t.value === resumeData.template) && (
                  <span className="text-xs font-medium text-brand-600">
                    Using: {templateOptions.find((t) => t.value === resumeData.template)?.label}
                  </span>
                )}
              </Link>

              {/* Accent color */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Accent Color</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {accentColors.map((c) => (
                    <button
                      key={c.value}
                      title={c.label}
                      onClick={() => set("accentColor", c.value)}
                      className="w-7 h-7 rounded-full border-2 transition-all"
                      style={{
                        backgroundColor: c.value,
                        borderColor: resumeData.accentColor === c.value ? c.value : "transparent",
                        outline: resumeData.accentColor === c.value ? `2px solid ${c.value}` : "none",
                        outlineOffset: "2px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-6 flex flex-col gap-6">

              {/* Personal Info */}
              <div id="section-personal" className="scroll-mt-28">
                <SectionHeader title="Personal Info" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="sm:col-span-2">
                    <FormField label="Profile Photo">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          {resumeData.photo ? (
                            <img src={resumeData.photo} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image className="w-6 h-6 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <label className="cursor-pointer flex items-center gap-2 text-slate-600 hover:text-brand-600 text-sm font-medium border border-slate-200 hover:border-brand-200 px-3 py-2 rounded-xl transition-colors">
                            <Image className="w-4 h-4" />
                            Choose Photo
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="sr-only" />
                          </label>
                          {resumeData.photo && (
                            <button
                              onClick={() => set("photo", "")}
                              className="flex items-center gap-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium px-3 py-2 rounded-xl transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </FormField>
                  </div>
                  <FormField label="Full Name">
                    <input className={inputClass} placeholder="e.g. Jane Smith" value={resumeData.name} onChange={e => set("name", e.target.value)} />
                  </FormField>
                  <FormField label="Job Title">
                    <input className={inputClass} placeholder="e.g. Software Engineer" value={resumeData.title} onChange={e => set("title", e.target.value)} />
                  </FormField>
                  <FormField label="Email">
                    <IconInput icon={Mail} className={inputClass} type="email" placeholder="you@email.com" value={resumeData.email} onChange={e => set("email", e.target.value)} />
                  </FormField>
                  <FormField label="Phone">
                    <IconInput icon={Phone} className={inputClass} placeholder="+1 555 000 0000" value={resumeData.phone} onChange={e => set("phone", e.target.value)} />
                  </FormField>
                  <FormField label="Location">
                    <IconInput icon={MapPin} className={inputClass} placeholder="City, Country" value={resumeData.location} onChange={e => set("location", e.target.value)} />
                  </FormField>
                  <FormField label="LinkedIn">
                    <IconInput icon={Link2} className={inputClass} placeholder="linkedin.com/in/yourname" value={resumeData.linkedin} onChange={e => set("linkedin", e.target.value)} />
                  </FormField>
                  <FormField label="GitHub">
                    <IconInput icon={GitFork} className={inputClass} placeholder="github.com/yourname" value={resumeData.github || ""} onChange={e => set("github", e.target.value)} />
                  </FormField>
                  <div className="sm:col-span-2">
                    <FormField label="Website / Portfolio">
                      <IconInput icon={Globe} className={inputClass} placeholder="yourportfolio.com" value={resumeData.website} onChange={e => set("website", e.target.value)} />
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div id="section-summary" className="scroll-mt-28">
                <SectionHeader title="Profile Summary" />
                <FormField label="About You">
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="Write 2–3 sentences highlighting your experience, key skills, and career goals..."
                    value={resumeData.summary}
                    onChange={e => set("summary", e.target.value)}
                  />
                </FormField>
              </div>

              {/* Skills */}
              <div id="section-skills" className="scroll-mt-28">
                <SectionHeader title="Skills" />
                <FormField label="Skills (comma separated)">
                  <input
                    className={inputClass}
                    placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
                    value={skillsRaw}
                    onChange={e => {
                      const raw = e.target.value
                      setSkillsRaw(raw)
                      set("skills", raw.split(",").map(s => s.trim()).filter(Boolean))
                    }}
                    onBlur={() => {
                      const cleaned = resumeData.skills.join(", ")
                      setSkillsRaw(cleaned)
                    }}
                  />
                </FormField>
                {resumeData.skills.filter(Boolean).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {resumeData.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="text-white text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: resumeData.accentColor }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div id="section-certifications" className="scroll-mt-28">
                <SectionHeader title="Certifications" />
                <FormField label="Certifications (comma separated)">
                  <IconInput
                    icon={Award}
                    className={inputClass}
                    placeholder="e.g. Google Project Management, AWS Cloud Practitioner"
                    value={certificationsRaw}
                    onChange={e => {
                      const raw = e.target.value
                      setCertificationsRaw(raw)
                      set("certifications", raw.split(",").map(s => s.trim()).filter(Boolean))
                    }}
                    onBlur={() => {
                      const cleaned = resumeData.certifications.join(", ")
                      setCertificationsRaw(cleaned)
                    }}
                  />
                </FormField>
                {resumeData.certifications.filter(Boolean).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {resumeData.certifications.filter(Boolean).map((certification, i) => (
                      <span key={i} className="text-white text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: resumeData.accentColor }}>
                        {certification}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Languages */}
              <div id="section-languages" className="scroll-mt-28">
                <SectionHeader title="Languages" />
                <FormField label="Languages (comma separated)">
                  <IconInput
                    icon={Languages}
                    className={inputClass}
                    placeholder="e.g. English - Fluent, Spanish - Conversational"
                    value={languagesRaw}
                    onChange={e => {
                      const raw = e.target.value
                      setLanguagesRaw(raw)
                      set("languages", raw.split(",").map(s => s.trim()).filter(Boolean))
                    }}
                    onBlur={() => {
                      const cleaned = resumeData.languages.join(", ")
                      setLanguagesRaw(cleaned)
                    }}
                  />
                </FormField>
                {resumeData.languages.filter(Boolean).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {resumeData.languages.filter(Boolean).map((language, i) => (
                      <span key={i} className="text-white text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: resumeData.accentColor }}>
                        {language}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div id="section-experience" className="scroll-mt-28">
                <SectionHeader title="Experience" />
                <div className="flex flex-col gap-4">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={exp.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Position {idx + 1}</span>
                        {resumeData.experience.length > 1 && (
                          <button onClick={() => removeExp(exp.id)} className="text-xs text-rose-400 hover:text-rose-600 transition-colors">Remove</button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField label="Job Title">
                          <input className={inputClass} placeholder="e.g. Frontend Developer" value={exp.jobTitle} onChange={e => updateExp(exp.id, "jobTitle", e.target.value)} />
                        </FormField>
                        <FormField label="Company">
                          <input className={inputClass} placeholder="e.g. Acme Corp" value={exp.company} onChange={e => updateExp(exp.id, "company", e.target.value)} />
                        </FormField>
                        <FormField label="Start Date">
                          <input className={inputClass} placeholder="Jan 2022" value={exp.startDate} onChange={e => updateExp(exp.id, "startDate", e.target.value)} />
                        </FormField>
                        <FormField label="End Date">
                          <input className={inputClass} placeholder={exp.current ? "Present" : "Dec 2024"} disabled={exp.current} value={exp.current ? "Present" : exp.endDate} onChange={e => updateExp(exp.id, "endDate", e.target.value)} />
                        </FormField>
                      </div>
                      <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                        <input type="checkbox" checked={exp.current} onChange={e => updateExp(exp.id, "current", e.target.checked)} className="rounded" />
                        I currently work here
                      </label>
                      <FormField label="Description">
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="• Describe your key achievements and responsibilities..."
                          value={exp.description}
                          onChange={e => updateExp(exp.id, "description", e.target.value)}
                        />
                      </FormField>
                    </div>
                  ))}
                  <button
                    onClick={addExp}
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-brand-300 text-slate-500 hover:text-brand-600 rounded-xl py-3 text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Position
                  </button>
                </div>
              </div>

              {/* Selected Projects */}
              <div id="section-projects" className="scroll-mt-28">
                <SectionHeader title="Selected Projects" />
                <div className="flex flex-col gap-4">
                  {(resumeData.projects || []).map((project, idx) => (
                    <div key={project.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Project {idx + 1}</span>
                        <button onClick={() => removeProject(project.id)} className="text-xs text-rose-400 hover:text-rose-600 transition-colors">Remove</button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField label="Project Name">
                          <input className={inputClass} placeholder="e.g. Skinova Glow" value={project.name} onChange={e => updateProject(project.id, "name", e.target.value)} />
                        </FormField>
                        <FormField label="Project Type">
                          <input className={inputClass} placeholder="e.g. E-commerce platform" value={project.type} onChange={e => updateProject(project.id, "type", e.target.value)} />
                        </FormField>
                        <FormField label="Technologies">
                          <input className={inputClass} placeholder="e.g. React, Firebase, Tailwind CSS" value={project.technologies} onChange={e => updateProject(project.id, "technologies", e.target.value)} />
                        </FormField>
                        <FormField label="Project URL">
                          <IconInput icon={ExternalLink} className={inputClass} placeholder="your-project.vercel.app" value={project.url} onChange={e => updateProject(project.id, "url", e.target.value)} />
                        </FormField>
                      </div>
                      <FormField label="Highlights and outcomes">
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="Describe what you built, key features, and impact. Put each achievement on a new line."
                          value={project.description}
                          onChange={e => updateProject(project.id, "description", e.target.value)}
                        />
                      </FormField>
                    </div>
                  ))}
                  <button
                    onClick={addProject}
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-brand-300 text-slate-500 hover:text-brand-600 rounded-xl py-3 text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </div>
              </div>

              {/* Education */}
              <div id="section-education" className="scroll-mt-28">
                <SectionHeader title="Education" />
                <div className="flex flex-col gap-4">
                  {resumeData.education.map((edu, idx) => (
                    <div key={edu.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Entry {idx + 1}</span>
                        {resumeData.education.length > 1 && (
                          <button onClick={() => removeEdu(edu.id)} className="text-xs text-rose-400 hover:text-rose-600 transition-colors">Remove</button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField label="Degree / Qualification">
                          <input className={inputClass} placeholder="e.g. BSc Computer Science" value={edu.degree} onChange={e => updateEdu(edu.id, "degree", e.target.value)} />
                        </FormField>
                        <FormField label="School / University">
                          <input className={inputClass} placeholder="e.g. MIT" value={edu.school} onChange={e => updateEdu(edu.id, "school", e.target.value)} />
                        </FormField>
                        <FormField label="Graduation Year">
                          <input className={inputClass} placeholder="e.g. 2021" value={edu.year} onChange={e => updateEdu(edu.id, "year", e.target.value)} />
                        </FormField>
                        <FormField label="GPA (optional)">
                          <input className={inputClass} placeholder="e.g. 3.8 / 4.0" value={edu.gpa} onChange={e => updateEdu(edu.id, "gpa", e.target.value)} />
                        </FormField>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addEdu}
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-brand-300 text-slate-500 hover:text-brand-600 rounded-xl py-3 text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Entry
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* LIVE PREVIEW — hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex lg:h-full lg:min-h-0 lg:flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Live Preview</h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Auto-saving
              </span>
            </div>
            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-white rounded-2xl border border-slate-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={resumeData.template}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <SelectedTemplate data={resumeData} />
                </motion.div>
              </AnimatePresence>
              {!resumeData.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl gap-3 pointer-events-none"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <Pencil className="w-6 h-6 text-brand-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Your resume appears here</p>
                  <p className="text-xs text-slate-400 text-center max-w-[160px] leading-relaxed">Start filling in your details on the left to see a live preview</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile preview link banner */}
          <div className="lg:hidden bg-brand-50 border border-brand-100 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-800">Ready to see it?</p>
              <p className="text-xs text-brand-500 mt-0.5">Tap to preview your resume</p>
            </div>
            <Link
              to="/preview"
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex-shrink-0"
            >
              Preview →
            </Link>
          </div>

        </div>
      </div>

      <ConfirmDialog
        open={showClearConfirm}
        title="Clear all data?"
        message="This will reset your resume and remove everything you've entered. This can't be undone."
        confirmLabel="Clear All"
        onConfirm={() => { resetData(); setShowClearConfirm(false) }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  )
}
