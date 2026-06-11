import { describe, it, expect } from "vitest";
import {
  speed, torqueControl, versatility, reliability,
  cmCost, tamperEvident, forBeverage, closure,
  bestUse, cappingMachineTypes,
} from "../capping-machine-calc.js";

describe("speed", () => {
  it("crown cap fastest", () => {
    expect(speed("crown_cap_beverage")).toBeGreaterThan(speed("crimp_cap_aluminum"));
  });
});

describe("torqueControl", () => {
  it("screw cap best torque control", () => {
    expect(torqueControl("screw_cap_chuck")).toBeGreaterThan(torqueControl("snap_cap_press"));
  });
});

describe("versatility", () => {
  it("screw cap most versatile", () => {
    expect(versatility("screw_cap_chuck")).toBeGreaterThan(versatility("crown_cap_beverage"));
  });
});

describe("reliability", () => {
  it("crown cap most reliable", () => {
    expect(reliability("crown_cap_beverage")).toBeGreaterThan(reliability("crimp_cap_aluminum"));
  });
});

describe("cmCost", () => {
  it("ropp most expensive", () => {
    expect(cmCost("ropp_roll_on_pilfer")).toBeGreaterThan(cmCost("snap_cap_press"));
  });
});

describe("tamperEvident", () => {
  it("crimp cap is tamper evident", () => {
    expect(tamperEvident("crimp_cap_aluminum")).toBe(true);
  });
  it("screw cap not tamper evident", () => {
    expect(tamperEvident("screw_cap_chuck")).toBe(false);
  });
});

describe("forBeverage", () => {
  it("crown cap for beverage", () => {
    expect(forBeverage("crown_cap_beverage")).toBe(true);
  });
  it("crimp cap not for beverage", () => {
    expect(forBeverage("crimp_cap_aluminum")).toBe(false);
  });
});

describe("closure", () => {
  it("ropp uses aluminum rolled thread", () => {
    expect(closure("ropp_roll_on_pilfer")).toBe("aluminum_shell_rolled_thread");
  });
});

describe("bestUse", () => {
  it("crown cap for beer soda", () => {
    expect(bestUse("crown_cap_beverage")).toBe("beer_soda_glass_bottle_crown");
  });
});

describe("cappingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(cappingMachineTypes()).toHaveLength(5);
  });
});
