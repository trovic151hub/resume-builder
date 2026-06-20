import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react"

export default function Template6({ data }) {
  const skills = data.skills.filter(Boolean)
  const accent = data.accentColor || "#4f46e5"
  const hasExperience = data.experience.some(e => e.jobTitle || e.company || e.description)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row min-h-full font-sans"
    >
      {/* Main content */}
      <div className="flex-1 min-w-0 p-7 sm:p-8 flex flex-col gap-6 order-2 sm:order-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight break-words">
            {data.name || "Your Name"}
          </h1>
          <p className="text-sm font-semibold mt-1" style={{ color: accent }}>
            {data.title || "Job Title"}
          </p>
        </div>

        {data.summary && (
          <p className="text-sm text-slate-600 leading-relaxed break-words -mt-2">{data.summary}</p>
        )}

        {hasExperience && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>Experience</h2>
            <div className="relative flex flex-col gap-5 pl-5 border-l-2" style={{ borderColor: `${accent}33` }}>
              {data.experience.map((exp) => (
                (exp.jobTitle || exp.company || exp.description) ? (
                  <div key={exp.id} className="relative overflow-hidden">
                    <span
                      className="absolute -left-[1.45rem] top-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                      style={{ backgroundColor: accent }}
                    />
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
                ) : null
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sidebar */}
      <div
        className="sm:w-[34%] p-7 sm:p-8 flex flex-col gap-6 order-1 sm:order-2"
        style={{ backgroundColor: `${accent}0d` }}
      >
        {(data.email || data.phone || data.location || data.linkedin || data.website) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Contact</h2>
            <div className="flex flex-col gap-2">
              {data.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <p className="text-xs text-slate-600 break-all">{data.email}</p>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 flex-shrink-0" style={{ color: accent }} />
                  <p className="text-xs text-slate-600">{data.phone}</p>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: accent }} />
                  <p className="text-xs text-slate-600">{data.location}</p>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-start gap-2">
                  <Link2 className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <p className="text-xs text-slate-600 break-all">{data.linkedin}</p>
                </div>
              )}
              {data.website && (
                <div className="flex items-start gap-2">
                  <Globe className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <p className="text-xs text-slate-600 break-all">{data.website}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border break-words"
                  style={{ color: accent, borderColor: `${accent}33` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education.some(e => e.degree || e.school) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Education</h2>
            <div className="flex flex-col gap-3">
              {data.education.map((edu) => (
                (edu.degree || edu.school) ? (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-slate-800 break-words">{edu.degree}</p>
                    <p className="text-xs text-slate-500 break-words">{edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</p>
                    {edu.year && <p className="text-xs text-slate-400 mt-0.5">{edu.year}</p>}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
