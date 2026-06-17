import { describe, expect, it } from "vitest";
import {
  pairingLoginUrl,
  pairingToolResult,
  PUBLIC_PAIRING_TOOL,
} from "./mcp";
import {
  buildPublicMcpPairCookie,
  createPublicMcpPairId,
  PUBLIC_MCP_PAIR_COOKIE,
  publicMcpPairDeviceId,
} from "./lib/public-mcp-pairing";

describe("public MCP pairing door", () => {
  it("advertises a single safe setup tool for unpaired clients", () => {
    expect(PUBLIC_PAIRING_TOOL.name).toBe("unclick_start_pairing");
    expect(PUBLIC_PAIRING_TOOL.description).toContain("not paired yet");
    expect(PUBLIC_PAIRING_TOOL.description).not.toContain("API key");
  });

  it("builds a magic-link landing URL with a non-secret pair id", () => {
    const pairId = createPublicMcpPairId();
    const url = new URL(pairingLoginUrl("USER@Example.COM", pairId));

    expect(url.origin).toBe("https://unclick.world");
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("next")).toBe(`/pair/connected?pair=${pairId}`);
    expect(url.searchParams.get("email")).toBe("user@example.com");
    expect(url.toString()).not.toContain("uc_");
    expect(url.toString()).not.toContain("key=");
  });

  it("hashes the public pair id before storing it as a device id", () => {
    const pairId = createPublicMcpPairId();
    const deviceId = publicMcpPairDeviceId(pairId);
    const cookie = buildPublicMcpPairCookie(pairId);

    expect(deviceId).toMatch(/^public-mcp:[a-f0-9]{64}$/);
    expect(deviceId).not.toContain(pairId);
    expect(cookie).toContain(`${PUBLIC_MCP_PAIR_COOKIE}=${pairId}`);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=None");
  });

  it("explains compatibility URLs without pretending they are the public door", () => {
    const pairId = createPublicMcpPairId();
    const result = pairingToolResult({ email: "person@example.com" }, pairId);
    const text = result.content[0]?.text ?? "";

    expect(text).toContain("not paired");
    expect(text).toContain("https://unclick.world/login");
    expect(text).toContain("Compatibility URL");
    expect(text).toContain("public URL");
    expect(text).toContain(pairId);
    expect(text).not.toContain("Bearer");
  });
});
