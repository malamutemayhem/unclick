import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CredentialTracker } from "../credential-tracker.js";

describe("CredentialTracker", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("tracks a credential", () => {
    const tracker = new CredentialTracker();
    tracker.track({ id: "gh", name: "GitHub Token", expiresAt: Date.now() + 86400000 });
    expect(tracker.size).toBe(1);
  });

  it("reports valid status for fresh credential", () => {
    const tracker = new CredentialTracker();
    const now = Date.now();
    tracker.track({ id: "gh", name: "GitHub", expiresAt: now + 30 * 86400000 });
    const report = tracker.getStatus("gh", now);
    expect(report?.status).toBe("valid");
  });

  it("reports expiring_soon when within warn window", () => {
    const tracker = new CredentialTracker();
    const now = Date.now();
    tracker.track({
      id: "gh",
      name: "GitHub",
      expiresAt: now + 3 * 86400000,
      warnBeforeMs: 7 * 86400000,
    });
    const report = tracker.getStatus("gh", now);
    expect(report?.status).toBe("expiring_soon");
  });

  it("reports expired when past expiry", () => {
    const tracker = new CredentialTracker();
    const now = Date.now();
    tracker.track({ id: "gh", name: "GitHub", expiresAt: now - 1000 });
    const report = tracker.getStatus("gh", now);
    expect(report?.status).toBe("expired");
    expect(report?.remainingMs).toBe(0);
  });

  it("returns undefined for unknown id", () => {
    const tracker = new CredentialTracker();
    expect(tracker.getStatus("nope")).toBeUndefined();
  });

  it("untracks a credential", () => {
    const tracker = new CredentialTracker();
    tracker.track({ id: "gh", name: "GitHub", expiresAt: Date.now() + 86400000 });
    expect(tracker.untrack("gh")).toBe(true);
    expect(tracker.size).toBe(0);
    expect(tracker.untrack("gh")).toBe(false);
  });

  it("markRotated updates expiry and records rotation time", () => {
    const tracker = new CredentialTracker();
    const now = Date.now();
    tracker.track({ id: "gh", name: "GitHub", expiresAt: now - 1000 });
    tracker.markRotated("gh", now + 30 * 86400000);
    const report = tracker.getStatus("gh", now);
    expect(report?.status).toBe("valid");
  });

  it("accepts Date objects for expiresAt", () => {
    const tracker = new CredentialTracker();
    const future = new Date(Date.now() + 30 * 86400000);
    tracker.track({ id: "gh", name: "GitHub", expiresAt: future });
    expect(tracker.getStatus("gh")?.status).toBe("valid");
  });

  it("getExpired returns only expired credentials", () => {
    const tracker = new CredentialTracker();
    const now = Date.now();
    tracker.track({ id: "a", name: "A", expiresAt: now - 1000 });
    tracker.track({ id: "b", name: "B", expiresAt: now + 86400000 });
    const expired = tracker.getExpired(now);
    expect(expired).toHaveLength(1);
    expect(expired[0].id).toBe("a");
  });

  it("getExpiringSoon returns only soon-expiring credentials", () => {
    const tracker = new CredentialTracker();
    const now = Date.now();
    tracker.track({ id: "a", name: "A", expiresAt: now + 2 * 86400000, warnBeforeMs: 7 * 86400000 });
    tracker.track({ id: "b", name: "B", expiresAt: now + 30 * 86400000, warnBeforeMs: 7 * 86400000 });
    const expiring = tracker.getExpiringSoon(now);
    expect(expiring).toHaveLength(1);
    expect(expiring[0].id).toBe("a");
  });

  it("all returns every credential", () => {
    const tracker = new CredentialTracker();
    tracker.track({ id: "a", name: "A", expiresAt: Date.now() + 86400000 });
    tracker.track({ id: "b", name: "B", expiresAt: Date.now() + 86400000 });
    expect(tracker.all()).toHaveLength(2);
  });
});
