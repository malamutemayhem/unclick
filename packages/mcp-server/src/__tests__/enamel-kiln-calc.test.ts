import { describe, it, expect } from "vitest";
import {
  heatEven, tempAccuracy, loadCapacity, spaceCompact,
  kilnCost, programmable, topLoad, chamberStyle,
  bestUse, enamelKilns,
} from "../enamel-kiln-calc.js";

describe("heatEven", () => {
  it("muffle kiln even most even heat", () => {
    expect(heatEven("muffle_kiln_even")).toBeGreaterThan(heatEven("micro_kiln_small"));
  });
});

describe("tempAccuracy", () => {
  it("programmable kiln auto most accurate temp", () => {
    expect(tempAccuracy("programmable_kiln_auto")).toBeGreaterThan(tempAccuracy("micro_kiln_small"));
  });
});

describe("loadCapacity", () => {
  it("front load standard largest load capacity", () => {
    expect(loadCapacity("front_load_standard")).toBeGreaterThan(loadCapacity("micro_kiln_small"));
  });
});

describe("spaceCompact", () => {
  it("micro kiln small most compact", () => {
    expect(spaceCompact("micro_kiln_small")).toBeGreaterThan(spaceCompact("muffle_kiln_even"));
  });
});

describe("kilnCost", () => {
  it("programmable kiln auto most expensive", () => {
    expect(kilnCost("programmable_kiln_auto")).toBeGreaterThan(kilnCost("micro_kiln_small"));
  });
});

describe("programmable", () => {
  it("programmable kiln auto is programmable", () => {
    expect(programmable("programmable_kiln_auto")).toBe(true);
  });
  it("front load standard not programmable", () => {
    expect(programmable("front_load_standard")).toBe(false);
  });
});

describe("topLoad", () => {
  it("top load compact is top load", () => {
    expect(topLoad("top_load_compact")).toBe(true);
  });
  it("front load standard not top load", () => {
    expect(topLoad("front_load_standard")).toBe(false);
  });
});

describe("chamberStyle", () => {
  it("muffle kiln even uses enclosed muffle box", () => {
    expect(chamberStyle("muffle_kiln_even")).toBe("enclosed_muffle_box");
  });
});

describe("bestUse", () => {
  it("front load standard best for general enamel fire", () => {
    expect(bestUse("front_load_standard")).toBe("general_enamel_fire");
  });
});

describe("enamelKilns", () => {
  it("returns 5 types", () => {
    expect(enamelKilns()).toHaveLength(5);
  });
});
