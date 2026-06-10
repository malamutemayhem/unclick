import { describe, it, expect } from "vitest";
import {
  pinCapacity, easyRetrieve, portability, stability,
  cushionCost, sharpensNeedle, handsFree, fillMaterial,
  bestSewer, pinCushions,
} from "../pin-cushion-calc.js";

describe("pinCapacity", () => {
  it("magnetic bowl most pin capacity", () => {
    expect(pinCapacity("magnetic_bowl")).toBeGreaterThan(pinCapacity("wrist_band"));
  });
});

describe("easyRetrieve", () => {
  it("magnetic bowl easiest retrieve", () => {
    expect(easyRetrieve("magnetic_bowl")).toBeGreaterThan(easyRetrieve("tomato_classic"));
  });
});

describe("portability", () => {
  it("wrist band most portable", () => {
    expect(portability("wrist_band")).toBeGreaterThan(portability("weighted_base"));
  });
});

describe("stability", () => {
  it("weighted base most stable", () => {
    expect(stability("weighted_base")).toBeGreaterThan(stability("wrist_band"));
  });
});

describe("cushionCost", () => {
  it("magnetic bowl most expensive", () => {
    expect(cushionCost("magnetic_bowl")).toBeGreaterThan(cushionCost("tomato_classic"));
  });
});

describe("sharpensNeedle", () => {
  it("emery sharpener sharpens needle", () => {
    expect(sharpensNeedle("emery_sharpener")).toBe(true);
  });
  it("magnetic bowl does not", () => {
    expect(sharpensNeedle("magnetic_bowl")).toBe(false);
  });
});

describe("handsFree", () => {
  it("wrist band is hands free", () => {
    expect(handsFree("wrist_band")).toBe(true);
  });
  it("tomato classic is not", () => {
    expect(handsFree("tomato_classic")).toBe(false);
  });
});

describe("fillMaterial", () => {
  it("emery sharpener uses emery powder strawberry", () => {
    expect(fillMaterial("emery_sharpener")).toBe("emery_powder_strawberry");
  });
});

describe("bestSewer", () => {
  it("magnetic bowl for machine sew many pins", () => {
    expect(bestSewer("magnetic_bowl")).toBe("machine_sew_many_pins");
  });
});

describe("pinCushions", () => {
  it("returns 5 types", () => {
    expect(pinCushions()).toHaveLength(5);
  });
});
