import { describe, it, expect } from "vitest";
import {
  gatherControl, blowEase, heatRetain, handleCool,
  blowpipeCost, lightweight, forLarge, pipeLength,
  bestUse, blowpipeGlasses,
} from "../blowpipe-glass-calc.js";

describe("gatherControl", () => {
  it("heavy gather long best gather control", () => {
    expect(gatherControl("heavy_gather_long")).toBeGreaterThan(gatherControl("starter_student_basic"));
  });
});

describe("blowEase", () => {
  it("lightweight aluminum short easiest blow", () => {
    expect(blowEase("lightweight_aluminum_short")).toBeGreaterThan(blowEase("heavy_gather_long"));
  });
});

describe("heatRetain", () => {
  it("heavy gather long best heat retain", () => {
    expect(heatRetain("heavy_gather_long")).toBeGreaterThan(heatRetain("lightweight_aluminum_short"));
  });
});

describe("handleCool", () => {
  it("double wall cool coolest handle", () => {
    expect(handleCool("double_wall_cool")).toBeGreaterThan(handleCool("heavy_gather_long"));
  });
});

describe("blowpipeCost", () => {
  it("double wall cool most expensive", () => {
    expect(blowpipeCost("double_wall_cool")).toBeGreaterThan(blowpipeCost("starter_student_basic"));
  });
});

describe("lightweight", () => {
  it("lightweight aluminum short is lightweight", () => {
    expect(lightweight("lightweight_aluminum_short")).toBe(true);
  });
  it("standard steel pipe not lightweight", () => {
    expect(lightweight("standard_steel_pipe")).toBe(false);
  });
});

describe("forLarge", () => {
  it("heavy gather long is for large", () => {
    expect(forLarge("heavy_gather_long")).toBe(true);
  });
  it("starter student basic not for large", () => {
    expect(forLarge("starter_student_basic")).toBe(false);
  });
});

describe("pipeLength", () => {
  it("heavy gather long uses long 60 inch", () => {
    expect(pipeLength("heavy_gather_long")).toBe("long_60_inch");
  });
});

describe("bestUse", () => {
  it("double wall cool best for extended session blow", () => {
    expect(bestUse("double_wall_cool")).toBe("extended_session_blow");
  });
});

describe("blowpipeGlasses", () => {
  it("returns 5 types", () => {
    expect(blowpipeGlasses()).toHaveLength(5);
  });
});
