import { describe, it, expect } from "vitest";
import {
  speed, gentleness, flexibility, footprint,
  cpCost, automated, forFragile, mechanism,
  bestUse, casePackerTypes,
} from "../case-packer-calc.js";

describe("speed", () => {
  it("drop packer fastest", () => {
    expect(speed("drop_packer")).toBeGreaterThan(speed("pick_and_place"));
  });
});

describe("gentleness", () => {
  it("pick and place most gentle", () => {
    expect(gentleness("pick_and_place")).toBeGreaterThan(gentleness("drop_packer"));
  });
});

describe("flexibility", () => {
  it("top load robotic most flexible", () => {
    expect(flexibility("top_load_robotic")).toBeGreaterThan(flexibility("drop_packer"));
  });
});

describe("footprint", () => {
  it("wrap around and top load smallest footprint", () => {
    expect(footprint("wrap_around")).toBeGreaterThan(footprint("side_load"));
    expect(footprint("top_load_robotic")).toBeGreaterThan(footprint("side_load"));
  });
});

describe("cpCost", () => {
  it("top load robotic most expensive", () => {
    expect(cpCost("top_load_robotic")).toBeGreaterThan(cpCost("drop_packer"));
  });
});

describe("automated", () => {
  it("all types are automated", () => {
    expect(automated("drop_packer")).toBe(true);
    expect(automated("pick_and_place")).toBe(true);
  });
});

describe("forFragile", () => {
  it("side load for fragile", () => {
    expect(forFragile("side_load")).toBe(true);
  });
  it("drop packer not for fragile", () => {
    expect(forFragile("drop_packer")).toBe(false);
  });
});

describe("mechanism", () => {
  it("top load robotic uses delta robot", () => {
    expect(mechanism("top_load_robotic")).toBe("delta_robot_top_load_vacuum_gripper_gentle_place_pattern");
  });
});

describe("bestUse", () => {
  it("pick and place for pharmaceutical vial", () => {
    expect(bestUse("pick_and_place")).toBe("pharmaceutical_vial_syringe_medical_device_precise_orient");
  });
});

describe("casePackerTypes", () => {
  it("returns 5 types", () => {
    expect(casePackerTypes()).toHaveLength(5);
  });
});
