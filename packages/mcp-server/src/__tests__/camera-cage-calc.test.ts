import { describe, it, expect } from "vitest";
import {
  accessoryMount, cameraProtection, portability, gripComfort,
  cageCost, arcaCompatible, coldShoeMount, cageMaterial,
  bestSetup, cameraCages,
} from "../camera-cage-calc.js";

describe("accessoryMount", () => {
  it("full cage rig most accessory mounts", () => {
    expect(accessoryMount("full_cage_rig")).toBeGreaterThan(accessoryMount("l_bracket_plate"));
  });
});

describe("cameraProtection", () => {
  it("full cage rig best camera protection", () => {
    expect(cameraProtection("full_cage_rig")).toBeGreaterThan(cameraProtection("l_bracket_plate"));
  });
});

describe("portability", () => {
  it("l bracket plate most portable", () => {
    expect(portability("l_bracket_plate")).toBeGreaterThan(portability("modular_rail_system"));
  });
});

describe("gripComfort", () => {
  it("full cage rig best grip comfort", () => {
    expect(gripComfort("full_cage_rig")).toBeGreaterThan(gripComfort("l_bracket_plate"));
  });
});

describe("cageCost", () => {
  it("modular rail system most expensive", () => {
    expect(cageCost("modular_rail_system")).toBeGreaterThan(cageCost("smartphone_cage_mount"));
  });
});

describe("arcaCompatible", () => {
  it("full cage rig is arca compatible", () => {
    expect(arcaCompatible("full_cage_rig")).toBe(true);
  });
  it("smartphone cage mount is not arca compatible", () => {
    expect(arcaCompatible("smartphone_cage_mount")).toBe(false);
  });
});

describe("coldShoeMount", () => {
  it("full cage rig has cold shoe mount", () => {
    expect(coldShoeMount("full_cage_rig")).toBe(true);
  });
  it("l bracket plate has no cold shoe mount", () => {
    expect(coldShoeMount("l_bracket_plate")).toBe(false);
  });
});

describe("cageMaterial", () => {
  it("modular rail system uses nato rail rod system", () => {
    expect(cageMaterial("modular_rail_system")).toBe("nato_rail_rod_system");
  });
});

describe("bestSetup", () => {
  it("full cage rig best for video production full", () => {
    expect(bestSetup("full_cage_rig")).toBe("video_production_full");
  });
});

describe("cameraCages", () => {
  it("returns 5 types", () => {
    expect(cameraCages()).toHaveLength(5);
  });
});
