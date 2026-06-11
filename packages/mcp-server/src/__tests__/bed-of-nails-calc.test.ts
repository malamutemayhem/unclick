import { describe, it, expect } from "vitest";
import {
  pinDensity, contactForce, cycleLife, alignment,
  fixtureCost, vacuumSeal, forHighDensity, probeStyle,
  bestUse, bedOfNails,
} from "../bed-of-nails-calc.js";

describe("pinDensity", () => {
  it("high density 50mil best pin density", () => {
    expect(pinDensity("high_density_50mil")).toBeGreaterThan(pinDensity("standard_100mil"));
  });
});

describe("contactForce", () => {
  it("double side dual best contact force", () => {
    expect(contactForce("double_side_dual")).toBeGreaterThan(contactForce("wireless_rf_probe"));
  });
});

describe("cycleLife", () => {
  it("wireless rf probe longest cycle life", () => {
    expect(cycleLife("wireless_rf_probe")).toBeGreaterThan(cycleLife("high_density_50mil"));
  });
});

describe("alignment", () => {
  it("high density 50mil best alignment", () => {
    expect(alignment("high_density_50mil")).toBeGreaterThan(alignment("wireless_rf_probe"));
  });
});

describe("fixtureCost", () => {
  it("double side dual most expensive", () => {
    expect(fixtureCost("double_side_dual")).toBeGreaterThan(fixtureCost("standard_100mil"));
  });
});

describe("vacuumSeal", () => {
  it("standard 100mil has vacuum seal", () => {
    expect(vacuumSeal("standard_100mil")).toBe(true);
  });
  it("wireless rf probe no vacuum seal", () => {
    expect(vacuumSeal("wireless_rf_probe")).toBe(false);
  });
});

describe("forHighDensity", () => {
  it("high density 50mil is for high density", () => {
    expect(forHighDensity("high_density_50mil")).toBe(true);
  });
  it("standard 100mil not for high density", () => {
    expect(forHighDensity("standard_100mil")).toBe(false);
  });
});

describe("probeStyle", () => {
  it("wireless rf probe uses capacitive rf coupler", () => {
    expect(probeStyle("wireless_rf_probe")).toBe("capacitive_rf_coupler");
  });
});

describe("bestUse", () => {
  it("standard 100mil best for through hole mixed board", () => {
    expect(bestUse("standard_100mil")).toBe("through_hole_mixed_board");
  });
});

describe("bedOfNails", () => {
  it("returns 5 types", () => {
    expect(bedOfNails()).toHaveLength(5);
  });
});
