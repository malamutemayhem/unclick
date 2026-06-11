import { describe, it, expect } from "vitest";
import {
  confinement, loss, bandwidth, nonlinearity,
  wgCost, cmosFab, forModulator, platform,
  bestUse, waveguides,
} from "../waveguide-calc.js";

describe("confinement", () => {
  it("silicon strip best confinement", () => {
    expect(confinement("silicon_strip_soi")).toBeGreaterThan(confinement("polymer_pmma_su8"));
  });
});

describe("loss", () => {
  it("silicon nitride lowest loss", () => {
    expect(loss("silicon_nitride_sin")).toBeGreaterThan(loss("polymer_pmma_su8"));
  });
});

describe("bandwidth", () => {
  it("silicon nitride widest bandwidth", () => {
    expect(bandwidth("silicon_nitride_sin")).toBeGreaterThan(bandwidth("polymer_pmma_su8"));
  });
});

describe("nonlinearity", () => {
  it("lithium niobate highest nonlinearity", () => {
    expect(nonlinearity("lithium_niobate_lnoi")).toBeGreaterThan(nonlinearity("polymer_pmma_su8"));
  });
});

describe("wgCost", () => {
  it("indium phosphide most expensive", () => {
    expect(wgCost("indium_phosphide_inp")).toBeGreaterThan(wgCost("polymer_pmma_su8"));
  });
});

describe("cmosFab", () => {
  it("silicon strip is cmos fab", () => {
    expect(cmosFab("silicon_strip_soi")).toBe(true);
  });
  it("indium phosphide not cmos fab", () => {
    expect(cmosFab("indium_phosphide_inp")).toBe(false);
  });
});

describe("forModulator", () => {
  it("lithium niobate for modulator", () => {
    expect(forModulator("lithium_niobate_lnoi")).toBe(true);
  });
  it("polymer not for modulator", () => {
    expect(forModulator("polymer_pmma_su8")).toBe(false);
  });
});

describe("platform", () => {
  it("silicon strip uses soi 220nm strip rib", () => {
    expect(platform("silicon_strip_soi")).toBe("soi_220nm_strip_rib");
  });
});

describe("bestUse", () => {
  it("lithium niobate best for 100gbaud eo modulator", () => {
    expect(bestUse("lithium_niobate_lnoi")).toBe("100gbaud_eo_modulator_mzi");
  });
});

describe("waveguides", () => {
  it("returns 5 types", () => {
    expect(waveguides()).toHaveLength(5);
  });
});
