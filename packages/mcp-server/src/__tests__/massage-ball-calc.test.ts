import { describe, it, expect } from "vitest";
import {
  pressureDepth, targetPrecision, painTolerance, portability,
  ballCost, needsBattery, ecoFriendly, surfaceTexture,
  bestArea, massageBalls,
} from "../massage-ball-calc.js";

describe("pressureDepth", () => {
  it("vibrating motor deep most pressure depth", () => {
    expect(pressureDepth("vibrating_motor_deep")).toBeGreaterThan(pressureDepth("spiky_trigger_point"));
  });
});

describe("targetPrecision", () => {
  it("lacrosse solid rubber most target precision", () => {
    expect(targetPrecision("lacrosse_solid_rubber")).toBeGreaterThan(targetPrecision("peanut_double_spine"));
  });
});

describe("painTolerance", () => {
  it("vibrating motor deep most pain tolerant", () => {
    expect(painTolerance("vibrating_motor_deep")).toBeGreaterThan(painTolerance("spiky_trigger_point"));
  });
});

describe("portability", () => {
  it("lacrosse solid rubber most portable", () => {
    expect(portability("lacrosse_solid_rubber")).toBeGreaterThan(portability("vibrating_motor_deep"));
  });
});

describe("ballCost", () => {
  it("vibrating motor deep most expensive", () => {
    expect(ballCost("vibrating_motor_deep")).toBeGreaterThan(ballCost("lacrosse_solid_rubber"));
  });
});

describe("needsBattery", () => {
  it("vibrating motor deep needs battery", () => {
    expect(needsBattery("vibrating_motor_deep")).toBe(true);
  });
  it("lacrosse solid rubber needs no battery", () => {
    expect(needsBattery("lacrosse_solid_rubber")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("cork natural firm is eco friendly", () => {
    expect(ecoFriendly("cork_natural_firm")).toBe(true);
  });
  it("lacrosse solid rubber is not eco friendly", () => {
    expect(ecoFriendly("lacrosse_solid_rubber")).toBe(false);
  });
});

describe("surfaceTexture", () => {
  it("spiky trigger point uses nub studded tpe", () => {
    expect(surfaceTexture("spiky_trigger_point")).toBe("nub_studded_tpe");
  });
});

describe("bestArea", () => {
  it("peanut double spine best for thoracic spine roll", () => {
    expect(bestArea("peanut_double_spine")).toBe("thoracic_spine_roll");
  });
});

describe("massageBalls", () => {
  it("returns 5 types", () => {
    expect(massageBalls()).toHaveLength(5);
  });
});
