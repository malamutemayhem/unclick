import { describe, it, expect, afterEach } from "vitest";
import { mightBeGated, isXGateEnforceEnabled, xgatePreflight } from "./xgate-preflight.js";

describe("mightBeGated (cheap name-based prefilter)", () => {
  it("skips ordinary benign tools so they never pay the network hop", () => {
    expect(mightBeGated("datetime_current_time")).toBe(false);
    expect(mightBeGated("weather_current")).toBe(false);
    expect(mightBeGated("crypto_price")).toBe(false);
    expect(mightBeGated("load_memory")).toBe(false);
  });

  it("flags risk-relevant tools so the API makes the authoritative call", () => {
    expect(mightBeGated("email_send")).toBe(true);
    expect(mightBeGated("neon_execute_sql")).toBe(true);
    expect(mightBeGated("github_action")).toBe(true);
    expect(mightBeGated("telegram_send")).toBe(true);
    expect(mightBeGated("deploy_to_vercel")).toBe(true);
    expect(mightBeGated("slack_action")).toBe(true);
  });
});

describe("xgatePreflight gating", () => {
  const original = process.env.UNCLICK_XGATE_ENFORCE;
  afterEach(() => {
    if (original === undefined) delete process.env.UNCLICK_XGATE_ENFORCE;
    else process.env.UNCLICK_XGATE_ENFORCE = original;
  });

  it("returns null (proceed) when enforcement is off", async () => {
    delete process.env.UNCLICK_XGATE_ENFORCE;
    expect(isXGateEnforceEnabled()).toBe(false);
    expect(await xgatePreflight("email_send", {})).toBeNull();
  });

  it("short-circuits benign tools without a network call even when enforcing", async () => {
    process.env.UNCLICK_XGATE_ENFORCE = "1";
    // The benign prefilter returns null before any fetch is attempted.
    expect(await xgatePreflight("datetime_current_time", {})).toBeNull();
  });
});
