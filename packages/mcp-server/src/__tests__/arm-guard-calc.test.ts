import { describe, it, expect } from "vitest";
import {
  protection, comfort, breathability, stayInPlace,
  guardCost, adjustable, fullForearm, guardMaterial,
  bestArcher, armGuards,
} from "../arm-guard-calc.js";

describe("protection", () => {
  it("carbon fiber pro highest protection", () => {
    expect(protection("carbon_fiber_pro")).toBeGreaterThan(protection("fabric_elastic_sleeve"));
  });
});

describe("comfort", () => {
  it("fabric elastic sleeve most comfortable", () => {
    expect(comfort("fabric_elastic_sleeve")).toBeGreaterThan(comfort("medieval_bracer_style"));
  });
});

describe("breathability", () => {
  it("fabric elastic sleeve most breathable", () => {
    expect(breathability("fabric_elastic_sleeve")).toBeGreaterThan(breathability("medieval_bracer_style"));
  });
});

describe("stayInPlace", () => {
  it("fabric elastic sleeve stays best", () => {
    expect(stayInPlace("fabric_elastic_sleeve")).toBeGreaterThan(stayInPlace("plastic_vented_short"));
  });
});

describe("guardCost", () => {
  it("carbon fiber pro most expensive", () => {
    expect(guardCost("carbon_fiber_pro")).toBeGreaterThan(guardCost("plastic_vented_short"));
  });
});

describe("adjustable", () => {
  it("leather traditional long is adjustable", () => {
    expect(adjustable("leather_traditional_long")).toBe(true);
  });
  it("fabric elastic sleeve is not", () => {
    expect(adjustable("fabric_elastic_sleeve")).toBe(false);
  });
});

describe("fullForearm", () => {
  it("leather traditional long covers full forearm", () => {
    expect(fullForearm("leather_traditional_long")).toBe(true);
  });
  it("plastic vented short does not", () => {
    expect(fullForearm("plastic_vented_short")).toBe(false);
  });
});

describe("guardMaterial", () => {
  it("carbon fiber pro uses carbon fiber laminate", () => {
    expect(guardMaterial("carbon_fiber_pro")).toBe("carbon_fiber_laminate");
  });
});

describe("bestArcher", () => {
  it("carbon fiber pro best for olympic competitive", () => {
    expect(bestArcher("carbon_fiber_pro")).toBe("olympic_competitive");
  });
});

describe("armGuards", () => {
  it("returns 5 types", () => {
    expect(armGuards()).toHaveLength(5);
  });
});
