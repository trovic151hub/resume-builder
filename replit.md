# Resume Builder

A React + Vite single-page application for building resumes.

## Project Structure

- `resume-builder/` — Main app directory
  - `src/` — React source files (components, pages, context)
  - `public/` — Static assets
  - `vite.config.js` — Vite config (host: 0.0.0.0, port: 5000, allowedHosts: true)
  - `package.json` — Dependencies

## Tech Stack

- React 19 + React Router DOM 7
- Vite 8 (build tool / dev server)
- Tailwind CSS 4 (via @tailwindcss/vite plugin)
- Framer Motion (animations)

## Development

The app runs via the "Start application" workflow:
```
cd resume-builder && npm run dev
```
Served at port 5000.

## Deployment

Configured as a static site:
- Build: `cd resume-builder && npm run build`
- Public dir: `resume-builder/dist`
