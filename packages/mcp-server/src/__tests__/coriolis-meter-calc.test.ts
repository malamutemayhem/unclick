import { describe, it, expect } from "vitest";
import {
  accuracy, turndown, pressure, density,
  cmCost, massFlow, forCustody, tube,
  bestUse, coriolisMeterTypes,
} from "../coriolis-meter-calc.js";

describe("accuracy", () => {
  it("u tube most accurate", () => {
    expect(accuracy("u_tube_bent_dual")).toBeGreaterThan(accuracy("straight_tube_single"));
  });
});

describe("turndown", () => {
  it("elite best turndown", () => {
    expect(turndown("micro_motion_elite")).toBeGreaterThan(turndown("straight_tube_single"));
  });
});

describe("pressure", () => {
  it("high pressure flanged highest", () => {
    expect(pressure("high_pressure_flanged")).toBeGreaterThan(pressure("hygienic_tri_clamp"));
  });
});

describe("density", () => {
  it("u tube best density", () => {
    expect(density("u_tube_bent_dual")).toBeGreaterThan(density("straight_tube_single"));
  });
});

describe("cmCost", () => {
  it("elite most expensive", () => {
    expect(cmCost("micro_motion_elite")).toBeGreaterThan(cmCost("straight_tube_single"));
  });
});

describe("massFlow", () => {
  it("all are mass flow", () => {
    expect(massFlow("u_tube_bent_dual")).toBe(true);
  });
  it("straight tube mass flow", () => {
    expect(massFlow("straight_tube_single")).toBe(true);
  });
});

describe("forCustody", () => {
  it("u tube for custody", () => {
    expect(forCustody("u_tube_bent_dual")).toBe(true);
  });
  it("hygienic not custody", () => {
    expect(forCustody("hygienic_tri_clamp")).toBe(false);
  });
});

describe("tube", () => {
  it("hygienic uses sanitary tube", () => {
    expect(tube("hygienic_tri_clamp")).toBe("electropolished_3a_sanitary");
  });
});

describe("bestUse", () => {
  it("elite for batching", () => {
    expect(bestUse("micro_motion_elite")).toBe("batching_blending_precision");
  });
});

describe("coriolisMeterTypes", () => {
  it("returns 5 types", () => {
    expect(coriolisMeterTypes()).toHaveLength(5);
  });
});
