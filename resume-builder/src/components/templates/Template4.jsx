import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react"

export default function Template4({ data }) {
  const skills = data.skills.filter(Boolean)
  const accent = data.accentColor || "#4f46e5"
  const hasContact = data.email || data.phone || data.location || data.linkedin || data.website

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-10 font-sans overflow-hidden"
    >
      {/* Header */}
      <div className="text-center pb-6 mb-6 border-b border-slate-200">
        <h1 className="text-3xl font-light text-slate-900 tracking-wide break-words">
          {data.name || "Your Name"}
        </h1>
        <p className="text-sm font-medium tracking-widest uppercase mt-2" style={{ color: accent }}>
          {data.title || "Job Title"}
        </p>
        {hasContact && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-4 text-xs text-slate-500">
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
        <section className="mb-7 text-center">
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto break-words">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {skills.map((s, i) => (
              <span key={i} className="text-xs text-slate-600">
                {s}{i < skills.length - 1 && <span className="ml-3 text-slate-300">·</span>}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(e => e.jobTitle || e.company || e.description) && (
        <section className="mb-7">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4 text-center">Experience</h2>
          <div className="flex flex-col gap-5">
            {data.experience.map((exp) => (
              (exp.jobTitle || exp.company || exp.description) ? (
                <div key={exp.id} className="overflow-hidden">
                  <div className="flex items-baseline justify-between flex-wrap gap-x-3">
                    <p className="text-sm font-semibold text-slate-800 break-words">
                      {exp.jobTitle}{exp.company && <span className="font-normal text-slate-500"> — {exp.company}</span>}
                    </p>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? " – " : ""}{exp.current ? "Present" : exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 whitespace-pre-line max-w-4xl break-words">{exp.description}</p>
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
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4 text-center">Education</h2>
          <div className="flex flex-col gap-3">
            {data.education.map((edu) => (
              (edu.degree || edu.school) ? (
                <div key={edu.id} className="flex items-baseline justify-between flex-wrap gap-x-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {edu.degree}{edu.school && <span className="font-normal text-slate-500"> — {edu.school}</span>}
                    {edu.gpa ? <span className="text-slate-400"> · GPA: {edu.gpa}</span> : ""}
                  </p>
                  {edu.year && <span className="text-xs text-slate-400 whitespace-nowrap">{edu.year}</span>}
                </div>
              ) : null
            ))}
          </div>
        </section>
      )}
    </motion.div>
  )
}
