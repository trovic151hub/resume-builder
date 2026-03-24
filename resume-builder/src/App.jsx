import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Builder from "./pages/Builder"
import Preview from "./pages/Preview"
import "./App.css"

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  )
}

export default App
