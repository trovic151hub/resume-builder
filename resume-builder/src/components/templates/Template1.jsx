import React from "react"

export default function Template1({ data }) {
  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>

    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <h1 className="text-2xl font-bold">{data.name || "Your Name"}</h1>
      <p className="text-gray-500">{data.title || "Job Title"}</p>
      <p className="mt-2">{data.email} | {data.phone}</p>

      <h3 className="mt-4 font-semibold">Profile</h3>
      <p>{data.summary}</p>

      <h3 className="mt-4 font-semibold">Skills</h3>
      <ul className="list-disc ml-5">
        {data.skills.map((s,i) => <li key={i}>{s}</li>)}
      </ul>

      <h3 className="mt-4 font-semibold">Experience</h3>
      <p>{data.experience}</p>

      <h3 className="mt-4 font-semibold">Education</h3>
      <p>{data.education}</p>
    </div>
</motion.div>
  )
}