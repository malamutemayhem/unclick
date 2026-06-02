import { describe, expect, it } from "vitest";

import { notConnected } from "./connection-help.js";

describe("connection-help (shared connector onboarding)", () => {
  it("returns a consistent, machine-readable not-connected shape", () => {
    const r = notConnected({
      connector: "stripe",
      displayName: "Stripe",
      credential: "secret key",
      arg: "secret_key",
      envVar: "STRIPE_SECRET_KEY",
      setupUrl: "https://dashboard.stripe.com/apikeys",
    });

    expect(r.not_connected).toBe(true);
    expect(r.connector).toBe("stripe");
    expect(r.error).toMatch(/not connected to stripe/i);
    expect(Array.isArray(r.how_to_connect)).toBe(true);
  });

  it("leads with the per-account keychain path, then the direct fallback", () => {
    const r = notConnected({
      connector: "stripe",
      displayName: "Stripe",
      credential: "secret key",
      arg: "secret_key",
      envVar: "STRIPE_SECRET_KEY",
    });

    expect(r.how_to_connect[0]).toMatch(/keychain_secure_connect.*platform="stripe"/i);
    expect(r.how_to_connect.some((s) => /secret_key/.test(s) && /STRIPE_SECRET_KEY/.test(s))).toBe(true);
  });

  it("omits the direct line when neither arg nor env var is given", () => {
    const r = notConnected({ connector: "figma", displayName: "Figma", credential: "token" });
    expect(r.how_to_connect.some((s) => /one-off call/i.test(s))).toBe(false);
  });

  it("includes the setup URL when provided", () => {
    const r = notConnected({
      connector: "etsy",
      credential: "API key",
      setupUrl: "https://www.etsy.com/developers/your-apps",
    });
    expect(r.how_to_connect.some((s) => s.includes("etsy.com/developers"))).toBe(true);
  });

  it("title-cases the connector id when no display name is given", () => {
    const r = notConnected({ connector: "coin_market_cap" });
    expect(r.error).toMatch(/not connected to coin market cap/i);
  });

  it("never leaks a secret value (it only formats guidance)", () => {
    const r = notConnected({ connector: "stripe", arg: "secret_key", envVar: "STRIPE_SECRET_KEY" });
    const blob = JSON.stringify(r);
    expect(blob).not.toMatch(/sk_live|sk_test/);
  });
});
