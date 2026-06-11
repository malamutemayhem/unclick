import { describe, it, expect } from "vitest";
import {
  capacity, speed, accumulation, noise,
  rcCost, powered, forHeavy, drive,
  bestUse, rollerConveyorTypes,
} from "../roller-conveyor-calc.js";

describe("capacity", () => {
  it("powered roller highest capacity", () => {
    expect(capacity("powered_roller_chain")).toBeGreaterThan(capacity("lineshaft_belt_drive"));
  });
});

describe("speed", () => {
  it("powered roller fastest", () => {
    expect(speed("powered_roller_chain")).toBeGreaterThan(speed("gravity_roller_slope"));
  });
});

describe("accumulation", () => {
  it("zero pressure best accumulation", () => {
    expect(accumulation("accumulation_zero_press")).toBeGreaterThan(accumulation("gravity_roller_slope"));
  });
});

describe("noise", () => {
  it("motorized roller quietest", () => {
    expect(noise("motorized_roller_mdr")).toBeGreaterThan(noise("powered_roller_chain"));
  });
});

describe("rcCost", () => {
  it("accumulation most expensive", () => {
    expect(rcCost("accumulation_zero_press")).toBeGreaterThan(rcCost("gravity_roller_slope"));
  });
});

describe("powered", () => {
  it("powered roller is powered", () => {
    expect(powered("powered_roller_chain")).toBe(true);
  });
  it("gravity roller not powered", () => {
    expect(powered("gravity_roller_slope")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("powered roller for heavy loads", () => {
    expect(forHeavy("powered_roller_chain")).toBe(true);
  });
  it("motorized roller not for heavy", () => {
    expect(forHeavy("motorized_roller_mdr")).toBe(false);
  });
});

describe("drive", () => {
  it("mdr uses brushless dc motor inside roller", () => {
    expect(drive("motorized_roller_mdr")).toBe("brushless_dc_motor_inside_each_roller");
  });
});

describe("bestUse", () => {
  it("gravity roller for shipping dock", () => {
    expect(bestUse("gravity_roller_slope")).toBe("shipping_dock_pallet_carton_gravity");
  });
});

describe("rollerConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(rollerConveyorTypes()).toHaveLength(5);
  });
});
