import { describe, it, expect } from "vitest";
import {
  gripSecure, markFree, reachDepth, sizeRange,
  tongCost, springLoaded, rubberTip, jawStyle,
  bestUse, glazeTongs,
} from "../glaze-tong-calc.js";

describe("gripSecure", () => {
  it("spring tong grip most secure grip", () => {
    expect(gripSecure("spring_tong_grip")).toBeGreaterThan(gripSecure("rubber_tip_gentle"));
  });
});

describe("markFree", () => {
  it("rubber tip gentle most mark free", () => {
    expect(markFree("rubber_tip_gentle")).toBeGreaterThan(markFree("long_reach_deep"));
  });
});

describe("reachDepth", () => {
  it("long reach deep deepest reach", () => {
    expect(reachDepth("long_reach_deep")).toBeGreaterThan(reachDepth("rubber_tip_gentle"));
  });
});

describe("sizeRange", () => {
  it("wide jaw plate widest size range", () => {
    expect(sizeRange("wide_jaw_plate")).toBeGreaterThan(sizeRange("long_reach_deep"));
  });
});

describe("tongCost", () => {
  it("rubber tip gentle most expensive", () => {
    expect(tongCost("rubber_tip_gentle")).toBeGreaterThan(tongCost("dipping_tong_standard"));
  });
});

describe("springLoaded", () => {
  it("spring tong grip is spring loaded", () => {
    expect(springLoaded("spring_tong_grip")).toBe(true);
  });
  it("dipping tong standard not spring loaded", () => {
    expect(springLoaded("dipping_tong_standard")).toBe(false);
  });
});

describe("rubberTip", () => {
  it("rubber tip gentle has rubber tip", () => {
    expect(rubberTip("rubber_tip_gentle")).toBe(true);
  });
  it("dipping tong standard no rubber tip", () => {
    expect(rubberTip("dipping_tong_standard")).toBe(false);
  });
});

describe("jawStyle", () => {
  it("wide jaw plate uses wide flat cradle", () => {
    expect(jawStyle("wide_jaw_plate")).toBe("wide_flat_cradle");
  });
});

describe("bestUse", () => {
  it("dipping tong standard best for general glaze dip", () => {
    expect(bestUse("dipping_tong_standard")).toBe("general_glaze_dip");
  });
});

describe("glazeTongs", () => {
  it("returns 5 types", () => {
    expect(glazeTongs()).toHaveLength(5);
  });
});
