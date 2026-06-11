import { describe, it, expect } from "vitest";
import {
  accuracy, durability, readability, response,
  btCost, localRead, forFood, element,
  bestUse, bimetalThermoTypes,
} from "../bimetal-thermo-calc.js";

describe("accuracy", () => {
  it("sanitary clamp most accurate", () => {
    expect(accuracy("sanitary_clamp_food")).toBeGreaterThan(accuracy("vapor_tension_remote"));
  });
});

describe("durability", () => {
  it("sanitary clamp most durable", () => {
    expect(durability("sanitary_clamp_food")).toBeGreaterThan(durability("vapor_tension_remote"));
  });
});

describe("readability", () => {
  it("adjustable angle best readability", () => {
    expect(readability("adjustable_angle_read")).toBeGreaterThan(readability("actuated_switch_control"));
  });
});

describe("response", () => {
  it("vapor tension fastest response", () => {
    expect(response("vapor_tension_remote")).toBeGreaterThan(response("dial_industrial_local"));
  });
});

describe("btCost", () => {
  it("sanitary clamp most expensive", () => {
    expect(btCost("sanitary_clamp_food")).toBeGreaterThan(btCost("dial_industrial_local"));
  });
});

describe("localRead", () => {
  it("dial industrial is local read", () => {
    expect(localRead("dial_industrial_local")).toBe(true);
  });
  it("vapor tension not local read", () => {
    expect(localRead("vapor_tension_remote")).toBe(false);
  });
});

describe("forFood", () => {
  it("sanitary clamp for food", () => {
    expect(forFood("sanitary_clamp_food")).toBe(true);
  });
  it("dial industrial not for food", () => {
    expect(forFood("dial_industrial_local")).toBe(false);
  });
});

describe("element", () => {
  it("actuated switch uses snap action disc", () => {
    expect(element("actuated_switch_control")).toBe("bimetal_disc_snap_action_switch_contact");
  });
});

describe("bestUse", () => {
  it("adjustable angle for awkward mount", () => {
    expect(bestUse("adjustable_angle_read")).toBe("awkward_mount_position_visible_any_angle");
  });
});

describe("bimetalThermoTypes", () => {
  it("returns 5 types", () => {
    expect(bimetalThermoTypes()).toHaveLength(5);
  });
});
