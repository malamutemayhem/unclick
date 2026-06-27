import { describe, it, expect } from "vitest";
import {
  tempAccuracy, throughput, profileControl, boardSize,
  ovenCost, conveyor, forProduction, heatMethod,
  bestUse, reflowOvens,
} from "../reflow-oven-calc.js";

describe("tempAccuracy", () => {
  it("vapor phase vps best temp accuracy", () => {
    expect(tempAccuracy("vapor_phase_vps")).toBeGreaterThan(tempAccuracy("diy_toaster_mod"));
  });
});

describe("throughput", () => {
  it("conveyor inline prod highest throughput", () => {
    expect(throughput("conveyor_inline_prod")).toBeGreaterThan(throughput("diy_toaster_mod"));
  });
});

describe("profileControl", () => {
  it("conveyor inline prod best profile control", () => {
    expect(profileControl("conveyor_inline_prod")).toBeGreaterThan(profileControl("hot_plate_bottom"));
  });
});

describe("boardSize", () => {
  it("conveyor inline prod largest board size", () => {
    expect(boardSize("conveyor_inline_prod")).toBeGreaterThan(boardSize("diy_toaster_mod"));
  });
});

describe("ovenCost", () => {
  it("conveyor inline prod most expensive", () => {
    expect(ovenCost("conveyor_inline_prod")).toBeGreaterThan(ovenCost("diy_toaster_mod"));
  });
});

describe("conveyor", () => {
  it("conveyor inline prod has conveyor", () => {
    expect(conveyor("conveyor_inline_prod")).toBe(true);
  });
  it("desktop ir convection no conveyor", () => {
    expect(conveyor("desktop_ir_convection")).toBe(false);
  });
});

describe("forProduction", () => {
  it("conveyor inline prod is for production", () => {
    expect(forProduction("conveyor_inline_prod")).toBe(true);
  });
  it("vapor phase vps not for production", () => {
    expect(forProduction("vapor_phase_vps")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("vapor phase uses vapor phase galden", () => {
    expect(heatMethod("vapor_phase_vps")).toBe("vapor_phase_galden");
  });
});

describe("bestUse", () => {
  it("diy toaster mod best for hobby budget reflow", () => {
    expect(bestUse("diy_toaster_mod")).toBe("hobby_budget_reflow");
  });
});

describe("reflowOvens", () => {
  it("returns 5 types", () => {
    expect(reflowOvens()).toHaveLength(5);
  });
});
