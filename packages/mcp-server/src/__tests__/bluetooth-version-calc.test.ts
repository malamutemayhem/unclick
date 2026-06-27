import { describe, it, expect } from "vitest";
import {
  throughput, range, powerEff, latency,
  btCost, meshCapable, forAudio, modulation,
  bestUse, bluetoothVersions,
} from "../bluetooth-version-calc.js";

describe("throughput", () => {
  it("classic br edr highest throughput", () => {
    expect(throughput("classic_br_edr")).toBeGreaterThan(throughput("ble_4_2"));
  });
});

describe("range", () => {
  it("ble 5.0 long range farthest", () => {
    expect(range("ble_5_0_long_range")).toBeGreaterThan(range("ble_4_2"));
  });
});

describe("powerEff", () => {
  it("ble 5.3 enhanced most power efficient", () => {
    expect(powerEff("ble_5_3_enhanced")).toBeGreaterThan(powerEff("classic_br_edr"));
  });
});

describe("latency", () => {
  it("ble 5.3 enhanced lowest latency", () => {
    expect(latency("ble_5_3_enhanced")).toBeGreaterThan(latency("classic_br_edr"));
  });
});

describe("btCost", () => {
  it("le audio lc3 most expensive", () => {
    expect(btCost("le_audio_lc3")).toBeGreaterThan(btCost("ble_4_2"));
  });
});

describe("meshCapable", () => {
  it("ble 4.2 is mesh capable", () => {
    expect(meshCapable("ble_4_2")).toBe(true);
  });
  it("classic br edr not mesh capable", () => {
    expect(meshCapable("classic_br_edr")).toBe(false);
  });
});

describe("forAudio", () => {
  it("le audio lc3 for audio", () => {
    expect(forAudio("le_audio_lc3")).toBe(true);
  });
  it("ble 4.2 not for audio", () => {
    expect(forAudio("ble_4_2")).toBe(false);
  });
});

describe("modulation", () => {
  it("le audio lc3 uses isochronous lc3 codec", () => {
    expect(modulation("le_audio_lc3")).toBe("isochronous_lc3_codec");
  });
});

describe("bestUse", () => {
  it("ble 5.0 long range best for asset tracker warehouse", () => {
    expect(bestUse("ble_5_0_long_range")).toBe("asset_tracker_warehouse");
  });
});

describe("bluetoothVersions", () => {
  it("returns 5 types", () => {
    expect(bluetoothVersions()).toHaveLength(5);
  });
});
