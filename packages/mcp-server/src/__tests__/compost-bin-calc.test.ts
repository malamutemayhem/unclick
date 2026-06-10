import { describe, it, expect } from "vitest";
import {
  decompostSpeed, capacity, odorControl, maintenanceLevel,
  binCost, indoorSafe, acceptsMeat, processType,
  bestSetup, compostBins,
} from "../compost-bin-calc.js";

describe("decompostSpeed", () => {
  it("electric counter fastest decomposition", () => {
    expect(decompostSpeed("electric_counter")).toBeGreaterThan(decompostSpeed("stationary_open"));
  });
});

describe("capacity", () => {
  it("stationary open highest capacity", () => {
    expect(capacity("stationary_open")).toBeGreaterThan(capacity("electric_counter"));
  });
});

describe("odorControl", () => {
  it("electric counter best odor control", () => {
    expect(odorControl("electric_counter")).toBeGreaterThan(odorControl("stationary_open"));
  });
});

describe("maintenanceLevel", () => {
  it("electric counter lowest maintenance", () => {
    expect(maintenanceLevel("electric_counter")).toBeGreaterThan(maintenanceLevel("worm_vermi"));
  });
});

describe("binCost", () => {
  it("electric counter most expensive", () => {
    expect(binCost("electric_counter")).toBeGreaterThan(binCost("stationary_open"));
  });
});

describe("indoorSafe", () => {
  it("worm vermi is indoor safe", () => {
    expect(indoorSafe("worm_vermi")).toBe(true);
  });
  it("tumbler barrel is not", () => {
    expect(indoorSafe("tumbler_barrel")).toBe(false);
  });
});

describe("acceptsMeat", () => {
  it("bokashi ferment accepts meat", () => {
    expect(acceptsMeat("bokashi_ferment")).toBe(true);
  });
  it("stationary open does not", () => {
    expect(acceptsMeat("stationary_open")).toBe(false);
  });
});

describe("processType", () => {
  it("worm vermi uses vermiculture worm digest", () => {
    expect(processType("worm_vermi")).toBe("vermiculture_worm_digest");
  });
});

describe("bestSetup", () => {
  it("electric counter for kitchen counter quick", () => {
    expect(bestSetup("electric_counter")).toBe("kitchen_counter_quick");
  });
});

describe("compostBins", () => {
  it("returns 5 types", () => {
    expect(compostBins()).toHaveLength(5);
  });
});
