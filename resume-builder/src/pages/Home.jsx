import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { LayoutTemplate, Eye, Save, Printer } from "lucide-react"
import { templateOptions } from "../data/templates"

const features = [
  {
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: "6 Professional Templates",
    desc: "From clean Classic to a bold Timeline layout — switch between them instantly with animated transitions.",
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
  { number: "02", title: "Pick a Template", desc: "Choose from six professional layouts that suit your style." },
  { number: "03", title: "Preview & Print", desc: "Review your finished resume and print or save it as a PDF." },
]

const showcaseSlots = [
  { offset: -1, x: -100, rotate: -9, scale: 0.86, z: 10 },
  { offset: 1, x: 100, rotate: 9, scale: 0.86, z: 10 },
  { offset: 0, x: 0, rotate: 0, scale: 1, z: 20 },
]

function HeroTemplateShowcase() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % templateOptions.length), 2800)
    return () => clearInterval(id)
  }, [])

  const at = (offset) => templateOptions[(index + offset + templateOptions.length) % templateOptions.length]

  return (
    <div className="relative h-72 sm:h-80">
      {showcaseSlots.map(({ offset, x, rotate, scale, z }) => {
        const t = at(offset)
        return (
          <div key={offset} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: z }}>
            <motion.div
              key={t.value}
              initial={{ opacity: 0, scale: scale * 0.92 }}
              animate={{ opacity: 1, x, y: offset === 0 ? 0 : 14, rotate, scale }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-36 sm:w-44 aspect-[3/4] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-3"
            >
              <t.Thumb />
              <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                {t.label}
              </span>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-5 sm:mb-6 uppercase tracking-wide">
            Free Resume Builder
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight mb-5 sm:mb-6">
            Build a Resume That<br />
            <span className="text-brand-600">Gets You Hired</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
            Create a polished, professional resume in minutes. Fill in your details, pick a template, and export — no account needed to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              to="/builder"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors shadow-lg shadow-brand-200"
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

        {/* Template showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <HeroTemplateShowcase />
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-slate-100 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 text-center mb-8 sm:mb-12">Everything You Need</h2>
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
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
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
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 text-center mb-8 sm:mb-12">How It Works</h2>
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
              <span className="text-4xl font-extrabold text-brand-100">{s.number}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-4">Ready to land your next job?</h2>
          <p className="text-brand-200 mb-6 sm:mb-8 text-sm sm:text-base">Start building your resume right now — it's completely free.</p>
          <Link
            to="/builder"
            className="inline-block bg-white text-brand-700 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-brand-50 transition-colors text-base shadow-lg"
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
