import { describe, it, expect } from "vitest";
import {
  gateArea, flowRate, headLoss, liftForceKn, screwTurns,
  sealPressureKpa, channelVelocity, sedimentTrap,
  fishLadderSteps, gateTypes,
} from "../sluice-calc.js";

describe("gateArea", () => {
  it("w x h", () => {
    expect(gateArea(2, 3)).toBe(6);
  });
});

describe("flowRate", () => {
  it("positive m3/s", () => {
    expect(flowRate(2, 3, 0.6)).toBeGreaterThan(0);
  });
});

describe("headLoss", () => {
  it("positive meters", () => {
    expect(headLoss(2, 0.5)).toBeGreaterThan(0);
  });
});

describe("liftForceKn", () => {
  it("positive kN", () => {
    expect(liftForceKn(4, 5)).toBeGreaterThan(0);
  });
});

describe("screwTurns", () => {
  it("positive turns", () => {
    expect(screwTurns(2, 10)).toBeGreaterThan(0);
  });
  it("zero pitch = 0", () => {
    expect(screwTurns(2, 0)).toBe(0);
  });
});

describe("sealPressureKpa", () => {
  it("positive kPa", () => {
    expect(sealPressureKpa(5)).toBeGreaterThan(0);
  });
});

describe("channelVelocity", () => {
  it("positive m/s", () => {
    expect(channelVelocity(5, 2)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(channelVelocity(5, 0)).toBe(0);
  });
});

describe("sedimentTrap", () => {
  it("positive liters", () => {
    expect(sedimentTrap(5, 0.3)).toBeGreaterThan(0);
  });
});

describe("fishLadderSteps", () => {
  it("positive steps", () => {
    expect(fishLadderSteps(3, 0.3)).toBeGreaterThan(0);
  });
  it("zero rise = 0", () => {
    expect(fishLadderSteps(3, 0)).toBe(0);
  });
});

describe("gateTypes", () => {
  it("returns 5 types", () => {
    expect(gateTypes()).toHaveLength(5);
  });
});
