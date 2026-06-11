import { describe, it, expect } from "vitest";
import {
  clampForce, adjustSpeed, workRange, portability,
  horseCost, portable, forRound, headStyle,
  bestUse, shaveHorses,
} from "../shave-horse-calc.js";

describe("clampForce", () => {
  it("german schnitzelbank most clamp force", () => {
    expect(clampForce("german_schnitzelbank")).toBeGreaterThan(clampForce("bodger_portable_fold"));
  });
});

describe("adjustSpeed", () => {
  it("metal jaw modern fastest adjust", () => {
    expect(adjustSpeed("metal_jaw_modern")).toBeGreaterThan(adjustSpeed("german_schnitzelbank"));
  });
});

describe("workRange", () => {
  it("german schnitzelbank best work range", () => {
    expect(workRange("german_schnitzelbank")).toBeGreaterThan(workRange("bodger_portable_fold"));
  });
});

describe("portability", () => {
  it("bodger portable fold most portable", () => {
    expect(portability("bodger_portable_fold")).toBeGreaterThan(portability("german_schnitzelbank"));
  });
});

describe("horseCost", () => {
  it("metal jaw modern most expensive", () => {
    expect(horseCost("metal_jaw_modern")).toBeGreaterThan(horseCost("dumbhead_standard"));
  });
});

describe("portable", () => {
  it("bodger portable fold is portable", () => {
    expect(portable("bodger_portable_fold")).toBe(true);
  });
  it("dumbhead standard not portable", () => {
    expect(portable("dumbhead_standard")).toBe(false);
  });
});

describe("forRound", () => {
  it("dumbhead standard is for round", () => {
    expect(forRound("dumbhead_standard")).toBe(true);
  });
  it("german schnitzelbank not for round", () => {
    expect(forRound("german_schnitzelbank")).toBe(false);
  });
});

describe("headStyle", () => {
  it("metal jaw modern uses steel quick clamp", () => {
    expect(headStyle("metal_jaw_modern")).toBe("steel_quick_clamp");
  });
});

describe("bestUse", () => {
  it("bodger portable fold best for woodland field work", () => {
    expect(bestUse("bodger_portable_fold")).toBe("woodland_field_work");
  });
});

describe("shaveHorses", () => {
  it("returns 5 types", () => {
    expect(shaveHorses()).toHaveLength(5);
  });
});
