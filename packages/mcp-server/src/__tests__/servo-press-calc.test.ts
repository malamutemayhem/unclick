import { describe, it, expect } from "vitest";
import {
  forceAccuracy, throughput, strokeControl, energyEfficiency,
  svCost, programmable, forPrecision, pressConfig,
  bestUse, servoPressTypes,
} from "../servo-press-calc.js";

describe("forceAccuracy", () => {
  it("direct drive best force accuracy", () => {
    expect(forceAccuracy("direct_drive")).toBeGreaterThan(forceAccuracy("toggle_press"));
  });
});

describe("throughput", () => {
  it("knuckle joint highest throughput", () => {
    expect(throughput("knuckle_joint")).toBeGreaterThan(throughput("screw_drive"));
  });
});

describe("strokeControl", () => {
  it("direct drive best stroke control", () => {
    expect(strokeControl("direct_drive")).toBeGreaterThan(strokeControl("toggle_press"));
  });
});

describe("energyEfficiency", () => {
  it("direct drive best energy efficiency", () => {
    expect(energyEfficiency("direct_drive")).toBeGreaterThan(energyEfficiency("toggle_press"));
  });
});

describe("svCost", () => {
  it("direct drive most expensive", () => {
    expect(svCost("direct_drive")).toBeGreaterThan(svCost("toggle_press"));
  });
});

describe("programmable", () => {
  it("direct drive is programmable", () => {
    expect(programmable("direct_drive")).toBe(true);
  });
  it("toggle press not programmable", () => {
    expect(programmable("toggle_press")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("direct drive for precision", () => {
    expect(forPrecision("direct_drive")).toBe(true);
  });
  it("screw drive not for precision", () => {
    expect(forPrecision("screw_drive")).toBe(false);
  });
});

describe("pressConfig", () => {
  it("link drive uses eccentric gear dwell bottom dead center", () => {
    expect(pressConfig("link_drive")).toBe("link_drive_servo_press_eccentric_gear_dwell_bottom_dead_center");
  });
});

describe("bestUse", () => {
  it("knuckle joint for coin sizing toggle high force mint", () => {
    expect(bestUse("knuckle_joint")).toBe("coin_sizing_knuckle_joint_servo_press_toggle_high_force_mint");
  });
});

describe("servoPressTypes", () => {
  it("returns 5 types", () => {
    expect(servoPressTypes()).toHaveLength(5);
  });
});
