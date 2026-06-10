import { describe, it, expect } from "vitest";
import {
  loudness, reliability, wetPerformance, compactness,
  whistleCost, needsBattery, floats, soundMethod,
  bestUse, safetyWhistles,
} from "../safety-whistle-calc.js";

describe("loudness", () => {
  it("dual tone storm loudest", () => {
    expect(loudness("dual_tone_storm")).toBeGreaterThan(loudness("flat_survival_card"));
  });
});

describe("reliability", () => {
  it("pealess plastic most reliable", () => {
    expect(reliability("pealess_plastic")).toBeGreaterThan(reliability("electronic_alarm"));
  });
});

describe("wetPerformance", () => {
  it("pealess plastic best wet performance", () => {
    expect(wetPerformance("pealess_plastic")).toBeGreaterThan(wetPerformance("electronic_alarm"));
  });
});

describe("compactness", () => {
  it("flat survival card most compact", () => {
    expect(compactness("flat_survival_card")).toBeGreaterThan(compactness("electronic_alarm"));
  });
});

describe("whistleCost", () => {
  it("electronic alarm most expensive", () => {
    expect(whistleCost("electronic_alarm")).toBeGreaterThan(whistleCost("pealess_plastic"));
  });
});

describe("needsBattery", () => {
  it("electronic alarm needs battery", () => {
    expect(needsBattery("electronic_alarm")).toBe(true);
  });
  it("pealess plastic does not", () => {
    expect(needsBattery("pealess_plastic")).toBe(false);
  });
});

describe("floats", () => {
  it("pealess plastic floats", () => {
    expect(floats("pealess_plastic")).toBe(true);
  });
  it("metal cork ball does not", () => {
    expect(floats("metal_cork_ball")).toBe(false);
  });
});

describe("soundMethod", () => {
  it("dual tone storm uses dual frequency resonator", () => {
    expect(soundMethod("dual_tone_storm")).toBe("dual_frequency_resonator");
  });
});

describe("bestUse", () => {
  it("flat survival card best for wallet edc emergency", () => {
    expect(bestUse("flat_survival_card")).toBe("wallet_edc_emergency");
  });
});

describe("safetyWhistles", () => {
  it("returns 5 types", () => {
    expect(safetyWhistles()).toHaveLength(5);
  });
});
