---
name: mykey-design-taste
description: Mykey's taste and UI/UX preferences for the myky.cc coming-soon page. Use whenever designing, editing, or reviewing index.html or any myky.cc copy, layout, type, or color.
---

# Mykey design taste

Who: Mykey Nishikawa, an independent developer and designer. Works fast, decides by looking, and dislikes overengineering. Keeps asking for things to be "bigger" and "better" on mobile, so check phone width first.

## Look and feel
- Brutal, minimal, confident, a little dry. Single color `#061ecf` background, white text. No gradients, glows, pills, pulsing dots, or eyebrow labels. See `PRODUCT.md` for anti-references.
- Big display type (Anton, uppercase) for the headline. Mono (Roboto Mono bold) for numbers, links, and the status card. Mono is for measurement and data here, not decoration.
- The headline is the personality. Copy should be short, dry wordplay, not a sentence explaining the wait. The current line is "The birds are still sleeping." Offer alternatives, do not swap silently.

## Layout rules
- Design for 16:9 (1920x1080) first, then phone. Laptop-only layouts look small to him on a wide monitor.
- Headline plus a "Coming soon" line across the top. Bottom-left: Discord card, countdown, calendar button stacked. Bottom-right: links. On phones: headline, that stack, links.
- Things that sit side by side or stacked share a size. The card, countdown, and button share a width (`--col`); the links block matches that stack's height. A mismatch looks broken to him.
- Visitors must understand the countdown means "portfolio not ready yet". Keep the label on it.
- No extra info he did not ask for (a local-time clock was removed).
- No scrolling on any screen, phone or desktop. Everything a visitor needs fits in one viewport; size with svh/vh so short screens shrink to fit. Test 320x568 up to 2560x1440.
- Mobile is the priority. Headline, status card, countdown, and links all get bigger on phones, not smaller. Nothing may overflow at 375px.
- Empty space is part of the design. Do not fill it to balance the page.

## What he has rejected
- "Too clunky" and "too much." Remove before adding.
- Wrapping the track title. Long titles scroll sideways, with the note icon fixed.
- Hiding labels. Days, Hrs, Min, Sec stay under the countdown.
- Blur, gradient text, and extra decorative effects.

## How to work with him
- Make the change, check it in the preview at 375px and desktop, then report what was verified.
- Ask one question when a choice changes the copy or what visitors can do. Do not ask about spacing or sizes; decide and show.
- Impeccable is installed (`C:\Users\kalas\.claude\skills\impeccable`). Use its context command before UI edits.
- Keep the page a single `index.html` with no build step unless he asks otherwise.
