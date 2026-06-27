import { describe, it, expect } from "vitest";
import {
  carbonMark, colorVariety, tempControl, smokePattern,
  fireCost, wrapped, organic, fuelType,
  bestUse, pitFires,
} from "../pit-fire-calc.js";

describe("carbonMark", () => {
  it("sawdust pit slow strongest carbon mark", () => {
    expect(carbonMark("sawdust_pit_slow")).toBeGreaterThan(carbonMark("dung_fuel_earthy"));
  });
});

describe("colorVariety", () => {
  it("seaweed pit salt widest color variety", () => {
    expect(colorVariety("seaweed_pit_salt")).toBeGreaterThan(colorVariety("dung_fuel_earthy"));
  });
});

describe("tempControl", () => {
  it("sawdust pit slow best temp control", () => {
    expect(tempControl("sawdust_pit_slow")).toBeGreaterThan(tempControl("open_pit_standard"));
  });
});

describe("smokePattern", () => {
  it("sawdust pit slow richest smoke pattern", () => {
    expect(smokePattern("sawdust_pit_slow")).toBeGreaterThan(smokePattern("open_pit_standard"));
  });
});

describe("fireCost", () => {
  it("sawdust pit slow most expensive", () => {
    expect(fireCost("sawdust_pit_slow")).toBeGreaterThan(fireCost("dung_fuel_earthy"));
  });
});

describe("wrapped", () => {
  it("seaweed pit salt is wrapped", () => {
    expect(wrapped("seaweed_pit_salt")).toBe(true);
  });
  it("open pit standard not wrapped", () => {
    expect(wrapped("open_pit_standard")).toBe(false);
  });
});

describe("organic", () => {
  it("open pit standard is organic", () => {
    expect(organic("open_pit_standard")).toBe(true);
  });
});

describe("fuelType", () => {
  it("sawdust pit slow uses fine sawdust pack", () => {
    expect(fuelType("sawdust_pit_slow")).toBe("fine_sawdust_pack");
  });
});

describe("bestUse", () => {
  it("open pit standard best for general pit fire", () => {
    expect(bestUse("open_pit_standard")).toBe("general_pit_fire");
  });
});

describe("pitFires", () => {
  it("returns 5 types", () => {
    expect(pitFires()).toHaveLength(5);
  });
});
