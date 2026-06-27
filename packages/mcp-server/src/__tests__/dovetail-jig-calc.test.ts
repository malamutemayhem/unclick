import { describe, it, expect } from "vitest";
import {
  jointStrength, setupSpeed, pinSpacing, repeatAccuracy,
  djCost, adjustable, forDrawer, jigConfig,
  bestUse, dovetailJigTypes,
} from "../dovetail-jig-calc.js";

describe("jointStrength", () => {
  it("through dovetail strongest joint", () => {
    expect(jointStrength("through_dovetail")).toBeGreaterThan(jointStrength("box_joint_finger"));
  });
});

describe("setupSpeed", () => {
  it("box joint finger fastest setup", () => {
    expect(setupSpeed("box_joint_finger")).toBeGreaterThan(setupSpeed("variable_spacing"));
  });
});

describe("pinSpacing", () => {
  it("variable spacing best pin spacing control", () => {
    expect(pinSpacing("variable_spacing")).toBeGreaterThan(pinSpacing("half_blind_fixed"));
  });
});

describe("repeatAccuracy", () => {
  it("box joint finger best repeat accuracy", () => {
    expect(repeatAccuracy("box_joint_finger")).toBeGreaterThan(repeatAccuracy("variable_spacing"));
  });
});

describe("djCost", () => {
  it("router template most expensive", () => {
    expect(djCost("router_template")).toBeGreaterThan(djCost("box_joint_finger"));
  });
});

describe("adjustable", () => {
  it("variable spacing is adjustable", () => {
    expect(adjustable("variable_spacing")).toBe(true);
  });
  it("half blind fixed not adjustable", () => {
    expect(adjustable("half_blind_fixed")).toBe(false);
  });
});

describe("forDrawer", () => {
  it("half blind fixed for drawer", () => {
    expect(forDrawer("half_blind_fixed")).toBe(true);
  });
  it("through dovetail not for drawer", () => {
    expect(forDrawer("through_dovetail")).toBe(false);
  });
});

describe("jigConfig", () => {
  it("box joint finger uses indexing pin fence", () => {
    expect(jigConfig("box_joint_finger")).toBe("indexing_pin_fence_box_joint_finger_joint_equal_spacing_cut");
  });
});

describe("bestUse", () => {
  it("through dovetail for fine furniture", () => {
    expect(bestUse("through_dovetail")).toBe("fine_furniture_box_chest_visible_through_dovetail_decorative");
  });
});

describe("dovetailJigTypes", () => {
  it("returns 5 types", () => {
    expect(dovetailJigTypes()).toHaveLength(5);
  });
});
