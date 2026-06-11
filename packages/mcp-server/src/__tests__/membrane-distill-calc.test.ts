import { describe, it, expect } from "vitest";
import {
  flux, rejection, energyUse, foulingResist,
  mdCost, lowGrade, forDesalination, config,
  bestUse, membraneDistillTypes,
} from "../membrane-distill-calc.js";

describe("flux", () => {
  it("vacuum membrane highest flux", () => {
    expect(flux("vacuum_membrane_vmd")).toBeGreaterThan(flux("air_gap_agmd"));
  });
});

describe("rejection", () => {
  it("air gap highest rejection", () => {
    expect(rejection("air_gap_agmd")).toBeGreaterThanOrEqual(rejection("direct_contact_dcmd"));
  });
});

describe("energyUse", () => {
  it("permeate gap best energy efficiency", () => {
    expect(energyUse("permeate_gap_pgmd")).toBeGreaterThan(energyUse("direct_contact_dcmd"));
  });
});

describe("foulingResist", () => {
  it("air gap best fouling resistance", () => {
    expect(foulingResist("air_gap_agmd")).toBeGreaterThan(foulingResist("vacuum_membrane_vmd"));
  });
});

describe("mdCost", () => {
  it("vacuum membrane most expensive", () => {
    expect(mdCost("vacuum_membrane_vmd")).toBeGreaterThan(mdCost("direct_contact_dcmd"));
  });
});

describe("lowGrade", () => {
  it("direct contact uses low grade heat", () => {
    expect(lowGrade("direct_contact_dcmd")).toBe(true);
  });
  it("vacuum membrane does not use low grade heat", () => {
    expect(lowGrade("vacuum_membrane_vmd")).toBe(false);
  });
});

describe("forDesalination", () => {
  it("direct contact for desalination", () => {
    expect(forDesalination("direct_contact_dcmd")).toBe(true);
  });
  it("sweeping gas not for desalination", () => {
    expect(forDesalination("sweeping_gas_sgmd")).toBe(false);
  });
});

describe("config", () => {
  it("air gap config", () => {
    expect(config("air_gap_agmd")).toBe("air_gap_between_membrane_and_condensation");
  });
});

describe("bestUse", () => {
  it("permeate gap for zero liquid discharge", () => {
    expect(bestUse("permeate_gap_pgmd")).toBe("zero_liquid_discharge_inland_brine_treat");
  });
});

describe("membraneDistillTypes", () => {
  it("returns 5 types", () => {
    expect(membraneDistillTypes()).toHaveLength(5);
  });
});
