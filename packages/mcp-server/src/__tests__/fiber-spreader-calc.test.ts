import { describe, it, expect } from "vitest";
import {
  spreadUniformity, throughput, towDamage, spreadRatio,
  fsCost, contactFree, forThinPly, spreaderConfig,
  bestUse, fiberSpreaderTypes,
} from "../fiber-spreader-calc.js";

describe("spreadUniformity", () => {
  it("ultrasonic spread best spread uniformity", () => {
    expect(spreadUniformity("ultrasonic_spread")).toBeGreaterThan(spreadUniformity("mechanical_comb"));
  });
});

describe("throughput", () => {
  it("roller bar spread highest throughput", () => {
    expect(throughput("roller_bar_spread")).toBeGreaterThan(throughput("electrostatic_spread"));
  });
});

describe("towDamage", () => {
  it("air jet spread best tow damage score", () => {
    expect(towDamage("air_jet_spread")).toBeGreaterThan(towDamage("mechanical_comb"));
  });
});

describe("spreadRatio", () => {
  it("ultrasonic spread best spread ratio", () => {
    expect(spreadRatio("ultrasonic_spread")).toBeGreaterThan(spreadRatio("mechanical_comb"));
  });
});

describe("fsCost", () => {
  it("ultrasonic spread most expensive", () => {
    expect(fsCost("ultrasonic_spread")).toBeGreaterThan(fsCost("mechanical_comb"));
  });
});

describe("contactFree", () => {
  it("air jet spread is contact free", () => {
    expect(contactFree("air_jet_spread")).toBe(true);
  });
  it("roller bar spread not contact free", () => {
    expect(contactFree("roller_bar_spread")).toBe(false);
  });
});

describe("forThinPly", () => {
  it("ultrasonic spread for thin ply", () => {
    expect(forThinPly("ultrasonic_spread")).toBe(true);
  });
  it("roller bar spread not for thin ply", () => {
    expect(forThinPly("roller_bar_spread")).toBe(false);
  });
});

describe("spreaderConfig", () => {
  it("electrostatic spread uses charge repel filament open field", () => {
    expect(spreaderConfig("electrostatic_spread")).toBe("electrostatic_fiber_spreader_charge_repel_filament_open_field");
  });
});

describe("bestUse", () => {
  it("air jet spread for thin ply prepreg gentle open no damage", () => {
    expect(bestUse("air_jet_spread")).toBe("thin_ply_prepreg_air_jet_fiber_spreader_gentle_open_no_damage");
  });
});

describe("fiberSpreaderTypes", () => {
  it("returns 5 types", () => {
    expect(fiberSpreaderTypes()).toHaveLength(5);
  });
});
