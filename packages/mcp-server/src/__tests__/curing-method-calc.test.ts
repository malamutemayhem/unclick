import { describe, it, expect } from "vitest";
import {
  effectiveness, speed, labor, uniformity,
  cuCost, accelerated, forSlab, method,
  bestUse, curingMethodTypes,
} from "../curing-method-calc.js";

describe("effectiveness", () => {
  it("autoclave most effective", () => {
    expect(effectiveness("autoclave_high_pressure")).toBeGreaterThan(effectiveness("curing_compound_membrane"));
  });
});

describe("speed", () => {
  it("autoclave fastest", () => {
    expect(speed("autoclave_high_pressure")).toBeGreaterThan(speed("water_ponding_moist"));
  });
});

describe("labor", () => {
  it("compound membrane least labor", () => {
    expect(labor("curing_compound_membrane")).toBeGreaterThan(labor("water_ponding_moist"));
  });
});

describe("uniformity", () => {
  it("autoclave best uniformity", () => {
    expect(uniformity("autoclave_high_pressure")).toBeGreaterThan(uniformity("plastic_sheet_cover"));
  });
});

describe("cuCost", () => {
  it("autoclave most expensive", () => {
    expect(cuCost("autoclave_high_pressure")).toBeGreaterThan(cuCost("water_ponding_moist"));
  });
});

describe("accelerated", () => {
  it("steam is accelerated", () => {
    expect(accelerated("steam_curing_accelerated")).toBe(true);
  });
  it("ponding not accelerated", () => {
    expect(accelerated("water_ponding_moist")).toBe(false);
  });
});

describe("forSlab", () => {
  it("ponding for slab", () => {
    expect(forSlab("water_ponding_moist")).toBe(true);
  });
  it("autoclave not for slab", () => {
    expect(forSlab("autoclave_high_pressure")).toBe(false);
  });
});

describe("method", () => {
  it("autoclave uses high pressure steam", () => {
    expect(method("autoclave_high_pressure")).toBe("high_pressure_steam_180c_1mpa");
  });
});

describe("bestUse", () => {
  it("ponding for flat slab pavement", () => {
    expect(bestUse("water_ponding_moist")).toBe("flat_slab_pavement_long_cure");
  });
});

describe("curingMethodTypes", () => {
  it("returns 5 types", () => {
    expect(curingMethodTypes()).toHaveLength(5);
  });
});
