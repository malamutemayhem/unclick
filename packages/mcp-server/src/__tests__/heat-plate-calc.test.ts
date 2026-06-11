import { describe, it, expect } from "vitest";
import {
  fuseEven, controlPrecise, speedFuse, areaRange,
  plateCost, flameFree, handheld, heatMethod,
  bestUse, heatPlates,
} from "../heat-plate-calc.js";

describe("fuseEven", () => {
  it("infrared lamp radiant most even fuse", () => {
    expect(fuseEven("infrared_lamp_radiant")).toBeGreaterThan(fuseEven("torch_fuse_flame"));
  });
});

describe("controlPrecise", () => {
  it("tacking iron small most precise control", () => {
    expect(controlPrecise("tacking_iron_small")).toBeGreaterThan(controlPrecise("heat_gun_broad"));
  });
});

describe("speedFuse", () => {
  it("torch fuse flame fastest fuse", () => {
    expect(speedFuse("torch_fuse_flame")).toBeGreaterThan(speedFuse("infrared_lamp_radiant"));
  });
});

describe("areaRange", () => {
  it("heat gun broad widest area range", () => {
    expect(areaRange("heat_gun_broad")).toBeGreaterThan(areaRange("tacking_iron_small"));
  });
});

describe("plateCost", () => {
  it("infrared lamp radiant most expensive", () => {
    expect(plateCost("infrared_lamp_radiant")).toBeGreaterThan(plateCost("torch_fuse_flame"));
  });
});

describe("flameFree", () => {
  it("flat iron fuse is flame free", () => {
    expect(flameFree("flat_iron_fuse")).toBe(true);
  });
  it("torch fuse flame not flame free", () => {
    expect(flameFree("torch_fuse_flame")).toBe(false);
  });
});

describe("handheld", () => {
  it("tacking iron small is handheld", () => {
    expect(handheld("tacking_iron_small")).toBe(true);
  });
  it("infrared lamp radiant not handheld", () => {
    expect(handheld("infrared_lamp_radiant")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("heat gun broad uses hot air convect", () => {
    expect(heatMethod("heat_gun_broad")).toBe("hot_air_convect");
  });
});

describe("bestUse", () => {
  it("flat iron fuse best for general layer fuse", () => {
    expect(bestUse("flat_iron_fuse")).toBe("general_layer_fuse");
  });
});

describe("heatPlates", () => {
  it("returns 5 types", () => {
    expect(heatPlates()).toHaveLength(5);
  });
});
