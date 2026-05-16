// src/components/HeartbeatOnboarding.test.tsx
//
// Logic-only tests for HeartbeatOnboarding. The pure logic (deriveStatus)
// is unit-tested directly; rendering tests need @testing-library/react,
// which the builder can add when the apps/jobsmith / src/components testing
// convention is in place.

import { describe, test, expect } from "vitest";
import { deriveStatus, type HeartbeatHealth } from "./HeartbeatOnboarding";

const NOW = new Date("2026-05-15T12:00:00Z");
const CADENCE = 10 * 60 * 1000; // 10 minutes

function isoMinus(ms: number): string {
  return new Date(NOW.getTime() - ms).toISOString();
}

describe("deriveStatus — health buckets", () => {
  test("never when lastTickAt is null", () => {
    expect(deriveStatus(null, CADENCE, NOW).health).toBe("never");
  });

  test("never when lastTickAt is unparseable", () => {
    expect(deriveStatus("not-a-date", CADENCE, NOW).health).toBe("never");
  });

  test("healthy when age < 1.2 * cadence", () => {
    expect(deriveStatus(isoMinus(CADENCE * 0.5), CADENCE, NOW).health).toBe("healthy");
    expect(deriveStatus(isoMinus(CADENCE * 1.1), CADENCE, NOW).health).toBe("healthy");
  });

  test("late when 1.2 * cadence <= age < 3 * cadence", () => {
    expect(deriveStatus(isoMinus(CADENCE * 1.5), CADENCE, NOW).health).toBe("late");
    expect(deriveStatus(isoMinus(CADENCE * 2.9), CADENCE, NOW).health).toBe("late");
  });

  test("stale when 3 * cadence <= age < 12 * cadence", () => {
    expect(deriveStatus(isoMinus(CADENCE * 4), CADENCE, NOW).health).toBe("stale");
    expect(deriveStatus(isoMinus(CADENCE * 11), CADENCE, NOW).health).toBe("stale");
  });

  test("dead when age >= 12 * cadence", () => {
    expect(deriveStatus(isoMinus(CADENCE * 20), CADENCE, NOW).health).toBe("dead");
  });
});

describe("deriveStatus — labels", () => {
  test("nextTickLabel is 'Next in ~Xm' when due in the future", () => {
    const r = deriveStatus(isoMinus(CADENCE * 0.5), CADENCE, NOW);
    expect(r.nextTickLabel).toMatch(/^Next in ~/);
  });

  test("nextTickLabel is 'Overdue by ~Xm' when past due", () => {
    const r = deriveStatus(isoMinus(CADENCE * 2), CADENCE, NOW);
    expect(r.nextTickLabel).toMatch(/^Overdue by /);
  });

  test("lastTickHuman uses 'just now' for very recent ticks", () => {
    const r = deriveStatus(isoMinus(3000), CADENCE, NOW);
    expect(r.lastTickHuman).toBe("just now");
  });

  test("lastTickHuman uses 's ago' for sub-minute ticks", () => {
    const r = deriveStatus(isoMinus(30_000), CADENCE, NOW);
    expect(r.lastTickHuman).toMatch(/\d+s ago$/);
  });

  test("lastTickHuman uses 'm ago' for minute-scale ticks", () => {
    const r = deriveStatus(isoMinus(5 * 60_000), CADENCE, NOW);
    expect(r.lastTickHuman).toMatch(/m ago$/);
  });

  test("lastTickHuman uses 'h ago' for hour-scale ticks", () => {
    const r = deriveStatus(isoMinus(3 * 60 * 60_000), CADENCE * 100, NOW);
    expect(r.lastTickHuman).toMatch(/h ago$/);
  });
});

describe("deriveStatus — ageMs", () => {
  test("ageMs is non-null and approximately correct", () => {
    const r = deriveStatus(isoMinus(60_000), CADENCE, NOW);
    expect(r.ageMs).toBeGreaterThan(59_000);
    expect(r.ageMs).toBeLessThan(61_000);
  });

  test("ageMs is null when health is never", () => {
    expect(deriveStatus(null, CADENCE, NOW).ageMs).toBeNull();
  });
});

describe("HeartbeatHealth value enumeration", () => {
  test("all expected health values are reachable", () => {
    const seen = new Set<HeartbeatHealth>();
    seen.add(deriveStatus(null, CADENCE, NOW).health);
    seen.add(deriveStatus(isoMinus(CADENCE * 0.5), CADENCE, NOW).health);
    seen.add(deriveStatus(isoMinus(CADENCE * 1.5), CADENCE, NOW).health);
    seen.add(deriveStatus(isoMinus(CADENCE * 5),   CADENCE, NOW).health);
    seen.add(deriveStatus(isoMinus(CADENCE * 20),  CADENCE, NOW).health);
    expect(seen).toEqual(new Set<HeartbeatHealth>(["never", "healthy", "late", "stale", "dead"]));
  });
});
