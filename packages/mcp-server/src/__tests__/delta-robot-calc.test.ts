import { describe, it, expect } from "vitest";
import {
  speed, precision, payload, workspace,
  drCost, washdown, forFood, kinematics,
  bestUse, deltaRobotTypes,
} from "../delta-robot-calc.js";

describe("speed", () => {
  it("three-axis fastest", () => {
    expect(speed("three_axis_pick_place")).toBeGreaterThan(speed("six_axis_full_dof"));
  });
});

describe("precision", () => {
  it("six-axis most precise", () => {
    expect(precision("six_axis_full_dof")).toBeGreaterThan(precision("three_axis_pick_place"));
  });
});

describe("payload", () => {
  it("hygienic washdown highest payload", () => {
    expect(payload("hygienic_washdown_food")).toBeGreaterThan(payload("mini_delta_lab_pharma"));
  });
});

describe("workspace", () => {
  it("hygienic washdown largest workspace", () => {
    expect(workspace("hygienic_washdown_food")).toBeGreaterThan(workspace("mini_delta_lab_pharma"));
  });
});

describe("drCost", () => {
  it("six-axis most expensive", () => {
    expect(drCost("six_axis_full_dof")).toBeGreaterThan(drCost("mini_delta_lab_pharma"));
  });
});

describe("washdown", () => {
  it("hygienic is washdown rated", () => {
    expect(washdown("hygienic_washdown_food")).toBe(true);
  });
  it("three-axis not washdown", () => {
    expect(washdown("three_axis_pick_place")).toBe(false);
  });
});

describe("forFood", () => {
  it("hygienic for food", () => {
    expect(forFood("hygienic_washdown_food")).toBe(true);
  });
  it("mini delta not for food", () => {
    expect(forFood("mini_delta_lab_pharma")).toBe(false);
  });
});

describe("kinematics", () => {
  it("mini delta uses compact micro actuator", () => {
    expect(kinematics("mini_delta_lab_pharma")).toBe("compact_parallel_micro_actuator");
  });
});

describe("bestUse", () => {
  it("hygienic for bakery confectionery", () => {
    expect(bestUse("hygienic_washdown_food")).toBe("bakery_confectionery_fresh_pack");
  });
});

describe("deltaRobotTypes", () => {
  it("returns 5 types", () => {
    expect(deltaRobotTypes()).toHaveLength(5);
  });
});
