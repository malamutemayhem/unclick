import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, energyPerBit, density,
  interconCost, openStandard, forHpc, packaging,
  bestUse, chipletIntercons,
} from "../chiplet-intercon-calc.js";

describe("bandwidth", () => {
  it("bunch of wires highest bandwidth", () => {
    expect(bandwidth("bunch_of_wires")).toBeGreaterThan(bandwidth("emib_bridge"));
  });
});

describe("latency", () => {
  it("bunch of wires lowest latency", () => {
    expect(latency("bunch_of_wires")).toBeGreaterThan(latency("emib_bridge"));
  });
});

describe("energyPerBit", () => {
  it("bunch of wires best energy per bit", () => {
    expect(energyPerBit("bunch_of_wires")).toBeGreaterThan(energyPerBit("emib_bridge"));
  });
});

describe("density", () => {
  it("bunch of wires highest density", () => {
    expect(density("bunch_of_wires")).toBeGreaterThan(density("emib_bridge"));
  });
});

describe("interconCost", () => {
  it("bunch of wires most expensive", () => {
    expect(interconCost("bunch_of_wires")).toBeGreaterThan(interconCost("emib_bridge"));
  });
});

describe("openStandard", () => {
  it("ucie standard is open standard", () => {
    expect(openStandard("ucie_standard")).toBe(true);
  });
  it("bunch of wires not open standard", () => {
    expect(openStandard("bunch_of_wires")).toBe(false);
  });
});

describe("forHpc", () => {
  it("bunch of wires is for hpc", () => {
    expect(forHpc("bunch_of_wires")).toBe(true);
  });
  it("emib bridge not for hpc", () => {
    expect(forHpc("emib_bridge")).toBe(false);
  });
});

describe("packaging", () => {
  it("bunch of wires uses tsmc cowos s", () => {
    expect(packaging("bunch_of_wires")).toBe("tsmc_cowos_s");
  });
});

describe("bestUse", () => {
  it("ucie standard best for multi vendor chiplet", () => {
    expect(bestUse("ucie_standard")).toBe("multi_vendor_chiplet");
  });
});

describe("chipletIntercons", () => {
  it("returns 5 types", () => {
    expect(chipletIntercons()).toHaveLength(5);
  });
});
