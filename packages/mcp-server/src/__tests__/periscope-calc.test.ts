import { describe, it, expect } from "vitest";
import {
  tubeLength, mirrorAngle, imageInversion, fieldOfView,
  lightLoss, reflectivity, tubeDiameter, rotationRange,
  objectDistance, magnification, waterproofDepthM, mirrorTypes,
} from "../periscope-calc.js";

describe("tubeLength", () => {
  it("height + 0.5m", () => {
    expect(tubeLength(5)).toBe(5.5);
  });
});

describe("mirrorAngle", () => {
  it("always 45 degrees", () => {
    expect(mirrorAngle()).toBe(45);
  });
});

describe("imageInversion", () => {
  it("2 mirrors = not inverted", () => {
    expect(imageInversion(2)).toBe(true);
  });
  it("3 mirrors = inverted", () => {
    expect(imageInversion(3)).toBe(false);
  });
});

describe("fieldOfView", () => {
  it("positive degrees", () => {
    expect(fieldOfView(50, 500)).toBeGreaterThan(0);
  });
  it("zero tube = 0", () => {
    expect(fieldOfView(50, 0)).toBe(0);
  });
});

describe("lightLoss", () => {
  it("some loss", () => {
    expect(lightLoss(2, 0.95)).toBeGreaterThan(0);
  });
});

describe("reflectivity", () => {
  it("front_surface best", () => {
    expect(reflectivity("front_surface")).toBeGreaterThan(reflectivity("flat"));
  });
});

describe("tubeDiameter", () => {
  it("1.4x mirror", () => {
    expect(tubeDiameter(50)).toBe(70);
  });
});

describe("rotationRange", () => {
  it("360 degrees", () => {
    expect(rotationRange()).toBe(360);
  });
});

describe("objectDistance", () => {
  it("positive meters", () => {
    expect(objectDistance(30, 5)).toBeGreaterThan(0);
  });
});

describe("magnification", () => {
  it("ratio of focal lengths", () => {
    expect(magnification(100, 25)).toBe(4);
  });
});

describe("waterproofDepthM", () => {
  it("oring deepest", () => {
    expect(waterproofDepthM("oring")).toBeGreaterThan(waterproofDepthM("gasket"));
  });
});

describe("mirrorTypes", () => {
  it("returns 4 types", () => {
    expect(mirrorTypes()).toHaveLength(4);
  });
});
