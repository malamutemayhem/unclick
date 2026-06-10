import { describe, it, expect } from "vitest";
import {
  securityLevel, convenience, durability, versatility,
  lockCost, tsaApproved, keyless, lockMechanism,
  bestTrip, luggageLocks,
} from "../luggage-lock-calc.js";

describe("securityLevel", () => {
  it("fingerprint smart highest security", () => {
    expect(securityLevel("fingerprint_smart")).toBeGreaterThan(securityLevel("zip_tie_disposable"));
  });
});

describe("convenience", () => {
  it("fingerprint smart most convenient", () => {
    expect(convenience("fingerprint_smart")).toBeGreaterThan(convenience("tsa_key_padlock"));
  });
});

describe("durability", () => {
  it("tsa key padlock most durable", () => {
    expect(durability("tsa_key_padlock")).toBeGreaterThan(durability("zip_tie_disposable"));
  });
});

describe("versatility", () => {
  it("cable retractable most versatile", () => {
    expect(versatility("cable_retractable")).toBeGreaterThan(versatility("tsa_key_padlock"));
  });
});

describe("lockCost", () => {
  it("fingerprint smart most expensive", () => {
    expect(lockCost("fingerprint_smart")).toBeGreaterThan(lockCost("zip_tie_disposable"));
  });
});

describe("tsaApproved", () => {
  it("tsa combo 3 dial is tsa approved", () => {
    expect(tsaApproved("tsa_combo_3_dial")).toBe(true);
  });
  it("cable retractable is not", () => {
    expect(tsaApproved("cable_retractable")).toBe(false);
  });
});

describe("keyless", () => {
  it("fingerprint smart is keyless", () => {
    expect(keyless("fingerprint_smart")).toBe(true);
  });
  it("tsa key padlock is not", () => {
    expect(keyless("tsa_key_padlock")).toBe(false);
  });
});

describe("lockMechanism", () => {
  it("fingerprint smart uses biometric sensor motor", () => {
    expect(lockMechanism("fingerprint_smart")).toBe("biometric_sensor_motor");
  });
});

describe("bestTrip", () => {
  it("cable retractable best for backpack hostel secure", () => {
    expect(bestTrip("cable_retractable")).toBe("backpack_hostel_secure");
  });
});

describe("luggageLocks", () => {
  it("returns 5 types", () => {
    expect(luggageLocks()).toHaveLength(5);
  });
});
