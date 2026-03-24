import { motion } from "framer-motion"

export default function Template1({ data }) {
  const skills = data.skills.filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 font-sans"
    >
      {/* Header */}
      <div className="border-b-2 border-slate-800 pb-5 mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-base font-medium text-indigo-600 mt-1">
          {data.title || "Job Title"}
        </p>
        {(data.email || data.phone) && (
          <p className="text-sm text-slate-500 mt-2 flex items-center gap-3">
            {data.email && <span>{data.email}</span>}
            {data.email && data.phone && <span className="text-slate-300">|</span>}
            {data.phone && <span>{data.phone}</span>}
          </p>
        )}
      </div>

      {/* Profile */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Profile</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Experience</h2>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.experience}</p>
        </section>
      )}

      {/* Education */}
      {data.education && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Education</h2>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.education}</p>
        </section>
      )}
    </motion.div>
  )
}
