import { describe, it, expect } from "vitest";
import {
  cutPrecision, cuttingSpeed, mortiseDepth, surfaceFinish,
  mdCost, automated, forThrough, drillConfig,
  bestUse, mortiserDrillTypes,
} from "../mortiser-drill-calc.js";

describe("cutPrecision", () => {
  it("cnc mortiser best cut precision", () => {
    expect(cutPrecision("cnc_mortiser")).toBeGreaterThan(cutPrecision("chain_mortiser"));
  });
});

describe("cuttingSpeed", () => {
  it("cnc mortiser fastest cutting speed", () => {
    expect(cuttingSpeed("cnc_mortiser")).toBeGreaterThan(cuttingSpeed("hollow_chisel"));
  });
});

describe("mortiseDepth", () => {
  it("chain mortiser deepest mortise", () => {
    expect(mortiseDepth("chain_mortiser")).toBeGreaterThan(mortiseDepth("hollow_chisel"));
  });
});

describe("surfaceFinish", () => {
  it("cnc mortiser best surface finish", () => {
    expect(surfaceFinish("cnc_mortiser")).toBeGreaterThan(surfaceFinish("chain_mortiser"));
  });
});

describe("mdCost", () => {
  it("cnc mortiser most expensive", () => {
    expect(mdCost("cnc_mortiser")).toBeGreaterThan(mdCost("hollow_chisel"));
  });
});

describe("automated", () => {
  it("cnc mortiser is automated", () => {
    expect(automated("cnc_mortiser")).toBe(true);
  });
  it("hollow chisel not automated", () => {
    expect(automated("hollow_chisel")).toBe(false);
  });
});

describe("forThrough", () => {
  it("chain mortiser for through mortise", () => {
    expect(forThrough("chain_mortiser")).toBe(true);
  });
  it("hollow chisel not for through", () => {
    expect(forThrough("hollow_chisel")).toBe(false);
  });
});

describe("drillConfig", () => {
  it("slot mortiser uses horizontal slot drill", () => {
    expect(drillConfig("slot_mortiser")).toBe("horizontal_slot_drill_bit_x_y_table_travel_elongated_mortise");
  });
});

describe("bestUse", () => {
  it("oscillating mortiser for door lock hinge recess", () => {
    expect(bestUse("oscillating_mortiser")).toBe("clean_wall_mortise_door_lock_hinge_recess_oscillating_action");
  });
});

describe("mortiserDrillTypes", () => {
  it("returns 5 types", () => {
    expect(mortiserDrillTypes()).toHaveLength(5);
  });
});
