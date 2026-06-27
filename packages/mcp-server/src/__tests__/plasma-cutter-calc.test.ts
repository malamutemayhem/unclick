import { describe, it, expect } from "vitest";
import {
  cutSpeed, edgeQuality, thicknessRange, operatingCost,
  pcCost, cnc, forThickPlate, process,
  bestUse, plasmaCutterTypes,
} from "../plasma-cutter-calc.js";

describe("cutSpeed", () => {
  it("cnc gantry fastest", () => {
    expect(cutSpeed("cnc_gantry")).toBeGreaterThan(cutSpeed("underwater"));
  });
});

describe("edgeQuality", () => {
  it("fine plasma best edge quality", () => {
    expect(edgeQuality("fine_plasma")).toBeGreaterThan(edgeQuality("conventional_air"));
  });
});

describe("thicknessRange", () => {
  it("cnc gantry widest thickness range", () => {
    expect(thicknessRange("cnc_gantry")).toBeGreaterThan(thicknessRange("fine_plasma"));
  });
});

describe("operatingCost", () => {
  it("conventional air lowest operating cost", () => {
    expect(operatingCost("conventional_air")).toBeGreaterThan(operatingCost("fine_plasma"));
  });
});

describe("pcCost", () => {
  it("cnc gantry most expensive", () => {
    expect(pcCost("cnc_gantry")).toBeGreaterThan(pcCost("conventional_air"));
  });
});

describe("cnc", () => {
  it("high definition is cnc", () => {
    expect(cnc("high_definition")).toBe(true);
  });
  it("conventional air not cnc", () => {
    expect(cnc("conventional_air")).toBe(false);
  });
});

describe("forThickPlate", () => {
  it("cnc gantry for thick plate", () => {
    expect(forThickPlate("cnc_gantry")).toBe(true);
  });
  it("fine plasma not for thick plate", () => {
    expect(forThickPlate("fine_plasma")).toBe(false);
  });
});

describe("process", () => {
  it("underwater uses submerged water table", () => {
    expect(process("underwater")).toBe("submerged_water_table_plasma_cut_fume_noise_reduction");
  });
});

describe("bestUse", () => {
  it("conventional air for fabrication shop", () => {
    expect(bestUse("conventional_air")).toBe("fabrication_shop_general_cutting_field_work_portable_use");
  });
});

describe("plasmaCutterTypes", () => {
  it("returns 5 types", () => {
    expect(plasmaCutterTypes()).toHaveLength(5);
  });
});
