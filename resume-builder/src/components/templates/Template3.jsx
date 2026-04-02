import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react"

function lighten(hex) {
  return `${hex}22`
}

export default function Template3({ data }) {
  const skills = data.skills.filter(Boolean)
  const accent = data.accentColor || "#4f46e5"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="font-sans"
    >
      {/* Gradient Header */}
      <div className="px-8 py-8" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-white/80 font-medium mt-1 text-base">
          {data.title || "Job Title"}
        </p>
        {(data.email || data.phone || data.location || data.linkedin || data.website) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-white/75 text-xs">
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

      <div className="p-8 flex flex-col gap-6">
        {/* Profile */}
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>About Me</h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-4xl break-words">{data.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1 rounded-full border"
                  style={{ backgroundColor: lighten(accent), color: accent, borderColor: `${accent}33` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Experience */}
          {data.experience.some(e => e.jobTitle || e.company || e.description) && (
            <section className="col-span-2">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Experience</h2>
              <div className="flex flex-col gap-4">
                {data.experience.map((exp) => (
                  (exp.jobTitle || exp.company || exp.description) ? (
                    <div key={exp.id} className="flex gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 overflow-hidden">
                            <p className="text-sm font-bold text-slate-800 break-words">{exp.jobTitle}</p>
                            <p className="text-xs text-slate-500 break-words">{exp.company}</p>
                          </div>
                          {(exp.startDate || exp.endDate) && (
                            <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                              {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? " – " : ""}{exp.current ? "Present" : exp.endDate}
                            </span>
                          )}
                        </div>
                        {exp.description && (
                          <p className="text-xs text-slate-600 leading-relaxed mt-1 whitespace-pre-line max-w-4xl break-words">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.some(e => e.degree || e.school) && (
            <section className="col-span-2">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Education</h2>
              <div className="flex flex-col gap-3">
                {data.education.map((edu) => (
                  (edu.degree || edu.school) ? (
                    <div key={edu.id} className="flex gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                      <div className="flex-1 flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                          <p className="text-xs text-slate-500">{edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</p>
                        </div>
                        {edu.year && <span className="text-xs text-slate-400 ml-4">{edu.year}</span>}
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  )
}
