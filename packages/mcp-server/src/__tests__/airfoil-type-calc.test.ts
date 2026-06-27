import { describe, it, expect } from "vitest";
import {
  liftCoefficient, dragCoefficient, stallResistance,
  speedRange, manufacturingEase, inverted,
  selfStable, bestApplication, thicknessRatio, airfoilTypes,
} from "../airfoil-type-calc.js";

describe("liftCoefficient", () => {
  it("supercritical has highest lift", () => {
    expect(liftCoefficient("supercritical")).toBeGreaterThan(
      liftCoefficient("symmetric")
    );
  });
});

describe("dragCoefficient", () => {
  it("laminar flow has lowest drag", () => {
    expect(dragCoefficient("laminar_flow")).toBeLessThan(
      dragCoefficient("cambered")
    );
  });
});

describe("stallResistance", () => {
  it("supercritical resists stall best", () => {
    expect(stallResistance("supercritical")).toBeGreaterThan(
      stallResistance("laminar_flow")
    );
  });
});

describe("speedRange", () => {
  it("supercritical has widest speed range", () => {
    expect(speedRange("supercritical")).toBeGreaterThan(
      speedRange("reflexed")
    );
  });
});

describe("manufacturingEase", () => {
  it("symmetric is easiest to make", () => {
    expect(manufacturingEase("symmetric")).toBeGreaterThan(
      manufacturingEase("laminar_flow")
    );
  });
});

describe("inverted", () => {
  it("symmetric works inverted", () => {
    expect(inverted("symmetric")).toBe(true);
  });
  it("cambered does not", () => {
    expect(inverted("cambered")).toBe(false);
  });
});

describe("selfStable", () => {
  it("reflexed is self stable", () => {
    expect(selfStable("reflexed")).toBe(true);
  });
  it("cambered is not", () => {
    expect(selfStable("cambered")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("supercritical for airliners", () => {
    expect(bestApplication("supercritical")).toBe("airliner");
  });
});

describe("thicknessRatio", () => {
  it("laminar flow is thickest", () => {
    expect(thicknessRatio("laminar_flow")).toBeGreaterThan(
      thicknessRatio("symmetric")
    );
  });
});

describe("airfoilTypes", () => {
  it("returns 5 types", () => {
    expect(airfoilTypes()).toHaveLength(5);
  });
});
