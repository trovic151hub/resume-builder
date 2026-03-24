import { createContext, useContext, useState, useEffect } from "react"

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
  const [resumeData, setResumeData] = useState(defaultData)

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
    localStorage.removeItem("resumeData")
  }

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, resetData, defaultData }}>
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => useContext(ResumeContext)
