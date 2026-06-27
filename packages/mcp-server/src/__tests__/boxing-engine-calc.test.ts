import { describe, it, expect } from "vitest";
import {
  pressForce, controlFine, speedCycle, sizeRange,
  engineCost, powered, portable, driveMethod,
  bestUse, boxingEngines,
} from "../boxing-engine-calc.js";

describe("pressForce", () => {
  it("hydraulic ram press strongest press", () => {
    expect(pressForce("hydraulic_ram_press")).toBeGreaterThan(pressForce("hand_crank_standard"));
  });
});

describe("controlFine", () => {
  it("hand crank standard finest control", () => {
    expect(controlFine("hand_crank_standard")).toBeGreaterThan(controlFine("weight_drop_gravity"));
  });
});

describe("speedCycle", () => {
  it("electric motor power fastest cycle", () => {
    expect(speedCycle("electric_motor_power")).toBeGreaterThan(speedCycle("hand_crank_standard"));
  });
});

describe("sizeRange", () => {
  it("hydraulic ram press best size range", () => {
    expect(sizeRange("hydraulic_ram_press")).toBeGreaterThan(sizeRange("foot_treadle_pedal"));
  });
});

describe("engineCost", () => {
  it("hydraulic ram press most expensive", () => {
    expect(engineCost("hydraulic_ram_press")).toBeGreaterThan(engineCost("hand_crank_standard"));
  });
});

describe("powered", () => {
  it("electric motor power is powered", () => {
    expect(powered("electric_motor_power")).toBe(true);
  });
  it("hand crank standard not powered", () => {
    expect(powered("hand_crank_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("hand crank standard is portable", () => {
    expect(portable("hand_crank_standard")).toBe(true);
  });
  it("foot treadle pedal not portable", () => {
    expect(portable("foot_treadle_pedal")).toBe(false);
  });
});

describe("driveMethod", () => {
  it("weight drop gravity uses gravity drop weight", () => {
    expect(driveMethod("weight_drop_gravity")).toBe("gravity_drop_weight");
  });
});

describe("bestUse", () => {
  it("hand crank standard best for general hub box", () => {
    expect(bestUse("hand_crank_standard")).toBe("general_hub_box");
  });
});

describe("boxingEngines", () => {
  it("returns 5 types", () => {
    expect(boxingEngines()).toHaveLength(5);
  });
});
