import { createContext, useContext, useState, useEffect } from "react"

const ResumeContext = createContext()

export const ResumeProvider = ({ children }) => {

  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    skills: [],
    experience: "",
    education: "",
    template: "template1"
  })

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      setResumeData(JSON.parse(savedData))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  )
}

// Custom hook
export const useResume = () => useContext(ResumeContext)