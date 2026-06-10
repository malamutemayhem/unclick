import { describe, it, expect } from "vitest";
import {
  securityLevel, lockWeight, flexibility, lockEase,
  lockCost, cutResistant, hasAlarm, material,
  bestUse, bikeLocks,
} from "../bike-lock-calc.js";

describe("securityLevel", () => {
  it("u lock hardened highest security", () => {
    expect(securityLevel("u_lock_hardened")).toBeGreaterThan(securityLevel("cable_coil"));
  });
});

describe("lockWeight", () => {
  it("cable coil lightest", () => {
    expect(lockWeight("cable_coil")).toBeGreaterThan(lockWeight("chain_heavy"));
  });
});

describe("flexibility", () => {
  it("cable coil most flexible", () => {
    expect(flexibility("cable_coil")).toBeGreaterThan(flexibility("u_lock_hardened"));
  });
});

describe("lockEase", () => {
  it("cable coil easiest to use", () => {
    expect(lockEase("cable_coil")).toBeGreaterThan(lockEase("chain_heavy"));
  });
});

describe("lockCost", () => {
  it("smart alarm most expensive", () => {
    expect(lockCost("smart_alarm")).toBeGreaterThan(lockCost("cable_coil"));
  });
});

describe("cutResistant", () => {
  it("u lock hardened is cut resistant", () => {
    expect(cutResistant("u_lock_hardened")).toBe(true);
  });
  it("cable coil is not", () => {
    expect(cutResistant("cable_coil")).toBe(false);
  });
});

describe("hasAlarm", () => {
  it("smart alarm has alarm", () => {
    expect(hasAlarm("smart_alarm")).toBe(true);
  });
  it("u lock hardened does not", () => {
    expect(hasAlarm("u_lock_hardened")).toBe(false);
  });
});

describe("material", () => {
  it("chain heavy uses manganese steel links", () => {
    expect(material("chain_heavy")).toBe("manganese_steel_links");
  });
});

describe("bestUse", () => {
  it("u lock hardened for high theft city parking", () => {
    expect(bestUse("u_lock_hardened")).toBe("high_theft_city_parking");
  });
});

describe("bikeLocks", () => {
  it("returns 5 types", () => {
    expect(bikeLocks()).toHaveLength(5);
  });
});
