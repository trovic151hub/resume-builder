import React from "react"

export default function Template2({ data }) {
  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
    <div className="flex bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-200 dark:bg-gray-900 p-6">
        <h2 className="font-bold text-xl mb-2">{data.name}</h2>
        <p className="mb-2">{data.title}</p>

        <h3 className="font-semibold mt-4">Skills</h3>
        <ul className="list-disc ml-5">
          {data.skills.map((s,i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      {/* Main content */}
      <div className="w-2/3 p-6">
        <p>{data.email} | {data.phone}</p>

        <h3 className="mt-4 font-semibold">Profile</h3>
        <p>{data.summary}</p>

        <h3 className="mt-4 font-semibold">Experience</h3>
        <p>{data.experience}</p>

        <h3 className="mt-4 font-semibold">Education</h3>
        <p>{data.education}</p>
      </div>
    </div>
</motion.div>
  )
}