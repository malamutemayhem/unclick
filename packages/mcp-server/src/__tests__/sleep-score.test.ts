import { describe, it, expect } from "vitest";
import {
  createEntry, sleepDuration, sleepScore, sleepEfficiency,
  recommendedSleep, sleepDebt, averageSleepDuration,
  averageSleepScore, sleepConsistency, idealBedtime,
  sleepCycles, optimalWakeTimes, formatTime,
} from "../sleep-score.js";

describe("sleepDuration", () => {
  it("computes same-day duration", () => {
    const e = createEntry(22, 6);
    expect(sleepDuration(e)).toBeCloseTo(7.75);
  });

  it("handles overnight", () => {
    const e = createEntry(23, 7);
    expect(sleepDuration(e)).toBeCloseTo(7.75);
  });

  it("subtracts sleep latency", () => {
    const e = createEntry(22, 6, 0, 30);
    expect(sleepDuration(e)).toBeCloseTo(7.5);
  });
});

describe("sleepScore", () => {
  it("good sleep gets high score", () => {
    const e = createEntry(22, 6, 0, 10, 8);
    const score = sleepScore(e);
    expect(score).toBeGreaterThan(70);
  });

  it("poor sleep gets low score", () => {
    const e = createEntry(2, 5, 5, 60, 3);
    const score = sleepScore(e);
    expect(score).toBeLessThan(50);
  });
});

describe("sleepEfficiency", () => {
  it("high efficiency with low latency", () => {
    const e = createEntry(22, 6, 0, 0);
    expect(sleepEfficiency(e)).toBe(100);
  });

  it("lower with latency", () => {
    const e = createEntry(22, 6, 0, 60);
    expect(sleepEfficiency(e)).toBeLessThan(100);
  });
});

describe("recommendedSleep", () => {
  it("adults need 7-9 hours", () => {
    const rec = recommendedSleep(30);
    expect(rec.min).toBe(7);
    expect(rec.max).toBe(9);
  });

  it("teens need more", () => {
    const rec = recommendedSleep(15);
    expect(rec.min).toBe(8);
  });
});

describe("sleepDebt", () => {
  it("computes accumulated debt", () => {
    const entries = [
      createEntry(23, 5, 0, 0),
      createEntry(23, 5, 0, 0),
    ];
    const debt = sleepDebt(entries, 8);
    expect(debt).toBeCloseTo(4);
  });

  it("no debt with sufficient sleep", () => {
    const entries = [createEntry(22, 6, 0, 0)];
    expect(sleepDebt(entries, 7)).toBe(0);
  });
});

describe("averageSleepDuration", () => {
  it("computes average", () => {
    const entries = [
      createEntry(22, 6, 0, 0),
      createEntry(23, 7, 0, 0),
    ];
    expect(averageSleepDuration(entries)).toBe(8);
  });
});

describe("averageSleepScore", () => {
  it("averages scores", () => {
    const entries = [
      createEntry(22, 6, 0, 10, 8),
      createEntry(22, 6, 1, 15, 7),
    ];
    const avg = averageSleepScore(entries);
    expect(avg).toBeGreaterThan(0);
    expect(avg).toBeLessThanOrEqual(100);
  });
});

describe("sleepConsistency", () => {
  it("100 for consistent bedtime", () => {
    const entries = [
      createEntry(22, 6),
      createEntry(22, 6),
    ];
    expect(sleepConsistency(entries)).toBe(100);
  });

  it("lower for variable bedtime", () => {
    const entries = [
      createEntry(21, 6),
      createEntry(23, 6),
      createEntry(1, 6),
    ];
    expect(sleepConsistency(entries)).toBeLessThan(100);
  });
});

describe("idealBedtime", () => {
  it("computes bedtime for target hours", () => {
    expect(idealBedtime(6, 8)).toBe(22);
  });

  it("wraps around midnight", () => {
    expect(idealBedtime(5, 8)).toBe(21);
  });
});

describe("sleepCycles", () => {
  it("counts 90-min cycles", () => {
    expect(sleepCycles(7.5)).toBe(5);
  });
});

describe("optimalWakeTimes", () => {
  it("returns multiple wake times", () => {
    const times = optimalWakeTimes(22);
    expect(times.length).toBe(4);
    expect(times[0]).toBeCloseTo(2.5);
  });
});

describe("formatTime", () => {
  it("formats AM time", () => {
    expect(formatTime(6.5)).toBe("6:30 AM");
  });

  it("formats PM time", () => {
    expect(formatTime(14)).toBe("2:00 PM");
  });

  it("formats midnight", () => {
    expect(formatTime(0)).toBe("12:00 AM");
  });
});
