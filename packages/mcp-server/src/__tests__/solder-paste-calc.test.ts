import { describe, it, expect } from "vitest";
import {
  flowability, jointStrength, shelfLife, cleanEase,
  pasteCost, leadFree, noClean, fluxType,
  bestUse, solderPastes,
} from "../solder-paste-calc.js";

describe("flowability", () => {
  it("leaded sn63 standard best flowability", () => {
    expect(flowability("leaded_sn63_standard")).toBeGreaterThan(flowability("lead_free_sac305"));
  });
});

describe("jointStrength", () => {
  it("lead free sac305 strongest joint", () => {
    expect(jointStrength("lead_free_sac305")).toBeGreaterThan(jointStrength("low_temp_bismuth"));
  });
});

describe("shelfLife", () => {
  it("no clean flux paste longest shelf life", () => {
    expect(shelfLife("no_clean_flux_paste")).toBeGreaterThan(shelfLife("low_temp_bismuth"));
  });
});

describe("cleanEase", () => {
  it("no clean flux paste easiest clean", () => {
    expect(cleanEase("no_clean_flux_paste")).toBeGreaterThan(cleanEase("leaded_sn63_standard"));
  });
});

describe("pasteCost", () => {
  it("low temp bismuth most expensive", () => {
    expect(pasteCost("low_temp_bismuth")).toBeGreaterThan(pasteCost("leaded_sn63_standard"));
  });
});

describe("leadFree", () => {
  it("lead free sac305 is lead free", () => {
    expect(leadFree("lead_free_sac305")).toBe(true);
  });
  it("leaded sn63 standard not lead free", () => {
    expect(leadFree("leaded_sn63_standard")).toBe(false);
  });
});

describe("noClean", () => {
  it("no clean flux paste is no clean", () => {
    expect(noClean("no_clean_flux_paste")).toBe(true);
  });
  it("leaded sn63 standard not no clean", () => {
    expect(noClean("leaded_sn63_standard")).toBe(false);
  });
});

describe("fluxType", () => {
  it("water soluble clean uses water soluble organic", () => {
    expect(fluxType("water_soluble_clean")).toBe("water_soluble_organic");
  });
});

describe("bestUse", () => {
  it("no clean flux paste best for skip wash assembly", () => {
    expect(bestUse("no_clean_flux_paste")).toBe("skip_wash_assembly");
  });
});

describe("solderPastes", () => {
  it("returns 5 types", () => {
    expect(solderPastes()).toHaveLength(5);
  });
});
