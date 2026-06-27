import { describe, it, expect } from "vitest";
import {
  payload, reach, speed, repeatability,
  irCost, sixAxis, forHazardous, kinematics,
  bestUse, industrialRobotTypes,
} from "../industrial-robot-calc.js";

describe("payload", () => {
  it("heavy payload foundry highest payload", () => {
    expect(payload("heavy_payload_foundry")).toBeGreaterThan(payload("painting_explosion_proof"));
  });
});

describe("reach", () => {
  it("heavy payload foundry longest reach", () => {
    expect(reach("heavy_payload_foundry")).toBeGreaterThan(reach("welding_arc_spot"));
  });
});

describe("speed", () => {
  it("palletizing 4 axis fastest", () => {
    expect(speed("palletizing_4_axis")).toBeGreaterThan(speed("heavy_payload_foundry"));
  });
});

describe("repeatability", () => {
  it("welding arc spot best repeatability", () => {
    expect(repeatability("welding_arc_spot")).toBeGreaterThan(repeatability("palletizing_4_axis"));
  });
});

describe("irCost", () => {
  it("heavy payload foundry most expensive", () => {
    expect(irCost("heavy_payload_foundry")).toBeGreaterThan(irCost("palletizing_4_axis"));
  });
});

describe("sixAxis", () => {
  it("articulated 6 axis is six axis", () => {
    expect(sixAxis("articulated_6_axis")).toBe(true);
  });
  it("palletizing 4 axis not six axis", () => {
    expect(sixAxis("palletizing_4_axis")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("painting explosion proof for hazardous", () => {
    expect(forHazardous("painting_explosion_proof")).toBe(true);
  });
  it("articulated 6 axis not for hazardous", () => {
    expect(forHazardous("articulated_6_axis")).toBe(false);
  });
});

describe("kinematics", () => {
  it("welding uses hollow upper arm", () => {
    expect(kinematics("welding_arc_spot")).toBe("hollow_upper_arm_torch_cable_through_arm_routing");
  });
});

describe("bestUse", () => {
  it("palletizing for end of line", () => {
    expect(bestUse("palletizing_4_axis")).toBe("end_of_line_case_packing_bag_palletizing_depal");
  });
});

describe("industrialRobotTypes", () => {
  it("returns 5 types", () => {
    expect(industrialRobotTypes()).toHaveLength(5);
  });
});
