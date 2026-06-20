import { describe, it, expect } from "vitest";
import {
  LENSES, POPULAR_SLUGS, setupKindOf, isConnected, actionLabelFor,
  matchesLens, applyLens, lensCounts, parseAppLens, type LensConnector,
} from "./appLenses";
import type { AppEntry } from "@/lib/appCatalog";

const app = (slug: string): AppEntry => ({
  slug, name: slug, category: "test", blurb: "", domain: null, network: "online",
  toolCount: 1, tools: [], level: 1, hardened: false,
} as unknown as AppEntry);

const oauthNoCred: LensConnector = { auth_type: "oauth2", credential: null };
const oauthConnected: LensConnector = {
  auth_type: "oauth2",
  credential: { is_valid: true, last_tested_at: null, source: "user_credentials" },
};
const keySaved: LensConnector = { auth_type: "api_key", credential: { is_valid: true, last_tested_at: null } };
const keyTested: LensConnector = { auth_type: "api_key", credential: { is_valid: true, last_tested_at: "2026-06-12" } };
const botNoCred: LensConnector = { auth_type: "bot_token", credential: null };
const managedNoCred: LensConnector = { auth_type: "api_key", supports_managed_connection: true, credential: null };
const hostedMcpNoCred: LensConnector = { auth_type: "api_key", supports_hosted_mcp_connection: true, credential: null };
const managedConnected: LensConnector = {
  auth_type: "api_key",
  supports_managed_connection: true,
  credential: { is_valid: true, last_tested_at: "2026-06-16", source: "managed_app_connections" },
};

describe("appLenses", () => {
  it("classifies setup kinds from auth_type", () => {
    expect(setupKindOf(oauthNoCred)).toBe("signin");
    expect(setupKindOf(managedNoCred)).toBe("signin");
    expect(setupKindOf(hostedMcpNoCred)).toBe("signin");
    expect(setupKindOf(keySaved)).toBe("key");
    expect(setupKindOf(botNoCred)).toBe("key");
    expect(setupKindOf(undefined)).toBe("builtin");
  });

  it("connected means a working credential, tested or not", () => {
    expect(isConnected(keySaved)).toBe(true);
    expect(isConnected(keyTested)).toBe(true);
    expect(isConnected(oauthConnected)).toBe(true);
    expect(isConnected(managedConnected)).toBe(true);
    expect(isConnected(oauthNoCred)).toBe(false);
    expect(isConnected(undefined)).toBe(false);
  });

  it("buttons say the action: Connect / Add key / Manage / nothing", () => {
    expect(actionLabelFor(oauthNoCred)).toBe("Connect");
    expect(actionLabelFor(managedNoCred)).toBe("Connect");
    expect(actionLabelFor(hostedMcpNoCred)).toBe("Connect");
    expect(actionLabelFor(oauthConnected)).toBe("Manage");
    expect(actionLabelFor(managedConnected)).toBe("Manage");
    expect(actionLabelFor(botNoCred)).toBe("Add key");
    expect(actionLabelFor(keyTested)).toBe("Manage");
    expect(actionLabelFor(undefined)).toBe(null);
  });

  it("matchesLens covers every lens honestly", () => {
    const a = app("github");
    expect(matchesLens(a, "all", undefined)).toBe(true);
    expect(matchesLens(a, "popular", undefined)).toBe(true);
    expect(matchesLens(app("higgsfield"), "popular", undefined)).toBe(true);
    expect(matchesLens(app("obscure-thing"), "popular", undefined)).toBe(false);
    expect(matchesLens(a, "connected", keyTested)).toBe(true);
    expect(matchesLens(a, "connected", undefined)).toBe(false);
    expect(matchesLens(a, "not-connected", oauthNoCred)).toBe(true);
    // built-in apps are not "not connected": there is nothing to connect
    expect(matchesLens(a, "not-connected", undefined)).toBe(false);
    expect(matchesLens(a, "signin", oauthNoCred)).toBe(true);
    expect(matchesLens(a, "signin", managedNoCred)).toBe(true);
    expect(matchesLens(a, "signin", hostedMcpNoCred)).toBe(true);
    expect(matchesLens(a, "setup", hostedMcpNoCred)).toBe(false);
    expect(matchesLens(a, "key", botNoCred)).toBe(true);
    expect(matchesLens(a, "builtin", undefined)).toBe(true);
  });

  it("applyLens filters one list and never forks it", () => {
    const apps = [app("github"), app("builtin-calc"), app("xero"), app("higgsfield")];
    const connectors = new Map<string, LensConnector>([
      ["github", oauthNoCred],
      ["xero", keyTested],
      ["higgsfield", hostedMcpNoCred],
    ]);
    expect(applyLens(apps, "all", connectors)).toHaveLength(4);
    expect(applyLens(apps, "connected", connectors).map((a) => a.slug)).toEqual(["xero"]);
    expect(applyLens(apps, "signin", connectors).map((a) => a.slug)).toEqual(["github", "higgsfield"]);
    expect(applyLens(apps, "setup", connectors).map((a) => a.slug)).toEqual([]);
    expect(applyLens(apps, "builtin", connectors).map((a) => a.slug)).toEqual(["builtin-calc"]);
  });

  it("lensCounts agrees with applyLens for every lens", () => {
    const apps = [app("github"), app("builtin-calc"), app("xero"), app("slack")];
    const connectors = new Map<string, LensConnector>([
      ["github", oauthNoCred],
      ["xero", keyTested],
      ["slack", botNoCred],
    ]);
    const counts = lensCounts(apps, connectors);
    for (const { id } of LENSES) {
      expect(counts[id], `count for ${id}`).toBe(applyLens(apps, id, connectors).length);
    }
  });

  it("parseAppLens is safe on junk", () => {
    expect(parseAppLens("connected")).toBe("connected");
    expect(parseAppLens("setup")).toBe("setup");
    expect(parseAppLens("banana")).toBe("all");
    expect(parseAppLens(null)).toBe("all");
  });

  it("popular slugs are lowercase slug-shaped", () => {
    for (const slug of POPULAR_SLUGS) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("keeps everyday file and mail connectors in Popular", () => {
    expect([...POPULAR_SLUGS]).toEqual(expect.arrayContaining([
      "gmail",
      "google-drive",
      "dropbox",
      "onedrive",
    ]));
  });
});
