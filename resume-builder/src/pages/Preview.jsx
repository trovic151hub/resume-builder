import { Link } from "react-router-dom"
import { useResume } from "../context/ResumeContext"
import { motion } from "framer-motion"
import Template1 from "../components/templates/Template1"
import Template2 from "../components/templates/Template2"
import Template3 from "../components/templates/Template3"

const templates = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
}

const templateNames = {
  template1: "Classic",
  template2: "Sidebar",
  template3: "Modern",
}

export default function Preview() {
  const { resumeData } = useResume()
  const SelectedTemplate = templates[resumeData.template]
  const hasData = resumeData.name || resumeData.title || resumeData.summary

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Toolbar */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/builder"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Builder
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500">
              Template: <span className="font-semibold text-slate-700">{templateNames[resumeData.template]}</span>
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Resume sheet */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {!hasData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow border border-slate-100 p-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Your resume is empty</h2>
            <p className="text-slate-500 text-sm mb-6">Head over to the builder and fill in your details to see a preview here.</p>
            <Link
              to="/builder"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Go to Builder →
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
          >
            <SelectedTemplate data={resumeData} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
