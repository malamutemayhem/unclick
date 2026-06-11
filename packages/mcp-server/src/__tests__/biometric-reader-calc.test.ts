import { describe, it, expect } from "vitest";
import {
  accuracy, speed, spoofResist, userAccept,
  brCost, contactless, forHighSecurity, sensor,
  bestUse, biometricReaderTypes,
} from "../biometric-reader-calc.js";

describe("accuracy", () => {
  it("iris most accurate", () => {
    expect(accuracy("iris_recognition_camera")).toBeGreaterThan(accuracy("fingerprint_optical_sensor"));
  });
});

describe("speed", () => {
  it("facial fastest", () => {
    expect(speed("facial_recognition_ai")).toBeGreaterThan(speed("multi_modal_combo"));
  });
});

describe("spoofResist", () => {
  it("palm vein best spoof resistance", () => {
    expect(spoofResist("palm_vein_infrared")).toBeGreaterThan(spoofResist("fingerprint_optical_sensor"));
  });
});

describe("userAccept", () => {
  it("facial best user acceptance", () => {
    expect(userAccept("facial_recognition_ai")).toBeGreaterThan(userAccept("multi_modal_combo"));
  });
});

describe("brCost", () => {
  it("multi modal most expensive", () => {
    expect(brCost("multi_modal_combo")).toBeGreaterThan(brCost("fingerprint_optical_sensor"));
  });
});

describe("contactless", () => {
  it("facial is contactless", () => {
    expect(contactless("facial_recognition_ai")).toBe(true);
  });
  it("fingerprint not contactless", () => {
    expect(contactless("fingerprint_optical_sensor")).toBe(false);
  });
});

describe("forHighSecurity", () => {
  it("iris for high security", () => {
    expect(forHighSecurity("iris_recognition_camera")).toBe(true);
  });
  it("fingerprint not high security", () => {
    expect(forHighSecurity("fingerprint_optical_sensor")).toBe(false);
  });
});

describe("sensor", () => {
  it("palm uses nir vein", () => {
    expect(sensor("palm_vein_infrared")).toBe("nir_vein_pattern_subcutaneous");
  });
});

describe("bestUse", () => {
  it("facial for corporate lobby", () => {
    expect(bestUse("facial_recognition_ai")).toBe("corporate_lobby_frictionless");
  });
});

describe("biometricReaderTypes", () => {
  it("returns 5 types", () => {
    expect(biometricReaderTypes()).toHaveLength(5);
  });
});
