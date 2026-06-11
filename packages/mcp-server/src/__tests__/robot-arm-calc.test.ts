import { describe, it, expect } from "vitest";
import {
  speed, payload, precision, workspace,
  raCost, forceLimited, forAssembly, kinematics,
  bestUse, robotArms,
} from "../robot-arm-calc.js";

describe("speed", () => {
  it("delta parallel fastest", () => {
    expect(speed("delta_parallel_pick")).toBeGreaterThan(speed("cobot_collaborative"));
  });
});

describe("payload", () => {
  it("cartesian gantry highest payload", () => {
    expect(payload("cartesian_gantry")).toBeGreaterThan(payload("delta_parallel_pick"));
  });
});

describe("precision", () => {
  it("cartesian gantry most precise", () => {
    expect(precision("cartesian_gantry")).toBeGreaterThan(precision("delta_parallel_pick"));
  });
});

describe("workspace", () => {
  it("six axis largest workspace", () => {
    expect(workspace("six_axis_articulated")).toBeGreaterThan(workspace("delta_parallel_pick"));
  });
});

describe("raCost", () => {
  it("six axis most expensive", () => {
    expect(raCost("six_axis_articulated")).toBeGreaterThan(raCost("cartesian_gantry"));
  });
});

describe("forceLimited", () => {
  it("cobot is force limited", () => {
    expect(forceLimited("cobot_collaborative")).toBe(true);
  });
  it("six axis not force limited", () => {
    expect(forceLimited("six_axis_articulated")).toBe(false);
  });
});

describe("forAssembly", () => {
  it("scara for assembly", () => {
    expect(forAssembly("scara_selective_comply")).toBe(true);
  });
  it("delta parallel not for assembly", () => {
    expect(forAssembly("delta_parallel_pick")).toBe(false);
  });
});

describe("kinematics", () => {
  it("cobot uses seven dof redundant safe", () => {
    expect(kinematics("cobot_collaborative")).toBe("seven_dof_redundant_safe");
  });
});

describe("bestUse", () => {
  it("delta parallel best for food pharma sort", () => {
    expect(bestUse("delta_parallel_pick")).toBe("food_pharma_high_speed_sort");
  });
});

describe("robotArms", () => {
  it("returns 5 types", () => {
    expect(robotArms()).toHaveLength(5);
  });
});
