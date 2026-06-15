import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const installSection = () => readFileSync("src/components/InstallSection.tsx", "utf8");
const pairingPage = () => readFileSync("src/pages/PairingComplete.tsx", "utf8");

describe("public MCP door copy", () => {
  it("makes the public URL the primary installer language", () => {
    const src = installSection();

    expect(src).toContain("Public door");
    expect(src).toContain("Compatibility URL");
    expect(src).toContain("No personal key in the URL");
    expect(src).toContain("Private value hidden on screen");
    expect(src).toContain("https://unclick.world/api/mcp");
    expect(src).toContain("?key=");
  });

  it("keeps the magic-link landing page honest about fallback URLs", () => {
    const src = pairingPage();

    expect(src).toContain("Use the public door first");
    expect(src).toContain("If your AI app only accepts a static URL");
    expect(src).toContain("contains a private connection key");
    expect(src).not.toContain("master key");
  });
});
