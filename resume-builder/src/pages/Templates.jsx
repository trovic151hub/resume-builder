import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronLeft, Check } from "lucide-react"
import { useResume } from "../context/ResumeContext"
import { templateOptions } from "../data/templates"

export default function Templates() {
  const { resumeData, setResumeData } = useResume()
  const navigate = useNavigate()

  const handleSelect = (value) => {
    setResumeData({ ...resumeData, template: value })
    navigate("/builder")
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Builder
      </button>

      <h1 className="font-display text-2xl font-semibold text-slate-800 mb-1">Choose a Template</h1>
      <p className="text-sm text-slate-500 mb-8">Pick the design that best fits your style. You can switch anytime.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templateOptions.map((t, i) => {
          const isActive = resumeData.template === t.value
          return (
            <motion.button
              key={t.value}
              onClick={() => handleSelect(t.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`text-left rounded-2xl border-2 p-4 transition-all flex flex-col gap-3 ${
                isActive ? "border-brand-500 bg-brand-50 shadow-sm shadow-brand-100" : "border-slate-200 hover:border-brand-300 hover:shadow-md bg-white"
              }`}
            >
              <div className={`relative w-full rounded-xl overflow-hidden aspect-[3/4] flex items-center justify-center ${isActive ? "bg-white" : "bg-slate-50"}`}>
                <div className="w-2/3 h-2/3">
                  <t.Thumb />
                </div>
                {isActive && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                )}
              </div>
              <div>
                <div className={`text-sm font-bold ${isActive ? "text-brand-600" : "text-slate-800"}`}>{t.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.desc}</div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
