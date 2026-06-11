import { describe, it, expect } from "vitest";
import {
  webUniformity, productionRate, fiberOpening, nepsRemoval,
  cmCost, autoLeveling, forShortStaple, wireConfig,
  bestUse, cardingMachineTypes,
} from "../carding-machine-calc.js";

describe("webUniformity", () => {
  it("random card crosslapper best web uniformity", () => {
    expect(webUniformity("random_card_crosslapper")).toBeGreaterThan(webUniformity("woolen_card_condenser"));
  });
});

describe("productionRate", () => {
  it("cotton card chute highest production rate", () => {
    expect(productionRate("cotton_card_chute")).toBeGreaterThan(productionRate("roller_card"));
  });
});

describe("fiberOpening", () => {
  it("cotton card chute best fiber opening", () => {
    expect(fiberOpening("cotton_card_chute")).toBeGreaterThan(fiberOpening("woolen_card_condenser"));
  });
});

describe("nepsRemoval", () => {
  it("cotton card chute best neps removal", () => {
    expect(nepsRemoval("cotton_card_chute")).toBeGreaterThan(nepsRemoval("woolen_card_condenser"));
  });
});

describe("cmCost", () => {
  it("cotton card chute most expensive", () => {
    expect(cmCost("cotton_card_chute")).toBeGreaterThan(cmCost("roller_card"));
  });
});

describe("autoLeveling", () => {
  it("flat top revolving has auto leveling", () => {
    expect(autoLeveling("flat_top_revolving")).toBe(true);
  });
  it("roller card no auto leveling", () => {
    expect(autoLeveling("roller_card")).toBe(false);
  });
});

describe("forShortStaple", () => {
  it("flat top revolving for short staple", () => {
    expect(forShortStaple("flat_top_revolving")).toBe(true);
  });
  it("roller card not for short staple", () => {
    expect(forShortStaple("roller_card")).toBe(false);
  });
});

describe("wireConfig", () => {
  it("woolen card condenser uses condenser tape divider", () => {
    expect(wireConfig("woolen_card_condenser")).toBe("condenser_tape_divider_split_web_into_roving_strip_woolen");
  });
});

describe("bestUse", () => {
  it("random card crosslapper for nonwoven geotextile", () => {
    expect(bestUse("random_card_crosslapper")).toBe("nonwoven_geotextile_automotive_insulation_crosslap_web_batt");
  });
});

describe("cardingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(cardingMachineTypes()).toHaveLength(5);
  });
});
