import { describe, it, expect } from "vitest";
import {
  cableCapacity, installSpeed, loadRating, versatility,
  hookCost, toolFree, forCeiling, mountMethod,
  bestUse, jHooks,
} from "../j-hook-calc.js";

describe("cableCapacity", () => {
  it("wide mouth multi highest cable capacity", () => {
    expect(cableCapacity("wide_mouth_multi")).toBeGreaterThan(cableCapacity("batwing_ceiling_snap"));
  });
});

describe("installSpeed", () => {
  it("clip on beam clamp fastest install", () => {
    expect(installSpeed("clip_on_beam_clamp")).toBeGreaterThan(installSpeed("threaded_rod_mount"));
  });
});

describe("loadRating", () => {
  it("threaded rod mount highest load rating", () => {
    expect(loadRating("threaded_rod_mount")).toBeGreaterThan(loadRating("batwing_ceiling_snap"));
  });
});

describe("versatility", () => {
  it("threaded rod mount most versatile", () => {
    expect(versatility("threaded_rod_mount")).toBeGreaterThan(versatility("batwing_ceiling_snap"));
  });
});

describe("hookCost", () => {
  it("wide mouth multi more expensive", () => {
    expect(hookCost("wide_mouth_multi")).toBeGreaterThan(hookCost("standard_galv_steel"));
  });
});

describe("toolFree", () => {
  it("clip on beam clamp is tool free", () => {
    expect(toolFree("clip_on_beam_clamp")).toBe(true);
  });
  it("standard galv steel not tool free", () => {
    expect(toolFree("standard_galv_steel")).toBe(false);
  });
});

describe("forCeiling", () => {
  it("batwing ceiling snap is for ceiling", () => {
    expect(forCeiling("batwing_ceiling_snap")).toBe(true);
  });
  it("standard galv steel not for ceiling", () => {
    expect(forCeiling("standard_galv_steel")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("batwing uses ceiling tile snap", () => {
    expect(mountMethod("batwing_ceiling_snap")).toBe("ceiling_tile_snap");
  });
});

describe("bestUse", () => {
  it("threaded rod mount best for ceiling grid drop run", () => {
    expect(bestUse("threaded_rod_mount")).toBe("ceiling_grid_drop_run");
  });
});

describe("jHooks", () => {
  it("returns 5 types", () => {
    expect(jHooks()).toHaveLength(5);
  });
});
