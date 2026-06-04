# UnClick - Investor Overview Deck

A self-contained, visually rich investor presentation for UnClick. Built to be
understood by anyone (target: a smart teenager), with a helicopter overview
first and deeper dives into each part, plus a dedicated moat and differentiation
section.

## Files

| File | What it is |
|------|------------|
| `index.html` | The deck. One self-contained file (no dependencies, no internet needed). This is the master. |
| `UnClick-Investor-Overview.pdf` | A ready-to-send PDF export (one slide per page, 16:9). |
| `UnClick-Investor-Overview.pptx` | A PowerPoint version (one full-screen slide image per slide) for opening in PowerPoint or Keynote. |
| `SPEAKER-NOTES.md` | Per-slide talking points, the "fast 12" cut, what to fill in, and honesty guardrails. |

## How to present it

1. Open `index.html` in any browser (double-click it).
2. Press `F` for fullscreen.
3. Move with the arrow keys (or `Space`), or click the right / left edge of the screen.
4. `Home` jumps to the start, `End` to the last slide.

It works completely offline. Fonts fall back gracefully if there is no internet.

## How to export a fresh PDF

The PDF is already generated. To remake it yourself, just open `index.html`,
press `Ctrl/Cmd + P`, choose "Save as PDF", set layout to Landscape and margins
to None. Each slide prints as one clean page.

## How to edit it

`index.html` is plain HTML, so the words are easy to change:

- Each slide is a `<section class="slide">`. Edit the text inside.
- Brand colours and fonts live in the `:root` block at the top of the `<style>`.
- The category chart and the brand wall are simple data arrays near the bottom,
  inside the `<script>` block (`cats` and `brands`). Update the numbers there.
- Page numbers and the footer logo are added automatically. You do not need to
  renumber slides when you add or remove one.

If you want fully editable, native PowerPoint text boxes (rather than slide
images), say the word and that can be generated.

## What still needs you (placeholders)

Three slides have a dashed teal box marking what to add:

- Traction: real business metrics (installs, active agents, calls per day, customers).
- Team: a photo, a one-line bio, any advisors or early hires.
- The ask: the amount you are raising, the milestone it buys, and the runway.

See `SPEAKER-NOTES.md` for the full guidance, including the numbers that are
verified from the codebase and the claims to keep conservative.

## Design

Matches the live UnClick brand: near-black background (`#0a0a0a`), a single
teal accent (`#61c1c4`), Inter for headings and body, JetBrains Mono for labels,
with a subtle grid, a soft halo, and gentle motion. One idea per slide, with
plenty of breathing room.
