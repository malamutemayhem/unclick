import { describe, it, expect } from "vitest";
import {
  capacity, safety, ergonomics, speed,
  plCost, motorized, forBariatric, mechanism,
  bestUse, patientLiftTypes,
} from "../patient-lift-calc.js";

describe("capacity", () => {
  it("ceiling fixed highest capacity", () => {
    expect(capacity("ceiling_track_fixed")).toBeGreaterThan(capacity("sit_to_stand_assist"));
  });
});

describe("safety", () => {
  it("ceiling fixed safest", () => {
    expect(safety("ceiling_track_fixed")).toBeGreaterThan(safety("floor_hydraulic_manual"));
  });
});

describe("ergonomics", () => {
  it("ceiling fixed best ergonomics", () => {
    expect(ergonomics("ceiling_track_fixed")).toBeGreaterThan(ergonomics("floor_hydraulic_manual"));
  });
});

describe("speed", () => {
  it("ceiling fixed fastest", () => {
    expect(speed("ceiling_track_fixed")).toBeGreaterThan(speed("floor_hydraulic_manual"));
  });
});

describe("plCost", () => {
  it("ceiling fixed most expensive", () => {
    expect(plCost("ceiling_track_fixed")).toBeGreaterThan(plCost("floor_hydraulic_manual"));
  });
});

describe("motorized", () => {
  it("electric is motorized", () => {
    expect(motorized("floor_electric_battery")).toBe(true);
  });
  it("hydraulic not motorized", () => {
    expect(motorized("floor_hydraulic_manual")).toBe(false);
  });
});

describe("forBariatric", () => {
  it("fixed ceiling for bariatric", () => {
    expect(forBariatric("ceiling_track_fixed")).toBe(true);
  });
  it("sit to stand not bariatric", () => {
    expect(forBariatric("sit_to_stand_assist")).toBe(false);
  });
});

describe("mechanism", () => {
  it("sit to stand uses knee pad", () => {
    expect(mechanism("sit_to_stand_assist")).toBe("knee_pad_strap_powered_rise");
  });
});

describe("bestUse", () => {
  it("ceiling fixed for icu", () => {
    expect(bestUse("ceiling_track_fixed")).toBe("icu_long_term_care_room");
  });
});

describe("patientLiftTypes", () => {
  it("returns 5 types", () => {
    expect(patientLiftTypes()).toHaveLength(5);
  });
});
