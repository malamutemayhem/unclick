import { describe, it, expect } from "vitest";
import {
  partDetail, throughput, materialRange, wallUniformity,
  tfCost, pressureAssist, forPackaging, forming,
  bestUse, thermoformerTypes,
} from "../thermoformer-calc.js";

describe("partDetail", () => {
  it("pressure forming best part detail", () => {
    expect(partDetail("pressure_forming")).toBeGreaterThan(partDetail("vacuum_forming"));
  });
});

describe("throughput", () => {
  it("inline trim highest throughput", () => {
    expect(throughput("inline_trim")).toBeGreaterThan(throughput("twin_sheet"));
  });
});

describe("materialRange", () => {
  it("vacuum forming widest material range", () => {
    expect(materialRange("vacuum_forming")).toBeGreaterThan(materialRange("inline_trim"));
  });
});

describe("wallUniformity", () => {
  it("plug assist best wall uniformity", () => {
    expect(wallUniformity("plug_assist")).toBeGreaterThan(wallUniformity("vacuum_forming"));
  });
});

describe("tfCost", () => {
  it("inline trim most expensive", () => {
    expect(tfCost("inline_trim")).toBeGreaterThan(tfCost("vacuum_forming"));
  });
});

describe("pressureAssist", () => {
  it("pressure forming has pressure assist", () => {
    expect(pressureAssist("pressure_forming")).toBe(true);
  });
  it("vacuum forming no pressure assist", () => {
    expect(pressureAssist("vacuum_forming")).toBe(false);
  });
});

describe("forPackaging", () => {
  it("vacuum forming for packaging", () => {
    expect(forPackaging("vacuum_forming")).toBe(true);
  });
  it("pressure forming not for packaging", () => {
    expect(forPackaging("pressure_forming")).toBe(false);
  });
});

describe("forming", () => {
  it("twin sheet uses two sheet simultaneous", () => {
    expect(forming("twin_sheet")).toBe("two_sheet_simultaneous_heat_form_weld_hollow_double_wall");
  });
});

describe("bestUse", () => {
  it("plug assist for deep draw cup", () => {
    expect(bestUse("plug_assist")).toBe("deep_draw_cup_container_food_tray_uniform_wall_thickness");
  });
});

describe("thermoformerTypes", () => {
  it("returns 5 types", () => {
    expect(thermoformerTypes()).toHaveLength(5);
  });
});
