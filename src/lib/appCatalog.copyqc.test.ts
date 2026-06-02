import { describe, expect, it } from "vitest";
import { APP_CATALOG } from "./appCatalog";

// Copy QC for the Apps library: enforces the "super simple English, single line"
// bar over every app's user-facing copy. This is the always-on guard behind the
// copypass-style review - if a new connector ships a long or jargon-shaped blurb,
// CI catches it. Fix by adding a short BLURB_OF entry in
// scripts/generate-app-catalog.mjs and regenerating.
describe("app copy QC", () => {
  it("every app has a clean name (no em/en dashes)", () => {
    const bad = APP_CATALOG.filter((a) => !a.name || /[—–]/.test(a.name)).map((a) => a.slug);
    expect(bad, `names with dashes: ${bad.join(", ")}`).toEqual([]);
  });

  it("every blurb is a single short sentence", () => {
    const tooLong = APP_CATALOG.filter((a) => a.blurb.length > 120).map((a) => `${a.slug}(${a.blurb.length})`);
    expect(tooLong, `blurbs over 120 chars: ${tooLong.join(", ")}`).toEqual([]);

    const multiline = APP_CATALOG.filter((a) => /\n/.test(a.blurb)).map((a) => a.slug);
    expect(multiline, `multi-line blurbs: ${multiline.join(", ")}`).toEqual([]);
  });

  it("every blurb reads like a sentence (ends with punctuation, no dashes)", () => {
    const noEnd = APP_CATALOG.filter((a) => !/[.!?]$/.test(a.blurb)).map((a) => a.slug);
    expect(noEnd, `blurbs missing end punctuation: ${noEnd.join(", ")}`).toEqual([]);

    const dashed = APP_CATALOG.filter((a) => /[—–]/.test(a.blurb)).map((a) => a.slug);
    expect(dashed, `blurbs with em/en dashes: ${dashed.join(", ")}`).toEqual([]);
  });
});
