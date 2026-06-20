import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

const Home = lazy(() => import("./pages/Home"))
const Builder = lazy(() => import("./pages/Builder"))
const Preview = lazy(() => import("./pages/Preview"))
const Login = lazy(() => import("./pages/Login"))
const Resumes = lazy(() => import("./pages/Resumes"))

function PageFallback() {
  return <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-sm">Loading...</div>
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/resumes"
            element={
              <ProtectedRoute>
                <Resumes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
