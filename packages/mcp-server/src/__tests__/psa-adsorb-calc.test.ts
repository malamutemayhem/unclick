import { describe, it, expect } from "vitest";
import {
  purity, recovery, throughput, energyUse,
  paCost, continuous, forHighPurity, adsorbent,
  bestUse, psaAdsorbTypes,
} from "../psa-adsorb-calc.js";

describe("purity", () => {
  it("psa hydrogen highest purity", () => {
    expect(purity("psa_hydrogen_purify")).toBeGreaterThan(purity("vpsa_oxygen_generate"));
  });
});

describe("recovery", () => {
  it("tsa moisture best recovery", () => {
    expect(recovery("tsa_moisture_remove")).toBeGreaterThan(recovery("rapid_psa_medical"));
  });
});

describe("throughput", () => {
  it("vpsa oxygen highest throughput", () => {
    expect(throughput("vpsa_oxygen_generate")).toBeGreaterThan(throughput("rapid_psa_medical"));
  });
});

describe("energyUse", () => {
  it("rapid psa highest energy use", () => {
    expect(energyUse("rapid_psa_medical")).toBeGreaterThan(energyUse("tsa_moisture_remove"));
  });
});

describe("paCost", () => {
  it("rapid psa most expensive", () => {
    expect(paCost("rapid_psa_medical")).toBeGreaterThan(paCost("psa_nitrogen_generate"));
  });
});

describe("continuous", () => {
  it("all psa types are continuous", () => {
    expect(continuous("psa_hydrogen_purify")).toBe(true);
    expect(continuous("tsa_moisture_remove")).toBe(true);
  });
});

describe("forHighPurity", () => {
  it("psa hydrogen for high purity", () => {
    expect(forHighPurity("psa_hydrogen_purify")).toBe(true);
  });
  it("vpsa oxygen not for high purity", () => {
    expect(forHighPurity("vpsa_oxygen_generate")).toBe(false);
  });
});

describe("adsorbent", () => {
  it("psa nitrogen uses carbon molecular sieve", () => {
    expect(adsorbent("psa_nitrogen_generate")).toBe("carbon_molecular_sieve_kinetic_select");
  });
});

describe("bestUse", () => {
  it("rapid psa for hospital oxygen", () => {
    expect(bestUse("rapid_psa_medical")).toBe("hospital_oxygen_concentrate_portable");
  });
});

describe("psaAdsorbTypes", () => {
  it("returns 5 types", () => {
    expect(psaAdsorbTypes()).toHaveLength(5);
  });
});
