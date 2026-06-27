import { describe, it, expect } from "vitest";
import {
  flavorDevelopment, particleFineness, throughput, volatileRemoval,
  ccCost_, continuous, forDark, concheConfig,
  bestUse, chocolateConcheTypes,
} from "../chocolate-conche-calc.js";

describe("flavorDevelopment", () => {
  it("longitudinal conche best flavor development", () => {
    expect(flavorDevelopment("longitudinal_conche")).toBeGreaterThan(flavorDevelopment("ball_mill_refiner"));
  });
});

describe("particleFineness", () => {
  it("ball mill refiner finest particles", () => {
    expect(particleFineness("ball_mill_refiner")).toBeGreaterThan(particleFineness("longitudinal_conche"));
  });
});

describe("throughput", () => {
  it("continuous conche highest throughput", () => {
    expect(throughput("continuous_conche")).toBeGreaterThan(throughput("longitudinal_conche"));
  });
});

describe("volatileRemoval", () => {
  it("longitudinal conche best volatile removal", () => {
    expect(volatileRemoval("longitudinal_conche")).toBeGreaterThan(volatileRemoval("ball_mill_refiner"));
  });
});

describe("ccCost_", () => {
  it("dual conche most expensive", () => {
    expect(ccCost_("dual_conche")).toBeGreaterThan(ccCost_("ball_mill_refiner"));
  });
});

describe("continuous", () => {
  it("continuous conche is continuous", () => {
    expect(continuous("continuous_conche")).toBe(true);
  });
  it("longitudinal conche not continuous", () => {
    expect(continuous("longitudinal_conche")).toBe(false);
  });
});

describe("forDark", () => {
  it("longitudinal conche for dark chocolate", () => {
    expect(forDark("longitudinal_conche")).toBe(true);
  });
  it("ball mill refiner not for dark", () => {
    expect(forDark("ball_mill_refiner")).toBe(false);
  });
});

describe("concheConfig", () => {
  it("dual conche uses two stage dry wet phase", () => {
    expect(concheConfig("dual_conche")).toBe("dual_conche_two_stage_dry_wet_phase_intensive_shear_flavor_develop");
  });
});

describe("bestUse", () => {
  it("longitudinal conche for premium dark chocolate", () => {
    expect(bestUse("longitudinal_conche")).toBe("premium_dark_chocolate_longitudinal_conche_long_slow_flavor_rich");
  });
});

describe("chocolateConcheTypes", () => {
  it("returns 5 types", () => {
    expect(chocolateConcheTypes()).toHaveLength(5);
  });
});
