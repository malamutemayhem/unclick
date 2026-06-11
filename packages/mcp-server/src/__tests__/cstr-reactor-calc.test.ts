import { describe, it, expect } from "vitest";
import {
  mixing, heatControl, scalability, flexibility,
  crCost, continuous, forExotherm, agitator,
  bestUse, cstrReactorTypes,
} from "../cstr-reactor-calc.js";

describe("mixing", () => {
  it("loop reactor best mixing", () => {
    expect(mixing("loop_reactor_recycle")).toBeGreaterThan(mixing("cascade_multi_stage"));
  });
});

describe("heatControl", () => {
  it("loop reactor best heat control", () => {
    expect(heatControl("loop_reactor_recycle")).toBeGreaterThan(heatControl("gas_sparged_cstr"));
  });
});

describe("scalability", () => {
  it("cascade multi stage most scalable", () => {
    expect(scalability("cascade_multi_stage")).toBeGreaterThan(scalability("standard_batch_cstr"));
  });
});

describe("flexibility", () => {
  it("standard batch most flexible", () => {
    expect(flexibility("standard_batch_cstr")).toBeGreaterThan(flexibility("loop_reactor_recycle"));
  });
});

describe("crCost", () => {
  it("loop reactor most expensive", () => {
    expect(crCost("loop_reactor_recycle")).toBeGreaterThan(crCost("standard_batch_cstr"));
  });
});

describe("continuous", () => {
  it("continuous stirred is continuous", () => {
    expect(continuous("continuous_stirred_overflow")).toBe(true);
  });
  it("standard batch not continuous", () => {
    expect(continuous("standard_batch_cstr")).toBe(false);
  });
});

describe("forExotherm", () => {
  it("loop reactor for exothermic", () => {
    expect(forExotherm("loop_reactor_recycle")).toBe(true);
  });
  it("gas sparged not for exothermic", () => {
    expect(forExotherm("gas_sparged_cstr")).toBe(false);
  });
});

describe("agitator", () => {
  it("gas sparged uses sparger ring", () => {
    expect(agitator("gas_sparged_cstr")).toBe("gas_sparger_ring_self_aspirate_impeller");
  });
});

describe("bestUse", () => {
  it("loop reactor for highly exothermic", () => {
    expect(bestUse("loop_reactor_recycle")).toBe("highly_exothermic_polymerize_gas_absorb");
  });
});

describe("cstrReactorTypes", () => {
  it("returns 5 types", () => {
    expect(cstrReactorTypes()).toHaveLength(5);
  });
});
