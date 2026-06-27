import { describe, it, expect } from "vitest";
import {
  betaShape, predictability, screenEff, dataReq,
  wpCost, increasing, forWarranty, distribution,
  bestUse, weibullParams,
} from "../weibull-param-calc.js";

describe("betaShape", () => {
  it("normal wearout steep highest beta shape", () => {
    expect(betaShape("normal_wearout_steep")).toBeGreaterThan(betaShape("infant_mortality_dec"));
  });
});

describe("predictability", () => {
  it("normal wearout steep most predictable", () => {
    expect(predictability("normal_wearout_steep")).toBeGreaterThan(predictability("mixed_competing_modes"));
  });
});

describe("screenEff", () => {
  it("infant mortality dec most screen effective", () => {
    expect(screenEff("infant_mortality_dec")).toBeGreaterThan(screenEff("random_constant_rate"));
  });
});

describe("dataReq", () => {
  it("mixed competing modes highest data requirement", () => {
    expect(dataReq("mixed_competing_modes")).toBeGreaterThan(dataReq("random_constant_rate"));
  });
});

describe("wpCost", () => {
  it("mixed competing modes most expensive", () => {
    expect(wpCost("mixed_competing_modes")).toBeGreaterThan(wpCost("random_constant_rate"));
  });
});

describe("increasing", () => {
  it("early wearout inc is increasing", () => {
    expect(increasing("early_wearout_inc")).toBe(true);
  });
  it("infant mortality dec not increasing", () => {
    expect(increasing("infant_mortality_dec")).toBe(false);
  });
});

describe("forWarranty", () => {
  it("infant mortality dec for warranty", () => {
    expect(forWarranty("infant_mortality_dec")).toBe(true);
  });
  it("random constant rate not for warranty", () => {
    expect(forWarranty("random_constant_rate")).toBe(false);
  });
});

describe("distribution", () => {
  it("mixed competing modes uses bimodal mixture fit", () => {
    expect(distribution("mixed_competing_modes")).toBe("bimodal_mixture_fit");
  });
});

describe("bestUse", () => {
  it("normal wearout steep best for preventive maint schedule", () => {
    expect(bestUse("normal_wearout_steep")).toBe("preventive_maint_schedule");
  });
});

describe("weibullParams", () => {
  it("returns 5 types", () => {
    expect(weibullParams()).toHaveLength(5);
  });
});
