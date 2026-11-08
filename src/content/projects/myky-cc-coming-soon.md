---
title: myky.cc coming soon
summary: A one-screen countdown to this portfolio, with live Discord status and a visitor counter.
date: 2026-10-28
role: Design and development
problem: The domain needed something better than a blank page while the portfolio was built, and it had to say exactly when the real site opens.
outcome: Live at myky.cc until launch on December 8, 2026. One HTML file, no build step, and it fits every screen from 320 × 568 to 2560 × 1440 without scrolling.
stack: [HTML, CSS, JavaScript, Cloudflare Pages, D1]
url: https://myky.cc
cover: ./myky-cc-coming-soon.png
coverAlt: "The coming-soon page at 1920 by 1080: THE BIRDS ARE STILL SLEEPING in huge white capitals on blue, a spinning ASCII donut, a Discord status card, the countdown with the visitor count, and links to X, GitHub, Discord, and email."
---

## What is on the page

`myky.cc` types itself out on a blue screen, then the screen lifts away. The headline rises in word by word. Under it, a countdown rolls its digits on the second, a card shows my live Discord status, and one button adds the launch to Google Calendar. X, GitHub, Discord, and email sit in the corner. A spinning ASCII donut fills the empty space, because.

## One screen, on everything

Nothing scrolls, on any screen. The layout is sized from the space it has, not from a list of device widths: container units size the links from the column beside them, and the phone headline grows until it spans the same width as the cards below it.

Heights use `svh`, so nothing jumps when a phone's browser bars slide away. Reduced-motion settings get no typing, no wipe, no rolling digits, and a still donut.

## One blue, one white

`#061ecf` and `#ffffff`. No gradients, no glows, no other colors. Anton for the headline, Roboto Mono Bold for everything that is a number, a label, or a link.
