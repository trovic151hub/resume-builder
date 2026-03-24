import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useResume } from "../context/ResumeContext"
import { motion } from "framer-motion"
import Template1 from "../components/templates/Template1"
import Template2 from "../components/templates/Template2"
import Template3 from "../components/templates/Template3"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const templates = { template1: Template1, template2: Template2, template3: Template3 }
const templateNames = { template1: "Classic", template2: "Sidebar", template3: "Modern" }

export default function Preview() {
  const { resumeData } = useResume()
  const SelectedTemplate = templates[resumeData.template]
  const resumeRef = useRef(null)
  const [exporting, setExporting] = useState(false)
  const hasData = resumeData.name || resumeData.title || resumeData.summary

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    setExporting(true)
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      const filename = resumeData.name
        ? `${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf"
      pdf.save(filename)
    } catch (err) {
      console.error("PDF export failed:", err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Toolbar */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-auto min-h-14 py-2 sm:py-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/builder"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-sm text-slate-500 hidden sm:inline">
              Template: <span className="font-semibold text-slate-700">{templateNames[resumeData.template]}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pb-2 sm:pb-0">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting || !hasData}
              className="flex items-center gap-2 text-white text-sm font-semibold px-3 sm:px-5 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: resumeData.accentColor || "#4f46e5" }}
            >
              {exporting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Resume sheet */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {!hasData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow border border-slate-100 p-10 sm:p-16 text-center"
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
            ref={resumeRef}
          >
            <SelectedTemplate data={resumeData} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
