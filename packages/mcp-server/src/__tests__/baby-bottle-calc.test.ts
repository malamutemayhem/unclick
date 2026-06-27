import { describe, it, expect } from "vitest";
import {
  latchEase, colicReduce, cleanEase, durability,
  bottleCost, bpaFree, dishwasherSafe, bottleMaterial,
  bestStage, babyBottles,
} from "../baby-bottle-calc.js";

describe("latchEase", () => {
  it("silicone squeezable soft easiest latch", () => {
    expect(latchEase("silicone_squeezable_soft")).toBeGreaterThan(latchEase("standard_narrow_neck"));
  });
});

describe("colicReduce", () => {
  it("anti colic vented best colic reduce", () => {
    expect(colicReduce("anti_colic_vented")).toBeGreaterThan(colicReduce("standard_narrow_neck"));
  });
});

describe("cleanEase", () => {
  it("glass borosilicate safe easiest to clean", () => {
    expect(cleanEase("glass_borosilicate_safe")).toBeGreaterThan(cleanEase("anti_colic_vented"));
  });
});

describe("durability", () => {
  it("silicone squeezable soft most durable", () => {
    expect(durability("silicone_squeezable_soft")).toBeGreaterThan(durability("glass_borosilicate_safe"));
  });
});

describe("bottleCost", () => {
  it("glass borosilicate safe most expensive", () => {
    expect(bottleCost("glass_borosilicate_safe")).toBeGreaterThan(bottleCost("standard_narrow_neck"));
  });
});

describe("bpaFree", () => {
  it("all baby bottles are bpa free", () => {
    expect(bpaFree("standard_narrow_neck")).toBe(true);
    expect(bpaFree("glass_borosilicate_safe")).toBe(true);
  });
});

describe("dishwasherSafe", () => {
  it("glass borosilicate safe is dishwasher safe", () => {
    expect(dishwasherSafe("glass_borosilicate_safe")).toBe(true);
  });
  it("silicone squeezable soft is not dishwasher safe", () => {
    expect(dishwasherSafe("silicone_squeezable_soft")).toBe(false);
  });
});

describe("bottleMaterial", () => {
  it("glass borosilicate safe uses borosilicate tempered", () => {
    expect(bottleMaterial("glass_borosilicate_safe")).toBe("borosilicate_tempered");
  });
});

describe("bestStage", () => {
  it("anti colic vented best for gassy reflux baby", () => {
    expect(bestStage("anti_colic_vented")).toBe("gassy_reflux_baby");
  });
});

describe("babyBottles", () => {
  it("returns 5 types", () => {
    expect(babyBottles()).toHaveLength(5);
  });
});
