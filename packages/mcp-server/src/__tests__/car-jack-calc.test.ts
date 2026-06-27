import { describe, it, expect } from "vitest";
import {
  liftCapacity, liftHeight, liftSpeed, portabilityScore,
  jackCost, safetyLock, needsPower, liftMechanism,
  bestVehicle, carJacks,
} from "../car-jack-calc.js";

describe("liftCapacity", () => {
  it("bottle vertical highest lift capacity", () => {
    expect(liftCapacity("bottle_vertical")).toBeGreaterThan(liftCapacity("scissor_compact"));
  });
});

describe("liftHeight", () => {
  it("hi lift farm tallest lift height", () => {
    expect(liftHeight("hi_lift_farm")).toBeGreaterThan(liftHeight("scissor_compact"));
  });
});

describe("liftSpeed", () => {
  it("pneumatic air bag fastest lift", () => {
    expect(liftSpeed("pneumatic_air_bag")).toBeGreaterThan(liftSpeed("scissor_compact"));
  });
});

describe("portabilityScore", () => {
  it("scissor compact most portable", () => {
    expect(portabilityScore("scissor_compact")).toBeGreaterThan(portabilityScore("hydraulic_floor"));
  });
});

describe("jackCost", () => {
  it("pneumatic air bag most expensive", () => {
    expect(jackCost("pneumatic_air_bag")).toBeGreaterThan(jackCost("scissor_compact"));
  });
});

describe("safetyLock", () => {
  it("hydraulic floor has safety lock", () => {
    expect(safetyLock("hydraulic_floor")).toBe(true);
  });
  it("scissor compact does not", () => {
    expect(safetyLock("scissor_compact")).toBe(false);
  });
});

describe("needsPower", () => {
  it("pneumatic air bag needs power", () => {
    expect(needsPower("pneumatic_air_bag")).toBe(true);
  });
  it("hydraulic floor does not", () => {
    expect(needsPower("hydraulic_floor")).toBe(false);
  });
});

describe("liftMechanism", () => {
  it("hi lift farm uses ratchet bar pin lift", () => {
    expect(liftMechanism("hi_lift_farm")).toBe("ratchet_bar_pin_lift");
  });
});

describe("bestVehicle", () => {
  it("hi lift farm for offroad jeep farm vehicle", () => {
    expect(bestVehicle("hi_lift_farm")).toBe("offroad_jeep_farm_vehicle");
  });
});

describe("carJacks", () => {
  it("returns 5 types", () => {
    expect(carJacks()).toHaveLength(5);
  });
});
