import { describe, it, expect } from "vitest";
import {
  appControl, energyTracking, outletCount, compactness,
  plugCost, voiceAssistant, weatherRated, protocol,
  bestUse, smartPlugs,
} from "../smart-plug-calc.js";

describe("appControl", () => {
  it("power strip smart best app control", () => {
    expect(appControl("power_strip_smart")).toBeGreaterThan(appControl("outdoor_weatherproof"));
  });
});

describe("energyTracking", () => {
  it("energy monitor best energy tracking", () => {
    expect(energyTracking("energy_monitor")).toBeGreaterThan(energyTracking("wifi_mini"));
  });
});

describe("outletCount", () => {
  it("power strip smart most outlets", () => {
    expect(outletCount("power_strip_smart")).toBeGreaterThan(outletCount("wifi_mini"));
  });
});

describe("compactness", () => {
  it("wifi mini most compact", () => {
    expect(compactness("wifi_mini")).toBeGreaterThan(compactness("power_strip_smart"));
  });
});

describe("plugCost", () => {
  it("power strip smart most expensive", () => {
    expect(plugCost("power_strip_smart")).toBeGreaterThan(plugCost("wifi_mini"));
  });
});

describe("voiceAssistant", () => {
  it("wifi mini supports voice assistant", () => {
    expect(voiceAssistant("wifi_mini")).toBe(true);
  });
  it("energy monitor supports voice assistant", () => {
    expect(voiceAssistant("energy_monitor")).toBe(true);
  });
});

describe("weatherRated", () => {
  it("outdoor weatherproof is weather rated", () => {
    expect(weatherRated("outdoor_weatherproof")).toBe(true);
  });
  it("wifi mini is not", () => {
    expect(weatherRated("wifi_mini")).toBe(false);
  });
});

describe("protocol", () => {
  it("energy monitor uses wifi cloud analytics", () => {
    expect(protocol("energy_monitor")).toBe("wifi_cloud_analytics");
  });
});

describe("bestUse", () => {
  it("outdoor weatherproof for holiday lights garden", () => {
    expect(bestUse("outdoor_weatherproof")).toBe("holiday_lights_garden");
  });
});

describe("smartPlugs", () => {
  it("returns 5 types", () => {
    expect(smartPlugs()).toHaveLength(5);
  });
});
