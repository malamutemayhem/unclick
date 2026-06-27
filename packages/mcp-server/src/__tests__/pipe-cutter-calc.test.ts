import { describe, it, expect } from "vitest";
import {
  cutClean, speedCut, pipeRange, portability,
  cutterCost, ratchet, forCopper, wheelType,
  bestUse, pipeCutters,
} from "../pipe-cutter-calc.js";

describe("cutClean", () => {
  it("wheel cutter copper cleanest cut", () => {
    expect(cutClean("wheel_cutter_copper")).toBeGreaterThan(cutClean("chain_snap_cast"));
  });
});

describe("speedCut", () => {
  it("ratchet cutter plastic fastest cut", () => {
    expect(speedCut("ratchet_cutter_plastic")).toBeGreaterThan(speedCut("internal_tube_inside"));
  });
});

describe("pipeRange", () => {
  it("chain snap cast widest range", () => {
    expect(pipeRange("chain_snap_cast")).toBeGreaterThan(pipeRange("internal_tube_inside"));
  });
});

describe("portability", () => {
  it("ratchet cutter plastic most portable", () => {
    expect(portability("ratchet_cutter_plastic")).toBeGreaterThan(portability("soil_pipe_heavy"));
  });
});

describe("cutterCost", () => {
  it("soil pipe heavy most expensive", () => {
    expect(cutterCost("soil_pipe_heavy")).toBeGreaterThan(cutterCost("ratchet_cutter_plastic"));
  });
});

describe("ratchet", () => {
  it("ratchet cutter plastic has ratchet", () => {
    expect(ratchet("ratchet_cutter_plastic")).toBe(true);
  });
  it("wheel cutter copper no ratchet", () => {
    expect(ratchet("wheel_cutter_copper")).toBe(false);
  });
});

describe("forCopper", () => {
  it("wheel cutter copper is for copper", () => {
    expect(forCopper("wheel_cutter_copper")).toBe(true);
  });
  it("ratchet cutter plastic not for copper", () => {
    expect(forCopper("ratchet_cutter_plastic")).toBe(false);
  });
});

describe("wheelType", () => {
  it("chain snap cast uses chain link cutter", () => {
    expect(wheelType("chain_snap_cast")).toBe("chain_link_cutter");
  });
});

describe("bestUse", () => {
  it("internal tube inside best for tight space cut", () => {
    expect(bestUse("internal_tube_inside")).toBe("tight_space_cut");
  });
});

describe("pipeCutters", () => {
  it("returns 5 types", () => {
    expect(pipeCutters()).toHaveLength(5);
  });
});
