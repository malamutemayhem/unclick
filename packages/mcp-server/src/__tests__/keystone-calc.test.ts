import { describe, it, expect } from "vitest";
import {
  widthCm, heightCm, taperAngle, projectionCm, weightKg,
  compressionForceKn, carvingHours, placementOrder,
  settlingTimeDays, restorationCost, keystoneStyles,
} from "../keystone-calc.js";

describe("widthCm", () => {
  it("8% of span", () => {
    expect(widthCm(200)).toBe(16);
  });
});

describe("heightCm", () => {
  it("120% of depth", () => {
    expect(heightCm(40)).toBe(48);
  });
});

describe("taperAngle", () => {
  it("positive angle", () => {
    expect(taperAngle(11)).toBeGreaterThan(0);
  });
  it("zero voussoirs = 0", () => {
    expect(taperAngle(0)).toBe(0);
  });
});

describe("projectionCm", () => {
  it("mask projects most", () => {
    expect(projectionCm(40, "mask")).toBeGreaterThan(projectionCm(40, "rusticated"));
  });
  it("plain = 0", () => {
    expect(projectionCm(40, "plain")).toBe(0);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(16, 48, 30, 2.5)).toBeGreaterThan(0);
  });
});

describe("compressionForceKn", () => {
  it("positive force", () => {
    expect(compressionForceKn(100, 11)).toBeGreaterThan(0);
  });
  it("zero voussoirs = 0", () => {
    expect(compressionForceKn(100, 0)).toBe(0);
  });
});

describe("carvingHours", () => {
  it("mask longest", () => {
    expect(carvingHours("mask")).toBeGreaterThan(carvingHours("plain"));
  });
});

describe("placementOrder", () => {
  it("last voussoir", () => {
    expect(placementOrder(11)).toBe(11);
  });
});

describe("settlingTimeDays", () => {
  it("positive days", () => {
    expect(settlingTimeDays(2)).toBeGreaterThan(0);
  });
});

describe("restorationCost", () => {
  it("high damage = full replacement", () => {
    expect(restorationCost(70, 5000)).toBe(5000);
  });
  it("low damage = partial", () => {
    expect(restorationCost(20, 5000)).toBeLessThan(5000);
  });
});

describe("keystoneStyles", () => {
  it("returns 5 styles", () => {
    expect(keystoneStyles()).toHaveLength(5);
  });
});
