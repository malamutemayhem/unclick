import { describe, it, expect } from "vitest";
import {
  airflow, energyEfficiency, noiseLevel, styleAppeal,
  fanCost, hasLight, remoteIncluded, motorType,
  bestRoom, ceilingFans,
} from "../ceiling-fan-calc.js";

describe("airflow", () => {
  it("industrial large best airflow", () => {
    expect(airflow("industrial_large")).toBeGreaterThan(airflow("bladeless_tower"));
  });
});

describe("energyEfficiency", () => {
  it("bladeless tower most efficient", () => {
    expect(energyEfficiency("bladeless_tower")).toBeGreaterThan(energyEfficiency("industrial_large"));
  });
});

describe("noiseLevel", () => {
  it("industrial large noisiest", () => {
    expect(noiseLevel("industrial_large")).toBeGreaterThan(noiseLevel("bladeless_tower"));
  });
});

describe("styleAppeal", () => {
  it("bladeless tower most stylish", () => {
    expect(styleAppeal("bladeless_tower")).toBeGreaterThan(styleAppeal("industrial_large"));
  });
});

describe("fanCost", () => {
  it("dual motor gyro most expensive", () => {
    expect(fanCost("dual_motor_gyro")).toBeGreaterThan(fanCost("hugger_low_profile"));
  });
});

describe("hasLight", () => {
  it("standard three blade has light", () => {
    expect(hasLight("standard_three_blade")).toBe(true);
  });
  it("industrial large does not", () => {
    expect(hasLight("industrial_large")).toBe(false);
  });
});

describe("remoteIncluded", () => {
  it("dual motor gyro includes remote", () => {
    expect(remoteIncluded("dual_motor_gyro")).toBe(true);
  });
  it("standard three blade does not", () => {
    expect(remoteIncluded("standard_three_blade")).toBe(false);
  });
});

describe("motorType", () => {
  it("bladeless tower uses dc brushless impeller", () => {
    expect(motorType("bladeless_tower")).toBe("dc_brushless_impeller");
  });
});

describe("bestRoom", () => {
  it("hugger low profile for low ceiling apartment", () => {
    expect(bestRoom("hugger_low_profile")).toBe("low_ceiling_apartment");
  });
});

describe("ceilingFans", () => {
  it("returns 5 types", () => {
    expect(ceilingFans()).toHaveLength(5);
  });
});
