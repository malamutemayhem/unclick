import { describe, it, expect } from "vitest";
import {
  accuracy, rangeability, pressureDrop, conductivity,
  mfCost, obstructionFree, forSlurry, liner,
  bestUse, magFlowMeterTypes,
} from "../mag-flow-meter-calc.js";

describe("accuracy", () => {
  it("inline flanged highest accuracy", () => {
    expect(accuracy("inline_flanged_standard")).toBeGreaterThan(accuracy("insertion_hot_tap"));
  });
});

describe("rangeability", () => {
  it("inline flanged best rangeability", () => {
    expect(rangeability("inline_flanged_standard")).toBeGreaterThan(rangeability("insertion_hot_tap"));
  });
});

describe("pressureDrop", () => {
  it("all mag flow meters have zero pressure drop (max score)", () => {
    expect(pressureDrop("inline_flanged_standard")).toBe(10);
    expect(pressureDrop("insertion_hot_tap")).toBe(10);
  });
});

describe("conductivity", () => {
  it("hygienic sanitary highest conductivity sensitivity", () => {
    expect(conductivity("hygienic_sanitary_clamp")).toBeGreaterThan(conductivity("submersible_open_channel"));
  });
});

describe("mfCost", () => {
  it("hygienic sanitary most expensive", () => {
    expect(mfCost("hygienic_sanitary_clamp")).toBeGreaterThan(mfCost("insertion_hot_tap"));
  });
});

describe("obstructionFree", () => {
  it("inline flanged is obstruction free", () => {
    expect(obstructionFree("inline_flanged_standard")).toBe(true);
  });
  it("insertion hot tap not obstruction free", () => {
    expect(obstructionFree("insertion_hot_tap")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("inline flanged for slurry", () => {
    expect(forSlurry("inline_flanged_standard")).toBe(true);
  });
  it("wafer compact not for slurry", () => {
    expect(forSlurry("wafer_compact_short")).toBe(false);
  });
});

describe("liner", () => {
  it("hygienic uses tri clamp", () => {
    expect(liner("hygienic_sanitary_clamp")).toBe("ptfe_liner_tri_clamp_polish_surface");
  });
});

describe("bestUse", () => {
  it("submersible for open channel", () => {
    expect(bestUse("submersible_open_channel")).toBe("open_channel_river_irrigation_discharge");
  });
});

describe("magFlowMeterTypes", () => {
  it("returns 5 types", () => {
    expect(magFlowMeterTypes()).toHaveLength(5);
  });
});
