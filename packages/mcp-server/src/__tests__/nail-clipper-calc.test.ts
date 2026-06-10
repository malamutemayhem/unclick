import { describe, it, expect } from "vitest";
import {
  cuttingPrecision, easeOfUse, thickNailAbility, portability,
  clipperCost, catchesClippings, needsBattery, bladeShape,
  bestNail, nailClippers,
} from "../nail-clipper-calc.js";

describe("cuttingPrecision", () => {
  it("scissor curved most precise", () => {
    expect(cuttingPrecision("scissor_curved")).toBeGreaterThan(cuttingPrecision("wide_jaw_toenail"));
  });
});

describe("easeOfUse", () => {
  it("lever standard easiest to use", () => {
    expect(easeOfUse("lever_standard")).toBeGreaterThan(easeOfUse("scissor_curved"));
  });
});

describe("thickNailAbility", () => {
  it("wide jaw toenail best for thick nails", () => {
    expect(thickNailAbility("wide_jaw_toenail")).toBeGreaterThan(thickNailAbility("electric_rotary"));
  });
});

describe("portability", () => {
  it("lever standard most portable", () => {
    expect(portability("lever_standard")).toBeGreaterThan(portability("electric_rotary"));
  });
});

describe("clipperCost", () => {
  it("electric rotary most expensive", () => {
    expect(clipperCost("electric_rotary")).toBeGreaterThan(clipperCost("lever_standard"));
  });
});

describe("catchesClippings", () => {
  it("lever standard catches clippings", () => {
    expect(catchesClippings("lever_standard")).toBe(true);
  });
  it("guillotine plier does not", () => {
    expect(catchesClippings("guillotine_plier")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("electric rotary needs battery", () => {
    expect(needsBattery("electric_rotary")).toBe(true);
  });
  it("lever standard does not", () => {
    expect(needsBattery("lever_standard")).toBe(false);
  });
});

describe("bladeShape", () => {
  it("guillotine plier uses compound lever plier", () => {
    expect(bladeShape("guillotine_plier")).toBe("compound_lever_plier");
  });
});

describe("bestNail", () => {
  it("wide jaw toenail for thick toenail elderly", () => {
    expect(bestNail("wide_jaw_toenail")).toBe("thick_toenail_elderly");
  });
});

describe("nailClippers", () => {
  it("returns 5 types", () => {
    expect(nailClippers()).toHaveLength(5);
  });
});
