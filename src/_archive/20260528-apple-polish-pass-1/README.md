# 20260528 Apple Polish Pass 1 - Archive

This folder holds the original versions of files replaced during the first Apple-inspired
polish pass on UnClick. Nothing here is dead code. Anything in this folder can be restored
with a single copy command.

## What was archived

### Phase 1 (Foundation - earlier in the day)

| File | Original path |
|---|---|
| `index.css.orig` | `src/index.css` |
| `Hero.tsx.orig` | `src/components/Hero.tsx` |
| `Navbar.tsx.orig` | `src/components/Navbar.tsx` |
| `Footer.tsx.orig` | `src/components/Footer.tsx` |
| `Index.tsx.orig` | `src/pages/Index.tsx` |
| `Tools.tsx.orig` | `src/pages/Tools.tsx` |

### Phase 2 (Ringfence + page polish, this session)

| File | Original path |
|---|---|
| `Memory.tsx.orig` | `src/pages/Memory.tsx` |
| `DogfoodReport.tsx.orig` | `src/pages/DogfoodReport.tsx` |
| `Connect.tsx.orig` | `src/pages/Connect.tsx` |
| `NewToAI.tsx.orig` | `src/pages/NewToAI.tsx` |
| `FAQPage.tsx.orig` | `src/pages/FAQPage.tsx` |
| `AdminShell.tsx.orig` | `src/pages/admin/AdminShell.tsx` |

Note: `App.tsx` was also touched (two BuildDesk/BackstagePass import removals + one route
redirect). The diff is tiny and easily reverted by hand or via git. Not archived here.

## Rollback (one set of commands)

From repo root:

```bash
# Phase 1
cp src/_archive/20260528-apple-polish-pass-1/index.css.orig   src/index.css
cp src/_archive/20260528-apple-polish-pass-1/Hero.tsx.orig    src/components/Hero.tsx
cp src/_archive/20260528-apple-polish-pass-1/Navbar.tsx.orig  src/components/Navbar.tsx
cp src/_archive/20260528-apple-polish-pass-1/Footer.tsx.orig  src/components/Footer.tsx
cp src/_archive/20260528-apple-polish-pass-1/Index.tsx.orig   src/pages/Index.tsx
cp src/_archive/20260528-apple-polish-pass-1/Tools.tsx.orig   src/pages/Tools.tsx

# Phase 2
cp src/_archive/20260528-apple-polish-pass-1/Memory.tsx.orig         src/pages/Memory.tsx
cp src/_archive/20260528-apple-polish-pass-1/DogfoodReport.tsx.orig  src/pages/DogfoodReport.tsx
cp src/_archive/20260528-apple-polish-pass-1/Connect.tsx.orig        src/pages/Connect.tsx
cp src/_archive/20260528-apple-polish-pass-1/NewToAI.tsx.orig        src/pages/NewToAI.tsx
cp src/_archive/20260528-apple-polish-pass-1/FAQPage.tsx.orig        src/pages/FAQPage.tsx
cp src/_archive/20260528-apple-polish-pass-1/AdminShell.tsx.orig     src/pages/admin/AdminShell.tsx
```

## What the pass changed

### Phase 1
1. Locked the dark teal token set as the canonical design system.
2. Removed the multi-color icon palette from the homepage product tiles. One accent only.
3. Dropped VantaWavesBackground from the homepage. Single soft halo instead.
4. Added `src/lib/design-system.ts` with hero / page / motion presets.
5. Added `src/components/PageShell.tsx` as the new hero-and-page primitive.
6. Cleaned Navbar to text-only links, sentence case, scroll-aware border.
7. Footer copy tightened, taglines refreshed.
8. Tools.tsx wrapped in PageShell. Animated-grid dropped. Sentence case throughout.

### Phase 2 (this session)
1. **Memory.tsx** rewritten on PageShell with the user-requested **transparency layer**
   ("Watch memory at work" section), simplified jargon, single CTA.
2. **DogfoodReport.tsx** wrapped in PageShell; XPass stage rainbow toned down to one
   calm teal/neutral vocabulary; count blocks use foreground text not rainbow.
3. **Connect.tsx** swapped from hand-rolled hex palette (#0A0A0A, #E8E8E8, #E2B93B)
   to design tokens; Navbar/Footer added back; all OAuth/key-mint logic preserved.
4. **NewToAI.tsx** on PageShell; BackstagePass feature card removed from FEATURES + PRODUCTS
   lists (hidden per Chris); pricing soften to "Free" since pricing chapter is paused.
5. **FAQPage.tsx** wrapped in PageShell with a proper hero.
6. **AdminShell.tsx** raw hex swept to design tokens (#61C1C4 -> primary, #0A0A0A -> background,
   text-[#888]/[#666]/[#ccc] -> muted-foreground/foreground). Amber `#E2B93B` retained
   on the Admin (superuser) submenu as a deliberate functional indicator.
7. **App.tsx** `/build` route redirected to `/`; `BuildDeskPage` and `BackstagePassPage`
   imports removed (page files retained for future revival).

Nothing in `packages/` or `api/` was touched in this pass.
The XPass receipt-integrity stack in `scripts/` was intentionally left alone to avoid
colliding with the active PR cluster around dogfood sweep (#1139-#1141).

## Lint status of touched files

| File | Status |
|---|---|
| Memory.tsx | clean |
| DogfoodReport.tsx | clean |
| Connect.tsx | 1 error - pre-existing `react-hooks/set-state-in-effect` on line 230. Identical to original. Not introduced by this pass. |
| NewToAI.tsx | clean |
| FAQPage.tsx | clean |
| AdminShell.tsx | clean |
| App.tsx | clean |

## Hidden but not deleted

These remain functional in code but are deliberately not linked from the new public chrome.
They can be re-surfaced by adding their label back to `Navbar.tsx` and restoring the route
in `App.tsx`.

- `/build` (BuildDesk) - dev workflow surface, hidden per Chris 2026-05-28. Route now redirects
  to `/`. Page file at `src/pages/BuildDesk.tsx` retained.
- `/backstagepass` (BackstagePass) - paused for legal review. Route already redirects to
  `/admin/keychain`. Page file at `src/pages/BackstagePass.tsx` retained.
- `/pricing` - still routed and reachable from Footer; will be promoted to nav when pricing
  chapter resumes (Chris paused pricing this session).

## Notes for the next chatbot

- The shared checkout at `C:\G\UnClick\repos\unclick-agent-native-endpoints` is partially
  stale; `git fetch` errored with "pack has unresolved delta" and `git show` for some trees
  returned "fatal: unable to read tree". This matches the warning in `Context/20260525 UnClick
  Alignment Deep Dive.md`. Use a fresh clone for pushes.
- Phase 3 candidates: Pricing.tsx (page exists but de-prioritised), Crews/Dispatch/SmartHome/
  VibeCoding/Organiser marketing pages on PageShell, Arena sub-pages, Developers/Docs/
  DeveloperDocs, all admin sub-pages (~30 of them), and the Memory.tsx transparency layer
  becoming a real reader of recent memory writes (currently a static-but-believable mockup).
- The UnClick MCP server itself was disconnected during the previous session. Restart it
  before running XPass-on-UnClick dogfooding. That dogfooding run is the eventual proof
  artifact for the `/dogfood` page (which is now PageShell-shaped and ready to receive it).
