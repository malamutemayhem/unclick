import { describe, it, expect } from "vitest";
import {
  pressureLoss, strength, installEase, versatility,
  pfCost, threaded, forWelded, joint,
  bestUse, pipeFittingTypes,
} from "../pipe-fitting-calc.js";

describe("pressureLoss", () => {
  it("coupling lowest pressure loss", () => {
    expect(pressureLoss("coupling_full_threaded")).toBeGreaterThan(pressureLoss("tee_equal_branch_outlet"));
  });
});

describe("strength", () => {
  it("elbow strongest", () => {
    expect(strength("elbow_90_long_radius")).toBeGreaterThan(strength("coupling_full_threaded"));
  });
});

describe("installEase", () => {
  it("coupling easiest install", () => {
    expect(installEase("coupling_full_threaded")).toBeGreaterThan(installEase("elbow_90_long_radius"));
  });
});

describe("versatility", () => {
  it("tee most versatile", () => {
    expect(versatility("tee_equal_branch_outlet")).toBeGreaterThan(versatility("coupling_full_threaded"));
  });
});

describe("pfCost", () => {
  it("tee most expensive", () => {
    expect(pfCost("tee_equal_branch_outlet")).toBeGreaterThan(pfCost("coupling_full_threaded"));
  });
});

describe("threaded", () => {
  it("coupling is threaded", () => {
    expect(threaded("coupling_full_threaded")).toBe(true);
  });
  it("elbow not threaded", () => {
    expect(threaded("elbow_90_long_radius")).toBe(false);
  });
});

describe("forWelded", () => {
  it("elbow for welded", () => {
    expect(forWelded("elbow_90_long_radius")).toBe(true);
  });
  it("coupling not for welded", () => {
    expect(forWelded("coupling_full_threaded")).toBe(false);
  });
});

describe("joint", () => {
  it("union uses threaded union nut", () => {
    expect(joint("union_three_piece_disconnect")).toBe("threaded_union_nut_seat_tail");
  });
});

describe("bestUse", () => {
  it("reducer for pump suction discharge", () => {
    expect(bestUse("reducer_concentric_butt")).toBe("pump_suction_discharge_size_change");
  });
});

describe("pipeFittingTypes", () => {
  it("returns 5 types", () => {
    expect(pipeFittingTypes()).toHaveLength(5);
  });
});
