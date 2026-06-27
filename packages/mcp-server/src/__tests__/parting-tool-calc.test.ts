import { describe, it, expect } from "vitest";
import {
  cutClean, wasteMinimal, controlPlunge, durability,
  toolCost, forSizing, forBeginners, bladeProfile,
  bestUse, partingTools,
} from "../parting-tool-calc.js";

describe("cutClean", () => {
  it("super thin parting cleanest cut", () => {
    expect(cutClean("super_thin_parting")).toBeGreaterThan(cutClean("bedan_parting_wide"));
  });
});

describe("wasteMinimal", () => {
  it("super thin parting least waste", () => {
    expect(wasteMinimal("super_thin_parting")).toBeGreaterThan(wasteMinimal("bedan_parting_wide"));
  });
});

describe("controlPlunge", () => {
  it("fluted parting standard best plunge control", () => {
    expect(controlPlunge("fluted_parting_standard")).toBeGreaterThan(controlPlunge("super_thin_parting"));
  });
});

describe("durability", () => {
  it("bedan parting wide most durable", () => {
    expect(durability("bedan_parting_wide")).toBeGreaterThan(durability("super_thin_parting"));
  });
});

describe("toolCost", () => {
  it("super thin parting most expensive", () => {
    expect(toolCost("super_thin_parting")).toBeGreaterThan(toolCost("thin_parting_kerf"));
  });
});

describe("forSizing", () => {
  it("diamond parting narrow is for sizing", () => {
    expect(forSizing("diamond_parting_narrow")).toBe(true);
  });
  it("thin parting kerf not for sizing", () => {
    expect(forSizing("thin_parting_kerf")).toBe(false);
  });
});

describe("forBeginners", () => {
  it("fluted parting standard is for beginners", () => {
    expect(forBeginners("fluted_parting_standard")).toBe(true);
  });
  it("super thin parting not for beginners", () => {
    expect(forBeginners("super_thin_parting")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("diamond parting narrow uses diamond cross section", () => {
    expect(bladeProfile("diamond_parting_narrow")).toBe("diamond_cross_section");
  });
});

describe("bestUse", () => {
  it("thin parting kerf best for minimal waste cut", () => {
    expect(bestUse("thin_parting_kerf")).toBe("minimal_waste_cut");
  });
});

describe("partingTools", () => {
  it("returns 5 types", () => {
    expect(partingTools()).toHaveLength(5);
  });
});
