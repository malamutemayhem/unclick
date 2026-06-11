import { describe, it, expect } from "vitest";
import {
  voltageRange, throughput, stepResolution, switchSpeed,
  ttCost, loadBreak, forDistribution, tapConfig,
  bestUse, transformerTapTypes,
} from "../transformer-tap-calc.js";

describe("voltageRange", () => {
  it("thyristor tap best voltage range", () => {
    expect(voltageRange("thyristor_tap")).toBeGreaterThan(voltageRange("no_load_tap"));
  });
});

describe("throughput", () => {
  it("thyristor tap highest throughput", () => {
    expect(throughput("thyristor_tap")).toBeGreaterThan(throughput("no_load_tap"));
  });
});

describe("stepResolution", () => {
  it("thyristor tap best step resolution", () => {
    expect(stepResolution("thyristor_tap")).toBeGreaterThan(stepResolution("no_load_tap"));
  });
});

describe("switchSpeed", () => {
  it("thyristor tap fastest switch speed", () => {
    expect(switchSpeed("thyristor_tap")).toBeGreaterThan(switchSpeed("no_load_tap"));
  });
});

describe("ttCost", () => {
  it("thyristor tap most expensive", () => {
    expect(ttCost("thyristor_tap")).toBeGreaterThan(ttCost("no_load_tap"));
  });
});

describe("loadBreak", () => {
  it("on load tap has load break", () => {
    expect(loadBreak("on_load_tap")).toBe(true);
  });
  it("no load tap no load break", () => {
    expect(loadBreak("no_load_tap")).toBe(false);
  });
});

describe("forDistribution", () => {
  it("on load tap for distribution", () => {
    expect(forDistribution("on_load_tap")).toBe(true);
  });
  it("no load tap not for distribution", () => {
    expect(forDistribution("no_load_tap")).toBe(false);
  });
});

describe("tapConfig", () => {
  it("auto voltage reg uses step boost buck line drop compensate", () => {
    expect(tapConfig("auto_voltage_reg")).toBe("auto_voltage_regulator_step_boost_buck_line_drop_compensate");
  });
});

describe("bestUse", () => {
  it("on load tap for substation auto regulate voltage profile", () => {
    expect(bestUse("on_load_tap")).toBe("substation_on_load_tap_changer_auto_regulate_voltage_profile");
  });
});

describe("transformerTapTypes", () => {
  it("returns 5 types", () => {
    expect(transformerTapTypes()).toHaveLength(5);
  });
});
