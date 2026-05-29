# UnClick Design System

**Locked:** 2026-05-28 (Apple polish pass 1)
**Owner:** UnClick fleet
**Live tokens:** `src/index.css`
**TypeScript mirror:** `src/lib/design-system.ts`
**Primitive:** `src/components/PageShell.tsx`

This is the one-pager for every page on UnClick. Read this before adding marketing
surface area or fixing chrome on existing pages. If something here conflicts with
an older doc, this file wins.

## The look

Apple-inspired, dark, calm, restrained. One accent. Generous whitespace.
Sentence case. Friendly plain English. No exclamation marks.

## Tokens

| Token | Value | Use |
|---|---|---|
| Background | `hsl(0 0% 4%)` | Page background. Deepest neutral. |
| Foreground | `hsl(0 0% 91%)` | Default text. |
| Card | `hsl(0 0% 7%)` | Tiles, panels, popovers. |
| Border | `hsl(0 0% 15%)` | Subtle dividers. |
| Muted text | `hsl(0 0% 55%)` | Footer, captions, eyebrow detail. |
| Body text | `hsl(0 0% 72%)` | Paragraphs. |
| Primary | `hsl(182 46% 57%)` | The accent. Teal. Used sparingly. |

Type: Inter (sans), JetBrains Mono (eyebrow pills, code).
Radius: `0.5rem` base. Pills `9999px`.

## Rules

1. **One accent.** Teal. Never `text-blue-500`, `text-purple-500`, `text-amber-500`,
   `text-red-500`, `text-green-500`, `text-yellow-500` on product tiles or category chips.
   Use `text-primary` on `bg-primary/10`.
2. **One halo per page.** The soft primary radial. Use `presets.halo`. Never stack.
3. **Sentence case headlines.** "The rails your agent plugs into." Not Title Case.
4. **Short sentences. Plain English.** Replace "atomic facts", "supersede",
   "decay management", "MCP transport", "6-layer architecture" with everyday words.
5. **One CTA per section.** Strip the third button. Strip the second if you can.
6. **Motion budget.** `FadeIn` on first paint. That is the budget.
   Aurora blobs, marquee, film grain, animated grid, Vanta waves, particles =
   archived. Do not reintroduce on marketing pages.
7. **No em dashes anywhere.** Use commas, full stops, or " - ".
8. **No "Fishbowl" in user copy.** It is "Boardroom" now.

## Voice

Apple as inspiration, not as costume. Calm confidence.

- Lead with what the user gets, not how it works.
- Concrete, not abstract. "Send an email" not "execute messaging actions".
- No emojis on marketing surface. Emojis stay in Boardroom.
- Friendly, not chummy. Confident, not loud.

Tagline: **The universal remote for AI.**

## How to build a new page

```tsx
import PageShell from "@/components/PageShell";

const MyPage = () => (
  <PageShell
    eyebrow="Section name"
    title="Sentence case headline."
    accent="One accent word."
    lede="One supporting sentence in plain English."
    cta={{ label: "Get started", href: "#install" }}
  >
    {/* page sections here, each wrapped in <section className={presets.section}> */}
  </PageShell>
);
```

## What was archived in pass 1

`src/_archive/20260528-apple-polish-pass-1/` holds the originals of `index.css`,
`Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, and `Index.tsx`. See the README in that
folder for the one-command rollback.

## What is hidden but not deleted

The following live in code but are not surfaced in public chrome right now.
Re-add them to `Navbar.tsx` to bring them back into the public flow.

| Surface | Route | Status |
|---|---|---|
| BuildDesk | `/build` | Hidden. Developer/coding-worker dispatch surface. |
| BackstagePass | `/backstage` | Hidden. Paused for legal review. |
| Pricing | `/pricing` | Visible in footer only. Public pricing chapter paused. |
| Developer marketplace | various | Hidden. Promote when ready. |
