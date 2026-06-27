import { describe, it, expect } from "vitest";
import {
  speed, fabricComplexity, gaugeRange, patterning,
  kmCost, seamless, forGarment, formation,
  bestUse, knittingMachineTypes,
} from "../knitting-machine-calc.js";

describe("speed", () => {
  it("circular single jersey fastest", () => {
    expect(speed("circular_single_jersey")).toBeGreaterThan(speed("flat_v_bed"));
  });
});

describe("fabricComplexity", () => {
  it("flat v bed most complex fabric", () => {
    expect(fabricComplexity("flat_v_bed")).toBeGreaterThan(fabricComplexity("circular_single_jersey"));
  });
});

describe("gaugeRange", () => {
  it("flat v bed widest gauge range", () => {
    expect(gaugeRange("flat_v_bed")).toBeGreaterThan(gaugeRange("warp_tricot"));
  });
});

describe("patterning", () => {
  it("flat v bed best patterning", () => {
    expect(patterning("flat_v_bed")).toBeGreaterThan(patterning("warp_tricot"));
  });
});

describe("kmCost", () => {
  it("warp raschel most expensive", () => {
    expect(kmCost("warp_raschel")).toBeGreaterThan(kmCost("circular_single_jersey"));
  });
});

describe("seamless", () => {
  it("circular single jersey is seamless", () => {
    expect(seamless("circular_single_jersey")).toBe(true);
  });
  it("flat v bed not seamless", () => {
    expect(seamless("flat_v_bed")).toBe(false);
  });
});

describe("forGarment", () => {
  it("flat v bed for garment", () => {
    expect(forGarment("flat_v_bed")).toBe(true);
  });
  it("warp tricot not for garment", () => {
    expect(forGarment("warp_tricot")).toBe(false);
  });
});

describe("formation", () => {
  it("warp tricot uses warp beam guide bar", () => {
    expect(formation("warp_tricot")).toBe("warp_beam_guide_bar_tricot_stitch_high_speed_beam_fed");
  });
});

describe("bestUse", () => {
  it("warp raschel for lace net curtain", () => {
    expect(bestUse("warp_raschel")).toBe("lace_net_curtain_geotextile_spacer_fabric_technical_mesh");
  });
});

describe("knittingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(knittingMachineTypes()).toHaveLength(5);
  });
});
