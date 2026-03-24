import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "3 Professional Templates",
    desc: "Classic, Sidebar, and Modern layouts — switch between them instantly with animated transitions.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Live Preview",
    desc: "See your resume update in real-time as you type — no need to refresh or switch tabs.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
    title: "Auto-Saved",
    desc: "Your data is automatically saved to your browser — come back anytime and pick up where you left off.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    title: "Print Ready",
    desc: "Export a clean, print-ready version of your resume directly from the preview page.",
  },
]

const steps = [
  { number: "01", title: "Fill In Your Details", desc: "Add your name, contact info, skills, experience, and education." },
  { number: "02", title: "Pick a Template", desc: "Choose from three professional layouts that suit your style." },
  { number: "03", title: "Preview & Print", desc: "Review your finished resume and print or save it as a PDF." },
]

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
            Free Resume Builder
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Build a Resume That<br />
            <span className="text-indigo-600">Gets You Hired</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            Create a polished, professional resume in minutes. Fill in your details, pick a template, and you're done — no sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/builder"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors shadow-lg shadow-indigo-200"
            >
              Start Building →
            </Link>
            <Link
              to="/preview"
              className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-8 py-4 rounded-xl text-base transition-colors border border-slate-200"
            >
              See Example
            </Link>
          </div>
        </motion.div>

        {/* Mock preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-3xl mx-auto"
        >
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 text-xs text-slate-400 font-mono">resume-builder</span>
          </div>
          <div className="p-8 flex gap-8 text-left">
            <div className="w-1/3 border-r border-slate-100 pr-6">
              <div className="w-16 h-16 rounded-full bg-indigo-100 mb-4" />
              <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-2 bg-slate-100 rounded w-1/2 mb-6" />
              <div className="h-2 bg-indigo-100 rounded w-2/3 mb-2" />
              <div className="h-2 bg-indigo-100 rounded w-1/2 mb-2" />
              <div className="h-2 bg-indigo-100 rounded w-3/4" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-slate-200 rounded w-full mb-2" />
              <div className="h-2 bg-slate-100 rounded w-5/6 mb-2" />
              <div className="h-2 bg-slate-100 rounded w-4/6 mb-6" />
              <div className="h-2 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-2 bg-slate-100 rounded w-full mb-2" />
              <div className="h-2 bg-slate-100 rounded w-5/6 mb-6" />
              <div className="h-2 bg-slate-200 rounded w-2/4 mb-2" />
              <div className="h-2 bg-slate-100 rounded w-full mb-2" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Everything You Need</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-800">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
            >
              <span className="text-4xl font-extrabold text-indigo-100">{s.number}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to land your next job?</h2>
          <p className="text-indigo-200 mb-8">Start building your resume right now — it's completely free.</p>
          <Link
            to="/builder"
            className="inline-block bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-base shadow-lg"
          >
            Get Started for Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm border-t border-slate-100">
        © {new Date().getFullYear()} ResumeForge · Built with React & Tailwind CSS
      </footer>
    </div>
  )
}
