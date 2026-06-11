import { describe, it, expect } from "vitest";
import {
  conversionLoss, linearity, noiseFigure, isolation,
  mixerCost, requiresLo, forWideband, topology,
  bestUse, rfMixers,
} from "../rf-mixer-calc.js";

describe("conversionLoss", () => {
  it("active gilbert cell lowest conversion loss", () => {
    expect(conversionLoss("active_gilbert_cell")).toBeGreaterThan(conversionLoss("subharmonic_antipar"));
  });
});

describe("linearity", () => {
  it("passive diode ring best linearity", () => {
    expect(linearity("passive_diode_ring")).toBeGreaterThan(linearity("active_gilbert_cell"));
  });
});

describe("noiseFigure", () => {
  it("active gilbert cell best noise figure", () => {
    expect(noiseFigure("active_gilbert_cell")).toBeGreaterThan(noiseFigure("subharmonic_antipar"));
  });
});

describe("isolation", () => {
  it("image reject hartley best isolation", () => {
    expect(isolation("image_reject_hartley")).toBeGreaterThan(isolation("subharmonic_antipar"));
  });
});

describe("mixerCost", () => {
  it("subharmonic antipar most expensive", () => {
    expect(mixerCost("subharmonic_antipar")).toBeGreaterThan(mixerCost("passive_diode_ring"));
  });
});

describe("requiresLo", () => {
  it("all mixers require lo", () => {
    expect(requiresLo("passive_diode_ring")).toBe(true);
  });
});

describe("forWideband", () => {
  it("passive diode ring is for wideband", () => {
    expect(forWideband("passive_diode_ring")).toBe(true);
  });
  it("active gilbert cell not for wideband", () => {
    expect(forWideband("active_gilbert_cell")).toBe(false);
  });
});

describe("topology", () => {
  it("passive diode ring uses schottky ring double", () => {
    expect(topology("passive_diode_ring")).toBe("schottky_ring_double");
  });
});

describe("bestUse", () => {
  it("iq quadrature mix best for direct conversion sdr", () => {
    expect(bestUse("iq_quadrature_mix")).toBe("direct_conversion_sdr");
  });
});

describe("rfMixers", () => {
  it("returns 5 types", () => {
    expect(rfMixers()).toHaveLength(5);
  });
});
