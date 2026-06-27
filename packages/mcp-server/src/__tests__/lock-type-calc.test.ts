import { describe, it, expect } from "vitest";
import {
  security, durability, ease, rekeying,
  ltCost, electric, forHighSecurity, keyway,
  bestUse, lockTypeTypes,
} from "../lock-type-calc.js";

describe("security", () => {
  it("mortise most secure", () => {
    expect(security("mortise_lock_body_lever")).toBeGreaterThan(security("cylindrical_lock_knob_lever"));
  });
});

describe("durability", () => {
  it("mortise most durable", () => {
    expect(durability("mortise_lock_body_lever")).toBeGreaterThan(durability("cylindrical_lock_knob_lever"));
  });
});

describe("ease", () => {
  it("magnetic lock easiest", () => {
    expect(ease("magnetic_lock_electromagnetic")).toBeGreaterThan(ease("mortise_lock_body_lever"));
  });
});

describe("rekeying", () => {
  it("deadbolt easiest rekey", () => {
    expect(rekeying("deadbolt_single_cylinder")).toBeGreaterThan(rekeying("magnetic_lock_electromagnetic"));
  });
});

describe("ltCost", () => {
  it("mortise most expensive", () => {
    expect(ltCost("mortise_lock_body_lever")).toBeGreaterThan(ltCost("deadbolt_single_cylinder"));
  });
});

describe("electric", () => {
  it("electric strike is electric", () => {
    expect(electric("electric_strike_fail_secure")).toBe(true);
  });
  it("deadbolt not electric", () => {
    expect(electric("deadbolt_single_cylinder")).toBe(false);
  });
});

describe("forHighSecurity", () => {
  it("mortise for high security", () => {
    expect(forHighSecurity("mortise_lock_body_lever")).toBe(true);
  });
  it("cylindrical not for high security", () => {
    expect(forHighSecurity("cylindrical_lock_knob_lever")).toBe(false);
  });
});

describe("keyway", () => {
  it("magnetic lock has no keyway", () => {
    expect(keyway("magnetic_lock_electromagnetic")).toBe("no_keyway_mag_release_button");
  });
});

describe("bestUse", () => {
  it("mortise for commercial office", () => {
    expect(bestUse("mortise_lock_body_lever")).toBe("commercial_office_entry_high_traffic");
  });
});

describe("lockTypeTypes", () => {
  it("returns 5 types", () => {
    expect(lockTypeTypes()).toHaveLength(5);
  });
});
