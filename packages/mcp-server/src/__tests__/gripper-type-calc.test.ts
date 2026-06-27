import { describe, it, expect } from "vitest";
import {
  graspForce, versatility, speed, delicacy,
  grCost, contactFree, forFood, actuation,
  bestUse, gripperTypes,
} from "../gripper-type-calc.js";

describe("graspForce", () => {
  it("magnetic permanent strongest grasp", () => {
    expect(graspForce("magnetic_permanent")).toBeGreaterThan(graspForce("soft_pneumatic_finger"));
  });
});

describe("versatility", () => {
  it("adaptive underactuated most versatile", () => {
    expect(versatility("adaptive_underactuated")).toBeGreaterThan(versatility("magnetic_permanent"));
  });
});

describe("speed", () => {
  it("vacuum suction fastest", () => {
    expect(speed("vacuum_suction_cup")).toBeGreaterThan(speed("soft_pneumatic_finger"));
  });
});

describe("delicacy", () => {
  it("soft pneumatic most delicate", () => {
    expect(delicacy("soft_pneumatic_finger")).toBeGreaterThan(delicacy("magnetic_permanent"));
  });
});

describe("grCost", () => {
  it("adaptive underactuated most expensive", () => {
    expect(grCost("adaptive_underactuated")).toBeGreaterThan(grCost("vacuum_suction_cup"));
  });
});

describe("contactFree", () => {
  it("magnetic permanent is contact free", () => {
    expect(contactFree("magnetic_permanent")).toBe(true);
  });
  it("parallel jaw not contact free", () => {
    expect(contactFree("parallel_jaw_pneumatic")).toBe(false);
  });
});

describe("forFood", () => {
  it("soft pneumatic for food", () => {
    expect(forFood("soft_pneumatic_finger")).toBe(true);
  });
  it("magnetic permanent not for food", () => {
    expect(forFood("magnetic_permanent")).toBe(false);
  });
});

describe("actuation", () => {
  it("adaptive underactuated uses tendon driven compliant link", () => {
    expect(actuation("adaptive_underactuated")).toBe("tendon_driven_compliant_link");
  });
});

describe("bestUse", () => {
  it("soft pneumatic best for fruit harvest", () => {
    expect(bestUse("soft_pneumatic_finger")).toBe("fruit_harvest_delicate_grip");
  });
});

describe("gripperTypes", () => {
  it("returns 5 types", () => {
    expect(gripperTypes()).toHaveLength(5);
  });
});
