import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Link2, Globe, GitFork } from "lucide-react"
import ProjectEntry from "./ProjectEntry"

function SectionTitle({ children, light = false }) {
  return (
    <h2
      className={`text-[10px] font-extrabold uppercase tracking-widest mb-2.5 border-t pt-1.5 ${
        light ? "text-white border-white/60" : "text-slate-800 border-emerald-800/70"
      }`}
    >
      {children}
    </h2>
  )
}

function DateRange({ startDate, endDate, current, light = false }) {
  if (!startDate && !endDate && !current) return null

  return (
    <p className={`text-[9px] font-semibold leading-tight ${light ? "text-white/80" : "text-slate-500"}`}>
      {startDate}
      {startDate && (endDate || current) ? " - " : ""}
      {current ? "Current" : endDate}
    </p>
  )
}

export default function Template7({ data }) {
  const skills = data.skills.filter(Boolean)
  const certifications = (data.certifications || []).filter(Boolean)
  const languages = (data.languages || []).filter(Boolean)
  const projects = (data.projects || []).filter(project => project.name || project.description)
  const accent = data.accentColor || "#047857"
  const sidebarColor = accent === "#4f46e5" ? "#0f6b57" : accent
  const hasContact = data.email || data.phone || data.location || data.linkedin || data.github || data.website
  const hasExperience = data.experience.some((e) => e.jobTitle || e.company || e.description)
  const hasEducation = data.education.some((e) => e.degree || e.school)
  const initials = (data.name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-full bg-white font-sans overflow-hidden"
    >
      <aside
        className="w-[34%] min-w-[185px] text-white flex flex-col"
        style={{ backgroundColor: sidebarColor }}
      >
        <div className="relative px-5 pt-7 pb-6">
          <div className="absolute inset-x-0 top-0 h-[50%] bg-[#343836]" />
          <div className="relative w-full aspect-square bg-slate-300 overflow-hidden shadow-sm">
            {data.photo ? (
              <img src={data.photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500 text-4xl font-bold">
                {initials || "?"}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          {hasContact && (
            <section>
              <div className="flex flex-col gap-2.5 text-[10px] leading-snug text-white/90">
                {data.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.phone}</span>
                  </div>
                )}
                {data.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="break-all">{data.email}</span>
                  </div>
                )}
                {data.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.location}</span>
                  </div>
                )}
                {data.linkedin && (
                  <div className="flex items-start gap-2">
                    <Link2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="break-all">{data.linkedin}</span>
                  </div>
                )}
                {data.github && (
                  <div className="flex items-start gap-2">
                    <GitFork className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="break-all">{data.github}</span>
                  </div>
                )}
                {data.website && (
                  <div className="flex items-start gap-2">
                    <Globe className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="break-all">{data.website}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {data.summary && (
            <section>
              <SectionTitle light>Summary</SectionTitle>
              <p className="text-[10px] leading-relaxed text-white/90 break-words">{data.summary}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <SectionTitle light>Technical Skills</SectionTitle>
              <ul className="list-disc pl-3.5 text-[10px] leading-relaxed text-white/90 space-y-1">
                {skills.map((skill, index) => (
                  <li key={index} className="break-words">{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <SectionTitle light>Languages</SectionTitle>
              <div className="flex flex-col gap-2">
                {languages.map((language, index) => (
                  <div key={index}>
                    <p className="text-[10px] font-bold leading-tight text-white break-words">{language}</p>
                    <div className="mt-1 h-1.5 grid grid-cols-5 gap-1">
                      {Array.from({ length: 5 }).map((_, dotIndex) => (
                        <span key={dotIndex} className="bg-white/85" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-8 py-7 text-slate-700">
        <header className="mb-5">
          <h1 className="text-3xl font-extrabold leading-tight break-words" style={{ color: sidebarColor }}>
            {data.name || "Your Name"}
          </h1>
          {data.title && (
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1 break-words">
              {data.title}
            </p>
          )}
        </header>

        {hasExperience && (
          <section className="mb-5">
            <SectionTitle>Experience</SectionTitle>
            <div className="flex flex-col gap-3.5">
              {data.experience.map((exp) => (
                exp.jobTitle || exp.company || exp.description ? (
                  <article key={exp.id} className="break-inside-avoid overflow-hidden">
                    <DateRange startDate={exp.startDate} endDate={exp.endDate} current={exp.current} />
                    {(exp.jobTitle || exp.company) && (
                      <p className="text-[11px] font-extrabold text-slate-800 leading-snug break-words">
                        {exp.jobTitle}
                        {exp.company ? <span className="font-bold"> {exp.company}</span> : null}
                      </p>
                    )}
                    {exp.description && (
                      <p className="text-[10px] leading-relaxed text-slate-600 mt-1 whitespace-pre-line break-words">
                        {exp.description}
                      </p>
                    )}
                  </article>
                ) : null
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-5">
            <SectionTitle>Selected Projects</SectionTitle>
            <div className="flex flex-col gap-3">
              {projects.map(project => <ProjectEntry key={project.id} project={project} compact />)}
            </div>
          </section>
        )}

        {hasEducation && (
          <section className="mb-5">
            <SectionTitle>Education</SectionTitle>
            <div className="flex flex-col gap-2.5">
              {data.education.map((edu) => (
                edu.degree || edu.school ? (
                  <article key={edu.id}>
                    {edu.year && <p className="text-[9px] font-semibold text-slate-500 leading-tight">{edu.year}</p>}
                    <p className="text-[11px] font-extrabold text-slate-800 leading-snug break-words">{edu.degree}</p>
                    <p className="text-[10px] text-slate-600 leading-snug break-words">
                      {edu.school}
                      {edu.gpa ? ` - GPA: ${edu.gpa}` : ""}
                    </p>
                  </article>
                ) : null
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-5">
            <SectionTitle>Certifications</SectionTitle>
            <ul className="list-disc pl-4 text-[10px] leading-relaxed text-slate-600 space-y-1">
              {certifications.map((certification, index) => (
                <li key={index} className="break-words">{certification}</li>
              ))}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <ul className="list-disc pl-4 text-[10px] leading-relaxed text-slate-600 columns-1 gap-6">
              {skills.map((skill, index) => (
                <li key={index} className="break-inside-avoid break-words">{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </motion.div>
  )
}
