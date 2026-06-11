import { describe, it, expect } from "vitest";
import {
  depositionRate, throughput, filmDensity, targetUtil,
  msCost, reactive, forHardCoat, sputterConfig,
  bestUse, magnetronSputterTypes,
} from "../magnetron-sputter-calc.js";

describe("depositionRate", () => {
  it("dual magnetron best deposition rate", () => {
    expect(depositionRate("dual_magnetron")).toBeGreaterThan(depositionRate("hipims"));
  });
});

describe("throughput", () => {
  it("dual magnetron highest throughput", () => {
    expect(throughput("dual_magnetron")).toBeGreaterThan(throughput("hipims"));
  });
});

describe("filmDensity", () => {
  it("hipims best film density", () => {
    expect(filmDensity("hipims")).toBeGreaterThan(filmDensity("balanced_magnetron"));
  });
});

describe("targetUtil", () => {
  it("dual magnetron best target utilization", () => {
    expect(targetUtil("dual_magnetron")).toBeGreaterThan(targetUtil("balanced_magnetron"));
  });
});

describe("msCost", () => {
  it("hipims most expensive", () => {
    expect(msCost("hipims")).toBeGreaterThan(msCost("balanced_magnetron"));
  });
});

describe("reactive", () => {
  it("unbalanced magnetron is reactive", () => {
    expect(reactive("unbalanced_magnetron")).toBe(true);
  });
  it("balanced magnetron not reactive", () => {
    expect(reactive("balanced_magnetron")).toBe(false);
  });
});

describe("forHardCoat", () => {
  it("unbalanced magnetron for hard coat", () => {
    expect(forHardCoat("unbalanced_magnetron")).toBe(true);
  });
  it("balanced magnetron not for hard coat", () => {
    expect(forHardCoat("balanced_magnetron")).toBe(false);
  });
});

describe("sputterConfig", () => {
  it("hipims uses high power impulse ultra dense metal ion", () => {
    expect(sputterConfig("hipims")).toBe("hipims_high_power_impulse_magnetron_sputter_ultra_dense_metal_ion");
  });
});

describe("bestUse", () => {
  it("dual magnetron for reactive coat arc free oxide", () => {
    expect(bestUse("dual_magnetron")).toBe("reactive_coat_dual_magnetron_sputter_ac_pulse_arc_free_oxide");
  });
});

describe("magnetronSputterTypes", () => {
  it("returns 5 types", () => {
    expect(magnetronSputterTypes()).toHaveLength(5);
  });
});
