import { describe, it, expect } from "vitest";
import {
  bandwidth, insertionLoss, footprint, powerDraw,
  siPhCost, tunable, forDatacenter, mechanism,
  bestUse, siliconPhotonics,
} from "../silicon-photonic-calc.js";

describe("bandwidth", () => {
  it("mzi switch widest bandwidth", () => {
    expect(bandwidth("mzi_switch")).toBeGreaterThan(bandwidth("grating_coupler"));
  });
});

describe("insertionLoss", () => {
  it("edge coupler lowest insertion loss", () => {
    expect(insertionLoss("edge_coupler")).toBeGreaterThan(insertionLoss("grating_coupler"));
  });
});

describe("footprint", () => {
  it("ring modulator smallest footprint", () => {
    expect(footprint("ring_modulator")).toBeGreaterThan(footprint("awg_demux"));
  });
});

describe("powerDraw", () => {
  it("grating coupler lowest power draw", () => {
    expect(powerDraw("grating_coupler")).toBeGreaterThan(powerDraw("mzi_switch"));
  });
});

describe("siPhCost", () => {
  it("awg demux most expensive", () => {
    expect(siPhCost("awg_demux")).toBeGreaterThan(siPhCost("grating_coupler"));
  });
});

describe("tunable", () => {
  it("ring modulator is tunable", () => {
    expect(tunable("ring_modulator")).toBe(true);
  });
  it("grating coupler not tunable", () => {
    expect(tunable("grating_coupler")).toBe(false);
  });
});

describe("forDatacenter", () => {
  it("ring modulator is for datacenter", () => {
    expect(forDatacenter("ring_modulator")).toBe(true);
  });
  it("awg demux not for datacenter", () => {
    expect(forDatacenter("awg_demux")).toBe(false);
  });
});

describe("mechanism", () => {
  it("ring modulator uses carrier depletion ring", () => {
    expect(mechanism("ring_modulator")).toBe("carrier_depletion_ring");
  });
});

describe("bestUse", () => {
  it("edge coupler best for low loss fiber attach", () => {
    expect(bestUse("edge_coupler")).toBe("low_loss_fiber_attach");
  });
});

describe("siliconPhotonics", () => {
  it("returns 5 types", () => {
    expect(siliconPhotonics()).toHaveLength(5);
  });
});
