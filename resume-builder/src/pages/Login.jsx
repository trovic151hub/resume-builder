import { useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { FileText, Mail, Lock } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login, signup, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || "/resumes"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (mode === "reset") {
        await resetPassword(email)
        setResetSent(true)
      } else if (mode === "login") {
        await login(email, password)
        navigate(redirectTo, { replace: true })
      } else {
        await signup(email, password)
        navigate(redirectTo, { replace: true })
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""))
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (next) => {
    setMode(next)
    setError("")
    setResetSent(false)
  }

  const handleGoogle = async () => {
    setError("")
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-paper">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-sm p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display text-xl font-semibold text-slate-800">
            {mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset your password"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "login"
              ? "Sign in to access your resumes"
              : mode === "signup"
              ? "Save and manage multiple resumes"
              : "We'll email you a link to reset it"}
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {mode === "reset" && resetSent ? (
          <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-3 text-center">
            Check your inbox for a password reset link.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {mode !== "reset" && (
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            )}
            {mode === "login" && (
              <button
                type="button"
                onClick={() => switchMode("reset")}
                className="self-end text-xs text-brand-600 hover:underline -mt-1"
              >
                Forgot password?
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : mode === "signup"
                ? "Sign Up"
                : "Send Reset Link"}
            </button>
          </form>
        )}

        {mode !== "reset" && (
          <>
            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs text-slate-400">or</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full border border-slate-200 hover:bg-slate-50 disabled:opacity-60 text-sm font-medium text-slate-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Continue with Google
            </button>
          </>
        )}

        <p className="text-sm text-slate-500 text-center mt-6">
          {mode === "reset" ? (
            <button type="button" onClick={() => switchMode("login")} className="text-brand-600 font-medium hover:underline">
              Back to sign in
            </button>
          ) : (
            <>
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                className="text-brand-600 font-medium hover:underline"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </>
          )}
        </p>

        <Link to="/" className="block text-center text-xs text-slate-400 hover:text-slate-600 mt-4">
          Back to home
        </Link>
      </motion.div>
    </div>
  )
}
