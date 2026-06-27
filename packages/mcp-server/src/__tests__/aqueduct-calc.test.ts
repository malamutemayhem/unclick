import { describe, it, expect } from "vitest";
import {
  flowRate, gradient, velocity, crossSection, hydraulicRadius,
  archSpan, pillarCount, settlingBasinVolume, evaporationLoss,
  channelShapes,
} from "../aqueduct-calc.js";

describe("flowRate", () => {
  it("area x velocity", () => {
    expect(flowRate(2, 1.5)).toBe(3);
  });
});

describe("gradient", () => {
  it("positive ratio", () => {
    expect(gradient(1, 1000)).toBeGreaterThan(0);
  });
  it("zero length = 0", () => {
    expect(gradient(1, 0)).toBe(0);
  });
});

describe("velocity", () => {
  it("positive m/s", () => {
    expect(velocity(0.001, 0.5)).toBeGreaterThan(0);
  });
});

describe("crossSection", () => {
  it("rectangular = w x d", () => {
    expect(crossSection("rectangular", 2, 1)).toBe(2);
  });
  it("semicircular positive", () => {
    expect(crossSection("semicircular", 2, 0)).toBeGreaterThan(0);
  });
});

describe("hydraulicRadius", () => {
  it("positive value", () => {
    expect(hydraulicRadius(2, 4)).toBeGreaterThan(0);
  });
  it("zero perimeter = 0", () => {
    expect(hydraulicRadius(2, 0)).toBe(0);
  });
});

describe("archSpan", () => {
  it("10% wider than valley", () => {
    expect(archSpan(100)).toBe(110);
  });
});

describe("pillarCount", () => {
  it("positive count", () => {
    expect(pillarCount(500, 20)).toBeGreaterThan(0);
  });
  it("zero span = 0", () => {
    expect(pillarCount(500, 0)).toBe(0);
  });
});

describe("settlingBasinVolume", () => {
  it("positive m3", () => {
    expect(settlingBasinVolume(0.5, 30)).toBeGreaterThan(0);
  });
});

describe("evaporationLoss", () => {
  it("positive loss", () => {
    expect(evaporationLoss(1000, 30)).toBeGreaterThan(0);
  });
});

describe("channelShapes", () => {
  it("returns 4 shapes", () => {
    expect(channelShapes()).toHaveLength(4);
  });
});
