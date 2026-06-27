import { describe, it, expect } from "vitest";
import {
  capacity, visibility, accessEase, counterSpace,
  rackCost, noInstall, expandable, mountStyle,
  bestKitchen, spiceRacks,
} from "../spice-rack-calc.js";

describe("capacity", () => {
  it("pull down cabinet highest capacity", () => {
    expect(capacity("pull_down_cabinet")).toBeGreaterThan(capacity("magnetic_wall_strip"));
  });
});

describe("visibility", () => {
  it("magnetic wall strip best visibility", () => {
    expect(visibility("magnetic_wall_strip")).toBeGreaterThan(visibility("pull_down_cabinet"));
  });
});

describe("accessEase", () => {
  it("magnetic wall strip easiest access", () => {
    expect(accessEase("magnetic_wall_strip")).toBeGreaterThan(accessEase("tiered_shelf_step"));
  });
});

describe("counterSpace", () => {
  it("magnetic wall strip saves most counter space", () => {
    expect(counterSpace("magnetic_wall_strip")).toBeGreaterThan(counterSpace("tiered_shelf_step"));
  });
});

describe("rackCost", () => {
  it("pull down cabinet most expensive", () => {
    expect(rackCost("pull_down_cabinet")).toBeGreaterThan(rackCost("tiered_shelf_step"));
  });
});

describe("noInstall", () => {
  it("tiered shelf step needs no install", () => {
    expect(noInstall("tiered_shelf_step")).toBe(true);
  });
  it("magnetic wall strip does", () => {
    expect(noInstall("magnetic_wall_strip")).toBe(false);
  });
});

describe("expandable", () => {
  it("tiered shelf step is expandable", () => {
    expect(expandable("tiered_shelf_step")).toBe(true);
  });
  it("lazy susan turntable is not", () => {
    expect(expandable("lazy_susan_turntable")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("lazy susan turntable uses cabinet turntable spin", () => {
    expect(mountStyle("lazy_susan_turntable")).toBe("cabinet_turntable_spin");
  });
});

describe("bestKitchen", () => {
  it("magnetic wall strip best for small kitchen wall", () => {
    expect(bestKitchen("magnetic_wall_strip")).toBe("small_kitchen_wall");
  });
});

describe("spiceRacks", () => {
  it("returns 5 types", () => {
    expect(spiceRacks()).toHaveLength(5);
  });
});
