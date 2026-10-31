---
name: mykey-design-taste
description: How Mykey designs, what he rejects, and every layout, motion, and engineering lesson from building myky.cc. Use whenever designing, editing, testing, or reviewing index.html, its copy, its link preview, or the README, and when starting any new page for him.
---

# Mykey design taste

Read this before touching `index.html`. It records what he wants, what he sent back, and the technical lessons that cost time. `PRODUCT.md` has the brief (purpose, tone, palette, anti-references); this file has everything learned while building.

## Who he is and how he works
- Mykey Nishikawa: independent developer and designer in the Philippines (Philippine time, UTC+8). An experienced UI/UX designer who judges by eye. He sends screenshots, often circled in red, and voice-dictated messages that come out garbled. Read for intent, not wording. When a sentence is unclear, pick the likeliest reading, do it, and say which reading you took.
- He measures by eye. Widths, heights, and gaps that don't match are "off" to him even at a few pixels. Match things exactly, then prove it with measurements.
- He tests on many screens and names the ratios loosely (16:9, 14:9, "3:4", "9:16"). Treat any complaint about one ratio as a request to be correct on all of them.
- He says "bigger" and "better" a lot, usually about phones. Check phone width first, then desktop.
- He dislikes overengineering ("this is just a coming-soon page"). Remove before adding. When he floats ideas, offer a short ranked list and wait for a pick; do not build all of them.
- Decide sizes, spacing, and timing yourself and show the result. Ask only when a choice changes the copy or what visitors can do, and ask one question.
- Report faithfully: what was measured, what only the preview showed, what could not be tested (real phone, real Discord).
- Use the Impeccable skill (installed at `C:\Users\kalas\.claude\skills\impeccable`, v4.8.0) for design work. Run its `context --target index.html` once per session. It only runs on his words, so offer updates and `init` but don't run them unasked.

## Look
- Brutal, minimal, confident, a little dry. One blue `#061ecf` and white `#ffffff`. Nothing else: no gradients, glows, blur, pills, pulsing dots, eyebrow labels, or gradient text.
- Type: Anton, uppercase, for the headline. Roboto Mono Bold for numbers, labels, links, and the status card. Mono is for data and measurement here, not decoration.
- Icons: HugeIcons only, inline SVG, one stroke style (1.5 for small icons, 2 for the big link icons). X, GitHub, Discord, mail, calendar, and music-note icons all come from `@hugeicons/core-free-icons`.
- Copy: short and dry. The headline is "The birds are still sleeping." with "Coming soon. My portfolio is on its way." under it on desktop. The countdown label is "Portfolio opens in" so nobody thinks the site is finished. Offer copy alternatives; never swap the headline silently.
- Empty space is part of the design. Don't fill it to balance the page.
- Things he asked to remove, so don't bring them back: the Manila local-time clock, extra explanatory text, a chromatic-aberration intro, anything "too much".

## The page
- One file, `index.html`: vanilla HTML, CSS, and JS, no build step, no framework.
- Opens: Dec 8, 2026 00:00 Philippine time (`2026-12-08T00:00:00+08:00`).
- Order of appearance: intro (`myky.cc` types itself with a blinking `_`, then the blue cover lifts), then the headline words rise out of masks, then the "Coming soon" line settles in.
- Desktop (1024px and up), a 3-column grid:
  - Top: headline top-left; the spinning ASCII donut beside it, filling the free space.
  - Bottom-left, stacked and the same width (`--col`): Discord status card, countdown, "Add to Google Calendar" button.
  - Bottom-right: X, GitHub, Discord, Contact me, right-aligned, spaced to span exactly the height of the stack on the left (top of the first link = top of the card, bottom of the last = bottom of the button).
- Compact (under 1024px, phones and tablets): one column that fits one screen with no scrolling, capped at 560px wide. Order: headline, then Discord card, countdown, calendar button, then a 2x2 grid of outlined link buttons. The donut and "Coming soon" line are hidden. The headline is sized to span exactly the card width.
- Hard rules: no scrolling on any screen; nothing overflows sideways; the card, countdown, and button share a width; whatever sits beside the stack matches its height.

## Components
- Countdown: white block, blue Roboto Mono Bold digits, labels Days / Hrs / Min / Sec scaled with the digits. Digits roll in columns. The roll is 0.35s; a slow roll (0.9s) read as stutter because the seconds digit was always mid-motion. Snap across the 9-to-0 wrap instead of animating the whole column. Re-sync the tick to each second boundary.
- Discord status card: white with blue text, grayscale avatar. Data from Lanyard (`https://api.lanyard.rest/v1/users/{id}`), refreshed every 30s, card stays hidden if the call fails. Status text is mapped (`dnd` is "Do not disturb"). Third line priority: Spotify song and artist (with a fixed note icon), then "Playing {game}", then the custom status. A title wider than the card scrolls like an MP3 player; the icon stays put. This marquee is his request and the Impeccable `marquee` finding is ignored on purpose.
- Calendar button: opens a Google Calendar template link for the launch (Dec 7, 16:00 UTC = Dec 8, 00:00 PHT). Hidden once the countdown hits zero.
- Links: X is its logo only; GitHub, Discord, and Contact me show a logo plus the word. Contact me opens `mailto:hello@mykeyy.tech?subject=Hello%20from%20myky.cc`. Links: x.com/mykeycc, github.com/mykeyy, discord.com/users/730104482033303602.
- Donut: classic donut.c in a 80x22 character grid, redrawn about 20 times a second, paused when the tab is hidden or below 1024px. Opacity 0.55 on the page.
- Link preview: `og.png` (1200x675) plus Open Graph and X tags in `<head>`; `theme-color` `#061ecf` gives Discord's blue embed edge. The image is the name beside a face-on ASCII donut, rendered from `assets/og.html`.
- Visitor count: an eye icon and the number, right-aligned in the countdown card's header row (same row as "Portfolio opens in"), blue on white. Data comes from `/api/visit` (Cloudflare Pages Function + D1, `DB` binding); each browser counts once via localStorage. He rejected a fixed top-right badge and an always-visible explanation line as "out of place" and "ugly": everything must sit inside the grid, and a new element should add no height. The explanation lives only in the `title` attribute.
- Fonts are self-hosted in `fonts/` (Latin woff2, preloaded); there is no Google Fonts link.
- README: centered, screenshots in `assets/`, honest "about" (only facts he has given).

## Motion
- One authored moment (the intro and headline reveal); everything else is quick feedback.
- Link hover is one motion: a white bar sweeps in from the right while the label turns blue exactly under it. Build it by drawing the label twice (white copy underneath, blue copy on top) and clipping the blue copy with the same duration and easing as the bar. `--wipe: 0.4s cubic-bezier(0.22, 1, 0.36, 1)` drives both; measured difference between bar and text was 0 at every frame. Never change the text color on its own: it flashed blue before the bar had started and he called it "blinking".
- Touch has no hover, so `:active` triggers the same wipe. Keyboard focus (`:focus-visible`) does too.
- Reduced motion: no typing, no wipe, no rolling digits, a still donut, words fade instead of rising.
- Failsafes: the intro cover hides itself after 6s even if the script dies, and headline words are only wrapped by script so plain text shows if it fails.

## Engineering lessons
- Use `svh`, never `dvh`, for anything layout-related. `dvh` changes while mobile browser bars slide away and causes the jitter he hates. `body` and `main` use `100svh` with a `100vh` fallback.
- Size from the space available, not from device widths. Container units (`container-type: size` with `cqw` / `cqh`) sized the links from the left column's height, the donut from its free space, and the phone headline from its row.
- Phone headline: markup carries the breaks as `<br class="c">` (compact, after "birds" and "still") and `<br class="d">` (desktop, after "are"), shown or hidden by CSS. The `.top` row is `minmax(0, 1fr)` and a size container. Font size is `max(2rem, min(100cqw / --fit, 100cqh / 2.9))`, where `--fit` is the widest line's width in em, measured once by script after the font loads. It reads only width and container size, so nothing resizes when browser bars move.
- Grid and flex traps: a `1fr` or `auto` column holding long `nowrap` text (the scrolling song title) balloons and squashes the rest, so use `minmax(0, ...)` and `min-width: 0`. `flex: 1` children need `min-width: 0` before ellipsis works.
- JS traps: `parseFloat(x) || fallback` turns a real 0 into the fallback (this hid the face-on donut frame); test with `has()` instead. `Range.getBoundingClientRect()` returns the font's content box, taller than the line box, so use the element's box when checking overlap.
- Masked word reveal: `inline-block` + `overflow: hidden` clips descenders, so add a little bottom padding and an equal negative margin.
- `sessionStorage` is blocked in `data:` previews and some private windows, so wrap it in try/catch; the page must work without it. `?intro` replays the intro; `?debug` shows a panel to skip time, replay the intro, and try fonts.
- Fonts: Anton and Roboto Mono (700) from Google Fonts. Icons: `npm pack @hugeicons/core-free-icons`, then copy the path data from `dist/esm/<Name>Icon.js`.
- Screenshots for the README: headless Chrome, `--headless=new --disable-gpu --disable-lcd-text --hide-scrollbars --window-size=WxH --virtual-time-budget=9000 --screenshot=...`. `--disable-lcd-text` stops the pink and cyan color fringing on white text. Headless windows can't go under about 500px wide, so take phone shots from the preview browser at the real size and upscale with ImageMagick.
- Preview browser: navigating can open a new tab id; resizing is cleared when the pane changes width; storage and `?debug` can behave differently than a real browser.
- Impeccable: `npx impeccable install --user --providers=claude --force --yes` installs or updates. `impeccable detect index.html` scans a file. A `cramped-padding` finding on the countdown is a false positive and is ignored in `.impeccable/config.json`.

## How to test (every time)
Run all of these and check no scroll (either axis), no overlap, and no horizontal overflow:
- Desktop: 2560x1440, 1920x1080, 1480x1228 (tall), 1440x1080, 1366x768, 1280x720, 1024x768.
- Compact: 1000x750, 768x1024, 412x780, 390x844, 375x812, 375x667, 360x560, 320x568.
- Checks: headline bottom to countdown top is about 16px or more; on desktop the first link's top equals the stack's top and the last link's bottom equals the stack's bottom; on phones the headline width equals the card width unless the height cap applies; countdown units fit their row; the hover wipe stays in sync.
- Say what was only checked in the preview and not on a real phone, real browser bars, or real Discord.

## Status when this was written
- Everything above is built and committed locally in the project folder. Nothing is pushed: creating a GitHub repo was blocked by a permission check and he told me to abandon it. Do not push without being asked.
- Before launch: `og.png` must be served from the site root at `https://myky.cc/og.png`; decide whether the `?debug` panel should stay; test on a real phone; consider `/impeccable init` because `PRODUCT.md` predates Impeccable's current record format.
