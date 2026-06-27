import { describe, it, expect } from "vitest";
import {
  totalHours, peakTempCelsius, crackRisk,
  moistureTolerance, energyCost, automated,
  thickPieceSafe, bestClayBody, skillLevel, bisqueSchedules,
} from "../bisque-firing-calc.js";

describe("totalHours", () => {
  it("slow bisque takes longest", () => {
    expect(totalHours("slow_bisque")).toBeGreaterThan(
      totalHours("fast_bisque")
    );
  });
});

describe("peakTempCelsius", () => {
  it("slow bisque reaches full temp", () => {
    expect(peakTempCelsius("slow_bisque")).toBeGreaterThan(
      peakTempCelsius("candling")
    );
  });
});

describe("crackRisk", () => {
  it("fast bisque has most crack risk", () => {
    expect(crackRisk("fast_bisque")).toBeGreaterThan(
      crackRisk("slow_bisque")
    );
  });
});

describe("moistureTolerance", () => {
  it("candling tolerates most moisture", () => {
    expect(moistureTolerance("candling")).toBeGreaterThan(
      moistureTolerance("fast_bisque")
    );
  });
});

describe("energyCost", () => {
  it("slow bisque costs most energy", () => {
    expect(energyCost("slow_bisque")).toBeGreaterThan(
      energyCost("candling")
    );
  });
});

describe("automated", () => {
  it("slow bisque is automated", () => {
    expect(automated("slow_bisque")).toBe(true);
  });
  it("candling is not", () => {
    expect(automated("candling")).toBe(false);
  });
});

describe("thickPieceSafe", () => {
  it("slow bisque is safe for thick pieces", () => {
    expect(thickPieceSafe("slow_bisque")).toBe(true);
  });
  it("fast bisque is not", () => {
    expect(thickPieceSafe("fast_bisque")).toBe(false);
  });
});

describe("bestClayBody", () => {
  it("slow bisque best for porcelain", () => {
    expect(bestClayBody("slow_bisque")).toBe("porcelain");
  });
});

describe("skillLevel", () => {
  it("ramp soak requires most skill", () => {
    expect(skillLevel("ramp_soak")).toBeGreaterThan(
      skillLevel("candling")
    );
  });
});

describe("bisqueSchedules", () => {
  it("returns 5 schedules", () => {
    expect(bisqueSchedules()).toHaveLength(5);
  });
});
