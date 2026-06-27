import { describe, it, expect } from "vitest";
import {
  securityRating, convenienceScore, batteryLife, installDifficulty,
  lockCost, remoteAccess, physicalKeyBackup, authMethod,
  bestScenario, smartLocks,
} from "../smart-lock-calc.js";

describe("securityRating", () => {
  it("fingerprint highest security", () => {
    expect(securityRating("fingerprint")).toBeGreaterThan(securityRating("retrofit_adapter"));
  });
});

describe("convenienceScore", () => {
  it("fingerprint most convenient", () => {
    expect(convenienceScore("fingerprint")).toBeGreaterThan(convenienceScore("retrofit_adapter"));
  });
});

describe("batteryLife", () => {
  it("retrofit adapter longest battery", () => {
    expect(batteryLife("retrofit_adapter")).toBeGreaterThan(batteryLife("wifi_hub"));
  });
});

describe("installDifficulty", () => {
  it("wifi hub hardest install", () => {
    expect(installDifficulty("wifi_hub")).toBeGreaterThan(installDifficulty("retrofit_adapter"));
  });
});

describe("lockCost", () => {
  it("fingerprint most expensive", () => {
    expect(lockCost("fingerprint")).toBeGreaterThan(lockCost("retrofit_adapter"));
  });
});

describe("remoteAccess", () => {
  it("wifi hub has remote access", () => {
    expect(remoteAccess("wifi_hub")).toBe(true);
  });
  it("keypad deadbolt does not", () => {
    expect(remoteAccess("keypad_deadbolt")).toBe(false);
  });
});

describe("physicalKeyBackup", () => {
  it("keypad deadbolt has key backup", () => {
    expect(physicalKeyBackup("keypad_deadbolt")).toBe(true);
  });
  it("bluetooth proximity does not", () => {
    expect(physicalKeyBackup("bluetooth_proximity")).toBe(false);
  });
});

describe("authMethod", () => {
  it("fingerprint uses biometric capacitive scan", () => {
    expect(authMethod("fingerprint")).toBe("biometric_capacitive_scan");
  });
});

describe("bestScenario", () => {
  it("wifi hub for airbnb remote management", () => {
    expect(bestScenario("wifi_hub")).toBe("airbnb_remote_management");
  });
});

describe("smartLocks", () => {
  it("returns 5 types", () => {
    expect(smartLocks()).toHaveLength(5);
  });
});
