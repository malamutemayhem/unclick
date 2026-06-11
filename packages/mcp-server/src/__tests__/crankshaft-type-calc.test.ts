import { describe, it, expect } from "vitest";
import {
  strength, balance, weight, rpm,
  ckCost, forged, forPerformance, material,
  bestUse, crankshaftTypes,
} from "../crankshaft-type-calc.js";

describe("strength", () => {
  it("billet strongest", () => {
    expect(strength("billet_machined_racing")).toBeGreaterThan(strength("cast_iron_nodular"));
  });
});

describe("balance", () => {
  it("billet best balance", () => {
    expect(balance("billet_machined_racing")).toBeGreaterThan(balance("assembled_press_fit"));
  });
});

describe("weight", () => {
  it("billet lightest weight score highest", () => {
    expect(weight("billet_machined_racing")).toBeGreaterThan(weight("cast_iron_nodular"));
  });
});

describe("rpm", () => {
  it("billet highest rpm", () => {
    expect(rpm("billet_machined_racing")).toBeGreaterThan(rpm("cast_iron_nodular"));
  });
});

describe("ckCost", () => {
  it("billet most expensive", () => {
    expect(ckCost("billet_machined_racing")).toBeGreaterThan(ckCost("cast_iron_nodular"));
  });
});

describe("forged", () => {
  it("crossplane is forged", () => {
    expect(forged("forged_steel_crossplane")).toBe(true);
  });
  it("cast iron not forged", () => {
    expect(forged("cast_iron_nodular")).toBe(false);
  });
});

describe("forPerformance", () => {
  it("billet for performance", () => {
    expect(forPerformance("billet_machined_racing")).toBe(true);
  });
  it("cast iron not for performance", () => {
    expect(forPerformance("cast_iron_nodular")).toBe(false);
  });
});

describe("material", () => {
  it("assembled uses steel pin press", () => {
    expect(material("assembled_press_fit")).toBe("steel_pin_press_assembly");
  });
});

describe("bestUse", () => {
  it("crossplane for production v8", () => {
    expect(bestUse("forged_steel_crossplane")).toBe("production_v8_smooth_torque");
  });
});

describe("crankshaftTypes", () => {
  it("returns 5 types", () => {
    expect(crankshaftTypes()).toHaveLength(5);
  });
});
