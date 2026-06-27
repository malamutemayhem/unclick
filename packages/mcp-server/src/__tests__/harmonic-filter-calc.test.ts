import { describe, it, expect } from "vitest";
import {
  thd_reduction, throughput, responseSpeed, powerFactor,
  hfCost, adaptive, forVfd, filterConfig,
  bestUse, harmonicFilterTypes,
} from "../harmonic-filter-calc.js";

describe("thd_reduction", () => {
  it("active harmonic best thd reduction", () => {
    expect(thd_reduction("active_harmonic")).toBeGreaterThan(thd_reduction("line_reactor"));
  });
});

describe("throughput", () => {
  it("broadband passive highest throughput", () => {
    expect(throughput("broadband_passive")).toBeGreaterThan(throughput("active_harmonic"));
  });
});

describe("responseSpeed", () => {
  it("active harmonic best response speed", () => {
    expect(responseSpeed("active_harmonic")).toBeGreaterThan(responseSpeed("passive_tuned"));
  });
});

describe("powerFactor", () => {
  it("active harmonic best power factor", () => {
    expect(powerFactor("active_harmonic")).toBeGreaterThan(powerFactor("line_reactor"));
  });
});

describe("hfCost", () => {
  it("active harmonic most expensive", () => {
    expect(hfCost("active_harmonic")).toBeGreaterThan(hfCost("line_reactor"));
  });
});

describe("adaptive", () => {
  it("active harmonic is adaptive", () => {
    expect(adaptive("active_harmonic")).toBe(true);
  });
  it("passive tuned not adaptive", () => {
    expect(adaptive("passive_tuned")).toBe(false);
  });
});

describe("forVfd", () => {
  it("passive tuned for vfd", () => {
    expect(forVfd("passive_tuned")).toBe(true);
  });
  it("all types for vfd", () => {
    expect(forVfd("line_reactor")).toBe(true);
  });
});

describe("filterConfig", () => {
  it("hybrid uses passive base active trim cost effective", () => {
    expect(filterConfig("hybrid_harmonic")).toBe("hybrid_harmonic_filter_passive_base_active_trim_cost_effective");
  });
});

describe("bestUse", () => {
  it("active harmonic for data center real time cancel all harmonics", () => {
    expect(bestUse("active_harmonic")).toBe("data_center_active_harmonic_filter_real_time_cancel_all_harmonics");
  });
});

describe("harmonicFilterTypes", () => {
  it("returns 5 types", () => {
    expect(harmonicFilterTypes()).toHaveLength(5);
  });
});
