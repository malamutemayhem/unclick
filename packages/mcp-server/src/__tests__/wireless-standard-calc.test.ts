import { describe, it, expect } from "vitest";
import {
  maxThroughputMbps, rangeMeters, powerConsumption,
  latencyMs, deviceDensity, licensedSpectrum,
  meshCapable, primaryUseCase, frequencyBand, wirelessStandards,
} from "../wireless-standard-calc.js";

describe("maxThroughputMbps", () => {
  it("five_g_nr highest throughput", () => {
    expect(maxThroughputMbps("five_g_nr")).toBeGreaterThan(
      maxThroughputMbps("wifi6")
    );
  });
});

describe("rangeMeters", () => {
  it("lora longest range", () => {
    expect(rangeMeters("lora")).toBeGreaterThan(
      rangeMeters("wifi6")
    );
  });
});

describe("powerConsumption", () => {
  it("five_g_nr highest power", () => {
    expect(powerConsumption("five_g_nr")).toBeGreaterThan(
      powerConsumption("zigbee")
    );
  });
});

describe("latencyMs", () => {
  it("five_g_nr lowest latency", () => {
    expect(latencyMs("five_g_nr")).toBeLessThan(
      latencyMs("wifi6")
    );
  });
});

describe("deviceDensity", () => {
  it("zigbee high device density", () => {
    expect(deviceDensity("zigbee")).toBeGreaterThan(
      deviceDensity("bluetooth5")
    );
  });
});

describe("licensedSpectrum", () => {
  it("five_g_nr uses licensed spectrum", () => {
    expect(licensedSpectrum("five_g_nr")).toBe(true);
  });
  it("wifi6 does not", () => {
    expect(licensedSpectrum("wifi6")).toBe(false);
  });
});

describe("meshCapable", () => {
  it("zigbee supports mesh", () => {
    expect(meshCapable("zigbee")).toBe(true);
  });
  it("lora does not", () => {
    expect(meshCapable("lora")).toBe(false);
  });
});

describe("primaryUseCase", () => {
  it("zigbee for home automation", () => {
    expect(primaryUseCase("zigbee")).toBe("home_automation");
  });
});

describe("frequencyBand", () => {
  it("lora uses sub ghz", () => {
    expect(frequencyBand("lora")).toBe("sub_ghz");
  });
});

describe("wirelessStandards", () => {
  it("returns 5 standards", () => {
    expect(wirelessStandards()).toHaveLength(5);
  });
});
