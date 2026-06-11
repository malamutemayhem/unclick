import { describe, it, expect } from "vitest";
import {
  bandwidth, reach, powerEff, density,
  ucieCost, dieToDie, forHpc, interconnect,
  bestUse, ucieChiplets,
} from "../ucie-chiplet-calc.js";

describe("bandwidth", () => {
  it("ucie advanced micro highest bandwidth", () => {
    expect(bandwidth("ucie_advanced_micro")).toBeGreaterThan(bandwidth("ucie_standard_bump"));
  });
});

describe("reach", () => {
  it("ucie retimer longest reach", () => {
    expect(reach("ucie_retimer")).toBeGreaterThan(reach("ucie_advanced_micro"));
  });
});

describe("powerEff", () => {
  it("ucie advanced micro best power efficiency", () => {
    expect(powerEff("ucie_advanced_micro")).toBeGreaterThan(powerEff("ucie_retimer"));
  });
});

describe("density", () => {
  it("ucie advanced micro highest density", () => {
    expect(density("ucie_advanced_micro")).toBeGreaterThan(density("ucie_standard_bump"));
  });
});

describe("ucieCost", () => {
  it("ucie advanced micro most expensive", () => {
    expect(ucieCost("ucie_advanced_micro")).toBeGreaterThan(ucieCost("ucie_standard_bump"));
  });
});

describe("dieToDie", () => {
  it("ucie standard bump is die to die", () => {
    expect(dieToDie("ucie_standard_bump")).toBe(true);
  });
  it("ucie retimer not die to die", () => {
    expect(dieToDie("ucie_retimer")).toBe(false);
  });
});

describe("forHpc", () => {
  it("ucie advanced micro is for hpc", () => {
    expect(forHpc("ucie_advanced_micro")).toBe(true);
  });
});

describe("interconnect", () => {
  it("emib embedded uses embedded multi die bridge", () => {
    expect(interconnect("emib_embedded")).toBe("embedded_multi_die_bridge");
  });
});

describe("bestUse", () => {
  it("bowtie bridge best for amd infinity fabric", () => {
    expect(bestUse("bowtie_bridge")).toBe("amd_infinity_fabric");
  });
});

describe("ucieChiplets", () => {
  it("returns 5 types", () => {
    expect(ucieChiplets()).toHaveLength(5);
  });
});
