import { describe, it, expect } from "vitest";
import {
  cubeCount, releaseEase, iceClarity, meltSpeed,
  trayCost, hasLid, stackable, trayMaterial,
  bestDrink, iceCubeTrays,
} from "../ice-cube-tray-calc.js";

describe("cubeCount", () => {
  it("nugget pebble mini most cubes", () => {
    expect(cubeCount("nugget_pebble_mini")).toBeGreaterThan(cubeCount("large_sphere_mold"));
  });
});

describe("releaseEase", () => {
  it("stainless lever release easiest release", () => {
    expect(releaseEase("stainless_lever_release")).toBeGreaterThan(releaseEase("clear_ice_insulated"));
  });
});

describe("iceClarity", () => {
  it("clear ice insulated best clarity", () => {
    expect(iceClarity("clear_ice_insulated")).toBeGreaterThan(iceClarity("silicone_flex_pop"));
  });
});

describe("meltSpeed", () => {
  it("clear ice insulated slowest melt", () => {
    expect(meltSpeed("clear_ice_insulated")).toBeGreaterThan(meltSpeed("nugget_pebble_mini"));
  });
});

describe("trayCost", () => {
  it("clear ice insulated most expensive", () => {
    expect(trayCost("clear_ice_insulated")).toBeGreaterThan(trayCost("silicone_flex_pop"));
  });
});

describe("hasLid", () => {
  it("silicone flex pop has lid", () => {
    expect(hasLid("silicone_flex_pop")).toBe(true);
  });
  it("stainless lever release does not", () => {
    expect(hasLid("stainless_lever_release")).toBe(false);
  });
});

describe("stackable", () => {
  it("silicone flex pop is stackable", () => {
    expect(stackable("silicone_flex_pop")).toBe(true);
  });
  it("large sphere mold is not", () => {
    expect(stackable("large_sphere_mold")).toBe(false);
  });
});

describe("trayMaterial", () => {
  it("clear ice insulated uses insulated box slow freeze", () => {
    expect(trayMaterial("clear_ice_insulated")).toBe("insulated_box_slow_freeze");
  });
});

describe("bestDrink", () => {
  it("large sphere mold best for whiskey old fashioned", () => {
    expect(bestDrink("large_sphere_mold")).toBe("whiskey_old_fashioned");
  });
});

describe("iceCubeTrays", () => {
  it("returns 5 types", () => {
    expect(iceCubeTrays()).toHaveLength(5);
  });
});
