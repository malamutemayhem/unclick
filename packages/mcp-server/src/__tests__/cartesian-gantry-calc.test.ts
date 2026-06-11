import { describe, it, expect } from "vitest";
import {
  precision, workEnvelope, rigidity, speed,
  cgCost, overhead, forCnc, structure,
  bestUse, cartesianGantryTypes,
} from "../cartesian-gantry-calc.js";

describe("precision", () => {
  it("xy table flat best precision", () => {
    expect(precision("xy_table_flat")).toBeGreaterThan(precision("cantilever_beam"));
  });
});

describe("workEnvelope", () => {
  it("xyz gantry overhead largest work envelope", () => {
    expect(workEnvelope("xyz_gantry_overhead")).toBeGreaterThan(workEnvelope("single_axis_linear"));
  });
});

describe("rigidity", () => {
  it("single axis linear highest rigidity", () => {
    expect(rigidity("single_axis_linear")).toBeGreaterThan(rigidity("cantilever_beam"));
  });
});

describe("speed", () => {
  it("single axis linear fastest", () => {
    expect(speed("single_axis_linear")).toBeGreaterThan(speed("xyz_gantry_overhead"));
  });
});

describe("cgCost", () => {
  it("xyz gantry overhead most expensive", () => {
    expect(cgCost("xyz_gantry_overhead")).toBeGreaterThan(cgCost("single_axis_linear"));
  });
});

describe("overhead", () => {
  it("xyz gantry overhead is overhead", () => {
    expect(overhead("xyz_gantry_overhead")).toBe(true);
  });
  it("xy table flat not overhead", () => {
    expect(overhead("xy_table_flat")).toBe(false);
  });
});

describe("forCnc", () => {
  it("h frame portal for cnc", () => {
    expect(forCnc("h_frame_portal")).toBe(true);
  });
  it("single axis linear not for cnc", () => {
    expect(forCnc("single_axis_linear")).toBe(false);
  });
});

describe("structure", () => {
  it("cantilever uses single side support", () => {
    expect(structure("cantilever_beam")).toBe("single_side_support_beam_overhang_free_access_area");
  });
});

describe("bestUse", () => {
  it("xy table for pcb assembly", () => {
    expect(bestUse("xy_table_flat")).toBe("pcb_assembly_laser_marking_wafer_inspection_precise");
  });
});

describe("cartesianGantryTypes", () => {
  it("returns 5 types", () => {
    expect(cartesianGantryTypes()).toHaveLength(5);
  });
});
