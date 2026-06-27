import { describe, it, expect } from "vitest";
import {
  holdForce, setupSpeed, angleControl, heatResist,
  clampCost, oneHanded, holdsAngle, jawType,
  bestJoint, weldClamps,
} from "../weld-clamp-calc.js";

describe("holdForce", () => {
  it("c clamp standard strongest hold force", () => {
    expect(holdForce("c_clamp_standard")).toBeGreaterThan(holdForce("magnetic_square_angle"));
  });
});

describe("setupSpeed", () => {
  it("magnetic square angle fastest setup", () => {
    expect(setupSpeed("magnetic_square_angle")).toBeGreaterThan(setupSpeed("c_clamp_standard"));
  });
});

describe("angleControl", () => {
  it("magnetic square angle best angle control", () => {
    expect(angleControl("magnetic_square_angle")).toBeGreaterThan(angleControl("c_clamp_standard"));
  });
});

describe("heatResist", () => {
  it("c clamp standard best heat resist", () => {
    expect(heatResist("c_clamp_standard")).toBeGreaterThan(heatResist("magnetic_square_angle"));
  });
});

describe("clampCost", () => {
  it("magnetic square angle more expensive than c clamp", () => {
    expect(clampCost("magnetic_square_angle")).toBeGreaterThan(clampCost("c_clamp_standard"));
  });
});

describe("oneHanded", () => {
  it("locking plier grip is one handed", () => {
    expect(oneHanded("locking_plier_grip")).toBe(true);
  });
  it("c clamp standard is not one handed", () => {
    expect(oneHanded("c_clamp_standard")).toBe(false);
  });
});

describe("holdsAngle", () => {
  it("corner clamp ninety holds angle", () => {
    expect(holdsAngle("corner_clamp_ninety")).toBe(true);
  });
  it("locking plier grip does not hold angle", () => {
    expect(holdsAngle("locking_plier_grip")).toBe(false);
  });
});

describe("jawType", () => {
  it("magnetic square angle uses rare earth magnet", () => {
    expect(jawType("magnetic_square_angle")).toBe("rare_earth_magnet");
  });
});

describe("bestJoint", () => {
  it("corner clamp ninety best for angle iron corner", () => {
    expect(bestJoint("corner_clamp_ninety")).toBe("angle_iron_corner");
  });
});

describe("weldClamps", () => {
  it("returns 5 types", () => {
    expect(weldClamps()).toHaveLength(5);
  });
});
