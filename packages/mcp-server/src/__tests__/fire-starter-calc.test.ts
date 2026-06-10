import { describe, it, expect } from "vitest";
import {
  ignitionReliability, sparkTemperature, easeOfUse, lifespan,
  starterCost, windProof, needsFuel, ignitionMethod,
  bestScenario, fireStarters,
} from "../fire-starter-calc.js";

describe("ignitionReliability", () => {
  it("ferro rod striker most reliable", () => {
    expect(ignitionReliability("ferro_rod_striker")).toBeGreaterThan(ignitionReliability("fire_piston_compress"));
  });
});

describe("sparkTemperature", () => {
  it("ferro rod striker highest spark temp", () => {
    expect(sparkTemperature("ferro_rod_striker")).toBeGreaterThan(sparkTemperature("electric_arc_usb"));
  });
});

describe("easeOfUse", () => {
  it("waterproof match box easiest to use", () => {
    expect(easeOfUse("waterproof_match_box")).toBeGreaterThan(easeOfUse("fire_piston_compress"));
  });
});

describe("lifespan", () => {
  it("ferro rod striker longest lifespan", () => {
    expect(lifespan("ferro_rod_striker")).toBeGreaterThan(lifespan("waterproof_match_box"));
  });
});

describe("starterCost", () => {
  it("fire piston compress most expensive", () => {
    expect(starterCost("fire_piston_compress")).toBeGreaterThan(starterCost("waterproof_match_box"));
  });
});

describe("windProof", () => {
  it("ferro rod striker is wind proof", () => {
    expect(windProof("ferro_rod_striker")).toBe(true);
  });
  it("waterproof match box is not", () => {
    expect(windProof("waterproof_match_box")).toBe(false);
  });
});

describe("needsFuel", () => {
  it("ferro rod striker does not need fuel", () => {
    expect(needsFuel("ferro_rod_striker")).toBe(false);
  });
  it("electric arc usb does not need fuel", () => {
    expect(needsFuel("electric_arc_usb")).toBe(false);
  });
});

describe("ignitionMethod", () => {
  it("fire piston compress uses rapid air compression", () => {
    expect(ignitionMethod("fire_piston_compress")).toBe("rapid_air_compression");
  });
});

describe("bestScenario", () => {
  it("ferro rod striker best for survival bushcraft wet", () => {
    expect(bestScenario("ferro_rod_striker")).toBe("survival_bushcraft_wet");
  });
});

describe("fireStarters", () => {
  it("returns 5 types", () => {
    expect(fireStarters()).toHaveLength(5);
  });
});
