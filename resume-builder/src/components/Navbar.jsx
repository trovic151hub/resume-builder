import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Menu, X } from "lucide-react"

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: "/", label: "Home" },
    { to: "/builder", label: "Builder" },
    { to: "/preview", label: "Preview" },
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="no-print sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-800 text-lg">ResumeForge</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-indigo-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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

        {/* Desktop CTA */}
        <Link
          to="/builder"
          className="hidden md:inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Build My Resume
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(({ to, label }) => {
                const active = pathname === to
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
              <Link
                to="/builder"
                onClick={closeMenu}
                className="mt-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors text-center"
              >
                Build My Resume
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
