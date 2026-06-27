import { describe, it, expect } from "vitest";
import {
  security, speed, convenience, durability,
  crCost, encrypted, forHighSecurity, protocol,
  bestUse, cardReaderTypes,
} from "../card-reader-calc.js";

describe("security", () => {
  it("biometric most secure", () => {
    expect(security("biometric_fingerprint")).toBeGreaterThan(security("proximity_125khz"));
  });
});

describe("speed", () => {
  it("proximity fastest", () => {
    expect(speed("proximity_125khz")).toBeGreaterThan(speed("biometric_fingerprint"));
  });
});

describe("convenience", () => {
  it("mobile most convenient", () => {
    expect(convenience("mobile_credential_ble")).toBeGreaterThan(convenience("biometric_fingerprint"));
  });
});

describe("durability", () => {
  it("mobile most durable", () => {
    expect(durability("mobile_credential_ble")).toBeGreaterThan(durability("biometric_fingerprint"));
  });
});

describe("crCost", () => {
  it("biometric most expensive", () => {
    expect(crCost("biometric_fingerprint")).toBeGreaterThan(crCost("proximity_125khz"));
  });
});

describe("encrypted", () => {
  it("smart card encrypted", () => {
    expect(encrypted("smart_card_13_56mhz")).toBe(true);
  });
  it("proximity not encrypted", () => {
    expect(encrypted("proximity_125khz")).toBe(false);
  });
});

describe("forHighSecurity", () => {
  it("biometric for high security", () => {
    expect(forHighSecurity("biometric_fingerprint")).toBe(true);
  });
  it("mobile not high security", () => {
    expect(forHighSecurity("mobile_credential_ble")).toBe(false);
  });
});

describe("protocol", () => {
  it("smart card uses desfire", () => {
    expect(protocol("smart_card_13_56mhz")).toBe("desfire_ev2_aes_128_osdp");
  });
});

describe("bestUse", () => {
  it("mobile for modern office", () => {
    expect(bestUse("mobile_credential_ble")).toBe("modern_office_keyless_entry");
  });
});

describe("cardReaderTypes", () => {
  it("returns 5 types", () => {
    expect(cardReaderTypes()).toHaveLength(5);
  });
});
