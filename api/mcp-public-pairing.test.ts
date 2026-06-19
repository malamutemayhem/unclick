import { describe, expect, it } from "vitest";
import type { VercelRequest } from "@vercel/node";
import { readFileSync } from "node:fs";
import {
  pairedMcpUrl,
  pairingLoginUrl,
  pairingToolResult,
  peekRpc,
  PUBLIC_PAIRING_TOOL,
  publicPairIdFromRequest,
  publicToolsForUnpairedClient,
} from "./mcp";
import {
  buildPublicMcpPairCookie,
  createPublicMcpPairId,
  PUBLIC_MCP_PAIR_COOKIE,
  publicMcpPairDeviceId,
} from "./lib/public-mcp-pairing";

describe("public MCP pairing door", () => {
  it("advertises only setup for unpaired clients", () => {
    expect(PUBLIC_PAIRING_TOOL.name).toBe("unclick_start_pairing");
    expect(PUBLIC_PAIRING_TOOL.description).toContain("not paired yet");
    expect(PUBLIC_PAIRING_TOOL.description).not.toContain("API key");

    const tools = publicToolsForUnpairedClient();
    const names = tools.map((tool) => tool.name);
    expect(names).toEqual(["unclick_start_pairing"]);
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

  it("accepts a paired path URL as a stable one-URL client handoff", () => {
    const pairId = createPublicMcpPairId();
    const url = new URL(pairedMcpUrl(pairId));
    const req = {
      query: {},
      url: `/api/mcp/p/${pairId}`,
      headers: {
        cookie: `${PUBLIC_MCP_PAIR_COOKIE}=${createPublicMcpPairId()}`,
        "mcp-session-id": createPublicMcpPairId(),
      },
    };

    expect(url.origin).toBe("https://unclick.world");
    expect(url.pathname).toBe(`/api/mcp/p/${pairId}`);
    expect(url.toString()).not.toContain("key=");
    expect(publicPairIdFromRequest(req as unknown as VercelRequest)).toBe(
      pairId,
    );
  });

  it("keeps query pair ids working for older paired links", () => {
    const pairId = createPublicMcpPairId();
    const req = {
      query: { pair: pairId },
      url: "/api/mcp",
      headers: {
        cookie: `${PUBLIC_MCP_PAIR_COOKIE}=${createPublicMcpPairId()}`,
        "mcp-session-id": createPublicMcpPairId(),
      },
    };

    expect(publicPairIdFromRequest(req as unknown as VercelRequest)).toBe(
      pairId,
    );
  });

  it("routes paired path URLs to the MCP handler on Vercel", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
      rewrites?: Array<{ source: string; destination: string }>;
    };
    const rewrites = config.rewrites ?? [];
    const pathRewriteIndex = rewrites.findIndex(
      (rewrite) => rewrite.source === "/api/mcp/p/:pair",
    );
    const plainRewriteIndex = rewrites.findIndex(
      (rewrite) => rewrite.source === "/api/mcp",
    );

    expect(pathRewriteIndex).toBeGreaterThanOrEqual(0);
    expect(plainRewriteIndex).toBeGreaterThan(pathRewriteIndex);
    expect(rewrites[pathRewriteIndex]?.destination).toBe("/api/mcp");
  });

  it("keeps the static MCP URL primary in pairing tool copy", () => {
    const pairId = createPublicMcpPairId();
    const result = pairingToolResult({ email: "person@example.com" }, pairId);
    const text = result.content[0]?.text ?? "";

    expect(text).toContain("not paired");
    expect(text).toContain("https://unclick.world/login");
    expect(text).toContain("Preferred server URL for every AI app");
    expect(text).toContain("https://unclick.world/api/mcp");
    expect(text).toContain("ready page has private fallback options");
    expect(text).toContain("https://unclick.world/api/mcp/p/");
    expect(text).toContain("session state");
    expect(text).not.toContain("Bearer");
  });

  // ── RC1: pair-id stability ──────────────────────────────────────────────
  it("prefers mcp-session-id over a stale cookie for pair id resolution", () => {
    const sessionId = createPublicMcpPairId();
    const staleCookieId = createPublicMcpPairId();
    const req = {
      query: {},
      url: "/api/mcp",
      headers: {
        cookie: `${PUBLIC_MCP_PAIR_COOKIE}=${staleCookieId}`,
        "mcp-session-id": sessionId,
      },
    };

    expect(publicPairIdFromRequest(req as unknown as VercelRequest)).toBe(
      sessionId,
    );
  });

  it("produces a single stable device id when the client echoes its session id", () => {
    const clientSessionId = createPublicMcpPairId();
    const deviceId = publicMcpPairDeviceId(clientSessionId);

    const req1 = {
      query: {},
      url: "/api/mcp",
      headers: { "mcp-session-id": clientSessionId },
    };
    const req2 = {
      query: {},
      url: "/api/mcp",
      headers: { "mcp-session-id": clientSessionId },
    };

    const resolved1 = publicPairIdFromRequest(req1 as unknown as VercelRequest);
    const resolved2 = publicPairIdFromRequest(req2 as unknown as VercelRequest);
    expect(resolved1).toBe(clientSessionId);
    expect(resolved2).toBe(clientSessionId);
    expect(publicMcpPairDeviceId(resolved1!)).toBe(deviceId);
    expect(publicMcpPairDeviceId(resolved2!)).toBe(deviceId);
  });

  it("embeds the same pair id in the login URL that the client presented", () => {
    const clientPairId = createPublicMcpPairId();
    const loginUrl = pairingLoginUrl("user@example.com", clientPairId);
    const url = new URL(loginUrl);
    const next = url.searchParams.get("next") ?? "";
    expect(next).toContain(`pair=${clientPairId}`);
  });

  // ── RC2: discovery-mode initialize ──────────────────────────────────────
  it("peekRpc still flags initialize as auth-required for the bearer path", () => {
    const result = peekRpc({ jsonrpc: "2.0", id: 1, method: "initialize" });
    expect(result.authRequired).toBe(true);
    expect(result.id).toBe(1);
  });

  it("peekRpc flags tools/call as auth-required regardless of path", () => {
    const result = peekRpc({ jsonrpc: "2.0", id: 2, method: "tools/call" });
    expect(result.authRequired).toBe(true);
  });

  it("peekRpc allows tools/list without auth for public discovery", () => {
    const result = peekRpc({ jsonrpc: "2.0", id: 3, method: "tools/list" });
    expect(result.authRequired).toBe(false);
  });

  it("unclick_start_pairing is the only tools/call allowed pre-auth", () => {
    expect(PUBLIC_PAIRING_TOOL.name).toBe("unclick_start_pairing");
    const protectedCall = peekRpc({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: { name: "load_memory" },
    });
    expect(protectedCall.authRequired).toBe(true);
  });
});
