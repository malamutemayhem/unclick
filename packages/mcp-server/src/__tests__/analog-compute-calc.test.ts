import { describe, it, expect } from "vitest";
import {
  speed, powerEff, accuracy, noiseTolerance,
  anaCost, digital, forSignal, domain,
  bestUse, analogComputes,
} from "../analog-compute-calc.js";

describe("speed", () => {
  it("stochastic bit stream fastest", () => {
    expect(speed("stochastic_bit_stream")).toBeGreaterThan(speed("charge_domain_ccd"));
  });
});

describe("powerEff", () => {
  it("log domain filter best power efficiency", () => {
    expect(powerEff("log_domain_filter")).toBeGreaterThan(powerEff("charge_domain_ccd"));
  });
});

describe("accuracy", () => {
  it("switched capacitor most accurate", () => {
    expect(accuracy("switched_capacitor")).toBeGreaterThan(accuracy("stochastic_bit_stream"));
  });
});

describe("noiseTolerance", () => {
  it("stochastic bit stream most noise tolerant", () => {
    expect(noiseTolerance("stochastic_bit_stream")).toBeGreaterThan(noiseTolerance("log_domain_filter"));
  });
});

describe("anaCost", () => {
  it("charge domain ccd more expensive than stochastic", () => {
    expect(anaCost("charge_domain_ccd")).toBeGreaterThan(anaCost("stochastic_bit_stream"));
  });
});

describe("digital", () => {
  it("stochastic bit stream is digital", () => {
    expect(digital("stochastic_bit_stream")).toBe(true);
  });
  it("opamp integrator not digital", () => {
    expect(digital("opamp_integrator")).toBe(false);
  });
});

describe("forSignal", () => {
  it("switched capacitor for signal", () => {
    expect(forSignal("switched_capacitor")).toBe(true);
  });
  it("stochastic bit stream not for signal", () => {
    expect(forSignal("stochastic_bit_stream")).toBe(false);
  });
});

describe("domain", () => {
  it("log domain filter uses subthreshold mos current", () => {
    expect(domain("log_domain_filter")).toBe("subthreshold_mos_current");
  });
});

describe("bestUse", () => {
  it("stochastic bit stream best for fault tolerant nn edge", () => {
    expect(bestUse("stochastic_bit_stream")).toBe("fault_tolerant_nn_edge");
  });
});

describe("analogComputes", () => {
  it("returns 5 types", () => {
    expect(analogComputes()).toHaveLength(5);
  });
});
