import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react"

export default function Template1({ data }) {
  const skills = data.skills.filter(Boolean)
  const accent = data.accentColor || "#4f46e5"
  const hasContact = data.email || data.phone || data.location || data.linkedin || data.website

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 font-sans"
    >
      {/* Header */}
      <div className="pb-5 mb-6" style={{ borderBottom: `2px solid ${accent}` }}>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-base font-semibold mt-1" style={{ color: accent }}>
          {data.title || "Job Title"}
        </p>
        {hasContact && (
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-500">
            {data.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 flex-shrink-0" />
                {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 flex-shrink-0" />
                {data.phone}
              </span>
            )}
            {data.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {data.location}
              </span>
            )}
            {data.linkedin && (
              <span className="flex items-center gap-1">
                <Link2 className="w-3 h-3 flex-shrink-0" />
                {data.linkedin}
              </span>
            )}
            {data.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 flex-shrink-0" />
                {data.website}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Profile */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>Profile</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: `${accent}18`, color: accent }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(e => e.jobTitle || e.company || e.description) && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp) => (
              (exp.jobTitle || exp.company || exp.description) ? (
                <div key={exp.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{exp.jobTitle}</p>
                      <p className="text-sm text-slate-500">{exp.company}</p>
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

      {/* Education */}
      {data.education.some(e => e.degree || e.school) && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Education</h2>
          <div className="flex flex-col gap-3">
            {data.education.map((edu) => (
              (edu.degree || edu.school) ? (
                <div key={edu.id} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</p>
                  </div>
                  {edu.year && <span className="text-xs text-slate-400 ml-4">{edu.year}</span>}
                </div>
              ) : null
            ))}
          </div>
        </section>
      )}
    </motion.div>
  )
}
