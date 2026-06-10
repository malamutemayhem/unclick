import { describe, expect, it } from "vitest";

import {
  notConnected,
  unclickNotConfigured,
  type NotConnectedOptions,
} from "../connection-help.js";

describe("notConnected", () => {
  const baseOpts: NotConnectedOptions = {
    connector: "stripe",
  };

  it("returns a structured not_connected result", () => {
    const result = notConnected(baseOpts);
    expect(result.not_connected).toBe(true);
    expect(result.connector).toBe("stripe");
    expect(result.error).toContain("Stripe");
    expect(result.how_to_connect.length).toBeGreaterThan(0);
  });

  it("title-cases the connector name by default", () => {
    const result = notConnected({ connector: "google-drive" });
    expect(result.error).toContain("Google Drive");
  });

  it("uses displayName when provided", () => {
    const result = notConnected({ connector: "gd", displayName: "Google Drive" });
    expect(result.error).toContain("Google Drive");
  });

  it("includes keychain_secure_connect step", () => {
    const result = notConnected(baseOpts);
    expect(result.how_to_connect[0]).toContain("keychain_secure_connect");
    expect(result.how_to_connect[0]).toContain('platform="stripe"');
  });

  it("includes arg and envVar in one-off step", () => {
    const result = notConnected({
      connector: "stripe",
      arg: "secret_key",
      envVar: "STRIPE_SECRET_KEY",
    });
    const oneOff = result.how_to_connect.find((s) => s.includes("one-off"));
    expect(oneOff).toContain("secret_key");
    expect(oneOff).toContain("STRIPE_SECRET_KEY");
  });

  it("includes setupUrl step when provided", () => {
    const result = notConnected({
      connector: "stripe",
      setupUrl: "https://dashboard.stripe.com/apikeys",
    });
    const urlStep = result.how_to_connect.find((s) => s.includes("https://"));
    expect(urlStep).toContain("https://dashboard.stripe.com/apikeys");
  });

  it("includes note when provided", () => {
    const result = notConnected({
      connector: "stripe",
      note: "Test mode keys are fine for development.",
    });
    expect(result.how_to_connect).toContain("Test mode keys are fine for development.");
  });

  it("omits one-off step when no arg or envVar", () => {
    const result = notConnected({ connector: "stripe" });
    const oneOff = result.how_to_connect.find((s) => s.includes("one-off"));
    expect(oneOff).toBeUndefined();
  });

  it("uses custom credential name", () => {
    const result = notConnected({ connector: "stripe", credential: "secret key" });
    expect(result.error).toContain("secret key");
    expect(result.how_to_connect[0]).toContain("secret key");
  });
});

describe("unclickNotConfigured", () => {
  it("returns a structured not_connected result", () => {
    const result = unclickNotConfigured();
    expect(result.not_connected).toBe(true);
    expect(result.connector).toBe("unclick");
  });

  it("mentions UNCLICK_API_KEY in error", () => {
    const result = unclickNotConfigured();
    expect(result.error).toContain("UNCLICK_API_KEY");
  });

  it("provides setup steps", () => {
    const result = unclickNotConfigured();
    expect(result.how_to_connect.length).toBe(2);
    expect(result.how_to_connect[0]).toContain("UNCLICK_API_KEY");
  });

  it("references unclick.world", () => {
    const result = unclickNotConfigured();
    expect(result.how_to_connect[1]).toContain("unclick.world");
  });
});
