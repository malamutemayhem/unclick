import { describe, it, expect } from "vitest";
import {
  anestheticDepth, controlPrecision, recoverySpeed, monitoringComplexity,
  drugCost, requiresIntubation, suitableForFieldUse, deliveryRoute,
  bestProcedure, vetAnesthesias,
} from "../vet-anesthesia-calc.js";

describe("anestheticDepth", () => {
  it("inhalant deepest anesthesia", () => {
    expect(anestheticDepth("inhalant")).toBeGreaterThan(anestheticDepth("local_block"));
  });
});

describe("controlPrecision", () => {
  it("inhalant most precise control", () => {
    expect(controlPrecision("inhalant")).toBeGreaterThan(controlPrecision("injectable"));
  });
});

describe("recoverySpeed", () => {
  it("local block fastest recovery", () => {
    expect(recoverySpeed("local_block")).toBeGreaterThan(recoverySpeed("injectable"));
  });
});

describe("monitoringComplexity", () => {
  it("inhalant most complex monitoring", () => {
    expect(monitoringComplexity("inhalant")).toBeGreaterThan(monitoringComplexity("local_block"));
  });
});

describe("drugCost", () => {
  it("total iv most expensive drugs", () => {
    expect(drugCost("total_iv")).toBeGreaterThan(drugCost("local_block"));
  });
});

describe("requiresIntubation", () => {
  it("inhalant requires intubation", () => {
    expect(requiresIntubation("inhalant")).toBe(true);
  });
  it("injectable does not", () => {
    expect(requiresIntubation("injectable")).toBe(false);
  });
});

describe("suitableForFieldUse", () => {
  it("injectable suitable for field use", () => {
    expect(suitableForFieldUse("injectable")).toBe(true);
  });
  it("inhalant is not", () => {
    expect(suitableForFieldUse("inhalant")).toBe(false);
  });
});

describe("deliveryRoute", () => {
  it("epidural uses spinal canal catheter", () => {
    expect(deliveryRoute("epidural")).toBe("spinal_canal_catheter");
  });
});

describe("bestProcedure", () => {
  it("inhalant for major surgery long duration", () => {
    expect(bestProcedure("inhalant")).toBe("major_surgery_long_duration");
  });
});

describe("vetAnesthesias", () => {
  it("returns 5 types", () => {
    expect(vetAnesthesias()).toHaveLength(5);
  });
});
