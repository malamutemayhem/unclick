import { describe, it, expect } from "vitest";
import {
  accuracy, pressureLoss, directionSensitivity, durability,
  ptCost, multiPoint, forDuct, sensing,
  bestUse, pitotTubeTypes,
} from "../pitot-tube-calc.js";

describe("accuracy", () => {
  it("averaging most accurate", () => {
    expect(accuracy("averaging_multi_port")).toBeGreaterThan(accuracy("s_type_reverse"));
  });
});

describe("pressureLoss", () => {
  it("standard lowest loss", () => {
    expect(pressureLoss("standard_l_shaped")).toBeGreaterThan(pressureLoss("averaging_multi_port"));
  });
});

describe("directionSensitivity", () => {
  it("kiel best direction handling", () => {
    expect(directionSensitivity("kiel_shielded_yaw")).toBeGreaterThan(directionSensitivity("s_type_reverse"));
  });
});

describe("durability", () => {
  it("s type most durable", () => {
    expect(durability("s_type_reverse")).toBeGreaterThan(durability("kiel_shielded_yaw"));
  });
});

describe("ptCost", () => {
  it("heated most expensive", () => {
    expect(ptCost("heated_anti_icing")).toBeGreaterThan(ptCost("standard_l_shaped"));
  });
});

describe("multiPoint", () => {
  it("averaging is multi point", () => {
    expect(multiPoint("averaging_multi_port")).toBe(true);
  });
  it("standard not multi point", () => {
    expect(multiPoint("standard_l_shaped")).toBe(false);
  });
});

describe("forDuct", () => {
  it("averaging for duct", () => {
    expect(forDuct("averaging_multi_port")).toBe(true);
  });
  it("kiel not for duct", () => {
    expect(forDuct("kiel_shielded_yaw")).toBe(false);
  });
});

describe("sensing", () => {
  it("kiel uses shielded tip", () => {
    expect(sensing("kiel_shielded_yaw")).toBe("shielded_tip_yaw_insensitive");
  });
});

describe("bestUse", () => {
  it("s type for stack emission", () => {
    expect(bestUse("s_type_reverse")).toBe("stack_emission_dirty_gas_testing");
  });
});

describe("pitotTubeTypes", () => {
  it("returns 5 types", () => {
    expect(pitotTubeTypes()).toHaveLength(5);
  });
});
