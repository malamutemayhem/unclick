import { describe, it, expect } from "vitest";
import {
  heatEven, tempControl, shadeGradient, sandCapacity,
  shadeCost, tempRegulated, portable, heatSource,
  bestUse, sandShades,
} from "../sand-shade-calc.js";

describe("heatEven", () => {
  it("copper tray even most even heat", () => {
    expect(heatEven("copper_tray_even")).toBeGreaterThan(heatEven("sand_bag_portable"));
  });
});

describe("tempControl", () => {
  it("electric pan temp best temp control", () => {
    expect(tempControl("electric_pan_temp")).toBeGreaterThan(tempControl("sand_bag_portable"));
  });
});

describe("shadeGradient", () => {
  it("electric pan temp best shade gradient", () => {
    expect(shadeGradient("electric_pan_temp")).toBeGreaterThan(shadeGradient("sand_bag_portable"));
  });
});

describe("sandCapacity", () => {
  it("iron skillet heavy most sand capacity", () => {
    expect(sandCapacity("iron_skillet_heavy")).toBeGreaterThan(sandCapacity("sand_bag_portable"));
  });
});

describe("shadeCost", () => {
  it("electric pan temp more expensive than sand bag", () => {
    expect(shadeCost("electric_pan_temp")).toBeGreaterThan(shadeCost("sand_bag_portable"));
  });
});

describe("tempRegulated", () => {
  it("electric pan temp is regulated", () => {
    expect(tempRegulated("electric_pan_temp")).toBe(true);
  });
  it("hot sand tray not regulated", () => {
    expect(tempRegulated("hot_sand_tray")).toBe(false);
  });
});

describe("portable", () => {
  it("sand bag portable is portable", () => {
    expect(portable("sand_bag_portable")).toBe(true);
  });
  it("electric pan temp not portable", () => {
    expect(portable("electric_pan_temp")).toBe(false);
  });
});

describe("heatSource", () => {
  it("iron skillet heavy uses cast iron retain", () => {
    expect(heatSource("iron_skillet_heavy")).toBe("cast_iron_retain");
  });
});

describe("bestUse", () => {
  it("electric pan temp best for precision shade control", () => {
    expect(bestUse("electric_pan_temp")).toBe("precision_shade_control");
  });
});

describe("sandShades", () => {
  it("returns 5 types", () => {
    expect(sandShades()).toHaveLength(5);
  });
});
