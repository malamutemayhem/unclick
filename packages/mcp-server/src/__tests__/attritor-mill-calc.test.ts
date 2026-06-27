import { describe, it, expect } from "vitest";
import {
  grindFineness, throughput, energyEfficiency, mediaWear,
  amCost, forNanoGrind, forMechanicalAlloy, millConfig,
  bestUse, attritorMillTypes,
} from "../attritor-mill-calc.js";

describe("grindFineness", () => {
  it("high energy best grind fineness", () => {
    expect(grindFineness("high_energy_attritor")).toBeGreaterThan(grindFineness("continuous_attritor"));
  });
});

describe("throughput", () => {
  it("continuous highest throughput", () => {
    expect(throughput("continuous_attritor")).toBeGreaterThan(throughput("cryogenic_attritor"));
  });
});

describe("energyEfficiency", () => {
  it("continuous best energy efficiency", () => {
    expect(energyEfficiency("continuous_attritor")).toBeGreaterThan(energyEfficiency("cryogenic_attritor"));
  });
});

describe("mediaWear", () => {
  it("continuous best media wear", () => {
    expect(mediaWear("continuous_attritor")).toBeGreaterThan(mediaWear("high_energy_attritor"));
  });
});

describe("amCost", () => {
  it("cryogenic most expensive", () => {
    expect(amCost("cryogenic_attritor")).toBeGreaterThan(amCost("batch_attritor"));
  });
});

describe("forNanoGrind", () => {
  it("circulation for nano grind", () => {
    expect(forNanoGrind("circulation_attritor")).toBe(true);
  });
  it("batch not for nano grind", () => {
    expect(forNanoGrind("batch_attritor")).toBe(false);
  });
});

describe("forMechanicalAlloy", () => {
  it("high energy for mechanical alloy", () => {
    expect(forMechanicalAlloy("high_energy_attritor")).toBe(true);
  });
  it("batch not for mechanical alloy", () => {
    expect(forMechanicalAlloy("batch_attritor")).toBe(false);
  });
});

describe("millConfig", () => {
  it("cryogenic uses liquid nitrogen cool brittle grind", () => {
    expect(millConfig("cryogenic_attritor")).toBe("cryogenic_attritor_mill_liquid_nitrogen_cool_brittle_grind");
  });
});

describe("bestUse", () => {
  it("high energy for nano powder mechanical alloy react", () => {
    expect(bestUse("high_energy_attritor")).toBe("nano_powder_high_energy_attritor_mill_mechanical_alloy_react");
  });
});

describe("attritorMillTypes", () => {
  it("returns 5 types", () => {
    expect(attritorMillTypes()).toHaveLength(5);
  });
});
