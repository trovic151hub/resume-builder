import React from "react"
import { Link } from "react-router-dom"
import { useResume } from "../context/ResumeContext"
import Template1 from "../components/templates/Template1"
import Template2 from "../components/templates/Template2"
import Template3 from "../components/templates/Template3"
import { motion, AnimatePresence } from "framer-motion"

const templates = { template1: Template1, template2: Template2, template3: Template3 }

const templateOptions = [
  { value: "template1", label: "Classic", desc: "Clean & traditional" },
  { value: "template2", label: "Sidebar", desc: "Two-column layout" },
  { value: "template3", label: "Modern", desc: "Bold & contemporary" },
]

const accentColors = [
  { label: "Indigo", value: "#4f46e5" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Sky", value: "#0284c7" },
  { label: "Teal", value: "#0d9488" },
  { label: "Rose", value: "#e11d48" },
  { label: "Slate", value: "#475569" },
]

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"

function FormField({ label, children, half }) {
  return (
    <div className={`flex flex-col gap-1 ${half ? "" : ""}`}>
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 pt-1">{title}</h3>
  )
}

function computeProgress(data) {
  const checks = [
    data.name,
    data.title,
    data.email,
    data.phone,
    data.location,
    data.linkedin,
    data.website,
    data.summary,
    data.skills.filter(Boolean).length > 0,
    data.experience.some(e => e.jobTitle || e.company || e.description),
    data.education.some(e => e.degree || e.school),
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export default function Builder() {
  const { resumeData, setResumeData, resetData } = useResume()
  const SelectedTemplate = templates[resumeData.template]
  const progress = computeProgress(resumeData)

  const set = (field, value) => setResumeData({ ...resumeData, [field]: value })

  const updateExp = (id, field, value) =>
    set("experience", resumeData.experience.map(e => e.id === id ? { ...e, [field]: value } : e))

  const addExp = () =>
    set("experience", [...resumeData.experience, { id: Date.now(), jobTitle: "", company: "", startDate: "", endDate: "", current: false, description: "" }])

  const removeExp = (id) =>
    set("experience", resumeData.experience.filter(e => e.id !== id))

  const updateEdu = (id, field, value) =>
    set("education", resumeData.education.map(e => e.id === id ? { ...e, [field]: value } : e))

  const addEdu = () =>
    set("education", [...resumeData.education, { id: Date.now(), degree: "", school: "", year: "", gpa: "" }])

  const removeEdu = (id) =>
    set("education", resumeData.education.filter(e => e.id !== id))

  const progressColor = progress < 40 ? "bg-rose-400" : progress < 75 ? "bg-amber-400" : "bg-emerald-500"
  const progressLabel = progress < 40 ? "Just started" : progress < 75 ? "Coming along" : progress < 100 ? "Almost there!" : "Complete!"

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
            <p className="text-sm text-slate-500 mt-1">Fill in your details and watch your resume come to life.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (confirm("Clear all data and start fresh?")) resetData() }}
              className="flex items-center gap-2 text-slate-500 hover:text-rose-600 text-sm font-medium border border-slate-200 hover:border-rose-200 px-4 py-2.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
            <Link
              to="/preview"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview & Export
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* FORM */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Progress bar */}
            <div className="px-6 pt-5 pb-4 border-b border-slate-100">
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

            {/* Template picker */}
            <div className="px-6 pt-5 pb-5 border-b border-slate-100">
              <SectionHeader title="Choose Template" />
              <div className="grid grid-cols-3 gap-3 mb-4">
                {templateOptions.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => set("template", t.value)}
                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                      resumeData.template === t.value ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-sm font-semibold text-slate-800">{t.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>

              {/* Accent color picker */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Accent Color</label>
                <div className="flex items-center gap-2">
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

            <div className="px-6 py-6 flex flex-col gap-6">

              {/* Personal Info */}
              <div>
                <SectionHeader title="Personal Info" />
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Full Name">
                    <input className={inputClass} placeholder="e.g. Jane Smith" value={resumeData.name} onChange={e => set("name", e.target.value)} />
                  </FormField>
                  <FormField label="Job Title">
                    <input className={inputClass} placeholder="e.g. Software Engineer" value={resumeData.title} onChange={e => set("title", e.target.value)} />
                  </FormField>
                  <FormField label="Email">
                    <input className={inputClass} type="email" placeholder="you@email.com" value={resumeData.email} onChange={e => set("email", e.target.value)} />
                  </FormField>
                  <FormField label="Phone">
                    <input className={inputClass} placeholder="+1 555 000 0000" value={resumeData.phone} onChange={e => set("phone", e.target.value)} />
                  </FormField>
                  <FormField label="Location">
                    <input className={inputClass} placeholder="City, Country" value={resumeData.location} onChange={e => set("location", e.target.value)} />
                  </FormField>
                  <FormField label="LinkedIn">
                    <input className={inputClass} placeholder="linkedin.com/in/yourname" value={resumeData.linkedin} onChange={e => set("linkedin", e.target.value)} />
                  </FormField>
                  <FormField label="Website / Portfolio">
                    <input className={inputClass} placeholder="yourportfolio.com" value={resumeData.website} onChange={e => set("website", e.target.value)} />
                  </FormField>
                </div>
              </div>

              {/* Summary */}
              <div>
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
              <div>
                <SectionHeader title="Skills" />
                <FormField label="Skills (comma separated)">
                  <input
                    className={inputClass}
                    placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
                    value={resumeData.skills.join(", ")}
                    onChange={e => set("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
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

              {/* Experience */}
              <div>
                <SectionHeader title="Experience" />
                <div className="flex flex-col gap-4">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={exp.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500">Position {idx + 1}</span>
                        {resumeData.experience.length > 1 && (
                          <button onClick={() => removeExp(exp.id)} className="text-xs text-rose-400 hover:text-rose-600 transition-colors">Remove</button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
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
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-indigo-300 text-slate-500 hover:text-indigo-600 rounded-xl py-3 text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Another Position
                  </button>
                </div>
              </div>

              {/* Education */}
              <div>
                <SectionHeader title="Education" />
                <div className="flex flex-col gap-4">
                  {resumeData.education.map((edu, idx) => (
                    <div key={edu.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500">Entry {idx + 1}</span>
                        {resumeData.education.length > 1 && (
                          <button onClick={() => removeEdu(edu.id)} className="text-xs text-rose-400 hover:text-rose-600 transition-colors">Remove</button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
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
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-indigo-300 text-slate-500 hover:text-indigo-600 rounded-xl py-3 text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Another Entry
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* LIVE PREVIEW */}
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Live Preview</h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
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
