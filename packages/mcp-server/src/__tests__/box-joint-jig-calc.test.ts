import { describe, it, expect } from "vitest";
import {
  fitAccuracy, setupSpeed, sizeRange, durability,
  jigCost, powered, adjustable, cutMethod,
  bestUse, boxJointJigs,
} from "../box-joint-jig-calc.js";

describe("fitAccuracy", () => {
  it("dedicated box joint best fit accuracy", () => {
    expect(fitAccuracy("dedicated_box_joint")).toBeGreaterThan(fitAccuracy("hand_cut_guide"));
  });
});

describe("setupSpeed", () => {
  it("dedicated box joint fastest setup", () => {
    expect(setupSpeed("dedicated_box_joint")).toBeGreaterThan(setupSpeed("hand_cut_guide"));
  });
});

describe("sizeRange", () => {
  it("micro adjust finger widest size range", () => {
    expect(sizeRange("micro_adjust_finger")).toBeGreaterThan(sizeRange("hand_cut_guide"));
  });
});

describe("durability", () => {
  it("table saw sled most durable", () => {
    expect(durability("table_saw_sled")).toBeGreaterThan(durability("hand_cut_guide"));
  });
});

describe("jigCost", () => {
  it("micro adjust finger most expensive", () => {
    expect(jigCost("micro_adjust_finger")).toBeGreaterThan(jigCost("hand_cut_guide"));
  });
});

describe("powered", () => {
  it("table saw sled is powered", () => {
    expect(powered("table_saw_sled")).toBe(true);
  });
  it("hand cut guide not powered", () => {
    expect(powered("hand_cut_guide")).toBe(false);
  });
});

describe("adjustable", () => {
  it("micro adjust finger is adjustable", () => {
    expect(adjustable("micro_adjust_finger")).toBe(true);
  });
  it("hand cut guide not adjustable", () => {
    expect(adjustable("hand_cut_guide")).toBe(false);
  });
});

describe("cutMethod", () => {
  it("router table jig uses straight bit index", () => {
    expect(cutMethod("router_table_jig")).toBe("straight_bit_index");
  });
});

describe("bestUse", () => {
  it("hand cut guide best for traditional hand cut", () => {
    expect(bestUse("hand_cut_guide")).toBe("traditional_hand_cut");
  });
});

describe("boxJointJigs", () => {
  it("returns 5 types", () => {
    expect(boxJointJigs()).toHaveLength(5);
  });
});
