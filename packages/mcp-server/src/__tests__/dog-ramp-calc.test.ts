import { describe, it, expect } from "vitest";
import {
  weightCapacity, gripSurface, portability, stability,
  rampCost, foldable, indoorUse, surfaceType,
  bestUse, dogRamps,
} from "../dog-ramp-calc.js";

describe("weightCapacity", () => {
  it("telescoping aluminum slide highest weight capacity", () => {
    expect(weightCapacity("telescoping_aluminum_slide")).toBeGreaterThan(weightCapacity("foam_step_stair"));
  });
});

describe("gripSurface", () => {
  it("foam step stair best grip surface", () => {
    expect(gripSurface("foam_step_stair")).toBeGreaterThan(gripSurface("wooden_furniture_match"));
  });
});

describe("portability", () => {
  it("car portable lightweight most portable", () => {
    expect(portability("car_portable_lightweight")).toBeGreaterThan(portability("wooden_furniture_match"));
  });
});

describe("stability", () => {
  it("wooden furniture match most stable", () => {
    expect(stability("wooden_furniture_match")).toBeGreaterThan(stability("car_portable_lightweight"));
  });
});

describe("rampCost", () => {
  it("telescoping aluminum slide most expensive", () => {
    expect(rampCost("telescoping_aluminum_slide")).toBeGreaterThan(rampCost("folding_plastic_bi_fold"));
  });
});

describe("foldable", () => {
  it("folding plastic bi fold is foldable", () => {
    expect(foldable("folding_plastic_bi_fold")).toBe(true);
  });
  it("foam step stair is not foldable", () => {
    expect(foldable("foam_step_stair")).toBe(false);
  });
});

describe("indoorUse", () => {
  it("foam step stair is for indoor use", () => {
    expect(indoorUse("foam_step_stair")).toBe(true);
  });
  it("telescoping aluminum slide is not for indoor use", () => {
    expect(indoorUse("telescoping_aluminum_slide")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("foam step stair uses fleece covered foam", () => {
    expect(surfaceType("foam_step_stair")).toBe("fleece_covered_foam");
  });
});

describe("bestUse", () => {
  it("telescoping aluminum slide best for suv truck loading", () => {
    expect(bestUse("telescoping_aluminum_slide")).toBe("suv_truck_loading");
  });
});

describe("dogRamps", () => {
  it("returns 5 types", () => {
    expect(dogRamps()).toHaveLength(5);
  });
});
