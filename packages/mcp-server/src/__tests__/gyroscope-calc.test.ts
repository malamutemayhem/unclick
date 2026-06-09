import { describe, it, expect } from "vitest";
import {
  angularMomentum, precessionRate, momentOfInertia, rpmToRadPerSec,
  radPerSecToRpm, nutationFreq, kineticEnergy, spindownTime,
  sensitivity, driftRate, gyroscopeTypes,
} from "../gyroscope-calc.js";

describe("angularMomentum", () => {
  it("I * omega", () => {
    expect(angularMomentum(0.01, 100)).toBeCloseTo(1, 0);
  });
});

describe("precessionRate", () => {
  it("torque / L", () => {
    expect(precessionRate(0.1, 1)).toBeCloseTo(0.1, 1);
  });
  it("zero momentum = 0", () => {
    expect(precessionRate(0.1, 0)).toBe(0);
  });
});

describe("momentOfInertia", () => {
  it("positive value", () => {
    expect(momentOfInertia(1, 0.1)).toBeGreaterThan(0);
  });
});

describe("rpmToRadPerSec", () => {
  it("60 rpm approx 6.28", () => {
    expect(rpmToRadPerSec(60)).toBeCloseTo(6.28, 1);
  });
});

describe("radPerSecToRpm", () => {
  it("round trip", () => {
    expect(radPerSecToRpm(rpmToRadPerSec(100))).toBeCloseTo(100, 0);
  });
});

describe("nutationFreq", () => {
  it("less than spin rate", () => {
    expect(nutationFreq(100, 10)).toBeLessThan(100);
  });
});

describe("kineticEnergy", () => {
  it("positive joules", () => {
    expect(kineticEnergy(0.01, 100)).toBeGreaterThan(0);
  });
});

describe("spindownTime", () => {
  it("positive seconds", () => {
    expect(spindownTime(0.01, 0.001, 3000)).toBeGreaterThan(0);
  });
  it("zero friction = Infinity", () => {
    expect(spindownTime(0.01, 0, 3000)).toBe(Infinity);
  });
});

describe("sensitivity", () => {
  it("ring_laser most sensitive", () => {
    expect(sensitivity("ring_laser")).toBeLessThan(sensitivity("mems"));
  });
});

describe("driftRate", () => {
  it("ring_laser least drift", () => {
    expect(driftRate("ring_laser")).toBeLessThan(driftRate("mechanical"));
  });
});

describe("gyroscopeTypes", () => {
  it("returns 5 types", () => {
    expect(gyroscopeTypes()).toHaveLength(5);
  });
});
