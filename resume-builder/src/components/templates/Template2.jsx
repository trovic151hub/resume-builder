import { motion } from "framer-motion"

export default function Template2({ data }) {
  const skills = data.skills.filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-full font-sans"
    >
      {/* Sidebar */}
      <div className="w-2/5 bg-slate-800 text-white p-7 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight leading-tight">
            {data.name || "Your Name"}
          </h1>
          <p className="text-indigo-300 text-sm font-medium mt-1">
            {data.title || "Job Title"}
          </p>
        </div>

        {(data.email || data.phone) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Contact</h2>
            {data.email && (
              <p className="text-xs text-slate-300 break-all mb-1">{data.email}</p>
            )}
            {data.phone && (
              <p className="text-xs text-slate-300">{data.phone}</p>
            )}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
            <div className="flex flex-col gap-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span className="text-xs text-slate-200">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-7 flex flex-col gap-6">
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2 border-b border-slate-100 pb-1">Profile</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2 border-b border-slate-100 pb-1">Experience</h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.experience}</p>
          </section>
        )}

        {data.education && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2 border-b border-slate-100 pb-1">Education</h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.education}</p>
          </section>
        )}
      </div>
    </motion.div>
  )
}
