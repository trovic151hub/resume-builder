import { createServer } from "vite"
import { renderToStaticMarkup } from "react-dom/server"
import React from "react"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const distIndexPath = path.join(root, "dist", "index.html")

async function prerenderHome() {
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    resolve: {
      alias: {
        "react-router-dom": path.join(root, "scripts", "stub-router.mjs"),
      },
    },
  })

  try {
    const { default: Home } = await vite.ssrLoadModule("/src/pages/Home.jsx")

    const appHtml = renderToStaticMarkup(React.createElement(Home))

    const template = fs.readFileSync(distIndexPath, "utf-8")
    const result = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    fs.writeFileSync(distIndexPath, result)
    console.log("Prerendered Home page into dist/index.html")
  } finally {
    await vite.close()
  }
}

prerenderHome().catch((err) => {
  console.warn("Prerender skipped due to error (build output is unaffected):", err.message)
})
