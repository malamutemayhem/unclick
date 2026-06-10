import { describe, it, expect } from "vitest";
import {
  measureAccuracy, reusability, pourControl, chemResist,
  cupCost, disposable, seeThrough, cupMaterial,
  bestUse, mixingCups,
} from "../mixing-cup-calc.js";

describe("measureAccuracy", () => {
  it("glass beaker lab most accurate", () => {
    expect(measureAccuracy("glass_beaker_lab")).toBeGreaterThan(measureAccuracy("paper_disposable_wax"));
  });
});

describe("reusability", () => {
  it("silicone flex reuse most reusable", () => {
    expect(reusability("silicone_flex_reuse")).toBeGreaterThan(reusability("paper_disposable_wax"));
  });
});

describe("pourControl", () => {
  it("stainless steel pour best pour control", () => {
    expect(pourControl("stainless_steel_pour")).toBeGreaterThan(pourControl("paper_disposable_wax"));
  });
});

describe("chemResist", () => {
  it("glass beaker lab best chemical resistance", () => {
    expect(chemResist("glass_beaker_lab")).toBeGreaterThan(chemResist("paper_disposable_wax"));
  });
});

describe("cupCost", () => {
  it("glass beaker lab most expensive", () => {
    expect(cupCost("glass_beaker_lab")).toBeGreaterThan(cupCost("graduated_plastic_clear"));
  });
});

describe("disposable", () => {
  it("paper disposable wax is disposable", () => {
    expect(disposable("paper_disposable_wax")).toBe(true);
  });
  it("silicone flex reuse is not disposable", () => {
    expect(disposable("silicone_flex_reuse")).toBe(false);
  });
});

describe("seeThrough", () => {
  it("graduated plastic clear is see through", () => {
    expect(seeThrough("graduated_plastic_clear")).toBe(true);
  });
  it("stainless steel pour is not see through", () => {
    expect(seeThrough("stainless_steel_pour")).toBe(false);
  });
});

describe("cupMaterial", () => {
  it("silicone flex reuse uses platinum cure silicone", () => {
    expect(cupMaterial("silicone_flex_reuse")).toBe("platinum_cure_silicone");
  });
});

describe("bestUse", () => {
  it("silicone flex reuse best for peel clean reuse", () => {
    expect(bestUse("silicone_flex_reuse")).toBe("peel_clean_reuse");
  });
});

describe("mixingCups", () => {
  it("returns 5 types", () => {
    expect(mixingCups()).toHaveLength(5);
  });
});
