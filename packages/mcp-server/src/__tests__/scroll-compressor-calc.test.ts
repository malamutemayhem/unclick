import { describe, it, expect } from "vitest";
import {
  efficiency, noiseLevel, reliability, compactness,
  slCost, oilFree, forHvac, scroll,
  bestUse, scrollCompressorTypes,
} from "../scroll-compressor-calc.js";

describe("efficiency", () => {
  it("variable speed most efficient", () => {
    expect(efficiency("variable_speed_inverter")).toBeGreaterThan(efficiency("open_drive_process"));
  });
});

describe("noiseLevel", () => {
  it("oil free scroll quietest", () => {
    expect(noiseLevel("oil_free_scroll_air")).toBeGreaterThan(noiseLevel("open_drive_process"));
  });
});

describe("reliability", () => {
  it("hermetic most reliable", () => {
    expect(reliability("hermetic_refrigerant")).toBeGreaterThanOrEqual(reliability("variable_speed_inverter"));
  });
});

describe("compactness", () => {
  it("hermetic most compact", () => {
    expect(compactness("hermetic_refrigerant")).toBeGreaterThan(compactness("open_drive_process"));
  });
});

describe("slCost", () => {
  it("oil free scroll most expensive", () => {
    expect(slCost("oil_free_scroll_air")).toBeGreaterThan(slCost("hermetic_refrigerant"));
  });
});

describe("oilFree", () => {
  it("oil free scroll is oil free", () => {
    expect(oilFree("oil_free_scroll_air")).toBe(true);
  });
  it("hermetic not oil free", () => {
    expect(oilFree("hermetic_refrigerant")).toBe(false);
  });
});

describe("forHvac", () => {
  it("hermetic for hvac", () => {
    expect(forHvac("hermetic_refrigerant")).toBe(true);
  });
  it("oil free scroll not for hvac", () => {
    expect(forHvac("oil_free_scroll_air")).toBe(false);
  });
});

describe("scroll", () => {
  it("variable speed uses inverter driven", () => {
    expect(scroll("variable_speed_inverter")).toBe("inverter_driven_variable_speed_modulate_cap");
  });
});

describe("bestUse", () => {
  it("oil free scroll for dental lab", () => {
    expect(bestUse("oil_free_scroll_air")).toBe("dental_lab_medical_air_clean_room_small_flow");
  });
});

describe("scrollCompressorTypes", () => {
  it("returns 5 types", () => {
    expect(scrollCompressorTypes()).toHaveLength(5);
  });
});
