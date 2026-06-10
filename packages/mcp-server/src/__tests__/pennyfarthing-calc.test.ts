import { describe, it, expect } from "vitest";
import {
  gearRatio, speedKmh, wheelCircumference, seatHeight,
  spokeCount, spokeLength, headerRisk, mountingStep,
  weightKg, brakingDistance, frameMaterials,
} from "../pennyfarthing-calc.js";

describe("gearRatio", () => {
  it("front / rear", () => {
    expect(gearRatio(60, 12)).toBe(5);
  });
  it("zero rear = 0", () => {
    expect(gearRatio(60, 0)).toBe(0);
  });
});

describe("speedKmh", () => {
  it("positive speed", () => {
    expect(speedKmh(1.5, 60)).toBeGreaterThan(0);
  });
});

describe("wheelCircumference", () => {
  it("positive cm", () => {
    expect(wheelCircumference(52)).toBeGreaterThan(0);
  });
});

describe("seatHeight", () => {
  it("higher than wheel diameter", () => {
    expect(seatHeight(52)).toBeGreaterThan(52 * 2.54);
  });
});

describe("spokeCount", () => {
  it("more for large wheel", () => {
    expect(spokeCount(52)).toBeGreaterThan(spokeCount(36));
  });
});

describe("spokeLength", () => {
  it("rim minus hub", () => {
    expect(spokeLength(5, 30)).toBe(25);
  });
});

describe("headerRisk", () => {
  it("low at slow speed", () => {
    expect(headerRisk(5, 0)).toBe("low");
  });
  it("high at fast speed", () => {
    expect(headerRisk(30, 5)).toBe("high");
  });
});

describe("mountingStep", () => {
  it("40% of seat height", () => {
    expect(mountingStep(150)).toBe(60);
  });
});

describe("weightKg", () => {
  it("aluminum lightest", () => {
    expect(weightKg("aluminum", 52)).toBeLessThan(weightKg("wrought_iron", 52));
  });
});

describe("brakingDistance", () => {
  it("positive meters", () => {
    expect(brakingDistance(20, 0.6)).toBeGreaterThan(0);
  });
  it("zero friction = 0", () => {
    expect(brakingDistance(20, 0)).toBe(0);
  });
});

describe("frameMaterials", () => {
  it("returns 4 materials", () => {
    expect(frameMaterials()).toHaveLength(4);
  });
});
