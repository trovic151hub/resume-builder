import React from "react"
import { Link } from "react-router-dom"
import { useResume } from "../context/ResumeContext"
import Template1 from "../components/templates/Template1"
import Template2 from "../components/templates/Template2"
import Template3 from "../components/templates/Template3"
import { motion, AnimatePresence } from "framer-motion"

const templates = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
}

const templateOptions = [
  { value: "template1", label: "Classic", desc: "Clean & traditional" },
  { value: "template2", label: "Sidebar", desc: "Two-column layout" },
  { value: "template3", label: "Modern", desc: "Bold & contemporary" },
]

function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"

export default function Builder() {
  const { resumeData, setResumeData } = useResume()
  const SelectedTemplate = templates[resumeData.template]

  const handleChange = (field, value) => {
    setResumeData({ ...resumeData, [field]: value })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
            <p className="text-sm text-slate-500 mt-1">Fill in your details and watch your resume come to life.</p>
          </div>
          <Link
            to="/preview"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Resume
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* FORM PANEL */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Template picker */}
            <div className="px-6 pt-6 pb-5 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Choose Template</h2>
              <div className="grid grid-cols-3 gap-3">
                {templateOptions.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => handleChange("template", t.value)}
                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                      resumeData.template === t.value
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-sm font-semibold text-slate-800">{t.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-6 flex flex-col gap-5">
              {/* Personal Info */}
              <div>
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Personal Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Full Name">
                    <input
                      className={inputClass}
                      placeholder="e.g. Jane Smith"
                      value={resumeData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </FormField>
                  <FormField label="Job Title">
                    <input
                      className={inputClass}
                      placeholder="e.g. Software Engineer"
                      value={resumeData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  </FormField>
                  <FormField label="Email">
                    <input
                      className={inputClass}
                      type="email"
                      placeholder="you@email.com"
                      value={resumeData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </FormField>
                  <FormField label="Phone">
                    <input
                      className={inputClass}
                      placeholder="+1 555 000 0000"
                      value={resumeData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </FormField>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Profile Summary</h3>
                <FormField label="About You">
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="Write 2–3 sentences highlighting your experience, key skills, and career goals..."
                    value={resumeData.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                  />
                </FormField>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Skills</h3>
                <FormField label="Skills (comma separated)">
                  <input
                    className={inputClass}
                    placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
                    value={resumeData.skills.join(", ")}
                    onChange={(e) =>
                      handleChange("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
                    }
                  />
                </FormField>
                {resumeData.skills.filter(Boolean).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {resumeData.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Experience</h3>
                <FormField label="Work History">
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={4}
                    placeholder="Role at Company (Year–Year)&#10;• Describe your key achievement or responsibility&#10;• Another achievement"
                    value={resumeData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                  />
                </FormField>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Education</h3>
                <FormField label="Academic Background">
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="Degree in Subject, University Name (Year)"
                    value={resumeData.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* LIVE PREVIEW PANEL */}
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Live Preview</h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Auto-saving
              </span>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
