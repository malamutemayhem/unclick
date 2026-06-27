import { describe, it, expect } from "vitest";
import {
  payload, throughput, reach, repeatability,
  caCost, forceLimited, forAssembly, cobotConfig,
  bestUse, cobotArmTypes,
} from "../cobot-arm-calc.js";

describe("payload", () => {
  it("palletize cobot best payload", () => {
    expect(payload("palletize_cobot")).toBeGreaterThan(payload("dual_arm_cobot"));
  });
});

describe("throughput", () => {
  it("palletize cobot highest throughput", () => {
    expect(throughput("palletize_cobot")).toBeGreaterThan(throughput("dual_arm_cobot"));
  });
});

describe("reach", () => {
  it("mobile cobot best reach", () => {
    expect(reach("mobile_cobot")).toBeGreaterThan(reach("dual_arm_cobot"));
  });
});

describe("repeatability", () => {
  it("six axis cobot best repeatability", () => {
    expect(repeatability("six_axis_cobot")).toBeGreaterThan(repeatability("mobile_cobot"));
  });
});

describe("caCost", () => {
  it("dual arm cobot most expensive", () => {
    expect(caCost("dual_arm_cobot")).toBeGreaterThan(caCost("six_axis_cobot"));
  });
});

describe("forceLimited", () => {
  it("six axis cobot is force limited", () => {
    expect(forceLimited("six_axis_cobot")).toBe(true);
  });
});

describe("forAssembly", () => {
  it("six axis cobot for assembly", () => {
    expect(forAssembly("six_axis_cobot")).toBe(true);
  });
  it("mobile cobot not for assembly", () => {
    expect(forAssembly("mobile_cobot")).toBe(false);
  });
});

describe("cobotConfig", () => {
  it("seven axis cobot uses redundant joint elbow avoid obstacle reach", () => {
    expect(cobotConfig("seven_axis_cobot")).toBe("seven_axis_cobot_arm_redundant_joint_elbow_avoid_obstacle_reach");
  });
});

describe("bestUse", () => {
  it("palletize cobot for end of line stack case pallet safe shared", () => {
    expect(bestUse("palletize_cobot")).toBe("end_of_line_palletize_cobot_arm_stack_case_pallet_safe_shared");
  });
});

describe("cobotArmTypes", () => {
  it("returns 5 types", () => {
    expect(cobotArmTypes()).toHaveLength(5);
  });
});
