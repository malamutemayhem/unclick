import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Design canon lock (Creative Studio Council ruling, 2026-06-11).
 *
 * One grammar across the public site: extrabold tight-tracked headlines,
 * the teal glow-lift primary CTA, glass panels. The shared shells compose
 * from presets so pages cannot drift dialect by dialect again.
 */

const read = (p: string) => readFileSync(resolve(process.cwd(), p), "utf8");

describe("design canon: presets encode the deck grammar", () => {
  const ds = read("src/lib/design-system.ts");

  it("h1 family is extrabold with tight tracking", () => {
    expect(ds).toMatch(/h1:\s*\n?\s*"text-5xl font-extrabold/);
    expect(ds).toMatch(/h1Product:\s*\n?\s*"text-4xl font-extrabold/);
    expect(ds).toContain("tracking-[-0.025em]");
  });

  it("primary CTA carries the teal glow and lift", () => {
    const cta = ds.slice(ds.indexOf("ctaPrimary"), ds.indexOf("ctaGhost"));
    expect(cta).toContain("hover:-translate-y-0.5");
    expect(cta).toContain("shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)]");
  });

  it("tiles are glass, not opaque slabs", () => {
    const tile = ds.slice(ds.indexOf("tile:"), ds.indexOf("tileIcon"));
    expect(tile).toContain("bg-white/[0.045]");
    expect(tile).toContain("backdrop-blur-sm");
  });
});

describe("design canon: shared shells compose from presets", () => {
  it("PageShell uses the product headline scale and brand Eyebrow", () => {
    const shell = read("src/components/PageShell.tsx");
    expect(shell).toContain("presets.h1Product");
    expect(shell).toMatch(/import \{ Eyebrow \} from "@\/components\/brand"/);
    expect(shell).not.toMatch(/font-(semibold|extrabold) leading/);
  });

  it("BrochurePage uses presets for headline and both CTAs", () => {
    const brochure = read("src/components/BrochurePage.tsx");
    expect(brochure).toContain("presets.h1Product");
    expect(brochure).toContain("presets.ctaPrimary");
    expect(brochure).toContain("presets.ctaGhost");
    expect(brochure).not.toContain("font-extrabold leading-[1.05]");
  });
});

describe("design canon: banned effects stay deleted", () => {
  it("index.css no longer defines retired utilities", () => {
    const css = read("src/index.css");
    for (const banned of ["film-grain", "aurora-blob", "animate-marquee", "float-particle"]) {
      expect(css, `${banned} should stay deleted from index.css`).not.toContain(banned);
    }
  });

  it("dead effect components stay deleted", () => {
    for (const gone of [
      "src/components/Strip.tsx",
      "src/components/Particles.tsx",
      "src/components/NetworkGraph.tsx",
      "src/components/VantaWavesBackground.tsx",
      "src/components/ForDevelopers.tsx",
      "src/components/CodeBlock.tsx",
    ]) {
      expect(existsSync(resolve(process.cwd(), gone)), `${gone} should stay deleted`).toBe(false);
    }
  });
});

/**
 * Pages already converted to the canon. Extend this list as pages convert;
 * never remove an entry. Converted pages may not run the hero animated-grid
 * (motion budget) or hand-set raw brand hexes (tokens own the palette).
 */
const CONVERTED_PAGES = [
  "src/components/PageShell.tsx",
  "src/components/BrochurePage.tsx",
  "src/pages/Developers.tsx",
  "src/pages/SmartHome.tsx",
  "src/pages/Crews.tsx",
  "src/components/TrustSignals.tsx",
  "src/components/Problem.tsx",
  "src/pages/NotFound.tsx",
];

describe("design canon: converted pages stay converted", () => {
  it.each(CONVERTED_PAGES)("%s avoids animated-grid and raw brand hexes", (page) => {
    const src = read(page);
    expect(src).not.toContain("animated-grid");
    expect(src).not.toMatch(/#0a2c3c|#61c1c4|#61C1C4|#9EE4E6|#0d1117/);
  });
});
