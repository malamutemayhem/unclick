import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  triggerSessionInspection,
  isSessionInspectionEnabled,
  resetSessionInspectionThrottle,
} from "../session-inspection-trigger.js";

describe("session inspection trigger", () => {
  const realFetch = globalThis.fetch;
  let calls: Array<{ url: string; init: RequestInit | undefined }>;
  let reject = false;

  beforeEach(() => {
    resetSessionInspectionThrottle();
    delete process.env.UNCLICK_SESSION_INSPECTION;
    delete process.env.CRON_SECRET;
    calls = [];
    reject = false;
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), init });
      if (reject) throw new Error("network down");
      return new Response("{}", { status: 200 });
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it("is off by default", () => {
    assert.equal(isSessionInspectionEnabled(), false);
    triggerSessionInspection();
    assert.equal(calls.length, 0);
  });

  it("does nothing when enabled but no CRON_SECRET is set", () => {
    process.env.UNCLICK_SESSION_INSPECTION = "1";
    triggerSessionInspection();
    assert.equal(calls.length, 0);
  });

  it("fires once when enabled with a secret", () => {
    process.env.UNCLICK_SESSION_INSPECTION = "1";
    process.env.CRON_SECRET = "secret";
    triggerSessionInspection(1_000);
    assert.equal(calls.length, 1);
    assert.ok(calls[0].url.includes("/api/eval-inspection"));
    assert.deepEqual((calls[0].init as RequestInit).headers, { Authorization: "Bearer secret" });
  });

  it("throttles repeated calls within the interval", () => {
    process.env.UNCLICK_SESSION_INSPECTION = "1";
    process.env.CRON_SECRET = "secret";
    triggerSessionInspection(1_000);
    triggerSessionInspection(2_000); // within 60s window
    assert.equal(calls.length, 1);
    triggerSessionInspection(1_000 + 61_000); // past the window
    assert.equal(calls.length, 2);
  });

  it("never throws even if fetch rejects", () => {
    process.env.UNCLICK_SESSION_INSPECTION = "1";
    process.env.CRON_SECRET = "secret";
    reject = true;
    assert.doesNotThrow(() => triggerSessionInspection(5_000));
  });
});
