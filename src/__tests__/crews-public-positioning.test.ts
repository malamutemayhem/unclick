import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const crewsPagePath = resolve(process.cwd(), "src/pages/Crews.tsx");

function readCrewsPage(): string {
  return readFileSync(crewsPagePath, "utf8");
}

describe("Crews public positioning", () => {
  it("keeps Crews aligned with the Captain, hats, Memory, Passport, and XPass model", () => {
    const source = readCrewsPage();

    expect(source).toMatch(/Captain \/ Chairman/);
    expect(source).toMatch(/Specialist Hats/);
    expect(source).toMatch(/Memory/);
    expect(source).toMatch(/Passport/);
    expect(source).toMatch(/XPass Receipts/);
    expect(source).toMatch(/Crews is the coordination layer\. XPass is the proof layer\./);
  });

  it("does not regress to the old Claude Agent Teams or Organiser-led marketing copy", () => {
    const source = readCrewsPage();

    expect(source).not.toMatch(/Claude's Agent Teams|Agent Teams/);
    expect(source).not.toMatch(/Coming Soon/);
    expect(source).not.toMatch(/The Organiser/);
    expect(source).not.toMatch(/178\+/);
    expect(source).not.toMatch(/\u00e2|\u20ac|\u00a2/);
  });
});
