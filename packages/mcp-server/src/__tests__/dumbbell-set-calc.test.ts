import { describe, it, expect } from "vitest";
import {
  weightRange, adjustSpeed, gripComfort, storageSpace,
  setCost, dropSafe, compactStorage, construction,
  bestTraining, dumbbellSets,
} from "../dumbbell-set-calc.js";

describe("weightRange", () => {
  it("olympic plate widest range", () => {
    expect(weightRange("olympic_plate")).toBeGreaterThan(weightRange("vinyl_coated"));
  });
});

describe("adjustSpeed", () => {
  it("fixed rubber fastest adjust", () => {
    expect(adjustSpeed("fixed_rubber")).toBeGreaterThan(adjustSpeed("olympic_plate"));
  });
});

describe("gripComfort", () => {
  it("fixed rubber most comfortable grip", () => {
    expect(gripComfort("fixed_rubber")).toBeGreaterThan(gripComfort("vinyl_coated"));
  });
});

describe("storageSpace", () => {
  it("adjustable dial least space needed", () => {
    expect(storageSpace("adjustable_dial")).toBeGreaterThan(storageSpace("fixed_rubber"));
  });
});

describe("setCost", () => {
  it("adjustable dial most expensive", () => {
    expect(setCost("adjustable_dial")).toBeGreaterThan(setCost("vinyl_coated"));
  });
});

describe("dropSafe", () => {
  it("fixed rubber is drop safe", () => {
    expect(dropSafe("fixed_rubber")).toBe(true);
  });
  it("adjustable dial is not", () => {
    expect(dropSafe("adjustable_dial")).toBe(false);
  });
});

describe("compactStorage", () => {
  it("adjustable dial is compact", () => {
    expect(compactStorage("adjustable_dial")).toBe(true);
  });
  it("fixed rubber is not", () => {
    expect(compactStorage("fixed_rubber")).toBe(false);
  });
});

describe("construction", () => {
  it("adjustable dial uses selector pin weight stack", () => {
    expect(construction("adjustable_dial")).toBe("selector_pin_weight_stack");
  });
});

describe("bestTraining", () => {
  it("vinyl coated for light rehab beginner", () => {
    expect(bestTraining("vinyl_coated")).toBe("light_rehab_beginner");
  });
});

describe("dumbbellSets", () => {
  it("returns 5 types", () => {
    expect(dumbbellSets()).toHaveLength(5);
  });
});
