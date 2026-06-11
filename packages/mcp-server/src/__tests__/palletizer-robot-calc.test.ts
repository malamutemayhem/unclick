import { describe, it, expect } from "vitest";
import {
  palletizeSpeed, payloadCapacity, patternFlexibility, floorSpace,
  prCost, collaborative, forMixed, robotConfig,
  bestUse, palletizerRobotTypes,
} from "../palletizer-robot-calc.js";

describe("palletizeSpeed", () => {
  it("layer former fastest palletize speed", () => {
    expect(palletizeSpeed("layer_former")).toBeGreaterThan(palletizeSpeed("cobot_collaborative"));
  });
});

describe("payloadCapacity", () => {
  it("gantry cartesian highest payload capacity", () => {
    expect(payloadCapacity("gantry_cartesian")).toBeGreaterThan(payloadCapacity("cobot_collaborative"));
  });
});

describe("patternFlexibility", () => {
  it("articulated arm best pattern flexibility", () => {
    expect(patternFlexibility("articulated_arm")).toBeGreaterThan(patternFlexibility("inline_sweep"));
  });
});

describe("floorSpace", () => {
  it("cobot collaborative best floor space efficiency", () => {
    expect(floorSpace("cobot_collaborative")).toBeGreaterThan(floorSpace("layer_former"));
  });
});

describe("prCost", () => {
  it("layer former most expensive", () => {
    expect(prCost("layer_former")).toBeGreaterThan(prCost("cobot_collaborative"));
  });
});

describe("collaborative", () => {
  it("cobot collaborative is collaborative", () => {
    expect(collaborative("cobot_collaborative")).toBe(true);
  });
  it("articulated arm not collaborative", () => {
    expect(collaborative("articulated_arm")).toBe(false);
  });
});

describe("forMixed", () => {
  it("articulated arm for mixed sku", () => {
    expect(forMixed("articulated_arm")).toBe(true);
  });
  it("layer former not for mixed", () => {
    expect(forMixed("layer_former")).toBe(false);
  });
});

describe("robotConfig", () => {
  it("inline sweep uses sweep arm push row", () => {
    expect(robotConfig("inline_sweep")).toBe("inline_row_conveyor_sweep_arm_push_row_to_pallet_layer_by_row");
  });
});

describe("bestUse", () => {
  it("cobot collaborative for small facility", () => {
    expect(bestUse("cobot_collaborative")).toBe("small_facility_mixed_sku_human_safe_collaborative_palletizing");
  });
});

describe("palletizerRobotTypes", () => {
  it("returns 5 types", () => {
    expect(palletizerRobotTypes()).toHaveLength(5);
  });
});
