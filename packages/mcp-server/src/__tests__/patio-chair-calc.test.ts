import { describe, it, expect } from "vitest";
import {
  comfort, durability, stackability, weatherResist,
  chairCost, foldable, hasArmrests, frameMaterial,
  bestSetting, patioChairs,
} from "../patio-chair-calc.js";

describe("comfort", () => {
  it("zero gravity recline most comfortable", () => {
    expect(comfort("zero_gravity_recline")).toBeGreaterThan(comfort("folding_metal_bistro"));
  });
});

describe("durability", () => {
  it("sling aluminum most durable", () => {
    expect(durability("sling_aluminum")).toBeGreaterThan(durability("zero_gravity_recline"));
  });
});

describe("stackability", () => {
  it("folding metal bistro most stackable", () => {
    expect(stackability("folding_metal_bistro")).toBeGreaterThan(stackability("adirondack_wood"));
  });
});

describe("weatherResist", () => {
  it("sling aluminum best weather resistance", () => {
    expect(weatherResist("sling_aluminum")).toBeGreaterThan(weatherResist("adirondack_wood"));
  });
});

describe("chairCost", () => {
  it("zero gravity recline most expensive", () => {
    expect(chairCost("zero_gravity_recline")).toBeGreaterThan(chairCost("folding_metal_bistro"));
  });
});

describe("foldable", () => {
  it("folding metal bistro is foldable", () => {
    expect(foldable("folding_metal_bistro")).toBe(true);
  });
  it("adirondack wood is not", () => {
    expect(foldable("adirondack_wood")).toBe(false);
  });
});

describe("hasArmrests", () => {
  it("adirondack wood has armrests", () => {
    expect(hasArmrests("adirondack_wood")).toBe(true);
  });
  it("folding metal bistro does not", () => {
    expect(hasArmrests("folding_metal_bistro")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("sling aluminum uses powder coated aluminum", () => {
    expect(frameMaterial("sling_aluminum")).toBe("powder_coated_aluminum");
  });
});

describe("bestSetting", () => {
  it("folding metal bistro best for small balcony cafe", () => {
    expect(bestSetting("folding_metal_bistro")).toBe("small_balcony_cafe");
  });
});

describe("patioChairs", () => {
  it("returns 5 types", () => {
    expect(patioChairs()).toHaveLength(5);
  });
});
