import { describe, it, expect } from "vitest";
import {
  weldSpeed, weldPrecision, materialRange, jointClean,
  uwCost, forPlastic, forMetal, welderConfig,
  bestUse, ultrasonicWelderTypes,
} from "../ultrasonic-welder-calc.js";

describe("weldSpeed", () => {
  it("ultrasonic spot fastest weld speed", () => {
    expect(weldSpeed("ultrasonic_spot")).toBeGreaterThan(weldSpeed("ultrasonic_metal"));
  });
});

describe("weldPrecision", () => {
  it("torsional vibration best weld precision", () => {
    expect(weldPrecision("torsional_vibration")).toBeGreaterThan(weldPrecision("ultrasonic_spot"));
  });
});

describe("materialRange", () => {
  it("lateral vibration widest material range", () => {
    expect(materialRange("lateral_vibration")).toBeGreaterThan(materialRange("ultrasonic_metal"));
  });
});

describe("jointClean", () => {
  it("ultrasonic metal cleanest joint", () => {
    expect(jointClean("ultrasonic_metal")).toBeGreaterThan(jointClean("ultrasonic_spot"));
  });
});

describe("uwCost", () => {
  it("ultrasonic metal most expensive", () => {
    expect(uwCost("ultrasonic_metal")).toBeGreaterThan(uwCost("ultrasonic_spot"));
  });
});

describe("forPlastic", () => {
  it("lateral vibration for plastic", () => {
    expect(forPlastic("lateral_vibration")).toBe(true);
  });
  it("ultrasonic metal not for plastic", () => {
    expect(forPlastic("ultrasonic_metal")).toBe(false);
  });
});

describe("forMetal", () => {
  it("ultrasonic metal for metal", () => {
    expect(forMetal("ultrasonic_metal")).toBe(true);
  });
  it("lateral vibration not for metal", () => {
    expect(forMetal("lateral_vibration")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("continuous seam uses rotary horn roller", () => {
    expect(welderConfig("continuous_seam")).toBe("continuous_seam_rotary_horn_roller_film_fabric_seal_pouch_bag");
  });
});

describe("bestUse", () => {
  it("ultrasonic metal for battery tab wire terminal", () => {
    expect(bestUse("ultrasonic_metal")).toBe("battery_tab_wire_terminal_copper_aluminum_ultrasonic_metal_weld");
  });
});

describe("ultrasonicWelderTypes", () => {
  it("returns 5 types", () => {
    expect(ultrasonicWelderTypes()).toHaveLength(5);
  });
});
