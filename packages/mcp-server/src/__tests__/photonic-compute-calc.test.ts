import { describe, it, expect } from "vitest";
import {
  throughput, latency, powerEff, scalability,
  optCost, programmable, forInference, mechanism,
  bestUse, photonicComputes,
} from "../photonic-compute-calc.js";

describe("throughput", () => {
  it("diffractive free space highest throughput", () => {
    expect(throughput("diffractive_free_space")).toBeGreaterThan(throughput("photonic_reservoir"));
  });
});

describe("latency", () => {
  it("mzi mesh linear lowest latency", () => {
    expect(latency("mzi_mesh_linear")).toBeGreaterThan(latency("photonic_reservoir"));
  });
});

describe("powerEff", () => {
  it("diffractive free space best power efficiency", () => {
    expect(powerEff("diffractive_free_space")).toBeGreaterThan(powerEff("electro_optic_hybrid"));
  });
});

describe("scalability", () => {
  it("electro optic hybrid most scalable", () => {
    expect(scalability("electro_optic_hybrid")).toBeGreaterThan(scalability("diffractive_free_space"));
  });
});

describe("optCost", () => {
  it("electro optic hybrid most expensive", () => {
    expect(optCost("electro_optic_hybrid")).toBeGreaterThan(optCost("diffractive_free_space"));
  });
});

describe("programmable", () => {
  it("mzi mesh linear is programmable", () => {
    expect(programmable("mzi_mesh_linear")).toBe(true);
  });
  it("diffractive free space not programmable", () => {
    expect(programmable("diffractive_free_space")).toBe(false);
  });
});

describe("forInference", () => {
  it("microring weight bank for inference", () => {
    expect(forInference("microring_weight_bank")).toBe(true);
  });
  it("photonic reservoir not for inference", () => {
    expect(forInference("photonic_reservoir")).toBe(false);
  });
});

describe("mechanism", () => {
  it("diffractive free space uses fourier lens cascade", () => {
    expect(mechanism("diffractive_free_space")).toBe("fourier_lens_cascade");
  });
});

describe("bestUse", () => {
  it("electro optic hybrid best for datacenter ai accelerator", () => {
    expect(bestUse("electro_optic_hybrid")).toBe("datacenter_ai_accelerator");
  });
});

describe("photonicComputes", () => {
  it("returns 5 types", () => {
    expect(photonicComputes()).toHaveLength(5);
  });
});
