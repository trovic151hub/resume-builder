import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { LayoutTemplate, Eye, Save, Printer } from "lucide-react"

const features = [
  {
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: "3 Professional Templates",
    desc: "Classic, Sidebar, and Modern layouts — switch between them instantly with animated transitions.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Live Preview",
    desc: "See your resume update in real-time as you type — no need to refresh or switch tabs.",
  },
  {
    icon: <Save className="w-6 h-6" />,
    title: "Auto-Saved",
    desc: "Your data is automatically saved to your browser — come back anytime and pick up where you left off.",
  },
  {
    icon: <Printer className="w-6 h-6" />,
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-5 sm:mb-6 uppercase tracking-wide">
            Free Resume Builder
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-5 sm:mb-6">
            Build a Resume That<br />
            <span className="text-indigo-600">Gets You Hired</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
            Create a polished, professional resume in minutes. Fill in your details, pick a template, and you're done — no sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
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
          className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden max-w-3xl mx-auto"
        >
          {/* Browser chrome */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 flex items-center gap-2 max-w-xs mx-auto">
              <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs text-slate-400 font-mono truncate">resumeforge.replit.app/builder</span>
            </div>
          </div>
          {/* App content simulation */}
          <div className="flex text-left" style={{ height: "220px" }}>
            {/* Left: form panel */}
            <div className="w-1/2 border-r border-slate-100 p-4 flex flex-col gap-2.5 overflow-hidden">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <div className="h-1.5 bg-slate-200 rounded w-20" />
              </div>
              {/* Template picker mini */}
              <div className="flex gap-1.5">
                <div className="flex-1 h-7 rounded-lg bg-indigo-50 border-2 border-indigo-300 flex items-center justify-center">
                  <div className="h-1 bg-indigo-300 rounded w-8" />
                </div>
                <div className="flex-1 h-7 rounded-lg bg-slate-50 border border-slate-200" />
                <div className="flex-1 h-7 rounded-lg bg-slate-50 border border-slate-200" />
              </div>
              {/* Fields */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-6 bg-slate-100 rounded-lg border border-slate-200" />
                <div className="h-6 bg-slate-100 rounded-lg border border-slate-200" />
                <div className="h-6 bg-slate-100 rounded-lg border border-slate-200" />
                <div className="h-6 bg-slate-100 rounded-lg border border-slate-200" />
              </div>
              <div className="h-10 bg-slate-100 rounded-lg border border-slate-200" />
              {/* Skills pills */}
              <div className="flex gap-1 flex-wrap">
                <div className="h-4 w-10 rounded-full bg-indigo-500 opacity-70" />
                <div className="h-4 w-14 rounded-full bg-indigo-500 opacity-70" />
                <div className="h-4 w-8 rounded-full bg-indigo-500 opacity-70" />
              </div>
            </div>
            {/* Right: resume preview */}
            <div className="w-1/2 p-4 overflow-hidden">
              <div className="h-full bg-slate-50 rounded-xl border border-slate-100 p-3 flex flex-col gap-1.5">
                <div className="h-3 bg-slate-800 rounded w-2/3 opacity-60" />
                <div className="h-2 bg-indigo-400 rounded w-1/3 opacity-60 mb-1" />
                <div className="h-px bg-slate-200 w-full mb-1" />
                <div className="h-1.5 bg-slate-200 rounded w-full opacity-80" />
                <div className="h-1.5 bg-slate-200 rounded w-5/6 opacity-60" />
                <div className="h-1.5 bg-slate-200 rounded w-4/6 opacity-50 mb-1" />
                <div className="h-2 bg-indigo-300 rounded w-1/3 opacity-70" />
                <div className="h-1.5 bg-slate-200 rounded w-full opacity-70" />
                <div className="h-1.5 bg-slate-200 rounded w-4/5 opacity-60" />
                <div className="h-1.5 bg-slate-200 rounded w-5/6 opacity-50 mb-1" />
                <div className="h-2 bg-indigo-300 rounded w-1/4 opacity-70" />
                <div className="flex gap-1 mt-0.5">
                  <div className="h-3 w-8 rounded-full bg-indigo-200 opacity-80" />
                  <div className="h-3 w-10 rounded-full bg-indigo-200 opacity-80" />
                  <div className="h-3 w-6 rounded-full bg-indigo-200 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-slate-100 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-12">Everything You Need</h2>
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8"
            >
              <span className="text-4xl font-extrabold text-indigo-100">{s.number}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to land your next job?</h2>
          <p className="text-indigo-200 mb-6 sm:mb-8 text-sm sm:text-base">Start building your resume right now — it's completely free.</p>
          <Link
            to="/builder"
            className="inline-block bg-white text-indigo-700 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-indigo-50 transition-colors text-base shadow-lg"
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
