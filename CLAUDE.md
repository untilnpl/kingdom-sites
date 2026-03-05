# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

There is no test framework configured.

## Architecture

Single-page React 19 app built with Vite. Three routes rendered inside a shared `AppShell` (sticky header + footer) defined in `src/App.jsx`:

- `/` → `src/pages/Home.jsx` — hero, value-prop cards, contact form
- `/about` → `src/pages/About.jsx`
- `/mission` → `src/pages/Mission.jsx`

Routing uses `react-router-dom` v7 (`BrowserRouter` + `Routes`/`Route`). The `Header` and `Footer` components live in `src/App.jsx` alongside the router setup.

**Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Imported in `src/index.css` with `@import "tailwindcss"`. Base font is Inter (loaded from Google Fonts in `index.html`). Apple-inspired color palette: `#1d1d1f` for text, `#0071e3` for interactive blue, `#f5f5f7` for light backgrounds.

**Contact form:** `Home.jsx` submits to `formsubmit.co` via a hidden iframe (`target="contact_iframe"`) to avoid page navigation. The `?contact=1` query param + `#contact` hash combo is used throughout to open and scroll to the contact section from other pages.

**Static assets:** Images are served from `public/images/`. Each page component includes an inline SVG fallback rendered as a data URI for when images fail to load.

**ESLint:** `no-unused-vars` is configured to ignore uppercase/underscore-prefixed names (`varsIgnorePattern: '^[A-Z_]'`).
