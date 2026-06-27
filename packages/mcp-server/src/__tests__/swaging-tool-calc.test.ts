import { describe, it, expect } from "vitest";
import {
  formQuality, sizeRange, speedSwage, jointStrength,
  swageCost, powered, forExpand, dieShape,
  bestUse, swagingTools,
} from "../swaging-tool-calc.js";

describe("formQuality", () => {
  it("hydraulic expander set best quality", () => {
    expect(formQuality("hydraulic_expander_set")).toBeGreaterThan(formQuality("expander_punch_push"));
  });
});

describe("sizeRange", () => {
  it("hydraulic expander set widest range", () => {
    expect(sizeRange("hydraulic_expander_set")).toBeGreaterThan(sizeRange("manual_flange_spread"));
  });
});

describe("speedSwage", () => {
  it("rotary swage spin fastest", () => {
    expect(speedSwage("rotary_swage_spin")).toBeGreaterThan(speedSwage("hydraulic_expander_set"));
  });
});

describe("jointStrength", () => {
  it("rotary swage spin strongest joint", () => {
    expect(jointStrength("rotary_swage_spin")).toBeGreaterThan(jointStrength("expander_punch_push"));
  });
});

describe("swageCost", () => {
  it("hydraulic expander set most expensive", () => {
    expect(swageCost("hydraulic_expander_set")).toBeGreaterThan(swageCost("expander_punch_push"));
  });
});

describe("powered", () => {
  it("rotary swage spin is powered", () => {
    expect(powered("rotary_swage_spin")).toBe(true);
  });
  it("expander punch push not powered", () => {
    expect(powered("expander_punch_push")).toBe(false);
  });
});

describe("forExpand", () => {
  it("expander punch push is for expand", () => {
    expect(forExpand("expander_punch_push")).toBe(true);
  });
  it("reducer die crimp not for expand", () => {
    expect(forExpand("reducer_die_crimp")).toBe(false);
  });
});

describe("dieShape", () => {
  it("rotary swage spin uses rotating hammer die", () => {
    expect(dieShape("rotary_swage_spin")).toBe("rotating_hammer_die");
  });
});

describe("bestUse", () => {
  it("manual flange spread best for field joint spread", () => {
    expect(bestUse("manual_flange_spread")).toBe("field_joint_spread");
  });
});

describe("swagingTools", () => {
  it("returns 5 types", () => {
    expect(swagingTools()).toHaveLength(5);
  });
});
