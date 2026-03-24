import React from "react"
import { useResume } from "../context/ResumeContext"  // <-- make sure this path is correct
import Template1 from "../components/templates/Template1"
import Template2 from "../components/templates/Template2"
import Template3 from "../components/templates/Template3"
import { motion, AnimatePresence } from "framer-motion"

export default function Builder() {
  // 1️⃣ Use the Resume Context
  const { resumeData, setResumeData } = useResume()  

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3
  }

  const SelectedTemplate = templates[resumeData.template]  // ✅ Now resumeData is defined

  const handleChange = (field, value) => {
    setResumeData({ ...resumeData, [field]: value })
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Edit Resume</h2>

          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Full Name"
            value={resumeData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Job Title"
            value={resumeData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Email"
            value={resumeData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Phone"
            value={resumeData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <textarea
            className="w-full p-2 mb-3 border rounded"
            placeholder="Profile Summary"
            value={resumeData.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
          />

          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Skills (comma separated)"
            value={resumeData.skills.join(", ")}
            onChange={(e) =>
              handleChange(
                "skills",
                e.target.value.split(",").map(s => s.trim())
              )
            }
          />

          <textarea
            className="w-full p-2 mb-3 border rounded"
            placeholder="Experience"
            value={resumeData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
          />

          <textarea
            className="w-full p-2 mb-3 border rounded"
            placeholder="Education"
            value={resumeData.education}
            onChange={(e) => handleChange("education", e.target.value)}
          />

          {/* Template Selector */}
          <div className="mb-4">
            <label className="mr-2 font-semibold">Template:</label>
            <select
              className="border p-1 rounded"
              value={resumeData.template}
              onChange={(e) =>
                setResumeData({ ...resumeData, template: e.target.value })
              }
            >
              <option value="template1">Classic</option>
              <option value="template2">Sidebar</option>
              <option value="template3">Modern</option>
            </select>
          </div>

        </div>

        {/* LIVE PREVIEW */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <AnimatePresence mode="wait">
            <motion.div
              key={resumeData.template}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <SelectedTemplate data={resumeData} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}


// export default function Builder() {
//   return <h1 className="text-3xl p-10">Resume Builder</h1>
// }