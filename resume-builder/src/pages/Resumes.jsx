import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { FileText, Plus, Trash2 } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useResume } from "../context/ResumeContext"
import { listResumes, deleteResume } from "../services/firestoreService"

export default function Resumes() {
  const { user } = useAuth()
  const { startNewResume, loadResume } = useResume()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    listResumes(user.uid)
      .then(setResumes)
      .finally(() => setLoading(false))
  }, [user])

  const handleCreate = () => {
    startNewResume()
    navigate("/builder")
  }

  const handleOpen = async (resumeId) => {
    await loadResume(resumeId)
    navigate("/builder")
  }

  const handleDelete = async (e, resumeId) => {
    e.stopPropagation()
    if (!confirm("Delete this resume? This cannot be undone.")) return
    await deleteResume(user.uid, resumeId)
    setResumes((prev) => prev.filter((r) => r.id !== resumeId))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Resumes</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Resume
        </button>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading...</p>
      ) : resumes.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">You don't have any saved resumes yet.</p>
          <button
            onClick={handleCreate}
            className="text-indigo-600 font-medium text-sm hover:underline"
          >
            Create your first resume
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <motion.div
              key={resume.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpen(resume.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(resume.id) }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="cursor-pointer text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <button
                  onClick={(e) => handleDelete(e, resume.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  aria-label="Delete resume"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm truncate">
                {resume.label || "Untitled Resume"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {resume.data?.name || "No name set"}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
