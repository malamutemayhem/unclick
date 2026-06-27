import { describe, it, expect } from "vitest";
import {
  polishRate, surfaceSafe, compoundHold, wheelLife,
  wheelCost, forFinalShine, forCutting, wheelFabric,
  bestStage, polishWheels,
} from "../polish-wheel-calc.js";

describe("polishRate", () => {
  it("sisal cord cut fastest polish rate", () => {
    expect(polishRate("sisal_cord_cut")).toBeGreaterThan(polishRate("goblet_cone_inner"));
  });
});

describe("surfaceSafe", () => {
  it("cotton flannel shine most surface safe", () => {
    expect(surfaceSafe("cotton_flannel_shine")).toBeGreaterThan(surfaceSafe("sisal_cord_cut"));
  });
});

describe("compoundHold", () => {
  it("sisal cord cut best compound hold", () => {
    expect(compoundHold("sisal_cord_cut")).toBeGreaterThan(compoundHold("cotton_flannel_shine"));
  });
});

describe("wheelLife", () => {
  it("felt hard flat longest wheel life", () => {
    expect(wheelLife("felt_hard_flat")).toBeGreaterThan(wheelLife("cotton_flannel_shine"));
  });
});

describe("wheelCost", () => {
  it("goblet cone inner most expensive", () => {
    expect(wheelCost("goblet_cone_inner")).toBeGreaterThan(wheelCost("muslin_buff_soft"));
  });
});

describe("forFinalShine", () => {
  it("muslin buff soft is for final shine", () => {
    expect(forFinalShine("muslin_buff_soft")).toBe(true);
  });
  it("sisal cord cut is not for final shine", () => {
    expect(forFinalShine("sisal_cord_cut")).toBe(false);
  });
});

describe("forCutting", () => {
  it("sisal cord cut is for cutting", () => {
    expect(forCutting("sisal_cord_cut")).toBe(true);
  });
  it("muslin buff soft is not for cutting", () => {
    expect(forCutting("muslin_buff_soft")).toBe(false);
  });
});

describe("wheelFabric", () => {
  it("felt hard flat uses compressed wool felt", () => {
    expect(wheelFabric("felt_hard_flat")).toBe("compressed_wool_felt");
  });
});

describe("bestStage", () => {
  it("sisal cord cut best for initial cut compound", () => {
    expect(bestStage("sisal_cord_cut")).toBe("initial_cut_compound");
  });
});

describe("polishWheels", () => {
  it("returns 5 types", () => {
    expect(polishWheels()).toHaveLength(5);
  });
});
