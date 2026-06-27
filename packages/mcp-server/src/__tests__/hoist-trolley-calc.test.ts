import { describe, it, expect } from "vitest";
import {
  liftCapacity, liftHeight, liftSpeed, dutyCycle,
  htCost, powered, forHazardous, mechanism,
  bestUse, hoistTrolleyTypes,
} from "../hoist-trolley-calc.js";

describe("liftCapacity", () => {
  it("electric wire rope highest lift capacity", () => {
    expect(liftCapacity("electric_wire_rope")).toBeGreaterThan(liftCapacity("lever_ratchet"));
  });
});

describe("liftHeight", () => {
  it("electric wire rope greatest lift height", () => {
    expect(liftHeight("electric_wire_rope")).toBeGreaterThan(liftHeight("lever_ratchet"));
  });
});

describe("liftSpeed", () => {
  it("electric wire rope fastest lift speed", () => {
    expect(liftSpeed("electric_wire_rope")).toBeGreaterThan(liftSpeed("manual_chain_block"));
  });
});

describe("dutyCycle", () => {
  it("pneumatic air highest duty cycle", () => {
    expect(dutyCycle("pneumatic_air")).toBeGreaterThan(dutyCycle("lever_ratchet"));
  });
});

describe("htCost", () => {
  it("electric wire rope most expensive", () => {
    expect(htCost("electric_wire_rope")).toBeGreaterThan(htCost("manual_chain_block"));
  });
});

describe("powered", () => {
  it("electric chain is powered", () => {
    expect(powered("electric_chain")).toBe(true);
  });
  it("manual chain block not powered", () => {
    expect(powered("manual_chain_block")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("pneumatic air safe for hazardous atmosphere", () => {
    expect(forHazardous("pneumatic_air")).toBe(true);
  });
  it("electric wire rope not for hazardous", () => {
    expect(forHazardous("electric_wire_rope")).toBe(false);
  });
});

describe("mechanism", () => {
  it("pneumatic air uses vane motor", () => {
    expect(mechanism("pneumatic_air")).toBe("vane_motor_air_powered_chain_hoist_spark_free_variable_speed");
  });
});

describe("bestUse", () => {
  it("lever ratchet for confined space", () => {
    expect(bestUse("lever_ratchet")).toBe("pipe_fitting_tree_pulling_confined_space_horizontal_pull");
  });
});

describe("hoistTrolleyTypes", () => {
  it("returns 5 types", () => {
    expect(hoistTrolleyTypes()).toHaveLength(5);
  });
});
