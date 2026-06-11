import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, pressure, regeneration,
  acCost, continuous, forTrace, flowMode,
  bestUse, adsorptionColumnTypes,
} from "../adsorption-column-calc.js";

describe("capacity", () => {
  it("moving bed highest capacity", () => {
    expect(capacity("moving_bed_continuous")).toBeGreaterThan(capacity("pulsed_bed_cyclic"));
  });
});

describe("efficiency", () => {
  it("fixed bed downflow most efficient", () => {
    expect(efficiency("fixed_bed_downflow")).toBeGreaterThanOrEqual(efficiency("pulsed_bed_cyclic"));
  });
});

describe("pressure", () => {
  it("fluidized bed lowest pressure drop", () => {
    expect(pressure("fluidized_bed_expanded")).toBeGreaterThan(pressure("moving_bed_continuous"));
  });
});

describe("regeneration", () => {
  it("pulsed bed best regeneration", () => {
    expect(regeneration("pulsed_bed_cyclic")).toBeGreaterThan(regeneration("fixed_bed_downflow"));
  });
});

describe("acCost", () => {
  it("moving bed most expensive", () => {
    expect(acCost("moving_bed_continuous")).toBeGreaterThan(acCost("fixed_bed_downflow"));
  });
});

describe("continuous", () => {
  it("moving bed is continuous", () => {
    expect(continuous("moving_bed_continuous")).toBe(true);
  });
  it("fixed bed downflow is not continuous", () => {
    expect(continuous("fixed_bed_downflow")).toBe(false);
  });
});

describe("forTrace", () => {
  it("fixed bed downflow for trace removal", () => {
    expect(forTrace("fixed_bed_downflow")).toBe(true);
  });
  it("moving bed not for trace", () => {
    expect(forTrace("moving_bed_continuous")).toBe(false);
  });
});

describe("flowMode", () => {
  it("pulsed bed uses rapid cycle", () => {
    expect(flowMode("pulsed_bed_cyclic")).toBe("rapid_cycle_psa_tsa_short_bed_pulse");
  });
});

describe("bestUse", () => {
  it("fixed bed downflow for water treatment", () => {
    expect(bestUse("fixed_bed_downflow")).toBe("water_treatment_activated_carbon_voc_removal");
  });
});

describe("adsorptionColumnTypes", () => {
  it("returns 5 types", () => {
    expect(adsorptionColumnTypes()).toHaveLength(5);
  });
});
