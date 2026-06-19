import { afterEach, describe, expect, it } from "vitest";

import { CONNECTOR_SETUP, notConnectedFor, requireCredential } from "./connector-setup.js";

describe("connector-setup registry + resolver", () => {
  const savedEnv = { ...process.env };
  afterEach(() => {
    process.env = { ...savedEnv };
  });

  it("builds a guided not-connected result from a registry row", () => {
    const r = notConnectedFor("stripe");
    expect(r.not_connected).toBe(true);
    expect(r.connector).toBe("stripe");
    expect(r.error).toMatch(/not connected to stripe/i);
    expect(r.how_to_connect[0]).toMatch(/keychain_secure_connect.*platform="stripe"/i);
  });

  it("still produces a sensible message for an unregistered connector", () => {
    const r = notConnectedFor("brand_new_thing");
    expect(r.error).toMatch(/not connected to brand new thing/i);
    expect(r.how_to_connect[0]).toMatch(/keychain_secure_connect.*platform="brand_new_thing"/i);
  });

  it("requireCredential returns the value from args", () => {
    const v = requireCredential("stripe", { secret_key: "sk_test_123" });
    expect(v).toBe("sk_test_123");
  });

  it("requireCredential falls back to the documented env var", () => {
    delete process.env.STRIPE_SECRET_KEY;
    process.env.STRIPE_SECRET_KEY = "sk_test_env";
    const v = requireCredential("stripe", {});
    expect(v).toBe("sk_test_env");
  });

  it("requireCredential returns a not-connected result when nothing is set", () => {
    delete process.env.STRIPE_SECRET_KEY;
    const v = requireCredential("stripe", {});
    expect(typeof v).not.toBe("string");
    expect((v as { not_connected?: boolean }).not_connected).toBe(true);
  });

  it("every registry row declares enough to guide a connection", () => {
    for (const [id, row] of Object.entries(CONNECTOR_SETUP)) {
      expect(row.displayName, `${id} displayName`).toBeTruthy();
      // A connector must offer at least one way in: an arg or an env var.
      expect(Boolean(row.arg || row.envVar), `${id} arg or envVar`).toBe(true);
    }
  });

  it("points Higgsfield setup at the UnClick sign-in path and keeps API keys as fallback", () => {
    const r = notConnectedFor("higgsfield");
    expect(CONNECTOR_SETUP.higgsfield.setupUrl).toBe("https://unclick.world/admin/apps?lens=signin");
    expect(r.how_to_connect.join(" ")).toContain("Connect Higgsfield from UnClick Apps");
    expect(r.how_to_connect.join(" ")).toContain("Cloud API key is optional fallback only");
    expect(r.how_to_connect.join(" ")).toContain("HIGGSFIELD_API_KEY");
  });

  it("names Vercel and Supabase hosted MCP sign-ins as separate from UnClick credentials", () => {
    const vercel = notConnectedFor("vercel");
    const supabase = notConnectedFor("supabase");
    expect(vercel.how_to_connect.join(" ")).toContain("https://mcp.vercel.com");
    expect(vercel.how_to_connect.join(" ")).toContain("separate OAuth sign-in path outside UnClick");
    expect(supabase.how_to_connect.join(" ")).toContain("https://mcp.supabase.com/mcp");
    expect(supabase.how_to_connect.join(" ")).toContain("do not hand that developer MCP connection to app customers");
  });
});
