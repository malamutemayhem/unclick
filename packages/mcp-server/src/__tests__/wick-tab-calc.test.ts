import { describe, it, expect } from "vitest";
import {
  holdStrength, centerAlign, safetyFlame, easeOfUse,
  tabCost, hasFlameOut, multiWick, tabShape,
  bestCandle, wickTabs,
} from "../wick-tab-calc.js";

describe("holdStrength", () => {
  it("double wick plate strongest hold", () => {
    expect(holdStrength("double_wick_plate")).toBeGreaterThan(holdStrength("standard_round_crimp"));
  });
});

describe("centerAlign", () => {
  it("self centering clip best center alignment", () => {
    expect(centerAlign("self_centering_clip")).toBeGreaterThan(centerAlign("standard_round_crimp"));
  });
});

describe("safetyFlame", () => {
  it("safety sustainer base best flame safety", () => {
    expect(safetyFlame("safety_sustainer_base")).toBeGreaterThan(safetyFlame("standard_round_crimp"));
  });
});

describe("easeOfUse", () => {
  it("self centering clip easiest to use", () => {
    expect(easeOfUse("self_centering_clip")).toBeGreaterThan(easeOfUse("double_wick_plate"));
  });
});

describe("tabCost", () => {
  it("self centering clip more expensive than standard", () => {
    expect(tabCost("self_centering_clip")).toBeGreaterThan(tabCost("standard_round_crimp"));
  });
});

describe("hasFlameOut", () => {
  it("safety sustainer base has flame out", () => {
    expect(hasFlameOut("safety_sustainer_base")).toBe(true);
  });
  it("standard round crimp does not have flame out", () => {
    expect(hasFlameOut("standard_round_crimp")).toBe(false);
  });
});

describe("multiWick", () => {
  it("double wick plate is multi wick", () => {
    expect(multiWick("double_wick_plate")).toBe(true);
  });
  it("standard round crimp is not multi wick", () => {
    expect(multiWick("standard_round_crimp")).toBe(false);
  });
});

describe("tabShape", () => {
  it("wick bar center uses cross bar bridge", () => {
    expect(tabShape("wick_bar_center")).toBe("cross_bar_bridge");
  });
});

describe("bestCandle", () => {
  it("safety sustainer base best for container jar safe", () => {
    expect(bestCandle("safety_sustainer_base")).toBe("container_jar_safe");
  });
});

describe("wickTabs", () => {
  it("returns 5 types", () => {
    expect(wickTabs()).toHaveLength(5);
  });
});
