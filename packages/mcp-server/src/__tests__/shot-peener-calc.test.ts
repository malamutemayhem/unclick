import { describe, it, expect } from "vitest";
import {
  coverageControl, throughput, intensityRange, surfaceFinish,
  spCost, contactFree, forAerospace, peenerConfig,
  bestUse, shotPeenerTypes,
} from "../shot-peener-calc.js";

describe("coverageControl", () => {
  it("laser peen best coverage control", () => {
    expect(coverageControl("laser_peen")).toBeGreaterThan(coverageControl("flapper_peen"));
  });
});

describe("throughput", () => {
  it("wheel peen highest throughput", () => {
    expect(throughput("wheel_peen")).toBeGreaterThan(throughput("laser_peen"));
  });
});

describe("intensityRange", () => {
  it("laser peen best intensity range", () => {
    expect(intensityRange("laser_peen")).toBeGreaterThan(intensityRange("flapper_peen"));
  });
});

describe("surfaceFinish", () => {
  it("laser peen best surface finish", () => {
    expect(surfaceFinish("laser_peen")).toBeGreaterThan(surfaceFinish("wheel_peen"));
  });
});

describe("spCost", () => {
  it("laser peen most expensive", () => {
    expect(spCost("laser_peen")).toBeGreaterThan(spCost("flapper_peen"));
  });
});

describe("contactFree", () => {
  it("laser peen is contact free", () => {
    expect(contactFree("laser_peen")).toBe(true);
  });
  it("air blast peen not contact free", () => {
    expect(contactFree("air_blast_peen")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("laser peen for aerospace", () => {
    expect(forAerospace("laser_peen")).toBe(true);
  });
  it("wheel peen not for aerospace", () => {
    expect(forAerospace("wheel_peen")).toBe(false);
  });
});

describe("peenerConfig", () => {
  it("ultrasonic peen uses sonotrode pin vibrate deep compress", () => {
    expect(peenerConfig("ultrasonic_peen")).toBe("ultrasonic_shot_peener_sonotrode_pin_vibrate_deep_compress");
  });
});

describe("bestUse", () => {
  it("laser peen for turbine blade pulse plasma deep compress", () => {
    expect(bestUse("laser_peen")).toBe("turbine_blade_laser_shot_peener_pulse_plasma_deep_compress");
  });
});

describe("shotPeenerTypes", () => {
  it("returns 5 types", () => {
    expect(shotPeenerTypes()).toHaveLength(5);
  });
});
