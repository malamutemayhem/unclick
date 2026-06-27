import { describe, it, expect } from "vitest";
import {
  overlay, throughput, robustness, multiLayer,
  alignCost, waferWarp, forBonding, technique,
  bestUse, waferAligns,
} from "../wafer-align-calc.js";

describe("overlay", () => {
  it("moire phase grating best overlay", () => {
    expect(overlay("moire_phase_grating")).toBeGreaterThan(overlay("global_alignment_mark"));
  });
});

describe("throughput", () => {
  it("global alignment mark highest throughput", () => {
    expect(throughput("global_alignment_mark")).toBeGreaterThan(throughput("moire_phase_grating"));
  });
});

describe("robustness", () => {
  it("through lens ttl most robust", () => {
    expect(robustness("through_lens_ttl")).toBeGreaterThan(robustness("moire_phase_grating"));
  });
});

describe("multiLayer", () => {
  it("moire phase grating best multi layer", () => {
    expect(multiLayer("moire_phase_grating")).toBeGreaterThan(multiLayer("global_alignment_mark"));
  });
});

describe("alignCost", () => {
  it("moire phase grating most expensive", () => {
    expect(alignCost("moire_phase_grating")).toBeGreaterThan(alignCost("global_alignment_mark"));
  });
});

describe("waferWarp", () => {
  it("die by die field handles wafer warp", () => {
    expect(waferWarp("die_by_die_field")).toBe(true);
  });
  it("global alignment mark no wafer warp", () => {
    expect(waferWarp("global_alignment_mark")).toBe(false);
  });
});

describe("forBonding", () => {
  it("moire phase grating for bonding", () => {
    expect(forBonding("moire_phase_grating")).toBe(true);
  });
  it("through lens ttl not for bonding", () => {
    expect(forBonding("through_lens_ttl")).toBe(false);
  });
});

describe("technique", () => {
  it("moire phase grating uses interference fringe sub nm", () => {
    expect(technique("moire_phase_grating")).toBe("interference_fringe_sub_nm");
  });
});

describe("bestUse", () => {
  it("backside ir best for tsv backside litho", () => {
    expect(bestUse("backside_ir")).toBe("tsv_backside_litho");
  });
});

describe("waferAligns", () => {
  it("returns 5 types", () => {
    expect(waferAligns()).toHaveLength(5);
  });
});
