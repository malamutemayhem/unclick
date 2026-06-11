import { describe, it, expect } from "vitest";
import {
  treatmentEff, flowRate, compliance, footprint,
  blCost, chemical, forRetrofit, method,
  bestUse, ballastSystemTypes,
} from "../ballast-system-calc.js";

describe("treatmentEff", () => {
  it("filtration uv combo best treatment", () => {
    expect(treatmentEff("filtration_uv_combo")).toBeGreaterThan(treatmentEff("gravity_sea_chest"));
  });
});

describe("flowRate", () => {
  it("gravity sea chest highest flow", () => {
    expect(flowRate("gravity_sea_chest")).toBeGreaterThan(flowRate("filtration_uv_combo"));
  });
});

describe("compliance", () => {
  it("filtration uv combo best compliance", () => {
    expect(compliance("filtration_uv_combo")).toBeGreaterThan(compliance("gravity_sea_chest"));
  });
});

describe("footprint", () => {
  it("ballast exchange smallest footprint", () => {
    expect(footprint("ballast_water_exchange")).toBeGreaterThan(footprint("filtration_uv_combo"));
  });
});

describe("blCost", () => {
  it("filtration uv combo most expensive", () => {
    expect(blCost("filtration_uv_combo")).toBeGreaterThan(blCost("gravity_sea_chest"));
  });
});

describe("chemical", () => {
  it("electrochlorination uses chemicals", () => {
    expect(chemical("electrochlorination")).toBe(true);
  });
  it("uv treatment no chemicals", () => {
    expect(chemical("uv_treatment_inline")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("uv treatment for retrofit", () => {
    expect(forRetrofit("uv_treatment_inline")).toBe(true);
  });
  it("gravity sea chest not for retrofit", () => {
    expect(forRetrofit("gravity_sea_chest")).toBe(false);
  });
});

describe("method", () => {
  it("electrochlorination uses seawater electrolysis", () => {
    expect(method("electrochlorination")).toBe("seawater_electrolysis_naclo");
  });
});

describe("bestUse", () => {
  it("gravity sea chest best for legacy vessel", () => {
    expect(bestUse("gravity_sea_chest")).toBe("legacy_vessel_no_treatment");
  });
});

describe("ballastSystemTypes", () => {
  it("returns 5 types", () => {
    expect(ballastSystemTypes()).toHaveLength(5);
  });
});
