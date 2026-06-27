import { describe, it, expect } from "vitest";
import {
  glossLevel, durabilityMonths, applicationEase, waterBeading,
  waxCost, uvProtection, fillsSwirls, applicationMethod,
  bestFor, carWaxes,
} from "../car-wax-calc.js";

describe("glossLevel", () => {
  it("carnauba paste highest gloss", () => {
    expect(glossLevel("carnauba_paste")).toBeGreaterThan(glossLevel("spray_quick"));
  });
});

describe("durabilityMonths", () => {
  it("ceramic coating longest durability", () => {
    expect(durabilityMonths("ceramic_coating")).toBeGreaterThan(durabilityMonths("spray_quick"));
  });
});

describe("applicationEase", () => {
  it("spray quick easiest application", () => {
    expect(applicationEase("spray_quick")).toBeGreaterThan(applicationEase("ceramic_coating"));
  });
});

describe("waterBeading", () => {
  it("ceramic coating best water beading", () => {
    expect(waterBeading("ceramic_coating")).toBeGreaterThan(waterBeading("spray_quick"));
  });
});

describe("waxCost", () => {
  it("ceramic coating most expensive", () => {
    expect(waxCost("ceramic_coating")).toBeGreaterThan(waxCost("spray_quick"));
  });
});

describe("uvProtection", () => {
  it("carnauba paste has uv protection", () => {
    expect(uvProtection("carnauba_paste")).toBe(true);
  });
  it("spray quick does not", () => {
    expect(uvProtection("spray_quick")).toBe(false);
  });
});

describe("fillsSwirls", () => {
  it("carnauba paste fills swirls", () => {
    expect(fillsSwirls("carnauba_paste")).toBe(true);
  });
  it("ceramic coating does not", () => {
    expect(fillsSwirls("ceramic_coating")).toBe(false);
  });
});

describe("applicationMethod", () => {
  it("ceramic coating uses microfiber applicator cure", () => {
    expect(applicationMethod("ceramic_coating")).toBe("microfiber_applicator_cure");
  });
});

describe("bestFor", () => {
  it("carnauba paste for show car deep warm glow", () => {
    expect(bestFor("carnauba_paste")).toBe("show_car_deep_warm_glow");
  });
});

describe("carWaxes", () => {
  it("returns 5 types", () => {
    expect(carWaxes()).toHaveLength(5);
  });
});
