import { describe, it, expect } from "vitest";
import {
  density, signalIntegrity, thermal, flexibility,
  layerCost, blindVia, forRf, stackup,
  bestUse, pcbLayers,
} from "../pcb-layer-calc.js";

describe("density", () => {
  it("ten plus layer hpc highest density", () => {
    expect(density("ten_plus_layer_hpc")).toBeGreaterThan(density("single_sided_1l"));
  });
});

describe("signalIntegrity", () => {
  it("ten plus layer hpc best signal integrity", () => {
    expect(signalIntegrity("ten_plus_layer_hpc")).toBeGreaterThan(signalIntegrity("double_sided_2l"));
  });
});

describe("thermal", () => {
  it("ten plus layer hpc best thermal", () => {
    expect(thermal("ten_plus_layer_hpc")).toBeGreaterThan(thermal("single_sided_1l"));
  });
});

describe("flexibility", () => {
  it("single sided 1l most flexible", () => {
    expect(flexibility("single_sided_1l")).toBeGreaterThan(flexibility("ten_plus_layer_hpc"));
  });
});

describe("layerCost", () => {
  it("ten plus layer hpc most expensive", () => {
    expect(layerCost("ten_plus_layer_hpc")).toBeGreaterThan(layerCost("single_sided_1l"));
  });
});

describe("blindVia", () => {
  it("six layer hdi has blind via", () => {
    expect(blindVia("six_layer_hdi")).toBe(true);
  });
  it("four layer standard no blind via", () => {
    expect(blindVia("four_layer_standard")).toBe(false);
  });
});

describe("forRf", () => {
  it("four layer standard for rf", () => {
    expect(forRf("four_layer_standard")).toBe(true);
  });
  it("single sided 1l not for rf", () => {
    expect(forRf("single_sided_1l")).toBe(false);
  });
});

describe("stackup", () => {
  it("four layer standard uses sig gnd pwr sig", () => {
    expect(stackup("four_layer_standard")).toBe("sig_gnd_pwr_sig");
  });
});

describe("bestUse", () => {
  it("six layer hdi best for smartphone module compact", () => {
    expect(bestUse("six_layer_hdi")).toBe("smartphone_module_compact");
  });
});

describe("pcbLayers", () => {
  it("returns 5 types", () => {
    expect(pcbLayers()).toHaveLength(5);
  });
});
