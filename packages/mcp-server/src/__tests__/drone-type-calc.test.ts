import { describe, it, expect } from "vitest";
import {
  endurance, payload, speed, hover,
  drCost, vtol, forMapping, propulsion,
  bestUse, droneTypes,
} from "../drone-type-calc.js";

describe("endurance", () => {
  it("fixed wing catapult longest endurance", () => {
    expect(endurance("fixed_wing_catapult")).toBeGreaterThan(endurance("multirotor_quad_electric"));
  });
});

describe("payload", () => {
  it("single rotor highest payload", () => {
    expect(payload("single_rotor_heli")).toBeGreaterThan(payload("tethered_persistent_obs"));
  });
});

describe("speed", () => {
  it("fixed wing catapult fastest", () => {
    expect(speed("fixed_wing_catapult")).toBeGreaterThan(speed("multirotor_quad_electric"));
  });
});

describe("hover", () => {
  it("multirotor best hover", () => {
    expect(hover("multirotor_quad_electric")).toBeGreaterThan(hover("fixed_wing_catapult"));
  });
});

describe("drCost", () => {
  it("single rotor most expensive", () => {
    expect(drCost("single_rotor_heli")).toBeGreaterThan(drCost("multirotor_quad_electric"));
  });
});

describe("vtol", () => {
  it("multirotor is vtol", () => {
    expect(vtol("multirotor_quad_electric")).toBe(true);
  });
  it("fixed wing catapult not vtol", () => {
    expect(vtol("fixed_wing_catapult")).toBe(false);
  });
});

describe("forMapping", () => {
  it("fixed wing vtol for mapping", () => {
    expect(forMapping("fixed_wing_vtol_hybrid")).toBe(true);
  });
  it("single rotor not for mapping", () => {
    expect(forMapping("single_rotor_heli")).toBe(false);
  });
});

describe("propulsion", () => {
  it("tethered uses power line", () => {
    expect(propulsion("tethered_persistent_obs")).toBe("tethered_power_line");
  });
});

describe("bestUse", () => {
  it("fixed wing catapult best for agricultural survey", () => {
    expect(bestUse("fixed_wing_catapult")).toBe("large_area_agricultural_survey");
  });
});

describe("droneTypes", () => {
  it("returns 5 types", () => {
    expect(droneTypes()).toHaveLength(5);
  });
});
