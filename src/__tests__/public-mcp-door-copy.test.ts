import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const installSection = () =>
  readFileSync("src/components/InstallSection.tsx", "utf8");
const pairingPage = () => readFileSync("src/pages/PairingComplete.tsx", "utf8");
const authorizePage = () => readFileSync("src/pages/McpAuthorize.tsx", "utf8");

describe("public MCP door copy", () => {
  it("makes the public URL the primary installer language", () => {
    const src = installSection();

    expect(src).toContain("Public door");
    expect(src).toContain("Compatibility URL");
    expect(src).toContain("No personal key in the URL");
    expect(src).toContain("web sign-in");
    expect(src).toContain("Private value hidden on screen");
    expect(src).toContain("https://unclick.world/api/mcp");
    expect(src).toContain("?key=");
  });

  it("keeps the magic-link landing page honest about fallback URLs", () => {
    const src = pairingPage();

    expect(src).toContain(
      "Pairing saved. Keep using https://unclick.world/api/mcp",
    );
    expect(src).toContain("Use this static MCP URL");
    expect(src).toContain(
      "Same address for Claude, Grok, ChatGPT, Cursor, and any",
    );
    expect(src).toContain("MCP client. No personal key in the URL");
    expect(src).toContain("const primaryMcpUrl = PUBLIC_MCP_URL");
    expect(src).toContain("Private fallback for stubborn AI apps");
    expect(src).toContain("${PUBLIC_MCP_URL}/p/");
    expect(src).toContain("Keep the static URL as the normal");
    expect(src).toContain("path. This private fallback is revokable");
    expect(src).toContain("Compatibility URL for older AI apps");
    expect(src).toContain("contains a private connection key");
    expect(src).not.toContain("Claude still");
    expect(src).not.toContain("master key");
  });

  it("uses explicit approval for the generic MCP web sign-in handoff", () => {
    const src = authorizePage();

    expect(src).toContain("Connect UnClick");
    expect(src).toContain("Approve ${clientLabel}");
    expect(src).toContain("onClick={handleConnect}");
    expect(src).toContain("window.location.assign(data.redirect_to)");
  });
});
