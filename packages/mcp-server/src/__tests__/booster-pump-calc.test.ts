import { describe, it, expect } from "vitest";
import {
  pressure, efficiency, reliability, noise,
  bpCost, variableSpeed, forHighRise, motor,
  bestUse, boosterPumpTypes,
} from "../booster-pump-calc.js";

describe("pressure", () => {
  it("triplex highest pressure", () => {
    expect(pressure("triplex_packaged")).toBeGreaterThan(pressure("inline_booster_compact"));
  });
});

describe("efficiency", () => {
  it("vfd most efficient", () => {
    expect(efficiency("variable_speed_vfd")).toBeGreaterThan(efficiency("constant_speed_simplex"));
  });
});

describe("reliability", () => {
  it("triplex most reliable", () => {
    expect(reliability("triplex_packaged")).toBeGreaterThan(reliability("constant_speed_simplex"));
  });
});

describe("noise", () => {
  it("inline quietest", () => {
    expect(noise("inline_booster_compact")).toBeGreaterThan(noise("fire_jockey_maintain"));
  });
});

describe("bpCost", () => {
  it("triplex most expensive", () => {
    expect(bpCost("triplex_packaged")).toBeGreaterThan(bpCost("inline_booster_compact"));
  });
});

describe("variableSpeed", () => {
  it("vfd has variable speed", () => {
    expect(variableSpeed("variable_speed_vfd")).toBe(true);
  });
  it("constant speed not variable", () => {
    expect(variableSpeed("constant_speed_simplex")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("triplex for high rise", () => {
    expect(forHighRise("triplex_packaged")).toBe(true);
  });
  it("inline not high rise", () => {
    expect(forHighRise("inline_booster_compact")).toBe(false);
  });
});

describe("motor", () => {
  it("triplex uses lead lag standby", () => {
    expect(motor("triplex_packaged")).toBe("triplex_vfd_lead_lag_standby");
  });
});

describe("bestUse", () => {
  it("inline for low pressure fix", () => {
    expect(bestUse("inline_booster_compact")).toBe("residential_low_pressure_fix");
  });
});

describe("boosterPumpTypes", () => {
  it("returns 5 types", () => {
    expect(boosterPumpTypes()).toHaveLength(5);
  });
});
