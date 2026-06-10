import { describe, it, expect } from "vitest";
import {
  impactProtection, weightScore, ventilationFlow, warmthInsulation,
  helmetCost, mipsEquipped, audioCompatible, shellDesign,
  bestRider, snowHelmets,
} from "../snow-helmet-calc.js";

describe("impactProtection", () => {
  it("full face freeride best protection", () => {
    expect(impactProtection("full_face_freeride")).toBeGreaterThan(impactProtection("in_mold_lightweight"));
  });
});

describe("weightScore", () => {
  it("full face freeride heaviest", () => {
    expect(weightScore("full_face_freeride")).toBeGreaterThan(weightScore("in_mold_lightweight"));
  });
});

describe("ventilationFlow", () => {
  it("in mold lightweight best ventilation", () => {
    expect(ventilationFlow("in_mold_lightweight")).toBeGreaterThan(ventilationFlow("full_face_freeride"));
  });
});

describe("warmthInsulation", () => {
  it("full face freeride warmest", () => {
    expect(warmthInsulation("full_face_freeride")).toBeGreaterThan(warmthInsulation("in_mold_lightweight"));
  });
});

describe("helmetCost", () => {
  it("visor integrated most expensive", () => {
    expect(helmetCost("visor_integrated")).toBeGreaterThan(helmetCost("hard_shell_abs"));
  });
});

describe("mipsEquipped", () => {
  it("hybrid construction has mips", () => {
    expect(mipsEquipped("hybrid_construction")).toBe(true);
  });
  it("hard shell abs does not", () => {
    expect(mipsEquipped("hard_shell_abs")).toBe(false);
  });
});

describe("audioCompatible", () => {
  it("visor integrated is audio compatible", () => {
    expect(audioCompatible("visor_integrated")).toBe(true);
  });
  it("full face freeride is not", () => {
    expect(audioCompatible("full_face_freeride")).toBe(false);
  });
});

describe("shellDesign", () => {
  it("full face freeride uses carbon reinforced chin bar", () => {
    expect(shellDesign("full_face_freeride")).toBe("carbon_reinforced_chin_bar");
  });
});

describe("bestRider", () => {
  it("hard shell abs for rental budget durable", () => {
    expect(bestRider("hard_shell_abs")).toBe("rental_budget_durable");
  });
});

describe("snowHelmets", () => {
  it("returns 5 types", () => {
    expect(snowHelmets()).toHaveLength(5);
  });
});
