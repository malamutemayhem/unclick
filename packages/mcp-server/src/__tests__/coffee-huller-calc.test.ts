import { describe, it, expect } from "vitest";
import {
  hullEfficiency, beanBreakage, throughput, cleanOutput,
  chCost, multiStage, forDry, hullerConfig,
  bestUse, coffeeHullerTypes,
} from "../coffee-huller-calc.js";

describe("hullEfficiency", () => {
  it("friction polisher best hull efficiency", () => {
    expect(hullEfficiency("friction_polisher")).toBeGreaterThan(hullEfficiency("color_sorter"));
  });
});

describe("beanBreakage", () => {
  it("destoner gravity least bean breakage", () => {
    expect(beanBreakage("destoner_gravity")).toBeGreaterThan(beanBreakage("engelberg_huller"));
  });
});

describe("throughput", () => {
  it("engelberg huller highest throughput", () => {
    expect(throughput("engelberg_huller")).toBeGreaterThan(throughput("color_sorter"));
  });
});

describe("cleanOutput", () => {
  it("color sorter cleanest output", () => {
    expect(cleanOutput("color_sorter")).toBeGreaterThan(cleanOutput("engelberg_huller"));
  });
});

describe("chCost", () => {
  it("color sorter most expensive", () => {
    expect(chCost("color_sorter")).toBeGreaterThan(chCost("engelberg_huller"));
  });
});

describe("multiStage", () => {
  it("friction polisher is multi stage", () => {
    expect(multiStage("friction_polisher")).toBe(true);
  });
  it("disc huller not multi stage", () => {
    expect(multiStage("disc_huller")).toBe(false);
  });
});

describe("forDry", () => {
  it("all hullers for dry process", () => {
    expect(forDry("disc_huller")).toBe(true);
    expect(forDry("color_sorter")).toBe(true);
  });
});

describe("hullerConfig", () => {
  it("color sorter uses optical camera air jet", () => {
    expect(hullerConfig("color_sorter")).toBe("color_sorter_optical_camera_air_jet_defect_bean_reject_grade_sort");
  });
});

describe("bestUse", () => {
  it("friction polisher for specialty dry mill", () => {
    expect(bestUse("friction_polisher")).toBe("specialty_dry_mill_friction_polisher_silver_skin_smooth_appearance");
  });
});

describe("coffeeHullerTypes", () => {
  it("returns 5 types", () => {
    expect(coffeeHullerTypes()).toHaveLength(5);
  });
});
