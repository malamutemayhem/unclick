import { describe, it, expect } from "vitest";
import {
  heatRetain, loadCapacity, tempRange, setupEase,
  barrelCost, insulated, portable, wallType,
  bestUse, barrelFires,
} from "../barrel-fire-calc.js";

describe("heatRetain", () => {
  it("insulated barrel hot best heat retain", () => {
    expect(heatRetain("insulated_barrel_hot")).toBeGreaterThan(heatRetain("fiber_drum_light"));
  });
});

describe("loadCapacity", () => {
  it("brick barrel heavy largest load capacity", () => {
    expect(loadCapacity("brick_barrel_heavy")).toBeGreaterThan(loadCapacity("fiber_drum_light"));
  });
});

describe("tempRange", () => {
  it("insulated barrel hot widest temp range", () => {
    expect(tempRange("insulated_barrel_hot")).toBeGreaterThan(tempRange("fiber_drum_light"));
  });
});

describe("setupEase", () => {
  it("fiber drum light easiest setup", () => {
    expect(setupEase("fiber_drum_light")).toBeGreaterThan(setupEase("brick_barrel_heavy"));
  });
});

describe("barrelCost", () => {
  it("brick barrel heavy most expensive", () => {
    expect(barrelCost("brick_barrel_heavy")).toBeGreaterThan(barrelCost("fiber_drum_light"));
  });
});

describe("insulated", () => {
  it("insulated barrel hot is insulated", () => {
    expect(insulated("insulated_barrel_hot")).toBe(true);
  });
  it("metal drum standard not insulated", () => {
    expect(insulated("metal_drum_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("metal drum standard is portable", () => {
    expect(portable("metal_drum_standard")).toBe(true);
  });
  it("brick barrel heavy not portable", () => {
    expect(portable("brick_barrel_heavy")).toBe(false);
  });
});

describe("wallType", () => {
  it("insulated barrel hot uses blanket lined drum", () => {
    expect(wallType("insulated_barrel_hot")).toBe("blanket_lined_drum");
  });
});

describe("bestUse", () => {
  it("metal drum standard best for general barrel fire", () => {
    expect(bestUse("metal_drum_standard")).toBe("general_barrel_fire");
  });
});

describe("barrelFires", () => {
  it("returns 5 types", () => {
    expect(barrelFires()).toHaveLength(5);
  });
});
