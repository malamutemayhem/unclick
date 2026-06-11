import { describe, it, expect } from "vitest";
import {
  flow, efficiency, noise, longevity,
  cpCost, variableSpeed, forDomestic, rotor,
  bestUse, circPumpTypes,
} from "../circ-pump-calc.js";

describe("flow", () => {
  it("inline highest flow", () => {
    expect(flow("inline_flanged_large")).toBeGreaterThan(flow("solar_thermal_bronze"));
  });
});

describe("efficiency", () => {
  it("ecm most efficient", () => {
    expect(efficiency("ecm_variable_speed")).toBeGreaterThan(efficiency("wet_rotor_residential"));
  });
});

describe("noise", () => {
  it("wet rotor quietest", () => {
    expect(noise("wet_rotor_residential")).toBeGreaterThan(noise("inline_flanged_large"));
  });
});

describe("longevity", () => {
  it("ecm longest lasting", () => {
    expect(longevity("ecm_variable_speed")).toBeGreaterThan(longevity("wet_rotor_residential"));
  });
});

describe("cpCost", () => {
  it("inline most expensive", () => {
    expect(cpCost("inline_flanged_large")).toBeGreaterThan(cpCost("wet_rotor_residential"));
  });
});

describe("variableSpeed", () => {
  it("ecm has variable speed", () => {
    expect(variableSpeed("ecm_variable_speed")).toBe(true);
  });
  it("wet rotor not variable", () => {
    expect(variableSpeed("wet_rotor_residential")).toBe(false);
  });
});

describe("forDomestic", () => {
  it("wet rotor for domestic", () => {
    expect(forDomestic("wet_rotor_residential")).toBe(true);
  });
  it("dry rotor not domestic", () => {
    expect(forDomestic("dry_rotor_commercial")).toBe(false);
  });
});

describe("rotor", () => {
  it("ecm uses permanent magnet", () => {
    expect(rotor("ecm_variable_speed")).toBe("ecm_permanent_magnet_motor");
  });
});

describe("bestUse", () => {
  it("solar for collector loop", () => {
    expect(bestUse("solar_thermal_bronze")).toBe("solar_thermal_collector_loop");
  });
});

describe("circPumpTypes", () => {
  it("returns 5 types", () => {
    expect(circPumpTypes()).toHaveLength(5);
  });
});
