import { describe, it, expect } from "vitest";
import {
  clampForce, adjustability, installSpeed, vibrationResist,
  clampCost, reusable, tamperProof, bandMaterial,
  bestUse, hoseClamps,
} from "../hose-clamp-calc.js";

describe("clampForce", () => {
  it("t bolt heavy duty strongest clamp", () => {
    expect(clampForce("t_bolt_heavy_duty")).toBeGreaterThan(clampForce("spring_wire_squeeze"));
  });
});

describe("adjustability", () => {
  it("worm gear screw most adjustable", () => {
    expect(adjustability("worm_gear_screw")).toBeGreaterThan(adjustability("ear_crimp_pinch"));
  });
});

describe("installSpeed", () => {
  it("spring wire squeeze fastest install", () => {
    expect(installSpeed("spring_wire_squeeze")).toBeGreaterThan(installSpeed("t_bolt_heavy_duty"));
  });
});

describe("vibrationResist", () => {
  it("constant tension auto best vibration resistance", () => {
    expect(vibrationResist("constant_tension_auto")).toBeGreaterThan(vibrationResist("worm_gear_screw"));
  });
});

describe("clampCost", () => {
  it("t bolt heavy duty most expensive", () => {
    expect(clampCost("t_bolt_heavy_duty")).toBeGreaterThan(clampCost("spring_wire_squeeze"));
  });
});

describe("reusable", () => {
  it("worm gear screw is reusable", () => {
    expect(reusable("worm_gear_screw")).toBe(true);
  });
  it("ear crimp pinch is not", () => {
    expect(reusable("ear_crimp_pinch")).toBe(false);
  });
});

describe("tamperProof", () => {
  it("ear crimp pinch is tamper proof", () => {
    expect(tamperProof("ear_crimp_pinch")).toBe(true);
  });
  it("worm gear screw is not", () => {
    expect(tamperProof("worm_gear_screw")).toBe(false);
  });
});

describe("bandMaterial", () => {
  it("constant tension auto uses spring loaded band", () => {
    expect(bandMaterial("constant_tension_auto")).toBe("spring_loaded_band");
  });
});

describe("bestUse", () => {
  it("t bolt heavy duty best for turbo intercooler boost", () => {
    expect(bestUse("t_bolt_heavy_duty")).toBe("turbo_intercooler_boost");
  });
});

describe("hoseClamps", () => {
  it("returns 5 types", () => {
    expect(hoseClamps()).toHaveLength(5);
  });
});
