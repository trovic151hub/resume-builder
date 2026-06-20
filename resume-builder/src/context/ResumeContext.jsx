import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const ResumeContext = createContext()

const defaultData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  summary: "",
  skills: [],
  experience: [{ id: 1, jobTitle: "", company: "", startDate: "", endDate: "", current: false, description: "" }],
  education: [{ id: 1, degree: "", school: "", year: "", gpa: "" }],
  template: "template1",
  accentColor: "#4f46e5",
}

function migrateData(saved) {
  const data = { ...defaultData, ...saved }
  if (typeof data.experience === "string") {
    data.experience = [{ id: 1, jobTitle: "", company: "", startDate: "", endDate: "", current: false, description: data.experience }]
  }
  if (typeof data.education === "string") {
    data.education = [{ id: 1, degree: "", school: "", year: data.education, gpa: "" }]
  }
  if (!data.accentColor) data.accentColor = "#4f46e5"
  if (!Array.isArray(data.experience)) data.experience = defaultData.experience
  if (!Array.isArray(data.education)) data.education = defaultData.education
  return data
}

export const ResumeProvider = ({ children }) => {
  const { user } = useAuth()
  const [resumeData, setResumeData] = useState(defaultData)
  const [activeResumeId, setActiveResumeId] = useState(null)
  const [activeLabel, setActiveLabel] = useState("Untitled Resume")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("resumeData")
    if (saved) {
      try {
        setResumeData(migrateData(JSON.parse(saved)))
      } catch {
        setResumeData(defaultData)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const resetData = () => {
    setResumeData(defaultData)
    setActiveResumeId(null)
    setActiveLabel("Untitled Resume")
    localStorage.removeItem("resumeData")
  }

  const startNewResume = () => {
    setResumeData(defaultData)
    setActiveResumeId(null)
    setActiveLabel("Untitled Resume")
  }

  const loadResume = async (resumeId) => {
    if (!user) return
    const { getResume } = await import("../services/firestoreService")
    const resume = await getResume(user.uid, resumeId)
    if (!resume) return
    setResumeData(migrateData(resume.data))
    setActiveResumeId(resume.id)
    setActiveLabel(resume.label || "Untitled Resume")
  }

  const saveToCloud = async (label) => {
    if (!user) return null
    setSaving(true)
    try {
      const { createResume, updateResume } = await import("../services/firestoreService")
      const nextLabel = label ?? activeLabel
      if (activeResumeId) {
        await updateResume(user.uid, activeResumeId, resumeData, nextLabel)
      } else {
        const id = await createResume(user.uid, resumeData, nextLabel)
        setActiveResumeId(id)
      }
      setActiveLabel(nextLabel)
      return activeResumeId
    } finally {
      setSaving(false)
    }
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        resetData,
        defaultData,
        activeResumeId,
        activeLabel,
        setActiveLabel,
        saving,
        startNewResume,
        loadResume,
        saveToCloud,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => useContext(ResumeContext)
