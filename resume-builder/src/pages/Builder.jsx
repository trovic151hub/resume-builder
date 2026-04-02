import React from "react"
import { Link } from "react-router-dom"
import { useResume } from "../context/ResumeContext"
import Template1 from "../components/templates/Template1"
import Template2 from "../components/templates/Template2"
import Template3 from "../components/templates/Template3"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Eye, Plus, Pencil } from "lucide-react"

const templates = { template1: Template1, template2: Template2, template3: Template3 }

const TemplateThumbnailClassic = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="0" y="0" width="60" height="18" rx="3" fill="#4f46e5" opacity="0.15"/>
    <rect x="8" y="5" width="22" height="4" rx="1.5" fill="#4f46e5" opacity="0.7"/>
    <rect x="8" y="11" width="14" height="2.5" rx="1" fill="#94a3b8" opacity="0.6"/>
    <rect x="8" y="22" width="44" height="2" rx="1" fill="#cbd5e1"/>
    <rect x="8" y="26" width="36" height="2" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="30" width="40" height="2" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="36" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="8" y="40" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="43" width="38" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="46" width="42" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="52" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="8" y="57" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="60" width="30" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const TemplateThumbnailSidebar = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="0" y="0" width="20" height="72" rx="3" fill="#4f46e5" opacity="0.12"/>
    <rect x="3" y="6" width="14" height="14" rx="7" fill="#4f46e5" opacity="0.25"/>
    <rect x="3" y="23" width="14" height="2" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="3" y="27" width="10" height="1.5" rx="1" fill="#94a3b8" opacity="0.5"/>
    <rect x="3" y="34" width="14" height="2" rx="1" fill="#4f46e5" opacity="0.4"/>
    <rect x="3" y="38" width="12" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="3" y="41" width="10" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="3" y="44" width="12" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="25" y="6" width="28" height="3" rx="1.5" fill="#1e293b" opacity="0.6"/>
    <rect x="25" y="11" width="18" height="2" rx="1" fill="#94a3b8" opacity="0.5"/>
    <rect x="25" y="18" width="28" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="21" width="22" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="28" width="16" height="2" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="25" y="32" width="28" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="35" width="24" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="38" width="26" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="45" width="16" height="2" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="25" y="49" width="28" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="52" width="20" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const TemplateThumbnailModern = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="0" y="0" width="5" height="72" rx="2" fill="#4f46e5" opacity="0.7"/>
    <rect x="10" y="6" width="28" height="5" rx="2" fill="#1e293b" opacity="0.7"/>
    <rect x="10" y="13" width="18" height="2.5" rx="1" fill="#4f46e5" opacity="0.6"/>
    <rect x="10" y="17" width="40" height="1.5" rx="1" fill="#94a3b8" opacity="0.5"/>
    <rect x="10" y="20" width="34" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="10" y="27" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="10" y="31" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="34" width="38" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="37" width="42" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="43" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="10" y="47" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="50" width="30" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="57" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="10" y="61" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="64" width="36" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const templateOptions = [
  { value: "template1", label: "Classic", desc: "Clean & traditional", Thumb: TemplateThumbnailClassic },
  { value: "template2", label: "Sidebar", desc: "Two-column layout", Thumb: TemplateThumbnailSidebar },
  { value: "template3", label: "Modern", desc: "Bold & contemporary", Thumb: TemplateThumbnailModern },
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

function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mb-4 pt-1">
      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">{title}</h3>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  )
}

function computeProgress(data) {
  const checks = [
    data.name, data.title, data.email, data.phone, data.location,
    data.linkedin, data.website, data.summary,
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

  const [skillsRaw, setSkillsRaw] = React.useState(resumeData.skills.join(", "))

  React.useEffect(() => {
    const parsed = skillsRaw.split(",").map(s => s.trim()).filter(Boolean)
    const current = resumeData.skills
    if (parsed.join(",") !== current.join(",")) {
      setSkillsRaw(current.join(", "))
    }
  }, [resumeData.skills])

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Resume Builder</h1>
            <p className="text-sm text-slate-500 mt-1">Fill in your details and watch your resume come to life.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => { if (confirm("Clear all data and start fresh?")) resetData() }}
              className="flex items-center gap-2 text-slate-500 hover:text-rose-600 text-sm font-medium border border-slate-200 hover:border-rose-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
            <Link
              to="/preview"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview &amp; Export</span>
              <span className="sm:hidden">Preview</span>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* FORM */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Progress bar */}
            <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-slate-100">
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
            <div className="px-4 sm:px-6 pt-5 pb-5 border-b border-slate-100">
              <SectionHeader title="Choose Template" />
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                {templateOptions.map((t) => {
                  const isActive = resumeData.template === t.value
                  return (
                    <button
                      key={t.value}
                      onClick={() => set("template", t.value)}
                      className={`rounded-xl border-2 p-2 text-left transition-all flex flex-col gap-2 ${
                        isActive ? "border-indigo-500 bg-indigo-50 shadow-sm shadow-indigo-100" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-full rounded-lg overflow-hidden h-14 sm:h-16 flex items-center justify-center ${isActive ? "bg-white" : "bg-slate-50"}`}>
                        <div className="w-10 h-12 sm:w-12 sm:h-14">
                          <t.Thumb />
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isActive ? "text-indigo-600" : "text-slate-700"}`}>{t.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5 hidden sm:block leading-tight">{t.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

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
              <div>
                <SectionHeader title="Personal Info" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  <div className="sm:col-span-2">
                    <FormField label="Website / Portfolio">
                      <input className={inputClass} placeholder="yourportfolio.com" value={resumeData.website} onChange={e => set("website", e.target.value)} />
                    </FormField>
                  </div>
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

              {/* Experience */}
              <div>
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
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-indigo-300 text-slate-500 hover:text-indigo-600 rounded-xl py-3 text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
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
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-indigo-300 text-slate-500 hover:text-indigo-600 rounded-xl py-3 text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Entry
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* LIVE PREVIEW — hidden on mobile, shown on desktop */}
          <div className="hidden lg:block sticky top-24">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Live Preview</h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Auto-saving
              </span>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
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
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Pencil className="w-6 h-6 text-indigo-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Your resume appears here</p>
                  <p className="text-xs text-slate-400 text-center max-w-[160px] leading-relaxed">Start filling in your details on the left to see a live preview</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile preview link banner */}
          <div className="lg:hidden bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-800">Ready to see it?</p>
              <p className="text-xs text-indigo-500 mt-0.5">Tap to preview your resume</p>
            </div>
            <Link
              to="/preview"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex-shrink-0"
            >
              Preview →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
