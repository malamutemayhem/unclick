import { describe, it, expect } from "vitest";
import {
  tackPull, fabricSafe, speedStrip, controlAim,
  chiselCost, cranked, magnetic, bladeWidth,
  bestUse, rippingChiselUpholsts,
} from "../ripping-chisel-upholst-calc.js";

describe("tackPull", () => {
  it("wide blade fast strongest tack pull", () => {
    expect(tackPull("wide_blade_fast")).toBeGreaterThan(tackPull("narrow_blade_detail"));
  });
});

describe("fabricSafe", () => {
  it("narrow blade detail most fabric safe", () => {
    expect(fabricSafe("narrow_blade_detail")).toBeGreaterThan(fabricSafe("wide_blade_fast"));
  });
});

describe("speedStrip", () => {
  it("wide blade fast fastest strip", () => {
    expect(speedStrip("wide_blade_fast")).toBeGreaterThan(speedStrip("narrow_blade_detail"));
  });
});

describe("controlAim", () => {
  it("narrow blade detail best control aim", () => {
    expect(controlAim("narrow_blade_detail")).toBeGreaterThan(controlAim("wide_blade_fast"));
  });
});

describe("chiselCost", () => {
  it("magnetic tip collect most expensive", () => {
    expect(chiselCost("magnetic_tip_collect")).toBeGreaterThan(chiselCost("straight_blade_standard"));
  });
});

describe("cranked", () => {
  it("cranked blade offset is cranked", () => {
    expect(cranked("cranked_blade_offset")).toBe(true);
  });
  it("straight blade standard not cranked", () => {
    expect(cranked("straight_blade_standard")).toBe(false);
  });
});

describe("magnetic", () => {
  it("magnetic tip collect is magnetic", () => {
    expect(magnetic("magnetic_tip_collect")).toBe(true);
  });
  it("straight blade standard not magnetic", () => {
    expect(magnetic("straight_blade_standard")).toBe(false);
  });
});

describe("bladeWidth", () => {
  it("narrow blade detail uses narrow quarter inch", () => {
    expect(bladeWidth("narrow_blade_detail")).toBe("narrow_quarter_inch");
  });
});

describe("bestUse", () => {
  it("straight blade standard best for general tack strip", () => {
    expect(bestUse("straight_blade_standard")).toBe("general_tack_strip");
  });
});

describe("rippingChiselUpholsts", () => {
  it("returns 5 types", () => {
    expect(rippingChiselUpholsts()).toHaveLength(5);
  });
});
