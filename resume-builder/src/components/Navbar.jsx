import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Home" },
    { to: "/builder", label: "Builder" },
    { to: "/preview", label: "Preview" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-bold text-slate-800 text-lg">ResumeForge</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-indigo-50 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <Link
          to="/builder"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Build My Resume
        </Link>
      </div>
    </nav>
  )
}
