import { describe, it, expect } from "vitest";
import {
  impactForce, throughput, controlPrecision, vibrationDamp,
  phCost, lowVibration, forFinish, hammerConfig,
  bestUse, pneumaticHammerTypes,
} from "../pneumatic-hammer-calc.js";

describe("impactForce", () => {
  it("chipping hammer highest impact force", () => {
    expect(impactForce("chipping_hammer")).toBeGreaterThan(impactForce("planishing_hammer"));
  });
});

describe("throughput", () => {
  it("riveting hammer highest throughput", () => {
    expect(throughput("riveting_hammer")).toBeGreaterThan(throughput("planishing_hammer"));
  });
});

describe("controlPrecision", () => {
  it("planishing hammer best control precision", () => {
    expect(controlPrecision("planishing_hammer")).toBeGreaterThan(controlPrecision("chipping_hammer"));
  });
});

describe("vibrationDamp", () => {
  it("planishing hammer best vibration damp", () => {
    expect(vibrationDamp("planishing_hammer")).toBeGreaterThan(vibrationDamp("chipping_hammer"));
  });
});

describe("phCost", () => {
  it("planishing hammer most expensive", () => {
    expect(phCost("planishing_hammer")).toBeGreaterThan(phCost("chipping_hammer"));
  });
});

describe("lowVibration", () => {
  it("needle scaler is low vibration", () => {
    expect(lowVibration("needle_scaler")).toBe(true);
  });
  it("chipping hammer not low vibration", () => {
    expect(lowVibration("chipping_hammer")).toBe(false);
  });
});

describe("forFinish", () => {
  it("planishing hammer for finish", () => {
    expect(forFinish("planishing_hammer")).toBe(true);
  });
  it("riveting hammer not for finish", () => {
    expect(forFinish("riveting_hammer")).toBe(false);
  });
});

describe("hammerConfig", () => {
  it("needle scaler uses bundle rod vibrate clean weld", () => {
    expect(hammerConfig("needle_scaler")).toBe("needle_scaler_pneumatic_hammer_bundle_rod_vibrate_clean_weld");
  });
});

describe("bestUse", () => {
  it("planishing hammer for auto body smooth panel shape finish", () => {
    expect(bestUse("planishing_hammer")).toBe("auto_body_planishing_pneumatic_hammer_smooth_panel_shape_finish");
  });
});

describe("pneumaticHammerTypes", () => {
  it("returns 5 types", () => {
    expect(pneumaticHammerTypes()).toHaveLength(5);
  });
});
