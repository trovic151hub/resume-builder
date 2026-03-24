import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Builder from "./pages/Builder"
import Preview from "./pages/Preview"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  )
}

export default App