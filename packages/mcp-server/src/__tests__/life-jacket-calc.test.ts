import { describe, it, expect } from "vitest";
import {
  buoyancyForce, mobilityRange, wearComfort, turnFaceUp,
  jacketCost, uscgApproved, inherentFloat, closureType,
  bestWater, lifeJackets,
} from "../life-jacket-calc.js";

describe("buoyancyForce", () => {
  it("offshore type 1 most buoyant", () => {
    expect(buoyancyForce("offshore_type_1")).toBeGreaterThan(buoyancyForce("flotation_aid_type_3"));
  });
});

describe("mobilityRange", () => {
  it("inflatable belt most mobile", () => {
    expect(mobilityRange("inflatable_belt")).toBeGreaterThan(mobilityRange("offshore_type_1"));
  });
});

describe("wearComfort", () => {
  it("inflatable belt most comfortable", () => {
    expect(wearComfort("inflatable_belt")).toBeGreaterThan(wearComfort("offshore_type_1"));
  });
});

describe("turnFaceUp", () => {
  it("offshore type 1 best face up turn", () => {
    expect(turnFaceUp("offshore_type_1")).toBeGreaterThan(turnFaceUp("flotation_aid_type_3"));
  });
});

describe("jacketCost", () => {
  it("inflatable belt most expensive", () => {
    expect(jacketCost("inflatable_belt")).toBeGreaterThan(jacketCost("throwable_type_4"));
  });
});

describe("uscgApproved", () => {
  it("offshore type 1 is uscg approved", () => {
    expect(uscgApproved("offshore_type_1")).toBe(true);
  });
  it("inflatable belt is also uscg approved", () => {
    expect(uscgApproved("inflatable_belt")).toBe(true);
  });
});

describe("inherentFloat", () => {
  it("offshore type 1 has inherent float", () => {
    expect(inherentFloat("offshore_type_1")).toBe(true);
  });
  it("inflatable belt does not", () => {
    expect(inherentFloat("inflatable_belt")).toBe(false);
  });
});

describe("closureType", () => {
  it("inflatable belt uses waist clip pull tab", () => {
    expect(closureType("inflatable_belt")).toBe("waist_clip_pull_tab");
  });
});

describe("bestWater", () => {
  it("offshore type 1 for open ocean rough sea", () => {
    expect(bestWater("offshore_type_1")).toBe("open_ocean_rough_sea");
  });
});

describe("lifeJackets", () => {
  it("returns 5 types", () => {
    expect(lifeJackets()).toHaveLength(5);
  });
});
