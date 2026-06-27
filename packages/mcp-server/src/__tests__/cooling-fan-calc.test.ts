import { describe, it, expect } from "vitest";
import {
  airflow, noiseLevel, staticPressure, durability,
  fanCost, pwmControl, silent, bearingType,
  bestUse, coolingFans,
} from "../cooling-fan-calc.js";

describe("airflow", () => {
  it("noctua silent premium best airflow", () => {
    expect(airflow("noctua_silent_premium")).toBeGreaterThan(airflow("slim_profile_compact"));
  });
});

describe("noiseLevel", () => {
  it("noctua silent premium quietest", () => {
    expect(noiseLevel("noctua_silent_premium")).toBeGreaterThan(noiseLevel("blower_centrifugal"));
  });
});

describe("staticPressure", () => {
  it("high static radiator highest static pressure", () => {
    expect(staticPressure("high_static_radiator")).toBeGreaterThan(staticPressure("slim_profile_compact"));
  });
});

describe("durability", () => {
  it("noctua silent premium most durable", () => {
    expect(durability("noctua_silent_premium")).toBeGreaterThan(durability("slim_profile_compact"));
  });
});

describe("fanCost", () => {
  it("noctua silent premium most expensive", () => {
    expect(fanCost("noctua_silent_premium")).toBeGreaterThan(fanCost("axial_case_standard"));
  });
});

describe("pwmControl", () => {
  it("noctua silent premium has pwm control", () => {
    expect(pwmControl("noctua_silent_premium")).toBe(true);
  });
  it("axial case standard no pwm control", () => {
    expect(pwmControl("axial_case_standard")).toBe(false);
  });
});

describe("silent", () => {
  it("noctua silent premium is silent", () => {
    expect(silent("noctua_silent_premium")).toBe(true);
  });
  it("blower centrifugal not silent", () => {
    expect(silent("blower_centrifugal")).toBe(false);
  });
});

describe("bearingType", () => {
  it("blower centrifugal uses dual ball bearing", () => {
    expect(bearingType("blower_centrifugal")).toBe("dual_ball_bearing");
  });
});

describe("bestUse", () => {
  it("high static radiator best for radiator heatsink push", () => {
    expect(bestUse("high_static_radiator")).toBe("radiator_heatsink_push");
  });
});

describe("coolingFans", () => {
  it("returns 5 types", () => {
    expect(coolingFans()).toHaveLength(5);
  });
});
