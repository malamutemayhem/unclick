import { describe, it, expect } from "vitest";
import {
  thrustAngle, buttressThickness, archSpan, pinnacleWeight,
  flyerCount, stoneMass, compressionForce, windResistance,
  mortarJointMm, stoneGrades,
} from "../flying-buttress.js";

describe("thrustAngle", () => {
  it("positive degrees", () => {
    expect(thrustAngle(5, 10)).toBeGreaterThan(0);
  });
  it("zero wall = 0", () => {
    expect(thrustAngle(5, 0)).toBe(0);
  });
});

describe("buttressThickness", () => {
  it("positive meters", () => {
    expect(buttressThickness(15, 100)).toBeGreaterThan(0);
  });
});

describe("archSpan", () => {
  it("5% wider", () => {
    expect(archSpan(10)).toBe(10.5);
  });
});

describe("pinnacleWeight", () => {
  it("positive kN", () => {
    expect(pinnacleWeight(50, 45)).toBeGreaterThan(0);
  });
});

describe("flyerCount", () => {
  it("positive count", () => {
    expect(flyerCount(60, 5)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(flyerCount(60, 0)).toBe(0);
  });
});

describe("stoneMass", () => {
  it("ashlar densest", () => {
    expect(stoneMass(1, "ashlar")).toBeGreaterThan(stoneMass(1, "rubble"));
  });
});

describe("compressionForce", () => {
  it("positive kPa", () => {
    expect(compressionForce(100, 2)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(compressionForce(100, 0)).toBe(0);
  });
});

describe("windResistance", () => {
  it("positive kN", () => {
    expect(windResistance(20, 50, 30)).toBeGreaterThan(0);
  });
});

describe("mortarJointMm", () => {
  it("ashlar thinnest", () => {
    expect(mortarJointMm("ashlar")).toBeLessThan(mortarJointMm("rubble"));
  });
});

describe("stoneGrades", () => {
  it("returns 4 grades", () => {
    expect(stoneGrades()).toHaveLength(4);
  });
});
