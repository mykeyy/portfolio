---
name: myky.cc
description: Mykey Nishikawa's portfolio, one numbered ledger of everything made and written, in white on one blue.
colors:
  ink: "#061ecf"
  paper: "#ffffff"
  faint: "rgb(255 255 255 / 0.3)"
typography:
  display:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "calc(100cqw / var(--fit))"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "clamp(4.5rem, 1.5rem + 11vw, 14rem)"
    fontWeight: 900
    lineHeight: 0.84
  title:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "clamp(1.375rem, 0.75rem + 2vw, 2.75rem)"
    fontWeight: 900
    lineHeight: 0.95
  section:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 0.95
  label:
    fontFamily: "'Geist Mono', ui-monospace, 'SFMono-Regular', Consolas, monospace"
    fontSize: "clamp(0.8125rem, 0.55rem + 0.75vw, 1.25rem)"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.04em"
  body:
    fontFamily: "Geist, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  summary:
    fontFamily: "Geist, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(0.9375rem, 0.88rem + 0.2vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  none: "0px"
spacing:
  pad: "clamp(16px, 4vw, 64px)"
  max: "1760px"
  block: "clamp(56px, 8vw, 128px)"
  col-gap: "clamp(12px, 1.6vw, 28px)"
  col-no: "3rem"
  col-year: "4.25rem"
  col-kind: "7.5rem"
  lead: "calc(3rem + 4.25rem + 7.5rem + 3 * clamp(12px, 1.6vw, 28px))"
  hang: "clamp(6px, 0.8vw, 12px)"
  row-y: "clamp(14px, 1.6vw, 22px)"
components:
  wipe-link:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.25em 0.5em"
  wipe-link-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  wipe-link-held:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  ledger-row:
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    padding: "clamp(14px, 1.6vw, 22px) clamp(6px, 0.8vw, 12px)"
  contact-row:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "0.7em clamp(6px, 0.8vw, 12px)"
  fact-row:
    textColor: "{colors.paper}"
    padding: "14px 0"
  code-block:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.1em 1.25em"
  chart-readout:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 10px"
---

# Design System: myky.cc

## Overview

**Creative North Star: "The Blue Ledger"**

The site is a record, not a showcase. One saturated blue field carries white ink and nothing else; the owner's name is set as wide as the column allows, and under it everything made and written runs as one numbered list, newest first, ruled off in 2px white lines. Hierarchy comes from scale and typeface, never from color, boxes, or depth.

Three typefaces split the work cleanly. Geist Mono 900, uppercase, speaks: the name, page names, entry titles, section heads. Geist Mono Bold measures: numbers, dates, columns, filters, navigation, every link label. Geist reads: it appears only where someone settles in for long text (summaries, case-study answers, article prose). Interaction is one motion, the wipe, and a held wipe is the only "selected" state on the site.

Density is calm and dry. Empty space is part of the design and is not filled to balance a page. Pages are long, single-column records whose columns line up on one shared edge, `--lead`, from the ledger down through the contact rows.

**Key Characteristics:**
- Two colors only: blue field, white ink. Translucent white exists only for recessive chart lines.
- Geist Mono 900 for what is named, Geist Mono 700 for what is counted or clicked, Geist for what is read.
- 2px white rules between rows; no cards, panels, or outlined boxes.
- One motion, the wipe, for hover, focus, press, and every selected state.
- One vertical edge (`--lead`) shared by ledger titles, contact values, fact values, and prose.
- Square everything: no radii on surfaces.

## Colors

A single-hue world: one deep electric blue and white, used as field and ink, with no tints, gradients, or accent hues.

### Primary
- **Ledger Blue** (ink): the page itself. Every surface is this blue; it also becomes the text color inside a wipe, a code block, and the chart readout, where the white is the surface. It is the `theme-color` and the link-preview field.

### Neutral
- **Paper White** (paper): all text, all rules, all icons, the wipe bar, the inverted fills (code, chart readout, skip link), the focus outline, the text selection, and the scrollbar thumb.
- **Faint White** (faint, white at 30%): recessive lines only: chart gridlines, the empty part of a track, inner rows of a chart's data table. Never for text.

### Named Rules
**The Two Inks Rule.** Blue and white are the whole palette. White on blue is the default; blue on white appears only where a white fill is the subject (wipe, code, readout). No third color, no gradient, no tinted text.

**The No-Fade Text Rule.** Text is full white. Faint white is a line weight for charts, not a text tone; secondary information is made smaller or moved to mono, not dimmed. Disabled controls (opacity 0.45) are the one exception.

## Typography

**Display Font:** Geist Mono 900 (with Impact, Arial Narrow)
**Body Font:** Geist 400/700 + 400 italic (with system-ui)
**Label/Mono Font:** Geist Mono 700 (with ui-monospace, SFMono-Regular, Consolas)

**Character:** A condensed poster face shouting in capitals against a bold monospace that keeps the books. All three faces are self-hosted Latin woff2; Geist Mono 900 and Geist Mono are preloaded.

### Hierarchy
- **Display** (Geist Mono 900 400, uppercase, fit to the column, line-height 0.84): the owner's name on home only. Its ink spans the column edge to edge: font-size is `100cqw / --fit`, where `--fit` is the widest line's ink width in em (6.764 for MYKEY NISHIKAWA on one line; 4.007 for NISHIKAWA when the container is 520px or narrower and the name breaks after the first name, line-height 0.92). A `-0.03125em` left margin pulls Geist Mono 900's side bearing back to the column edge. Remeasure `--fit` with canvas `measureText` if the name changes.
- **Headline** (Geist Mono 900 400, uppercase, clamp(4.5rem → 14rem), 0.84): index page names (Projects, Writing, About). Case-study titles run clamp(3.25rem → 11rem) at 0.86, max 14ch; article titles clamp(3rem → 9.5rem) at 0.88, max 16ch; Contact and "More ..." heads clamp(2.5–3rem → 6–7.5rem); 404 up to 30rem.
- **Title** (Geist Mono 900 400, uppercase, clamp(1.75rem → 3.75rem), 0.95, balanced): ledger entry titles.
- **Section** (Geist Mono 900 400, uppercase, clamp(2rem → 3.5rem), 0.95): h2 inside prose. Prose h3 is mono 700 caps at 0.85em, 0.04em tracking.
- **Body** (Geist 400, clamp(1.0625rem → 1.25rem), 1.6, 68ch measure): article and case-study prose. Lead summaries under page titles are Geist at clamp(1.25rem → 2rem), 1.3–1.35, 34–40ch.
- **Summary** (Geist 400, clamp(0.9375rem → 1.0625rem), 1.45, 60ch): the one line under each ledger title.
- **Label** (Geist Mono 700, `--label` 13px → 20px, 1.4; caps at 0.04em tracking): the site's base text. Nav, filters, column heads, numbers, years, kinds, dates, link labels, contact values, chart text (a smaller clamp(0.75rem → 0.875rem)). Numbers are tabular.

### Named Rules
**The Three Jobs Rule.** Geist Mono 900 names, mono counts and links, Geist reads. Geist never labels or links outside running text; mono never carries paragraphs.

**The Full-Width Name Rule.** The name is sized from its container, not a breakpoint, and its ink, not its em box, meets both column edges.

## Layout

One centered column: `--max` 1760px with `--pad` side padding (16px → 64px). Big blocks of a page are separated by `--block` (56px → 128px).

**The ledger grid.** Columns are number (`--col-no` 3rem), year (`--col-year` 4.25rem), kind (`--col-kind` 7.5rem), then the title column (minmax(0, 1fr)) and an auto action column, separated by `--col-gap` (12px → 28px). `--lead` is the sum of the first three columns and three gaps: the x-position where titles start.

**The One Edge Rule.** Everything that is a "value" starts on `--lead`: ledger titles and summaries, contact values (label column `--lead − --col-gap`), case-study and About fact values, case-study prose (margin-left `--lead` from 760px), About prose, and article prose (a two-column grid whose first column holds the sticky contents list). One edge runs down every page.

**Hanging rows.** Full-width link rows (ledger, contacts, contents) extend `--hang` (6px → 12px) past the column on both sides so the wipe bar has air around the text while the text stays on the column. Inline wipe links sitting on a column pull back `-0.5em` to cancel their label padding.

**Breakpoints.** At 759px and below the ledger header hides and each row becomes: number, kind, year, action on one line; title full width; summary full width (rows gain a top rule). Fact rows switch their label column to 6.5em; contact rows drop the service word and keep the icon; prose tables scroll sideways with nowrap cells. At 479px and below the nav takes its own row spread edge to edge. The name breaks to two lines by container query (520px), not media query.

**Home first viewport.** The intro block has a min-height of `100svh − 27rem − 3vw` (`− 27rem` below 760px) and sits its content at the bottom, so filters, the column head, and the first row are above the fold. Use `svh`, never `dvh`.

## Elevation & Depth

Flat. There are no shadows, blurs, or layered surfaces. Depth is replaced by inversion: a white fill with blue text is the only way something comes forward (the wipe bar, code, the chart readout, the skip link). The single box-shadow in the build is a 2px blue ring around chart dots so they read where lines cross; it is a stroke, not elevation.

**The Flat Field Rule.** Nothing floats above the blue. If an element needs emphasis, invert it or make it larger.

## Shapes

Square corners everywhere (0px radius); chart bars are square-ended too. Lines are the structure: 2px white rules (`--rule`) separate rows and sections and close every list top and bottom. Roundness exists only in drawn marks: icon stroke caps and joins, chart line caps, and the 10px chart dots.

**The Rules Not Boxes Rule.** Content is never enclosed in a bordered or filled card. The one frame on the site is the 2px rule around a case-study cover screenshot, because a picture of a blue page on a blue page would otherwise read as part of this one.

## Components

### Wipe Link / Button
The site's only interactive treatment, used by every link and button through one component.
- **Shape:** square, label padding 0.25em 0.5em, icon gap 0.5em.
- **Rest:** white mono label on blue, no underline.
- **Hover / Focus-visible / Active:** a white bar scales in from the right (`--wipe`: 0.4s cubic-bezier(0.22, 1, 0.36, 1)) while a blue copy of the label, clipped with the same duration and easing, is revealed exactly under it. The label is rendered twice: the white copy you read and an aria-hidden blue copy. Never change the text color on its own; it flashes before the bar arrives.
- **Held:** `aria-current="page"` (nav, brand), `aria-pressed="true"` (filters), and `aria-current="location"` (article contents) keep the wipe fully drawn. That is the selected state; there is no other.
- **Disabled:** opacity 0.45, the wipe never draws.
- **Reduced motion:** no transition; states snap.

### Inline Prose Link
The same wipe, drawn with backgrounds because a link can break across lines and cannot carry a second copy. A registered `--p` percentage sizes, from the right, a border-box white bar and a text-clipped blue fill over a white text fill; `box-decoration-break: clone` repeats it per line fragment; `--p` animates on `--wipe`. At rest a 2px white bottom layer underlines the link. Without `background-clip: text`, a plain 2px underline (offset 0.22em) remains.

### Navigation
Header row: `myky.cc` brand left, Projects / Writing / About / Contact right, all wipe links in caps mono. The current section is held. Below 480px the menu takes its own full-width row.

### Ledger
The signature component: a numbered record of projects, research, and notes, numbered oldest = 01 and listed newest first.
- **Filters:** a row of wipe buttons (All, Projects, Research, Notes, each with a zero-padded count) above the list; the pressed filter is held, empty kinds are disabled, and the choice persists in `?kind=`.
- **Column head:** caps mono No. / Year / Kind / Title over a 2px rule.
- **Row:** one hanging wipe link per entry. Mono number, year, kind; Geist Mono 900 title with its Geist summary beneath on the title column; mono "View" or "Read" plus a right arrow at the end. Rows are separated by 2px rules.
- **Compact (≤759px):** described in Layout.

### Contact Rows
Close every page under an Geist Mono 900 "Contact" head. Hanging wipe rows between 2px rules: icon (stroke 2) and caps service name, the value on `--lead`, an up-right arrow at the end. Footer base line: © year and name left, eye icon and unique-visitor count right.

### Fact Rows
Case-study and About facts as a definition list in 2px-ruled rows: caps mono label in the ledger's first columns, value on `--lead`. Case studies always open with Problem, Role, Outcome (answers in Geist, 48ch) before Year, Stack, and Links.

### Charts
Build-time SVG figures for research. With two colors available, up to three series are told apart by line style (solid, dashed `8 6`, dotted `0.5 6`), named in a legend and at line ends. Marks are 2px white strokes; gridlines are faint, the baseline full white. Bars are white, 20px tall, square-ended, with the value at the tip. Hover or arrow keys show a 1px crosshair, ringed dots, and a white readout with blue text. Every chart keeps its numbers in a "Show the data" table and carries a source line.

### Prose Furniture
Code and pre blocks invert to white fills with blue mono text. Tables are mono, caps headers, 2px rules under every row. Footnote back-links draw an arrow-up icon via mask instead of the ↩ glyph.

### Icons
HugeIcons only, inline SVG paths, round caps and joins. Stroke 1.5 at 1.15em for small inline icons; stroke 2 for the large contact-row icons.

## Do's and Don'ts

### Do:
- **Do** route every link and button through the wipe, and express every selected state as a held wipe.
- **Do** start every value column and every block of prose on `--lead`.
- **Do** separate rows with 2px white rules (`--rule`) and close lists top and bottom.
- **Do** set names and titles in uppercase Geist Mono 900, data and links in Geist Mono 700 with tabular numbers, and long reading text in Geist.
- **Do** size the name from its container with a measured `--fit` and the -0.03125em bearing pull-back.
- **Do** distinguish chart series by line style and give every chart a data table.
- **Do** use 1.5 stroke for small icons and 2 for the big contact icons.

### Don't:
- **Don't** add a color, tint, gradient, glow, blur, or shadow; the palette is blue and white.
- **Don't** wrap content in cards, panels, or outlined boxes; the framed cover screenshot is the only frame.
- **Don't** round corners on any surface or bar.
- **Don't** change a link's text color without the bar; the blue label must appear only where the bar has passed.
- **Don't** set labels, nav, or data in Geist, or paragraphs in mono.
- **Don't** use `dvh` for layout.
