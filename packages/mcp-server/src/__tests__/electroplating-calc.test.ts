import { describe, it, expect } from "vitest";
import {
  uniformity, speed, thickness, adhesion,
  epCost, selective, forHighVolume, electrolyte,
  bestUse, electroplatingTypes,
} from "../electroplating-calc.js";

describe("uniformity", () => {
  it("pulse plating most uniform", () => {
    expect(uniformity("pulse_plating_nanocrystal")).toBeGreaterThan(uniformity("barrel_plating_bulk"));
  });
});

describe("speed", () => {
  it("continuous strip fastest", () => {
    expect(speed("continuous_strip_reel")).toBeGreaterThan(speed("brush_plating_selective"));
  });
});

describe("thickness", () => {
  it("pulse plating thickest deposit", () => {
    expect(thickness("pulse_plating_nanocrystal")).toBeGreaterThan(thickness("continuous_strip_reel"));
  });
});

describe("adhesion", () => {
  it("pulse best adhesion", () => {
    expect(adhesion("pulse_plating_nanocrystal")).toBeGreaterThan(adhesion("barrel_plating_bulk"));
  });
});

describe("epCost", () => {
  it("pulse most expensive", () => {
    expect(epCost("pulse_plating_nanocrystal")).toBeGreaterThan(epCost("barrel_plating_bulk"));
  });
});

describe("selective", () => {
  it("brush plating is selective", () => {
    expect(selective("brush_plating_selective")).toBe(true);
  });
  it("rack plating not selective", () => {
    expect(selective("rack_plating_barrel")).toBe(false);
  });
});

describe("forHighVolume", () => {
  it("barrel for high volume", () => {
    expect(forHighVolume("barrel_plating_bulk")).toBe(true);
  });
  it("brush not high volume", () => {
    expect(forHighVolume("brush_plating_selective")).toBe(false);
  });
});

describe("electrolyte", () => {
  it("barrel uses zinc alkaline", () => {
    expect(electrolyte("barrel_plating_bulk")).toBe("zinc_alkaline_cyanide_free");
  });
});

describe("bestUse", () => {
  it("continuous for connector strip", () => {
    expect(bestUse("continuous_strip_reel")).toBe("connector_terminal_strip_plating");
  });
});

describe("electroplatingTypes", () => {
  it("returns 5 types", () => {
    expect(electroplatingTypes()).toHaveLength(5);
  });
});
