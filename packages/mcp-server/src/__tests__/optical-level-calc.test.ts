import { describe, it, expect } from "vitest";
import {
  readAccuracy, setupSpeed, weatherSeal, magnification,
  levelCost, autoLevel, needsTripod, opticType,
  bestUse, opticalLevels,
} from "../optical-level-calc.js";

describe("readAccuracy", () => {
  it("digital bar code most accurate", () => {
    expect(readAccuracy("digital_bar_code")).toBeGreaterThan(readAccuracy("builders_hand_sight"));
  });
});

describe("setupSpeed", () => {
  it("builders hand sight fastest setup", () => {
    expect(setupSpeed("builders_hand_sight")).toBeGreaterThan(setupSpeed("tilting_fine_adjust"));
  });
});

describe("weatherSeal", () => {
  it("digital bar code best weather seal", () => {
    expect(weatherSeal("digital_bar_code")).toBeGreaterThan(weatherSeal("builders_hand_sight"));
  });
});

describe("magnification", () => {
  it("digital bar code highest magnification", () => {
    expect(magnification("digital_bar_code")).toBeGreaterThan(magnification("builders_hand_sight"));
  });
});

describe("levelCost", () => {
  it("digital bar code most expensive", () => {
    expect(levelCost("digital_bar_code")).toBeGreaterThan(levelCost("builders_hand_sight"));
  });
});

describe("autoLevel", () => {
  it("automatic compensator auto levels", () => {
    expect(autoLevel("automatic_compensator")).toBe(true);
  });
  it("dumpy fixed tube not auto level", () => {
    expect(autoLevel("dumpy_fixed_tube")).toBe(false);
  });
});

describe("needsTripod", () => {
  it("dumpy fixed tube needs tripod", () => {
    expect(needsTripod("dumpy_fixed_tube")).toBe(true);
  });
  it("builders hand sight no tripod needed", () => {
    expect(needsTripod("builders_hand_sight")).toBe(false);
  });
});

describe("opticType", () => {
  it("automatic compensator uses compensator pendulum", () => {
    expect(opticType("automatic_compensator")).toBe("compensator_pendulum");
  });
});

describe("bestUse", () => {
  it("digital bar code best for high precision monitor", () => {
    expect(bestUse("digital_bar_code")).toBe("high_precision_monitor");
  });
});

describe("opticalLevels", () => {
  it("returns 5 types", () => {
    expect(opticalLevels()).toHaveLength(5);
  });
});
