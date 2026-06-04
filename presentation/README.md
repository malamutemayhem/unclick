# UnClick Investor Deck

A visually rich, investor-ready overview of UnClick, written in plain language
with analogies so anyone (a teenager included) can follow it. Helicopter view
first, then deeper dives into each pillar, the moat, the business, and the vision.

Two formats are provided, as requested:

| File | What it is | Best for |
|------|-----------|----------|
| `unclick-investor-deck.html` | Self-contained animated web deck (the showpiece) | Presenting live, screen-sharing, sending a link |
| `unclick-investor-deck.pptx` | Native, editable PowerPoint of the same 19 slides | Hand-editing, forwarding to investors, Keynote / Google Slides |
| `unclick-investor-deck.pdf` | Flat PDF export of the web deck | Emailing, printing, quick read |
| `assets/preview.png` | Contact sheet of all 19 slides | A quick glance at the whole story |

## Present the web deck

Open `unclick-investor-deck.html` in any modern browser. No internet or build step needed.

- Right arrow / Space: next slide
- Left arrow: previous slide
- `F`: fullscreen
- `P`: print / PDF view (then use the browser Print dialog, choose Landscape, Save as PDF)
- Swipe left / right on touch screens
- `#7` at the end of the URL jumps straight to slide 7 (handy for linking)

## Edit the PowerPoint

Open `unclick-investor-deck.pptx` in PowerPoint, Keynote, or Google Slides. Every
element is a real, editable shape and text box. The deck is 16:9.

Fonts use Segoe UI and Consolas so it looks right out of the box on Windows. If you
want the exact brand face, swap to Inter (free from Google Fonts).

## The 19-slide story

1. Cover
2. The big idea: let your AI stop pretending to be human
3. The problem: agents are powerful but homeless
4. Why it matters: the old way is slow, costly, blind (about 110x slower)
5. Why now: the timing thesis (MCP, the 2026 legal and standards shifts)
6. The solution, helicopter view: the five pillars
7. Pillar 1, Apps: the app store for agents
8. Pillar 2, Memory: six layers, owned by you
9. Pillar 3, Connections: sign in once
10. Pillar 4, AutoPilot: the self-driving factory
11. Trust, safety, proof: gates before and after, kill switch, audit
12. The moat: the whole stack in one install
13. UnClick vs going it alone (the comparison you asked for)
14. Why the AI labs structurally cannot copy this
15. Business model: subscriptions plus a marketplace
16. Market: every agent user, whichever AI they use
17. Traction: what is live today
18. Vision: the trust layer for the agent economy
19. The ask and contact

## Two spots to personalise before you send it

These are intentionally left as fill-in prompts because only you have the real numbers:

- Slide 17 (Traction): swap the dashed prompt for your live metrics (active users,
  calls per month, MRR, week-on-week growth).
- Slide 19 (The ask): set the raise amount, what it funds, and the timeframe.

## A note on the numbers

The headline figures (450+ callable endpoints, 178+ tools, 60+ integrations, 20+
connections, six-layer memory) come from the repo single source of truth at
`src/config/site-stats.ts` and the README. A newer generated catalog counts more
(218 apps / 913 actions); the deck deliberately uses the conservative, consistently
cited numbers. The "Transparent. Trusted. Traceable." lockup matches the UnClick
Autopilot brand art. Pricing matches the live pricing page.

## Regenerate

- PowerPoint: `python3 build_pptx.py` (needs `python-pptx`)
- The web deck and PDF are static; edit the HTML directly and re-print for a new PDF.

Built for UnClick. Where AI belongs. Humans welcome.
