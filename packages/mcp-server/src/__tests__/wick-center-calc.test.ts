import { describe, it, expect } from "vitest";
import {
  alignAccuracy, holdSecure, setupSpeed, sizeRange,
  centerCost, reusable, magnetic, mountStyle,
  bestUse, wickCenters,
} from "../wick-center-calc.js";

describe("alignAccuracy", () => {
  it("magnetic center hold most accurate align", () => {
    expect(alignAccuracy("magnetic_center_hold")).toBeGreaterThan(alignAccuracy("wooden_centering_stick"));
  });
});

describe("holdSecure", () => {
  it("adhesive dot base most secure hold", () => {
    expect(holdSecure("adhesive_dot_base")).toBeGreaterThan(holdSecure("wooden_centering_stick"));
  });
});

describe("setupSpeed", () => {
  it("clip centering ring fastest setup", () => {
    expect(setupSpeed("clip_centering_ring")).toBeGreaterThan(setupSpeed("magnetic_center_hold"));
  });
});

describe("sizeRange", () => {
  it("magnetic center hold widest size range", () => {
    expect(sizeRange("magnetic_center_hold")).toBeGreaterThan(sizeRange("wooden_centering_stick"));
  });
});

describe("centerCost", () => {
  it("magnetic center hold most expensive", () => {
    expect(centerCost("magnetic_center_hold")).toBeGreaterThan(centerCost("wooden_centering_stick"));
  });
});

describe("reusable", () => {
  it("metal centering bar is reusable", () => {
    expect(reusable("metal_centering_bar")).toBe(true);
  });
  it("adhesive dot base not reusable", () => {
    expect(reusable("adhesive_dot_base")).toBe(false);
  });
});

describe("magnetic", () => {
  it("magnetic center hold is magnetic", () => {
    expect(magnetic("magnetic_center_hold")).toBe(true);
  });
  it("metal centering bar not magnetic", () => {
    expect(magnetic("metal_centering_bar")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("clip centering ring uses spring clip ring", () => {
    expect(mountStyle("clip_centering_ring")).toBe("spring_clip_ring");
  });
});

describe("bestUse", () => {
  it("metal centering bar best for general container center", () => {
    expect(bestUse("metal_centering_bar")).toBe("general_container_center");
  });
});

describe("wickCenters", () => {
  it("returns 5 types", () => {
    expect(wickCenters()).toHaveLength(5);
  });
});
