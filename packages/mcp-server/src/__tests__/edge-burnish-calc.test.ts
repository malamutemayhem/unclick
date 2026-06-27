import { describe, it, expect } from "vitest";
import {
  polishQuality, speedEfficiency, sizeRange, controlFeel,
  burnishCost, powered, multiGroove, toolMaterial,
  bestUse, edgeBurnishers,
} from "../edge-burnish-calc.js";

describe("polishQuality", () => {
  it("cocobolo multi groove best polish quality", () => {
    expect(polishQuality("cocobolo_multi_groove")).toBeGreaterThan(polishQuality("canvas_roller_wrap"));
  });
});

describe("speedEfficiency", () => {
  it("power drill mount fastest speed", () => {
    expect(speedEfficiency("power_drill_mount")).toBeGreaterThan(speedEfficiency("wood_slick_hand"));
  });
});

describe("sizeRange", () => {
  it("cocobolo multi groove widest size range", () => {
    expect(sizeRange("cocobolo_multi_groove")).toBeGreaterThan(sizeRange("bone_folder_flat"));
  });
});

describe("controlFeel", () => {
  it("wood slick hand best control feel", () => {
    expect(controlFeel("wood_slick_hand")).toBeGreaterThan(controlFeel("power_drill_mount"));
  });
});

describe("burnishCost", () => {
  it("cocobolo multi groove most expensive", () => {
    expect(burnishCost("cocobolo_multi_groove")).toBeGreaterThan(burnishCost("wood_slick_hand"));
  });
});

describe("powered", () => {
  it("power drill mount is powered", () => {
    expect(powered("power_drill_mount")).toBe(true);
  });
  it("wood slick hand not powered", () => {
    expect(powered("wood_slick_hand")).toBe(false);
  });
});

describe("multiGroove", () => {
  it("cocobolo multi groove has multi groove", () => {
    expect(multiGroove("cocobolo_multi_groove")).toBe(true);
  });
  it("wood slick hand no multi groove", () => {
    expect(multiGroove("wood_slick_hand")).toBe(false);
  });
});

describe("toolMaterial", () => {
  it("cocobolo multi groove uses cocobolo turned wood", () => {
    expect(toolMaterial("cocobolo_multi_groove")).toBe("cocobolo_turned_wood");
  });
});

describe("bestUse", () => {
  it("power drill mount best for production edge run", () => {
    expect(bestUse("power_drill_mount")).toBe("production_edge_run");
  });
});

describe("edgeBurnishers", () => {
  it("returns 5 types", () => {
    expect(edgeBurnishers()).toHaveLength(5);
  });
});
