/* eslint-disable react-refresh/only-export-components -- data module, not a component module */
import Template1 from "../components/templates/Template1"
import Template2 from "../components/templates/Template2"
import Template3 from "../components/templates/Template3"
import Template4 from "../components/templates/Template4"
import Template5 from "../components/templates/Template5"
import Template6 from "../components/templates/Template6"

export const templateComponents = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
  template5: Template5,
  template6: Template6,
}

const TemplateThumbnailClassic = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="0" y="0" width="60" height="18" rx="3" fill="#4f46e5" opacity="0.15"/>
    <rect x="8" y="5" width="22" height="4" rx="1.5" fill="#4f46e5" opacity="0.7"/>
    <rect x="8" y="11" width="14" height="2.5" rx="1" fill="#94a3b8" opacity="0.6"/>
    <rect x="8" y="22" width="44" height="2" rx="1" fill="#cbd5e1"/>
    <rect x="8" y="26" width="36" height="2" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="30" width="40" height="2" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="36" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="8" y="40" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="43" width="38" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="46" width="42" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="52" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="8" y="57" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="8" y="60" width="30" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const TemplateThumbnailSidebar = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="0" y="0" width="20" height="72" rx="3" fill="#4f46e5" opacity="0.12"/>
    <rect x="3" y="6" width="14" height="14" rx="7" fill="#4f46e5" opacity="0.25"/>
    <rect x="3" y="23" width="14" height="2" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="3" y="27" width="10" height="1.5" rx="1" fill="#94a3b8" opacity="0.5"/>
    <rect x="3" y="34" width="14" height="2" rx="1" fill="#4f46e5" opacity="0.4"/>
    <rect x="3" y="38" width="12" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="3" y="41" width="10" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="3" y="44" width="12" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="25" y="6" width="28" height="3" rx="1.5" fill="#1e293b" opacity="0.6"/>
    <rect x="25" y="11" width="18" height="2" rx="1" fill="#94a3b8" opacity="0.5"/>
    <rect x="25" y="18" width="28" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="21" width="22" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="28" width="16" height="2" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="25" y="32" width="28" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="35" width="24" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="38" width="26" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="45" width="16" height="2" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="25" y="49" width="28" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="25" y="52" width="20" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const TemplateThumbnailModern = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="0" y="0" width="5" height="72" rx="2" fill="#4f46e5" opacity="0.7"/>
    <rect x="10" y="6" width="28" height="5" rx="2" fill="#1e293b" opacity="0.7"/>
    <rect x="10" y="13" width="18" height="2.5" rx="1" fill="#4f46e5" opacity="0.6"/>
    <rect x="10" y="17" width="40" height="1.5" rx="1" fill="#94a3b8" opacity="0.5"/>
    <rect x="10" y="20" width="34" height="1.5" rx="1" fill="#94a3b8" opacity="0.4"/>
    <rect x="10" y="27" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="10" y="31" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="34" width="38" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="37" width="42" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="43" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="10" y="47" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="50" width="30" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="57" width="20" height="2.5" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="10" y="61" width="44" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="10" y="64" width="36" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const TemplateThumbnailMinimal = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="16" y="7" width="28" height="3.5" rx="1.5" fill="#1e293b" opacity="0.6"/>
    <rect x="21" y="13" width="18" height="2" rx="1" fill="#4f46e5" opacity="0.6"/>
    <rect x="10" y="19" width="40" height="1" rx="0.5" fill="#cbd5e1"/>
    <rect x="14" y="25" width="32" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="12" y="28" width="36" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="20" y="35" width="20" height="2" rx="1" fill="#94a3b8" opacity="0.6"/>
    <rect x="12" y="41" width="36" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="14" y="44" width="32" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="20" y="51" width="20" height="2" rx="1" fill="#94a3b8" opacity="0.6"/>
    <rect x="14" y="57" width="32" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const TemplateThumbnailExecutive = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="0" y="0" width="60" height="16" rx="3" fill="#4f46e5" opacity="0.75"/>
    <circle cx="11" cy="8" r="4" fill="white" opacity="0.5"/>
    <rect x="19" y="5" width="20" height="2.5" rx="1" fill="white" opacity="0.85"/>
    <rect x="19" y="9.5" width="14" height="2" rx="1" fill="white" opacity="0.6"/>
    <rect x="0" y="16" width="60" height="6" fill="#eef2ff"/>
    <rect x="6" y="28" width="14" height="1.5" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="6" y="32" width="16" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="6" y="35" width="12" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="6" y="42" width="14" height="1.5" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="6" y="46" width="16" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="28" y="28" width="16" height="2" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="28" y="33" width="26" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="28" y="36" width="22" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="28" y="44" width="16" height="2" rx="1" fill="#4f46e5" opacity="0.55"/>
    <rect x="28" y="49" width="26" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="28" y="52" width="20" height="1.5" rx="1" fill="#e2e8f0"/>
  </svg>
)

const TemplateThumbnailTimeline = () => (
  <svg viewBox="0 0 60 72" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="72" rx="3" fill="#f8fafc"/>
    <rect x="38" y="0" width="22" height="72" rx="3" fill="#4f46e5" opacity="0.08"/>
    <rect x="6" y="7" width="24" height="3" rx="1.5" fill="#1e293b" opacity="0.7"/>
    <rect x="6" y="13" width="16" height="2" rx="1" fill="#4f46e5" opacity="0.6"/>
    <line x1="9" y1="22" x2="9" y2="62" stroke="#4f46e5" strokeOpacity="0.25" strokeWidth="1.5"/>
    <circle cx="9" cy="25" r="2" fill="#4f46e5" opacity="0.7"/>
    <rect x="14" y="23" width="18" height="2" rx="1" fill="#475569" opacity="0.6"/>
    <rect x="14" y="27" width="14" height="1.5" rx="1" fill="#e2e8f0"/>
    <circle cx="9" cy="38" r="2" fill="#4f46e5" opacity="0.7"/>
    <rect x="14" y="36" width="18" height="2" rx="1" fill="#475569" opacity="0.6"/>
    <rect x="14" y="40" width="14" height="1.5" rx="1" fill="#e2e8f0"/>
    <circle cx="9" cy="51" r="2" fill="#4f46e5" opacity="0.7"/>
    <rect x="14" y="49" width="18" height="2" rx="1" fill="#475569" opacity="0.6"/>
    <rect x="14" y="53" width="14" height="1.5" rx="1" fill="#e2e8f0"/>
    <rect x="43" y="8" width="12" height="1.5" rx="1" fill="#4f46e5" opacity="0.5"/>
    <rect x="43" y="12" width="10" height="3" rx="1.5" fill="white"/>
    <rect x="43" y="18" width="14" height="3" rx="1.5" fill="white"/>
    <rect x="43" y="24" width="9" height="3" rx="1.5" fill="white"/>
  </svg>
)

export const templateOptions = [
  { value: "template1", label: "Classic", desc: "Clean & traditional", Thumb: TemplateThumbnailClassic },
  { value: "template2", label: "Sidebar", desc: "Two-column layout", Thumb: TemplateThumbnailSidebar },
  { value: "template3", label: "Modern", desc: "Bold & contemporary", Thumb: TemplateThumbnailModern },
  { value: "template4", label: "Minimal", desc: "Centered & airy", Thumb: TemplateThumbnailMinimal },
  { value: "template5", label: "Executive", desc: "Banner & structured", Thumb: TemplateThumbnailExecutive },
  { value: "template6", label: "Timeline", desc: "Career timeline", Thumb: TemplateThumbnailTimeline },
]

export const templateNames = Object.fromEntries(templateOptions.map((t) => [t.value, t.label]))
