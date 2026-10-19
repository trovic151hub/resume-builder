export default function ProjectEntry({ project, compact = false, centered = false }) {
  const href = project.url
    ? /^https?:\/\//i.test(project.url) ? project.url : `https://${project.url}`
    : ""

  return (
    <article className={centered ? "text-center" : ""}>
      <p className={`${compact ? "text-[11px]" : "text-sm"} font-bold text-slate-800 break-words`}>
        {project.name}
        {project.type ? ` - ${project.type}` : ""}
      </p>
      {project.technologies && (
        <p className={`${compact ? "text-[9px]" : "text-xs"} text-slate-500 break-words`}>{project.technologies}</p>
      )}
      {project.url && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`${compact ? "text-[9px]" : "text-xs"} text-slate-500 underline break-all`}
        >
          {project.url}
        </a>
      )}
      {project.description && (
        <p className={`${compact ? "text-[10px]" : "text-xs"} text-slate-600 leading-relaxed mt-1 whitespace-pre-line break-words`}>
          {project.description}
        </p>
      )}
    </article>
  )
}
