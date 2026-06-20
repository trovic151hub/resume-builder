import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react"

export default function Template5({ data }) {
  const skills = data.skills.filter(Boolean)
  const accent = data.accentColor || "#4f46e5"
  const initials = (data.name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="font-sans overflow-hidden"
    >
      {/* Banner */}
      <div className="px-8 py-7 flex items-center gap-5" style={{ backgroundColor: accent }}>
        <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {initials || "?"}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-white tracking-tight break-words">
            {data.name || "Your Name"}
          </h1>
          <p className="text-white/80 font-medium text-sm mt-0.5">
            {data.title || "Job Title"}
          </p>
        </div>
      </div>

      {/* Contact bar */}
      {(data.email || data.phone || data.location || data.linkedin || data.website) && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 px-8 py-3 bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
          {data.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 flex-shrink-0" />
              {data.email}
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 flex-shrink-0" />
              {data.phone}
            </span>
          )}
          {data.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {data.location}
            </span>
          )}
          {data.linkedin && (
            <span className="flex items-center gap-1.5">
              <Link2 className="w-3 h-3 flex-shrink-0" />
              {data.linkedin}
            </span>
          )}
          {data.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 flex-shrink-0" />
              {data.website}
            </span>
          )}
        </div>
      )}

      {/* Two-column body */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 p-8">
        {/* Left: skills + education */}
        <div className="sm:w-[34%] flex flex-col gap-6">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Skills</h2>
              <div className="flex flex-col gap-2">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                    <span className="text-xs text-slate-600 break-words">{s}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.degree || e.school) && (
            <section>
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
            </section>
          )}
        </div>

        {/* Right: summary + experience */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {data.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>Profile</h2>
              <p className="text-sm text-slate-700 leading-relaxed break-words">{data.summary}</p>
            </section>
          )}

          {data.experience.some(e => e.jobTitle || e.company || e.description) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Experience</h2>
              <div className="flex flex-col gap-4">
                {data.experience.map((exp) => (
                  (exp.jobTitle || exp.company || exp.description) ? (
                    <div key={exp.id} className="overflow-hidden">
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
      </div>
    </motion.div>
  )
}
