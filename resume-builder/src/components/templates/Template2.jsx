import { motion } from "framer-motion"

export default function Template2({ data }) {
  const skills = data.skills.filter(Boolean)
  const accent = data.accentColor || "#4f46e5"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-full font-sans"
    >
      {/* Sidebar */}
      <div className="w-2/5 text-white p-7 flex flex-col gap-6" style={{ backgroundColor: "#1e293b" }}>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight leading-tight">
            {data.name || "Your Name"}
          </h1>
          <p className="text-sm font-semibold mt-1" style={{ color: accent === "#4f46e5" ? "#a5b4fc" : accent }}>
            {data.title || "Job Title"}
          </p>
        </div>

        {/* Contact */}
        {(data.email || data.phone || data.location || data.linkedin || data.website) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Contact</h2>
            <div className="flex flex-col gap-1.5">
              {data.email && <p className="text-xs text-slate-300 break-all">{data.email}</p>}
              {data.phone && <p className="text-xs text-slate-300">{data.phone}</p>}
              {data.location && <p className="text-xs text-slate-300">{data.location}</p>}
              {data.linkedin && <p className="text-xs text-slate-300 break-all">{data.linkedin}</p>}
              {data.website && <p className="text-xs text-slate-300 break-all">{data.website}</p>}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
            <div className="flex flex-col gap-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent === "#4f46e5" ? "#a5b4fc" : accent }} />
                  <span className="text-xs text-slate-200">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-7 flex flex-col gap-5">
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b border-slate-100" style={{ color: accent }}>Profile</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience.some(e => e.jobTitle || e.company || e.description) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b border-slate-100" style={{ color: accent }}>Experience</h2>
            <div className="flex flex-col gap-4">
              {data.experience.map((exp) => (
                (exp.jobTitle || exp.company || exp.description) ? (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{exp.jobTitle}</p>
                        <p className="text-xs text-slate-500">{exp.company}</p>
                      </div>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                          {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? " – " : ""}{exp.current ? "Present" : exp.endDate}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-xs text-slate-600 leading-relaxed mt-1 whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          </section>
        )}

        {data.education.some(e => e.degree || e.school) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b border-slate-100" style={{ color: accent }}>Education</h2>
            <div className="flex flex-col gap-3">
              {data.education.map((edu) => (
                (edu.degree || edu.school) ? (
                  <div key={edu.id} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                      <p className="text-xs text-slate-500">{edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</p>
                    </div>
                    {edu.year && <span className="text-xs text-slate-400 ml-4">{edu.year}</span>}
                  </div>
                ) : null
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  )
}
