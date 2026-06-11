import { describe, it, expect } from "vitest";
import {
  compactionForce, speed, versatility, surfaceFinish,
  vrCost, vibrating, forAsphalt, drum,
  bestUse, vibratoryRollerTypes,
} from "../vibratory-roller-calc.js";

describe("compactionForce", () => {
  it("padfoot sheepsfoot highest compaction force", () => {
    expect(compactionForce("padfoot_sheepsfoot")).toBeGreaterThan(compactionForce("pneumatic_tire"));
  });
});

describe("speed", () => {
  it("pneumatic tire fastest", () => {
    expect(speed("pneumatic_tire")).toBeGreaterThan(speed("padfoot_sheepsfoot"));
  });
});

describe("versatility", () => {
  it("combination roller most versatile", () => {
    expect(versatility("combination_roller")).toBeGreaterThan(versatility("padfoot_sheepsfoot"));
  });
});

describe("surfaceFinish", () => {
  it("tandem smooth best surface finish", () => {
    expect(surfaceFinish("tandem_smooth")).toBeGreaterThan(surfaceFinish("padfoot_sheepsfoot"));
  });
});

describe("vrCost", () => {
  it("combination roller most expensive", () => {
    expect(vrCost("combination_roller")).toBeGreaterThan(vrCost("pneumatic_tire"));
  });
});

describe("vibrating", () => {
  it("single drum smooth vibrates", () => {
    expect(vibrating("single_drum_smooth")).toBe(true);
  });
  it("pneumatic tire not vibrating", () => {
    expect(vibrating("pneumatic_tire")).toBe(false);
  });
});

describe("forAsphalt", () => {
  it("tandem smooth for asphalt", () => {
    expect(forAsphalt("tandem_smooth")).toBe(true);
  });
  it("padfoot sheepsfoot not for asphalt", () => {
    expect(forAsphalt("padfoot_sheepsfoot")).toBe(false);
  });
});

describe("drum", () => {
  it("combination roller uses front smooth rear pneumatic", () => {
    expect(drum("combination_roller")).toBe("front_smooth_drum_rear_pneumatic_tire_dual_action_compact");
  });
});

describe("bestUse", () => {
  it("padfoot sheepsfoot for cohesive soil", () => {
    expect(bestUse("padfoot_sheepsfoot")).toBe("clay_silt_cohesive_soil_dam_embankment_landfill_compaction");
  });
});

describe("vibratoryRollerTypes", () => {
  it("returns 5 types", () => {
    expect(vibratoryRollerTypes()).toHaveLength(5);
  });
});
