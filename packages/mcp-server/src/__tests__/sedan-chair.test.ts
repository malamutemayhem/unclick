import { describe, it, expect } from "vitest";
import {
  poleWeight, seatHeight, cabinClearance, bearerLoadKg,
  uphillFactor, restFrequencyMin, curtainFabricM2,
  decorationLevel, hiringCostPerHour, chairStyles,
} from "../sedan-chair.js";

describe("poleWeight", () => {
  it("bamboo lightest", () => {
    expect(poleWeight(3, "bamboo")).toBeLessThan(poleWeight(3, "oak"));
  });
});

describe("seatHeight", () => {
  it("25% of user height", () => {
    expect(seatHeight(180)).toBe(45);
  });
});

describe("cabinClearance", () => {
  it("positive cm", () => {
    expect(cabinClearance(180)).toBeGreaterThan(0);
  });
});

describe("bearerLoadKg", () => {
  it("even split", () => {
    expect(bearerLoadKg(200, 4)).toBe(50);
  });
  it("zero bearers = 0", () => {
    expect(bearerLoadKg(200, 0)).toBe(0);
  });
});

describe("uphillFactor", () => {
  it("increases with gradient", () => {
    expect(uphillFactor(10)).toBeGreaterThan(uphillFactor(0));
  });
});

describe("restFrequencyMin", () => {
  it("shorter for heavy loads", () => {
    expect(restFrequencyMin(50, 25)).toBeLessThan(restFrequencyMin(20, 25));
  });
});

describe("curtainFabricM2", () => {
  it("positive m2", () => {
    expect(curtainFabricM2(100, 60)).toBeGreaterThan(0);
  });
});

describe("decorationLevel", () => {
  it("royal highest", () => {
    expect(decorationLevel("royal")).toBeGreaterThan(decorationLevel("open"));
  });
});

describe("hiringCostPerHour", () => {
  it("royal most expensive", () => {
    expect(hiringCostPerHour("royal")).toBeGreaterThan(hiringCostPerHour("open"));
  });
});

describe("chairStyles", () => {
  it("returns 5 styles", () => {
    expect(chairStyles()).toHaveLength(5);
  });
});
