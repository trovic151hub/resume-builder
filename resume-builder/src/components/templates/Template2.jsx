import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Link2, Globe, GitFork } from "lucide-react"
import ProjectEntry from "./ProjectEntry"

export default function Template2({ data }) {
  const skills = data.skills.filter(Boolean)
  const certifications = (data.certifications || []).filter(Boolean)
  const languages = (data.languages || []).filter(Boolean)
  const projects = (data.projects || []).filter(project => project.name || project.description)
  const accent = data.accentColor || "#4f46e5"
  const lightAccent = accent === "#4f46e5" ? "#a5b4fc" : accent

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row min-h-full font-sans"
    >
      {/* Sidebar */}
      <div className="min-w-0 sm:w-[35%] sm:flex-none text-white p-6 sm:p-7 flex flex-col gap-5 sm:gap-6" style={{ backgroundColor: "#1e293b" }}>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
            {data.name || "Your Name"}
          </h1>
          <p className="text-sm font-semibold mt-1" style={{ color: lightAccent }}>
            {data.title || "Job Title"}
          </p>
        </div>

        {/* Contact */}
        {(data.email || data.phone || data.location || data.linkedin || data.github || data.website) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Contact</h2>
            <div className="flex flex-col gap-2">
              {data.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-300 break-all">{data.email}</p>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <p className="text-xs text-slate-300">{data.phone}</p>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <p className="text-xs text-slate-300">{data.location}</p>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-start gap-2">
                  <Link2 className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-300 break-all">{data.linkedin}</p>
                </div>
              )}
              {data.github && (
                <div className="flex items-start gap-2">
                  <GitFork className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-300 break-all">{data.github}</p>
                </div>
              )}
              {data.website && (
                <div className="flex items-start gap-2">
                  <Globe className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-300 break-all">{data.website}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Skills</h2>
            <div className="flex flex-wrap sm:flex-col gap-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: lightAccent }} />
                  <span className="text-xs text-slate-200">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Languages</h2>
            <div className="flex flex-wrap sm:flex-col gap-2">
              {languages.map((language, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: lightAccent }} />
                  <span className="text-xs text-slate-200 break-words">{language}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 p-6 sm:p-7 flex flex-col gap-5 overflow-hidden">
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b border-slate-100" style={{ color: accent }}>Profile</h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-4xl break-words">{data.summary}</p>
          </section>
        )}

        {data.experience.some(e => e.jobTitle || e.company || e.description) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b border-slate-100" style={{ color: accent }}>Experience</h2>
            <div className="flex flex-col gap-4">
              {data.experience.map((exp) => (
                (exp.jobTitle || exp.company || exp.description) ? (
                  <div key={exp.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-0">
                      <div className="min-w-0 overflow-hidden">
                        <p className="text-sm font-bold text-slate-800 break-words">{exp.jobTitle}</p>
                        <p className="text-xs text-slate-500 break-words">{exp.company}</p>
                      </div>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-xs text-slate-400 sm:whitespace-nowrap sm:ml-4">
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

        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b border-slate-100" style={{ color: accent }}>Selected Projects</h2>
            <div className="flex flex-col gap-3">
              {projects.map(project => <ProjectEntry key={project.id} project={project} />)}
            </div>
          </section>
        )}

        {data.education.some(e => e.degree || e.school) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b border-slate-100" style={{ color: accent }}>Education</h2>
            <div className="flex flex-col gap-3">
              {data.education.map((edu) => (
                (edu.degree || edu.school) ? (
                  <div key={edu.id} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-0">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                      <p className="text-xs text-slate-500">{edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</p>
                    </div>
                    {edu.year && <span className="text-xs text-slate-400 sm:ml-4">{edu.year}</span>}
                  </div>
                ) : null
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b border-slate-100" style={{ color: accent }}>Certifications</h2>
            <ul className="list-disc pl-4 text-xs text-slate-600 leading-relaxed space-y-1">
              {certifications.map((certification, i) => (
                <li key={i} className="break-words">{certification}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </motion.div>
  )
}
