import { describe, it, expect } from "vitest";
import {
  resistance, strength, durability, moisture,
  tbCost, structural, forCurtainWall, material,
  bestUse, thermalBreakTypes,
} from "../thermal-break-calc.js";

describe("resistance", () => {
  it("aerogel highest resistance", () => {
    expect(resistance("aerogel_blanket_high_perf")).toBeGreaterThan(resistance("structural_silicone_glaze"));
  });
});

describe("strength", () => {
  it("thermal spacer highest strength", () => {
    expect(strength("thermal_spacer_steel_beam")).toBeGreaterThan(strength("aerogel_blanket_high_perf"));
  });
});

describe("durability", () => {
  it("thermal spacer most durable", () => {
    expect(durability("thermal_spacer_steel_beam")).toBeGreaterThan(durability("aerogel_blanket_high_perf"));
  });
});

describe("moisture", () => {
  it("structural silicone best moisture resist", () => {
    expect(moisture("structural_silicone_glaze")).toBeGreaterThan(moisture("aerogel_blanket_high_perf"));
  });
});

describe("tbCost", () => {
  it("aerogel most expensive", () => {
    expect(tbCost("aerogel_blanket_high_perf")).toBeGreaterThan(tbCost("thermal_spacer_steel_beam"));
  });
});

describe("structural", () => {
  it("polyamide is structural", () => {
    expect(structural("polyamide_strip_aluminum")).toBe(true);
  });
  it("aerogel not structural", () => {
    expect(structural("aerogel_blanket_high_perf")).toBe(false);
  });
});

describe("forCurtainWall", () => {
  it("polyamide for curtain wall", () => {
    expect(forCurtainWall("polyamide_strip_aluminum")).toBe(true);
  });
  it("aerogel not for curtain wall", () => {
    expect(forCurtainWall("aerogel_blanket_high_perf")).toBe(false);
  });
});

describe("material", () => {
  it("aerogel uses silica fiber blanket", () => {
    expect(material("aerogel_blanket_high_perf")).toBe("silica_aerogel_fiber_blanket");
  });
});

describe("bestUse", () => {
  it("polyamide for aluminum window frame", () => {
    expect(bestUse("polyamide_strip_aluminum")).toBe("aluminum_window_curtain_wall_frame");
  });
});

describe("thermalBreakTypes", () => {
  it("returns 5 types", () => {
    expect(thermalBreakTypes()).toHaveLength(5);
  });
});
