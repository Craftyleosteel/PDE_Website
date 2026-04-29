# PDE Playground

An open-source, interactive introduction to **partial differential equations**.
The site pairs the classical analytical theory (separation of variables,
Fourier methods, characteristics) with **numerical solvers that run live in
the browser** — so readers can drag a slider and watch the heat equation
diffuse, the wave equation oscillate, or a finite-difference scheme go
unstable when the CFL condition is violated.

The goal is the same as the original `README` promised: a self-contained
introduction to PDEs with a strong emphasis on numerical methods, learned by
working through the text and the exercises.

> Live site (after first deploy): `https://craftyleosteel.github.io/PDE_Website/`

## Tech stack

| Concern              | Tool                                                          |
| -------------------- | ------------------------------------------------------------- |
| Framework            | [Next.js 16](https://nextjs.org) (App Router, static export)  |
| Language             | TypeScript                                                    |
| Styling              | [Tailwind CSS v4](https://tailwindcss.com)                    |
| Content authoring    | [MDX](https://mdxjs.com) (markdown + React components)        |
| Math rendering       | [KaTeX](https://katex.org) via `remark-math` + `rehype-katex` |
| Interactive plotting | [Plotly.js](https://plotly.com/javascript/)                   |
| Hosting              | GitHub Pages (auto-deploy via GitHub Actions)                 |

Everything is pre-rendered to static HTML/CSS/JS — there is no server, no
database, and no Python or MATLAB required. Numerical solvers are plain
TypeScript that runs in the visitor's browser.

---

## First-time setup (local development)

You need **Node.js 20 or newer**. Everything else is installed via npm.

### 1. Install Node.js

**Windows (recommended — uses the built-in package manager):**

```powershell
winget install -e --id OpenJS.NodeJS.LTS
```

After it finishes, **open a new terminal** so the `PATH` picks up `node` and
`npm`. Then verify:

```bash
node --version   # should print v20.x or higher
npm  --version
```

**macOS:** `brew install node`
**Linux:** use your distro's package manager, or [nvm](https://github.com/nvm-sh/nvm).

### 2. Clone and install

```bash
git clone https://github.com/Craftyleosteel/PDE_Website.git
cd PDE_Website
npm install
```

The first install pulls ~750 packages (Next.js, React, Tailwind, MDX, KaTeX,
Plotly and their peers). Expect ~1–2 minutes on a fast connection.

### 3. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>. Edits to `.tsx` or `.mdx` files hot-reload in
the browser.

### 4. Build a static site (what gets deployed)

```bash
npm run build
```

The static export lands in `out/`. Open `out/index.html` directly in a
browser, or serve it with any static file server.

---

## Project structure

```
.
├── .github/workflows/deploy.yml   # auto-deploy to GitHub Pages
├── public/                        # static assets copied verbatim
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # site shell (nav + footer)
│   │   ├── page.tsx               # landing page
│   │   ├── about/page.tsx
│   │   └── learn/
│   │       ├── page.tsx           # chapter index
│   │       └── heat-equation-1d/
│   │           └── page.mdx       # interactive chapter (MDX)
│   ├── components/
│   │   ├── Nav.tsx, Footer.tsx
│   │   ├── Math.tsx               # <Math> and <MathBlock> via KaTeX
│   │   ├── PlotlyChart.tsx        # SSR-safe Plotly wrapper
│   │   └── HeatEquationDemo.tsx   # interactive heat-equation widget
│   └── lib/
│       └── solvers/
│           └── heat1d.ts          # FTCS finite-difference solver
├── mdx-components.tsx             # global MDX component overrides
├── next.config.ts                 # MDX, KaTeX, GitHub Pages base path
└── package.json
```

---

## Authoring a new chapter

Each chapter is a single MDX file: prose written in markdown, with React
components (sliders, plots, demos) embedded right inline. Here's the recipe:

1. **Pick a slug** (URL fragment), e.g. `wave-equation-1d`.
2. **Create the page file:** `src/app/learn/wave-equation-1d/page.mdx`.
3. **Write LaTeX-flavoured math** with `$inline$` and `$$display$$`. KaTeX is
   already wired up via `remark-math` + `rehype-katex`.
4. **Embed an interactive demo.** Build the React widget in
   `src/components/`, the numerical method in `src/lib/solvers/`, and import
   the widget at the top of the MDX file:

   ```mdx
   import WaveEquationDemo from "@/components/WaveEquationDemo";

   # The 1D wave equation
   ...
   <WaveEquationDemo />
   ```

5. **List the chapter** in `src/app/learn/page.tsx` (the chapter index) and
   set `status: "ready"`.

The shipped `heat-equation-1d` chapter is the canonical template — copy from
it.

### Solver guidelines

- Put pure numerical code in `src/lib/solvers/` so it can be unit-tested and
  reused. Keep it free of React.
- Wrap the solver in a client component (`"use client"`) that owns the UI
  state (sliders, dropdowns) and calls the solver inside `useMemo`.
- Use `<PlotlyChart>` from `src/components/PlotlyChart.tsx` for any plot.
  It dynamically imports `react-plotly.js` so SSR doesn't choke on `window`.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. Runs `npm ci`
2. Runs `npm run build` with `GITHUB_PAGES=true` (sets the
   `/PDE_Website` base path so all asset URLs resolve correctly under the
   GitHub Pages subpath).
3. Uploads `out/` and deploys it to the `github-pages` environment.

### Enabling GitHub Pages (one-time)

On GitHub: **Settings → Pages → Build and deployment → Source:**
**GitHub Actions**. After the first successful workflow run the site will
be live at `https://craftyleosteel.github.io/PDE_Website/`.

---

## Useful commands

| Command          | What it does                                |
| ---------------- | ------------------------------------------- |
| `npm run dev`    | Dev server with hot reload at `:3000`       |
| `npm run build`  | Static export into `out/`                   |
| `npm run start`  | Serve the production build (rarely needed since we export) |
| `npm run lint`   | Run ESLint                                  |

---

## Contributing

Pull requests welcome — especially new chapters, new solvers, and fixes to
existing math. Open an issue first if you want to propose a major change.
