import { describe, it, expect } from "vitest";
import {
  fineness, throughput, contaminationFree, energyUse,
  jmCost, classifierBuiltIn, forPharma, millConfig,
  bestUse, jetMillTypes,
} from "../jet-mill-calc.js";

describe("fineness", () => {
  it("opposed jet best fineness", () => {
    expect(fineness("opposed_jet")).toBeGreaterThan(fineness("loop_jet"));
  });
});

describe("throughput", () => {
  it("loop jet highest throughput", () => {
    expect(throughput("loop_jet")).toBeGreaterThan(throughput("spiral_jet"));
  });
});

describe("contaminationFree", () => {
  it("fluidized bed best contamination free", () => {
    expect(contaminationFree("fluidized_bed_jet")).toBeGreaterThan(contaminationFree("target_jet"));
  });
});

describe("energyUse", () => {
  it("opposed jet highest energy use", () => {
    expect(energyUse("opposed_jet")).toBeGreaterThan(energyUse("target_jet"));
  });
});

describe("jmCost", () => {
  it("fluidized bed most expensive", () => {
    expect(jmCost("fluidized_bed_jet")).toBeGreaterThan(jmCost("target_jet"));
  });
});

describe("classifierBuiltIn", () => {
  it("fluidized bed has classifier built in", () => {
    expect(classifierBuiltIn("fluidized_bed_jet")).toBe(true);
  });
  it("spiral jet no classifier built in", () => {
    expect(classifierBuiltIn("spiral_jet")).toBe(false);
  });
});

describe("forPharma", () => {
  it("spiral jet for pharma", () => {
    expect(forPharma("spiral_jet")).toBe(true);
  });
  it("loop jet not for pharma", () => {
    expect(forPharma("loop_jet")).toBe(false);
  });
});

describe("millConfig", () => {
  it("opposed jet uses two nozzle head on collision ultra fine shatter", () => {
    expect(millConfig("opposed_jet")).toBe("opposed_jet_mill_two_nozzle_head_on_collision_ultra_fine_shatter");
  });
});

describe("bestUse", () => {
  it("fluidized bed for pharma fine classifier precise cut point", () => {
    expect(bestUse("fluidized_bed_jet")).toBe("pharma_fine_fluidized_bed_jet_mill_classifier_precise_cut_point");
  });
});

describe("jetMillTypes", () => {
  it("returns 5 types", () => {
    expect(jetMillTypes()).toHaveLength(5);
  });
});
