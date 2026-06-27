import { describe, it, expect } from "vitest";
import {
  capacity, stability, dripCollection, aesthetics,
  standCost, removableTray, holdsWalkingStick, standMaterial,
  bestSetting, umbrellaStands,
} from "../umbrella-stand-calc.js";

describe("capacity", () => {
  it("plastic modular office highest capacity", () => {
    expect(capacity("plastic_modular_office")).toBeGreaterThan(capacity("wall_mount_drip_tray"));
  });
});

describe("stability", () => {
  it("wall mount drip tray most stable", () => {
    expect(stability("wall_mount_drip_tray")).toBeGreaterThan(stability("plastic_modular_office"));
  });
});

describe("dripCollection", () => {
  it("wall mount drip tray best drip collection", () => {
    expect(dripCollection("wall_mount_drip_tray")).toBeGreaterThan(dripCollection("metal_wire_frame"));
  });
});

describe("aesthetics", () => {
  it("ceramic cylinder classic best aesthetics", () => {
    expect(aesthetics("ceramic_cylinder_classic")).toBeGreaterThan(aesthetics("plastic_modular_office"));
  });
});

describe("standCost", () => {
  it("ceramic cylinder classic most expensive", () => {
    expect(standCost("ceramic_cylinder_classic")).toBeGreaterThan(standCost("plastic_modular_office"));
  });
});

describe("removableTray", () => {
  it("metal wire frame has removable tray", () => {
    expect(removableTray("metal_wire_frame")).toBe(true);
  });
  it("ceramic cylinder classic does not", () => {
    expect(removableTray("ceramic_cylinder_classic")).toBe(false);
  });
});

describe("holdsWalkingStick", () => {
  it("wooden bucket rustic holds walking stick", () => {
    expect(holdsWalkingStick("wooden_bucket_rustic")).toBe(true);
  });
  it("plastic modular office does not", () => {
    expect(holdsWalkingStick("plastic_modular_office")).toBe(false);
  });
});

describe("standMaterial", () => {
  it("wooden bucket rustic uses reclaimed oak barrel", () => {
    expect(standMaterial("wooden_bucket_rustic")).toBe("reclaimed_oak_barrel");
  });
});

describe("bestSetting", () => {
  it("ceramic cylinder classic best for formal foyer entryway", () => {
    expect(bestSetting("ceramic_cylinder_classic")).toBe("formal_foyer_entryway");
  });
});

describe("umbrellaStands", () => {
  it("returns 5 types", () => {
    expect(umbrellaStands()).toHaveLength(5);
  });
});
