import { describe, it, expect } from "vitest";
import {
  effluentQuality, flux, foulingResist, energyUse,
  mbCost, anaerobic, forReuse, membrane,
  bestUse, membraneBioreactorTypes,
} from "../membrane-bioreactor-calc.js";

describe("effluentQuality", () => {
  it("sidestream tubular best effluent quality", () => {
    expect(effluentQuality("sidestream_tubular")).toBeGreaterThan(effluentQuality("anaerobic_mbr"));
  });
});

describe("flux", () => {
  it("sidestream tubular highest flux", () => {
    expect(flux("sidestream_tubular")).toBeGreaterThan(flux("anaerobic_mbr"));
  });
});

describe("foulingResist", () => {
  it("sidestream tubular best fouling resistance", () => {
    expect(foulingResist("sidestream_tubular")).toBeGreaterThan(foulingResist("anaerobic_mbr"));
  });
});

describe("energyUse", () => {
  it("anaerobic mbr lowest energy use", () => {
    expect(energyUse("anaerobic_mbr")).toBeGreaterThan(energyUse("sidestream_tubular"));
  });
});

describe("mbCost", () => {
  it("sidestream tubular most expensive", () => {
    expect(mbCost("sidestream_tubular")).toBeGreaterThan(mbCost("submerged_hollow_fiber"));
  });
});

describe("anaerobic", () => {
  it("anaerobic mbr is anaerobic", () => {
    expect(anaerobic("anaerobic_mbr")).toBe(true);
  });
  it("submerged hollow fiber not anaerobic", () => {
    expect(anaerobic("submerged_hollow_fiber")).toBe(false);
  });
});

describe("forReuse", () => {
  it("submerged hollow fiber for reuse", () => {
    expect(forReuse("submerged_hollow_fiber")).toBe(true);
  });
  it("anaerobic mbr not for reuse", () => {
    expect(forReuse("anaerobic_mbr")).toBe(false);
  });
});

describe("membrane", () => {
  it("hybrid mbbr uses biofilm carrier plus uf", () => {
    expect(membrane("hybrid_mbbr_mbr")).toBe("mbbr_biofilm_carrier_plus_uf_membrane_hybrid");
  });
});

describe("bestUse", () => {
  it("anaerobic mbr for biogas recovery", () => {
    expect(bestUse("anaerobic_mbr")).toBe("high_cod_wastewater_biogas_recovery_brewery");
  });
});

describe("membraneBioreactorTypes", () => {
  it("returns 5 types", () => {
    expect(membraneBioreactorTypes()).toHaveLength(5);
  });
});
