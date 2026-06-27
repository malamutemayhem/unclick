import { describe, it, expect } from "vitest";
import {
  inkCapacity, writeSmooth, fillConvenience, nibVariety,
  penCost, anyInk, selfSeal, fillMechanism,
  bestWriter, fountainPens,
} from "../fountain-pen-calc.js";

describe("inkCapacity", () => {
  it("eyedropper fill largest capacity", () => {
    expect(inkCapacity("eyedropper_fill")).toBeGreaterThan(inkCapacity("cartridge_converter"));
  });
});

describe("writeSmooth", () => {
  it("vacuum filler smoothest write", () => {
    expect(writeSmooth("vacuum_filler")).toBeGreaterThan(writeSmooth("disposable_starter"));
  });
});

describe("fillConvenience", () => {
  it("cartridge converter most convenient fill", () => {
    expect(fillConvenience("cartridge_converter")).toBeGreaterThan(fillConvenience("eyedropper_fill"));
  });
});

describe("nibVariety", () => {
  it("cartridge converter most nib variety", () => {
    expect(nibVariety("cartridge_converter")).toBeGreaterThan(nibVariety("disposable_starter"));
  });
});

describe("penCost", () => {
  it("vacuum filler most expensive", () => {
    expect(penCost("vacuum_filler")).toBeGreaterThan(penCost("disposable_starter"));
  });
});

describe("anyInk", () => {
  it("piston filler accepts any ink", () => {
    expect(anyInk("piston_filler")).toBe(true);
  });
  it("disposable starter does not", () => {
    expect(anyInk("disposable_starter")).toBe(false);
  });
});

describe("selfSeal", () => {
  it("vacuum filler self seals", () => {
    expect(selfSeal("vacuum_filler")).toBe(true);
  });
  it("piston filler does not", () => {
    expect(selfSeal("piston_filler")).toBe(false);
  });
});

describe("fillMechanism", () => {
  it("eyedropper fill uses direct barrel dropper", () => {
    expect(fillMechanism("eyedropper_fill")).toBe("direct_barrel_dropper");
  });
});

describe("bestWriter", () => {
  it("cartridge converter for beginner student office", () => {
    expect(bestWriter("cartridge_converter")).toBe("beginner_student_office");
  });
});

describe("fountainPens", () => {
  it("returns 5 types", () => {
    expect(fountainPens()).toHaveLength(5);
  });
});
