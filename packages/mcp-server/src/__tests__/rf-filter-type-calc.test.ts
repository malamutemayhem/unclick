import { describe, it, expect } from "vitest";
import {
  selectivity, insertionLoss, powerHandling, size,
  rfCost, tunable, forBase, technology,
  bestUse, rfFilterTypes,
} from "../rf-filter-type-calc.js";

describe("selectivity", () => {
  it("cavity most selective", () => {
    expect(selectivity("cavity_resonator_tuned")).toBeGreaterThan(selectivity("lc_lumped_element"));
  });
});

describe("insertionLoss", () => {
  it("cavity best insertion loss", () => {
    expect(insertionLoss("cavity_resonator_tuned")).toBeGreaterThan(insertionLoss("microstrip_distributed_pcb"));
  });
});

describe("powerHandling", () => {
  it("cavity best power handling", () => {
    expect(powerHandling("cavity_resonator_tuned")).toBeGreaterThan(powerHandling("saw_surface_acoustic"));
  });
});

describe("size", () => {
  it("saw smallest size score highest", () => {
    expect(size("saw_surface_acoustic")).toBeGreaterThan(size("cavity_resonator_tuned"));
  });
});

describe("rfCost", () => {
  it("cavity most expensive", () => {
    expect(rfCost("cavity_resonator_tuned")).toBeGreaterThan(rfCost("lc_lumped_element"));
  });
});

describe("tunable", () => {
  it("cavity is tunable", () => {
    expect(tunable("cavity_resonator_tuned")).toBe(true);
  });
  it("saw not tunable", () => {
    expect(tunable("saw_surface_acoustic")).toBe(false);
  });
});

describe("forBase", () => {
  it("cavity for base station", () => {
    expect(forBase("cavity_resonator_tuned")).toBe(true);
  });
  it("lc not for base station", () => {
    expect(forBase("lc_lumped_element")).toBe(false);
  });
});

describe("technology", () => {
  it("saw uses piezoelectric surface wave", () => {
    expect(technology("saw_surface_acoustic")).toBe("piezoelectric_surface_wave_idt");
  });
});

describe("bestUse", () => {
  it("microstrip for pcb integrated", () => {
    expect(bestUse("microstrip_distributed_pcb")).toBe("pcb_integrated_prototype_wideband");
  });
});

describe("rfFilterTypes", () => {
  it("returns 5 types", () => {
    expect(rfFilterTypes()).toHaveLength(5);
  });
});
