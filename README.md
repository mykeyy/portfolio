<div align="center">

# MYKY.CC

### THE PORTFOLIO, IN BETA.

Projects, research, and notes, in one blue and one white.

</div>

<br>

## What this is

The real site behind [myky.cc](https://myky.cc), being built on the `portfolio` branch. The `main` branch keeps the coming-soon page live until launch on **December 8, 2026**.

This is a beta: it runs on your machine and is not deployed yet. Entries marked `draft: true` are labeled samples that show only while you run `bun run dev`.

<br>

## On the site

| Page | What it does |
|---|---|
| **Cover** `/` | My name across one screen and the four-bar menu. Click it and an e-ink style refresh spreads from the icon (each square flashes white, then settles blue) while the bars fly out into four panels: Projects, Writing, Design, About. On phones they are four wide bands. Closing plays it backwards: the panels fly home into the icon while the refresh clears in toward it. |
| **Projects** `/projects` | White page, RGB title. Each case study opens with the problem, my role, and the outcome, before the story. |
| **Writing** `/writing` | Soft black and white. Research and notes, filterable (`/writing?kind=research`). Research gets a contents list that stays beside the text, charts, tables, and footnotes. |
| **Design** `/design` | Design pieces, shown big, from `src/content/designs`. |
| **About** `/about` | Facts, a few paragraphs, and contact: email, X, GitHub, Discord. |

<br>

## Built with

| | |
|---|---|
| **[Astro 7](https://astro.build)** | Every page is prerendered to plain HTML. The only JavaScript is the ledger filter, the chart readout, the contents marker, and the visitor counter. |
| **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** | Static pages are free asset requests. One Worker route, `/api/visit`, runs the visitor counter. |
| **[Cloudflare D1](https://developers.cloudflare.com/d1/)** | The visitor count, carried over from the coming-soon page. |
| **[Bun](https://bun.sh)** | Installs packages and runs Astro. |

<br>

## Run it

```bash
bun install
```

```bash
bun run dev
```

Opens at `http://localhost:4321`. Drafts show here, and the visitor count shows a dash (see the note below).

| Command | What it does |
|---|---|
| `bun run dev` | The site with live reload, drafts included. |
| `bun run build` | The production build in `dist/`, drafts left out. |
| `bun run preview` | Builds, then serves it in Cloudflare's local runtime with a local D1, so the visitor counter works. Run `bun run db:init` once first. |
| `bun run check` | Type-checks the pages and content. |

**Why Bun and Node both show up.** Astro 7 needs Node 22.23 or newer, and this machine has Node 22.16, so the scripts run Astro on Bun (`bun --bun astro ...`). Wrangler, Cloudflare's tool, refuses to run on Bun, so it runs on Node. Cloudflare's local runtime also can't start from Bun on Windows, so `bun run dev` runs plain Astro without it: every page works, only the visitor counter is missing. Updating Node to the current LTS removes all of this.

<br>

## Add a project

One Markdown file per project in [`src/content/projects`](src/content/projects). The file name becomes the URL.

```md
---
title: myky.cc coming soon
summary: One line on what it is.
date: 2026-10-28
role: Design and development
problem: The problem, in a sentence or two. People read this first.
outcome: What changed because of the work.
stack: [HTML, CSS, Cloudflare]
url: https://myky.cc            # optional
repo: https://github.com/...    # optional
cover: ./cover.png              # optional, next to the file
coverAlt: What the image shows  # with cover
draft: false                    # true shows it only in dev
---

The case study, in Markdown.
```

<br>

## Add a design piece

One Markdown file per piece in [](src/content/designs), with its images next to it. The site stays blue and white; each piece sits on its own **plate** in a color you pick from the work, and the whole page takes on that color while the piece is in view.

\
Text and frames on a plate turn black or white on their own, whichever reads better on the color you picked.

<br>

## Write something

One file per piece in [`src/content/writing`](src/content/writing). Use `kind: research` for long pieces and `kind: note` for short ones. Use `.mdx` when the piece has charts.

```md
---
title: The title
summary: The question you looked into, or the answer you found.
kind: research
date: 2026-11-01
updated: 2026-11-03   # optional
draft: false
---
```

Charts need no import inside `.mdx`:

```mdx
<Chart
  kind="line"
  title="What the chart shows"
  source="Where the numbers come from"
  xLabel="Year"
  unit="%"
  series={[
    { name: "Alpha", data: [[2024, 12], [2025, 18], [2026, 21]] },
    { name: "Beta", data: [[2024, 30], [2025, 28], [2026, 31]] },
  ]}
/>

<Chart kind="bar" title="..." unit=" KB" bars={[{ label: "HTML", value: 40.8 }]} />
```

| Prop | What it does |
|---|---|
| `kind` | `line` (up to three series, told apart by solid, dashed, and dotted lines) or `bar` (amounts, value at each tip) |
| `title` | What the chart shows. Required. |
| `source` | Where the numbers come from. |
| `sample` | Labels the numbers as made up. Remove it once they're real. |
| `unit` | Added to every value: `%`, ` KB`, ` ms`. |
| `xLabel` | Names the first column of the data table. |
| `min`, `max` | Fix the y axis range on a line chart. |

Every chart is drawn when the site builds, reads values on hover, tap, or arrow keys, and keeps its numbers in a table under **Show the data**. [`sample-research.mdx`](src/content/writing/sample-research.mdx) shows every part a piece can use.

<br>

## Make it yours

| Setting | Where |
|---|---|
| Name, email, links | [`src/site.ts`](src/site.ts) |
| About text | [`src/pages/about.astro`](src/pages/about.astro) |
| Colors, fonts, spacing, the hover wipe | `:root` in [`src/styles/global.css`](src/styles/global.css) |
| Link-preview card (`public/og.png`, 1200 × 630) | [`assets/og-portfolio.html`](assets/og-portfolio.html): open it and screenshot it at exactly 1200 × 630 |

<br>

## Before it goes live

- In [`wrangler.jsonc`](wrangler.jsonc), add the `database_id` of the D1 database the coming-soon page uses, so the visitor count carries over. Without it, the first deploy creates a new, empty one.
- Replace the sample entries with real projects and writing, and write the About text.
- Connect the repo to Cloudflare Workers Builds (build command `bun run build`), or deploy from here with `bun run deploy`.
- Point myky.cc at the Worker on launch day, and merge this branch into `main`.

<br>

## What's in the folder

```
src/pages/        the routes: home, projects, writing, about, 404, api/visit
src/components/   Ledger, Chart, Header, Footer, Wipe (the hover), Icon (HugeIcons)
src/content/      projects and writing, one Markdown file each
src/styles/       global.css: fonts, colors, the wipe, article typography
public/           fonts and og.png, served as-is
schema.sql        the visitor-counter table
wrangler.jsonc    the Cloudflare Worker and its D1 binding
PRODUCT.md        what the site is for, its tone, and what it avoids
.claude/          design notes for working on the site with Claude Code
.impeccable/      design-check settings and the page briefs
```
