import { motion } from "framer-motion"

export default function Template3({ data }) {
  const skills = data.skills.filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="font-sans"
    >
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-indigo-200 font-medium mt-1">
          {data.title || "Job Title"}
        </p>
        {(data.email || data.phone) && (
          <p className="text-indigo-200 text-xs mt-3 flex items-center gap-3">
            {data.email && <span>{data.email}</span>}
            {data.email && data.phone && <span className="opacity-40">|</span>}
            {data.phone && <span>{data.phone}</span>}
          </p>
        )}
      </div>

      <div className="p-8 flex flex-col gap-6">
        {/* Profile */}
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">About Me</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Experience */}
          {data.experience && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Experience</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.experience}</p>
            </section>
          )}

          {/* Education */}
          {data.education && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Education</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.education}</p>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  )
}
