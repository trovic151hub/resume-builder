import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Menu, X, User, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    if (!userMenuOpen) return
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [userMenuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const links = [
    { to: "/", label: "Home" },
    { to: "/builder", label: "Builder" },
    { to: "/preview", label: "Preview" },
    ...(user ? [{ to: "/resumes", label: "My Resumes" }] : []),
  ]

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = async () => {
    setUserMenuOpen(false)
    closeMenu()
    await logout()
    navigate("/")
  }

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

        {/* Desktop CTA / Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold text-sm hover:bg-indigo-100 transition-colors"
              >
                {(user.email?.[0] || "U").toUpperCase()}
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 overflow-hidden"
                  >
                    <p className="px-3 py-2 text-xs text-slate-400 truncate border-b border-slate-100">
                      {user.email}
                    </p>
                    <Link
                      to="/resumes"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4" />
                      My Resumes
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
          )}
          <Link
            to="/builder"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Build My Resume
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="md:hidden fixed inset-0 top-16 z-40 bg-slate-900/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 inset-x-0 z-50 border-t border-slate-100 bg-white shadow-lg"
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
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out ({user.email})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
