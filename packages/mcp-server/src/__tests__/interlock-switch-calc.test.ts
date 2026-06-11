import { describe, it, expect } from "vitest";
import {
  codingLevel, tamperResistance, durability, holdForce,
  isCost, guardLocking, forHighRisk, actuation,
  bestUse, interlockSwitchTypes,
} from "../interlock-switch-calc.js";

describe("codingLevel", () => {
  it("rfid coded highest coding level", () => {
    expect(codingLevel("rfid_coded")).toBeGreaterThan(codingLevel("tongue_interlock"));
  });
});

describe("tamperResistance", () => {
  it("rfid coded most tamper resistant", () => {
    expect(tamperResistance("rfid_coded")).toBeGreaterThan(tamperResistance("hinge_interlock"));
  });
});

describe("durability", () => {
  it("magnetic non contact most durable", () => {
    expect(durability("magnetic_non_contact")).toBeGreaterThan(durability("hinge_interlock"));
  });
});

describe("holdForce", () => {
  it("solenoid guard lock highest hold force", () => {
    expect(holdForce("solenoid_guard_lock")).toBeGreaterThan(holdForce("tongue_interlock"));
  });
});

describe("isCost", () => {
  it("rfid coded most expensive", () => {
    expect(isCost("rfid_coded")).toBeGreaterThan(isCost("tongue_interlock"));
  });
});

describe("guardLocking", () => {
  it("solenoid guard lock has guard locking", () => {
    expect(guardLocking("solenoid_guard_lock")).toBe(true);
  });
  it("tongue interlock no guard locking", () => {
    expect(guardLocking("tongue_interlock")).toBe(false);
  });
});

describe("forHighRisk", () => {
  it("rfid coded for high risk", () => {
    expect(forHighRisk("rfid_coded")).toBe(true);
  });
  it("magnetic non contact not for high risk", () => {
    expect(forHighRisk("magnetic_non_contact")).toBe(false);
  });
});

describe("actuation", () => {
  it("magnetic non contact uses coded magnet", () => {
    expect(actuation("magnetic_non_contact")).toBe("coded_magnet_reed_or_hall_non_contact_alignment");
  });
});

describe("bestUse", () => {
  it("solenoid guard lock for robot cell", () => {
    expect(bestUse("solenoid_guard_lock")).toBe("robot_cell_guard_door_spindown_wait_then_unlock");
  });
});

describe("interlockSwitchTypes", () => {
  it("returns 5 types", () => {
    expect(interlockSwitchTypes()).toHaveLength(5);
  });
});
