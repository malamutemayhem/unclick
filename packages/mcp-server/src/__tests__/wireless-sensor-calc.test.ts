import { describe, it, expect } from "vitest";
import {
  range, batteryLife, reliability, dataRate,
  wsCost, meshCapable, forHazardous, protocol,
  bestUse, wirelessSensorTypes,
} from "../wireless-sensor-calc.js";

describe("range", () => {
  it("lora wan longest range", () => {
    expect(range("lora_wan_long")).toBeGreaterThan(range("bluetooth_5_le"));
  });
});

describe("batteryLife", () => {
  it("lora wan best battery life", () => {
    expect(batteryLife("lora_wan_long")).toBeGreaterThan(batteryLife("wirelesshart_mesh"));
  });
});

describe("reliability", () => {
  it("wirelesshart most reliable", () => {
    expect(reliability("wirelesshart_mesh")).toBeGreaterThan(reliability("bluetooth_5_le"));
  });
});

describe("dataRate", () => {
  it("bluetooth 5 le highest data rate", () => {
    expect(dataRate("bluetooth_5_le")).toBeGreaterThan(dataRate("lora_wan_long"));
  });
});

describe("wsCost", () => {
  it("wirelesshart most expensive", () => {
    expect(wsCost("wirelesshart_mesh")).toBeGreaterThan(wsCost("bluetooth_5_le"));
  });
});

describe("meshCapable", () => {
  it("wirelesshart is mesh capable", () => {
    expect(meshCapable("wirelesshart_mesh")).toBe(true);
  });
  it("lora wan not mesh capable", () => {
    expect(meshCapable("lora_wan_long")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("isa100 for hazardous", () => {
    expect(forHazardous("isa100_11a_mesh")).toBe(true);
  });
  it("zigbee not for hazardous", () => {
    expect(forHazardous("zigbee_pro_mesh")).toBe(false);
  });
});

describe("protocol", () => {
  it("lora wan uses chirp spread spectrum", () => {
    expect(protocol("lora_wan_long")).toBe("chirp_spread_spectrum_star_topology_gateway_cloud");
  });
});

describe("bestUse", () => {
  it("bluetooth 5 le for asset tracking", () => {
    expect(bestUse("bluetooth_5_le")).toBe("asset_tracking_beacon_vibration_sensor_local_area");
  });
});

describe("wirelessSensorTypes", () => {
  it("returns 5 types", () => {
    expect(wirelessSensorTypes()).toHaveLength(5);
  });
});
