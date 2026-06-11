import { describe, it, expect } from "vitest";
import {
  switchFreq, efficiency, thermalPerf, costPerAmp,
  reliability, normallyOff, forServer, substrate,
  bestUse, ganPowers,
} from "../gan-power-calc.js";

describe("switchFreq", () => {
  it("gan on si 200v highest switch freq", () => {
    expect(switchFreq("gan_on_si_200v")).toBeGreaterThan(switchFreq("dmode_cascode"));
  });
});

describe("efficiency", () => {
  it("gan on sic sub best efficiency", () => {
    expect(efficiency("gan_on_sic_sub")).toBeGreaterThan(efficiency("gan_ic_driver"));
  });
});

describe("thermalPerf", () => {
  it("gan on sic sub best thermal performance", () => {
    expect(thermalPerf("gan_on_sic_sub")).toBeGreaterThan(thermalPerf("dmode_cascode"));
  });
});

describe("costPerAmp", () => {
  it("gan on sic sub most expensive per amp", () => {
    expect(costPerAmp("gan_on_sic_sub")).toBeGreaterThan(costPerAmp("gan_ic_driver"));
  });
});

describe("reliability", () => {
  it("gan on sic sub most reliable", () => {
    expect(reliability("gan_on_sic_sub")).toBeGreaterThan(reliability("gan_on_si_200v"));
  });
});

describe("normallyOff", () => {
  it("emode 650v is normally off", () => {
    expect(normallyOff("emode_650v")).toBe(true);
  });
});

describe("forServer", () => {
  it("emode 650v is for server", () => {
    expect(forServer("emode_650v")).toBe(true);
  });
  it("gan on si 200v not for server", () => {
    expect(forServer("gan_on_si_200v")).toBe(false);
  });
});

describe("substrate", () => {
  it("gan on sic sub uses gan on sic premium", () => {
    expect(substrate("gan_on_sic_sub")).toBe("gan_on_sic_premium");
  });
});

describe("bestUse", () => {
  it("emode 650v best for totem pole pfc", () => {
    expect(bestUse("emode_650v")).toBe("totem_pole_pfc");
  });
});

describe("ganPowers", () => {
  it("returns 5 types", () => {
    expect(ganPowers()).toHaveLength(5);
  });
});
