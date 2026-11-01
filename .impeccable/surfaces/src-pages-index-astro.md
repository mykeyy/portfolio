---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/projects","src/pages/writing"]
---

# Home (myky.cc portfolio, beta)

Scope: the home page of the portfolio. Mode: Experience. Project and writing pages extend it (project pages Experience, articles Read).

Audience: friends, people hiring or collaborating, readers of the research. Job: see who Mykey is and what Mykey makes and writes, then open one thing. Content: projects (few, deep case studies), writing in two kinds (research with charts, short notes), about, contact, unique-visitor count. Constraints: beta, local only; facts only from the user; no fabricated projects, clients, or numbers (samples are drafts, labeled).

Chosen structure: One ledger (user pick on the surface round). Memorable moment: the whole body of work read as one numbered record under the name.

## Direction contract

THESIS: Home is one numbered ledger of everything made and written, newest first, under a name set as large as the width allows. It refuses the portfolio default: hero, three equal project cards, a "latest posts" strip.

OWN-WORLD: #061ecf field, white ink only. Anton uppercase for the name and every entry title; Roboto Mono 700 for numbers, columns, filters, nav, dates. 2px white rules between rows, no boxes or cards. The white wipe bar (0.4s cubic-bezier(0.22,1,0.36,1), from the right, label ink clipped in step) is the only hover and the active-filter state. HugeIcons, one stroke.

STORY: The visitor reads the name and the one-line description, sees the record start at the fold, narrows it by kind, opens an entry, and finds contact at the end of the page.

FIRST VIEWPORT: Header row: myky.cc left, Projects / Writing / About / Contact right. The name spans the full content width in one line on desktop (two lines on phones, still full width). One mono line under it: description left, Philippines right. The ledger's filter row and its header sit at the fold.

FORM: One ledger, position 3 of 7 on the ordered list. seed:f3887f9951f43544

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
