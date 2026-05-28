# Agent Match

A living directory of specialised AI agents — video creators, music composers, coding partners, research assistants, and everything in between. Find the right AI tool for your workflow.

**[🔗 Live Site — agent-match-find.vercel.app](https://agent-match-find.vercel.app/)**

---

## Features

- **70+ AI agents** cataloged across 11 categories — LLMs, image gen, video, music, coding, research, and more
- **Smart filtering** — filter by category, pricing (Free / Freemium / Paid), or search by keyword
- **Agent spotlight** — curated picks that cycle every few seconds
- **Interactive 3D scene** — robot head follows your cursor (powered by Spline)
- **Dark / light theme** toggle
- **Terminal-style match engine** demo with animated typewriter effect
- Fully responsive — desktop & mobile

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) + React 19 |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **3D** | Spline (`@splinetool/react-spline`) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React + Font Awesome |
| **Hosting** | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Routes (App Router)
├── components/
│   ├── layout/       # Header, Footer
│   ├── sections/     # Hero, Terminal, Spotlight, Features, Agent Table
│   └── ui/           # Button, Card, SplineScene, Spotlight
├── data/             # Agent dataset (70+ entries)
└── lib/              # Utilities
```

## License

MIT — built by [Amanuel Tesfaye](https://github.com/Amanuel-Tesfaye-R).
