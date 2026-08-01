# Sithishwar B M — Portfolio

A premium, dark-themed software engineer portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- React Icons

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Import the repo on [vercel.com](https://vercel.com).
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`. No extra configuration needed.

## Structure

```
portfolio/
├── public/
│   └── resume.pdf        # downloadable résumé
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx             # assembles all sections
│   ├── components.jsx     # every reusable component
│   ├── data.js              # all site content (resume-derived)
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Editing content

All text — name, projects, skills, achievements, links — lives in `src/data.js`. Update that file and every section on the page updates automatically.

To replace the downloadable résumé, drop a new PDF into `public/` named `resume.pdf`.
