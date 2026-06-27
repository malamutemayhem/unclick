import { describe, it, expect } from "vitest";
import {
  sealQuality, throughput, overlap, speedRange,
  rsCost, leakProof, forTankFab, seamConfig,
  bestUse, resistanceSeamTypes,
} from "../resistance-seam-calc.js";

describe("sealQuality", () => {
  it("high freq seam best seal quality", () => {
    expect(sealQuality("high_freq_seam")).toBeGreaterThan(sealQuality("roll_spot_seam"));
  });
});

describe("throughput", () => {
  it("high freq seam highest throughput", () => {
    expect(throughput("high_freq_seam")).toBeGreaterThan(throughput("foil_butt_seam"));
  });
});

describe("overlap", () => {
  it("mash seam best overlap", () => {
    expect(overlap("mash_seam")).toBeGreaterThan(overlap("roll_spot_seam"));
  });
});

describe("speedRange", () => {
  it("high freq seam best speed range", () => {
    expect(speedRange("high_freq_seam")).toBeGreaterThan(speedRange("foil_butt_seam"));
  });
});

describe("rsCost", () => {
  it("high freq seam most expensive", () => {
    expect(rsCost("high_freq_seam")).toBeGreaterThan(rsCost("roll_spot_seam"));
  });
});

describe("leakProof", () => {
  it("continuous seam is leak proof", () => {
    expect(leakProof("continuous_seam")).toBe(true);
  });
  it("roll spot seam not leak proof", () => {
    expect(leakProof("roll_spot_seam")).toBe(false);
  });
});

describe("forTankFab", () => {
  it("continuous seam for tank fab", () => {
    expect(forTankFab("continuous_seam")).toBe(true);
  });
  it("roll spot seam not for tank fab", () => {
    expect(forTankFab("roll_spot_seam")).toBe(false);
  });
});

describe("seamConfig", () => {
  it("mash seam uses forge overlap flush finish reduce thickness step", () => {
    expect(seamConfig("mash_seam")).toBe("mash_seam_welder_forge_overlap_flush_finish_reduce_thickness_step");
  });
});

describe("bestUse", () => {
  it("high freq seam for tube mill induction continuous pipe produce", () => {
    expect(bestUse("high_freq_seam")).toBe("tube_mill_high_freq_seam_welder_induction_continuous_pipe_produce");
  });
});

describe("resistanceSeamTypes", () => {
  it("returns 5 types", () => {
    expect(resistanceSeamTypes()).toHaveLength(5);
  });
});
