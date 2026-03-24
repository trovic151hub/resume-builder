import React from "react"

export default function Template3({ data }) {
  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
    <div className="p-6 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow">
      <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{data.name}</h1>
      <p className="italic text-gray-500 dark:text-gray-300">{data.title}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Profile</h3>
        <p>{data.summary}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Skills</h3>
          <ul className="list-disc ml-5">
            {data.skills.map((s,i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Experience</h3>
          <p>{data.experience}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Education</h3>
        <p>{data.education}</p>
      </div>
    </div>
</motion.div>
  )
}