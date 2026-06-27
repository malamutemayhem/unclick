import { describe, it, expect } from "vitest";
import {
  payload, speed, precision, reach,
  raCost, collaborative, forAssembly, axes,
  bestUse, roboticArmTypes,
} from "../robotic-arm-calc.js";

describe("payload", () => {
  it("cartesian highest payload", () => {
    expect(payload("cartesian_gantry")).toBeGreaterThan(payload("delta_parallel_pick"));
  });
});

describe("speed", () => {
  it("delta fastest", () => {
    expect(speed("delta_parallel_pick")).toBeGreaterThan(speed("collaborative_cobot"));
  });
});

describe("precision", () => {
  it("scara most precise", () => {
    expect(precision("scara_4_axis")).toBeGreaterThan(precision("articulated_6_axis"));
  });
});

describe("reach", () => {
  it("cartesian longest reach", () => {
    expect(reach("cartesian_gantry")).toBeGreaterThan(reach("delta_parallel_pick"));
  });
});

describe("raCost", () => {
  it("articulated most expensive", () => {
    expect(raCost("articulated_6_axis")).toBeGreaterThan(raCost("scara_4_axis"));
  });
});

describe("collaborative", () => {
  it("cobot is collaborative", () => {
    expect(collaborative("collaborative_cobot")).toBe(true);
  });
  it("articulated not collaborative", () => {
    expect(collaborative("articulated_6_axis")).toBe(false);
  });
});

describe("forAssembly", () => {
  it("scara for assembly", () => {
    expect(forAssembly("scara_4_axis")).toBe(true);
  });
  it("delta not assembly", () => {
    expect(forAssembly("delta_parallel_pick")).toBe(false);
  });
});

describe("axes", () => {
  it("cobot uses torque sensing", () => {
    expect(axes("collaborative_cobot")).toBe("six_axis_torque_sensing_safe");
  });
});

describe("bestUse", () => {
  it("delta for packaging", () => {
    expect(bestUse("delta_parallel_pick")).toBe("high_speed_packaging_sorting");
  });
});

describe("roboticArmTypes", () => {
  it("returns 5 types", () => {
    expect(roboticArmTypes()).toHaveLength(5);
  });
});
