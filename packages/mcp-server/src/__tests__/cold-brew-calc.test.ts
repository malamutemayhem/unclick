import { describe, it, expect } from "vitest";
import {
  smoothness, batchSize, brewSimplicity, concentrateStrength,
  setupCost, countertopDisplay, needsRefrigeration, extractionMethod,
  bestServe, coldBrews,
} from "../cold-brew-calc.js";

describe("smoothness", () => {
  it("drip tower smoothest", () => {
    expect(smoothness("drip_tower")).toBeGreaterThan(smoothness("mason_jar_diy"));
  });
});

describe("batchSize", () => {
  it("nitro keg largest batch", () => {
    expect(batchSize("nitro_keg")).toBeGreaterThan(batchSize("mason_jar_diy"));
  });
});

describe("brewSimplicity", () => {
  it("mason jar diy simplest brew", () => {
    expect(brewSimplicity("mason_jar_diy")).toBeGreaterThan(brewSimplicity("drip_tower"));
  });
});

describe("concentrateStrength", () => {
  it("immersion toddy strongest concentrate", () => {
    expect(concentrateStrength("immersion_toddy")).toBeGreaterThan(concentrateStrength("pitcher_filter"));
  });
});

describe("setupCost", () => {
  it("nitro keg most expensive setup", () => {
    expect(setupCost("nitro_keg")).toBeGreaterThan(setupCost("mason_jar_diy"));
  });
});

describe("countertopDisplay", () => {
  it("drip tower is countertop display", () => {
    expect(countertopDisplay("drip_tower")).toBe(true);
  });
  it("mason jar diy is not", () => {
    expect(countertopDisplay("mason_jar_diy")).toBe(false);
  });
});

describe("needsRefrigeration", () => {
  it("mason jar diy needs refrigeration", () => {
    expect(needsRefrigeration("mason_jar_diy")).toBe(true);
  });
  it("drip tower does not", () => {
    expect(needsRefrigeration("drip_tower")).toBe(false);
  });
});

describe("extractionMethod", () => {
  it("nitro keg uses pressurized nitrogen infuse", () => {
    expect(extractionMethod("nitro_keg")).toBe("pressurized_nitrogen_infuse");
  });
});

describe("bestServe", () => {
  it("drip tower for cafe visual slow craft", () => {
    expect(bestServe("drip_tower")).toBe("cafe_visual_slow_craft");
  });
});

describe("coldBrews", () => {
  it("returns 5 types", () => {
    expect(coldBrews()).toHaveLength(5);
  });
});
