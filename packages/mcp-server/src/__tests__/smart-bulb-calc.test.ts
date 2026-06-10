import { describe, it, expect } from "vitest";
import {
  colorRange, brightness, setupEase, energyEfficiency,
  bulbCost, needsHub, weatherRated, connectType,
  bestRoom, smartBulbs,
} from "../smart-bulb-calc.js";

describe("colorRange", () => {
  it("wifi color rgb widest color range", () => {
    expect(colorRange("wifi_color_rgb")).toBeGreaterThan(colorRange("bluetooth_simple_dim"));
  });
});

describe("brightness", () => {
  it("flood outdoor spot brightest", () => {
    expect(brightness("flood_outdoor_spot")).toBeGreaterThan(brightness("filament_vintage_smart"));
  });
});

describe("setupEase", () => {
  it("bluetooth simple dim easiest setup", () => {
    expect(setupEase("bluetooth_simple_dim")).toBeGreaterThan(setupEase("zigbee_white_tunable"));
  });
});

describe("energyEfficiency", () => {
  it("zigbee white tunable most energy efficient", () => {
    expect(energyEfficiency("zigbee_white_tunable")).toBeGreaterThan(energyEfficiency("filament_vintage_smart"));
  });
});

describe("bulbCost", () => {
  it("flood outdoor spot most expensive", () => {
    expect(bulbCost("flood_outdoor_spot")).toBeGreaterThan(bulbCost("bluetooth_simple_dim"));
  });
});

describe("needsHub", () => {
  it("zigbee white tunable needs hub", () => {
    expect(needsHub("zigbee_white_tunable")).toBe(true);
  });
  it("wifi color rgb does not", () => {
    expect(needsHub("wifi_color_rgb")).toBe(false);
  });
});

describe("weatherRated", () => {
  it("flood outdoor spot is weather rated", () => {
    expect(weatherRated("flood_outdoor_spot")).toBe(true);
  });
  it("wifi color rgb is not", () => {
    expect(weatherRated("wifi_color_rgb")).toBe(false);
  });
});

describe("connectType", () => {
  it("zigbee white tunable uses zigbee mesh hub", () => {
    expect(connectType("zigbee_white_tunable")).toBe("zigbee_mesh_hub");
  });
});

describe("bestRoom", () => {
  it("wifi color rgb best for living room mood party", () => {
    expect(bestRoom("wifi_color_rgb")).toBe("living_room_mood_party");
  });
});

describe("smartBulbs", () => {
  it("returns 5 types", () => {
    expect(smartBulbs()).toHaveLength(5);
  });
});
