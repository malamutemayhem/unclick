# UnClick investor overview deck

A visually rich, plain-English overview of UnClick for investors and partners.
Written to be understood by anyone (target: a smart teenager), helicopter view
first, then deeper dives, with a dedicated moat section.

Framing: a warm overview to build interest, **not** a fundraising ask (no
"raise $X" slide). Drop real numbers into the clearly marked placeholders when
ready (see `PLACEHOLDERS.md`).

## What is in here

| File | What it is | Use it for |
|---|---|---|
| `UnClick-Investor-Deck.pdf` | The deck as a polished 17-page PDF (16:9) | Emailing or printing. Share-ready. |
| `index.html` | The same deck as a self-contained web presentation | Presenting live, fullscreen, in any browser |
| `UnClick-Investor-Overview.pptx` | The same deck, fully editable | Tweaking words, reordering, dropping numbers in |
| `PLACEHOLDERS.md` | Every number/name to fill in | Your fill-in checklist |
| `build_pptx.py` | Script that generates the `.pptx` | Regenerating the PowerPoint |

All three formats carry the same 17 slides and the same content.

## Present it (HTML)

Open `index.html` in any browser. No internet or install needed (fonts load
from the web when available, with a clean fallback when offline).

- **Arrow keys** or **space** move between slides
- **F** toggles fullscreen
- **P** opens print, which is also how you make a PDF (choose "Save as PDF")
- Click the dots at the bottom to jump around; swipe works on touch screens

## The slides

1. Cover
2. The big idea (one sentence)
3. The problem (three problems)
4. Why now
5. What UnClick is (the four pillars)
6. How it works (three steps)
7. Deep dive: Memory
8. Deep dive: Apps and connections
9. Deep dive: Autopilot
10. Trust
11. Why UnClick wins (the moat)
12. The opportunity (market)
13. Where we are (traction)
14. Where it is going (roadmap)
15. Team
16. Close
17. Appendix: the words in plain English

## Edit the PowerPoint

Open `UnClick-Investor-Overview.pptx` in PowerPoint, Keynote, or Google Slides.
For the closest match to the design, install the free fonts **Inter** and
**JetBrains Mono**; without them your app will substitute a similar sans, which
still looks clean.

## Regenerate the files

**PowerPoint** (after editing `build_pptx.py`):

```bash
python3 -m venv .venv && ./.venv/bin/pip install python-pptx Pillow
./.venv/bin/python build_pptx.py
```

**PDF from the HTML deck**: the simplest way is to open `index.html` in a
browser and print to PDF (the page size is preset to 16:9). The committed
`UnClick-Investor-Deck.pdf` was produced by rendering `index.html` with a
headless browser at 1280x720 per page.

## Brand notes

- One accent only: teal `#61c1c4`, on a near-black `#0a0a0a` background
- Type: Inter for text, JetBrains Mono for labels and numbers
- Voice: calm, plain English, analogies, no exclamation marks, no em dashes
- The numbers 450+ endpoints, 178+ tools, 21 groups, 20+ connections are real
  and come from `src/config/site-stats.ts`. Update them there if they change.
