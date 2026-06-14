import { describe, expect, it } from "vitest";
import {
  pairingLoginUrl,
  pairingToolResult,
  PUBLIC_PAIRING_TOOL,
} from "./mcp";

describe("public MCP pairing door", () => {
  it("advertises a single safe setup tool for unpaired clients", () => {
    expect(PUBLIC_PAIRING_TOOL.name).toBe("unclick_start_pairing");
    expect(PUBLIC_PAIRING_TOOL.description).toContain("not paired yet");
    expect(PUBLIC_PAIRING_TOOL.description).not.toContain("API key");
  });

  it("builds a magic-link landing URL without embedding a secret", () => {
    const url = new URL(pairingLoginUrl("USER@Example.COM"));

    expect(url.origin).toBe("https://unclick.world");
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("next")).toBe("/pair/connected");
    expect(url.searchParams.get("email")).toBe("user@example.com");
    expect(url.toString()).not.toContain("uc_");
    expect(url.toString()).not.toContain("key=");
  });

  it("explains compatibility URLs without pretending they are the public door", () => {
    const result = pairingToolResult({ email: "person@example.com" });
    const text = result.content[0]?.text ?? "";

    expect(text).toContain("not paired");
    expect(text).toContain("https://unclick.world/login");
    expect(text).toContain("Compatibility URL");
    expect(text).toContain("public URL");
    expect(text).not.toContain("Bearer");
  });
});
