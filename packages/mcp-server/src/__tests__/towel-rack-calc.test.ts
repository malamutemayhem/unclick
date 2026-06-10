import { describe, it, expect } from "vitest";
import {
  towelCapacity, dryingSpeed, installEase, spaceEfficiency,
  rackCost, noDrilling, heatsUp, mountStyle,
  bestBathroom, towelRacks,
} from "../towel-rack-calc.js";

describe("towelCapacity", () => {
  it("freestanding ladder most towel capacity", () => {
    expect(towelCapacity("freestanding_ladder")).toBeGreaterThan(towelCapacity("over_door_hook"));
  });
});

describe("dryingSpeed", () => {
  it("heated electric fastest drying", () => {
    expect(dryingSpeed("heated_electric")).toBeGreaterThan(dryingSpeed("over_door_hook"));
  });
});

describe("installEase", () => {
  it("over door hook easiest install", () => {
    expect(installEase("over_door_hook")).toBeGreaterThan(installEase("heated_electric"));
  });
});

describe("spaceEfficiency", () => {
  it("over door hook most space efficient", () => {
    expect(spaceEfficiency("over_door_hook")).toBeGreaterThan(spaceEfficiency("freestanding_ladder"));
  });
});

describe("rackCost", () => {
  it("heated electric most expensive", () => {
    expect(rackCost("heated_electric")).toBeGreaterThan(rackCost("over_door_hook"));
  });
});

describe("noDrilling", () => {
  it("over door hook needs no drilling", () => {
    expect(noDrilling("over_door_hook")).toBe(true);
  });
  it("wall bar fixed needs drilling", () => {
    expect(noDrilling("wall_bar_fixed")).toBe(false);
  });
});

describe("heatsUp", () => {
  it("heated electric heats up", () => {
    expect(heatsUp("heated_electric")).toBe(true);
  });
  it("wall bar fixed does not", () => {
    expect(heatsUp("wall_bar_fixed")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("freestanding ladder uses leaning ladder shelf", () => {
    expect(mountStyle("freestanding_ladder")).toBe("leaning_ladder_shelf");
  });
});

describe("bestBathroom", () => {
  it("heated electric for luxury warm towel", () => {
    expect(bestBathroom("heated_electric")).toBe("luxury_warm_towel");
  });
});

describe("towelRacks", () => {
  it("returns 5 types", () => {
    expect(towelRacks()).toHaveLength(5);
  });
});
