import { describe, it, expect } from "vitest";
import {
  throughput, powerDraw, range, latency,
  btCost, lowEnergy, forAudio, transport,
  bestUse, bluetoothProfiles,
} from "../bluetooth-profile-calc.js";

describe("throughput", () => {
  it("classic spp highest throughput", () => {
    expect(throughput("classic_spp")).toBeGreaterThan(throughput("direction_aoa_aod"));
  });
});

describe("powerDraw", () => {
  it("ble gatt lowest power draw", () => {
    expect(powerDraw("ble_gatt")).toBeGreaterThan(powerDraw("classic_spp"));
  });
});

describe("range", () => {
  it("mesh flood best range", () => {
    expect(range("mesh_flood")).toBeGreaterThan(range("ble_gatt"));
  });
});

describe("latency", () => {
  it("ble audio lc3 lowest latency", () => {
    expect(latency("ble_audio_lc3")).toBeGreaterThan(latency("classic_spp"));
  });
});

describe("btCost", () => {
  it("direction aoa aod most expensive", () => {
    expect(btCost("direction_aoa_aod")).toBeGreaterThan(btCost("ble_gatt"));
  });
});

describe("lowEnergy", () => {
  it("ble gatt is low energy", () => {
    expect(lowEnergy("ble_gatt")).toBe(true);
  });
  it("classic spp not low energy", () => {
    expect(lowEnergy("classic_spp")).toBe(false);
  });
});

describe("forAudio", () => {
  it("ble audio lc3 is for audio", () => {
    expect(forAudio("ble_audio_lc3")).toBe(true);
  });
  it("ble gatt not for audio", () => {
    expect(forAudio("ble_gatt")).toBe(false);
  });
});

describe("transport", () => {
  it("ble audio lc3 uses iso cis bis lc3", () => {
    expect(transport("ble_audio_lc3")).toBe("iso_cis_bis_lc3");
  });
});

describe("bestUse", () => {
  it("direction aoa aod best for indoor asset tracking", () => {
    expect(bestUse("direction_aoa_aod")).toBe("indoor_asset_tracking");
  });
});

describe("bluetoothProfiles", () => {
  it("returns 5 types", () => {
    expect(bluetoothProfiles()).toHaveLength(5);
  });
});
