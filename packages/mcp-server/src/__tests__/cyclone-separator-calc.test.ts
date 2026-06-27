import { describe, it, expect } from "vitest";
import {
  cutSize, efficiency, throughput, pressureDrop,
  cyCost, wet, forDust, vortex,
  bestUse, cycloneSeparatorTypes,
} from "../cyclone-separator-calc.js";

describe("cutSize", () => {
  it("high efficiency finest cut", () => {
    expect(cutSize("high_efficiency_long_cone")).toBeGreaterThan(cutSize("high_throughput_short_cone"));
  });
});

describe("efficiency", () => {
  it("high efficiency most efficient", () => {
    expect(efficiency("high_efficiency_long_cone")).toBeGreaterThan(efficiency("high_throughput_short_cone"));
  });
});

describe("throughput", () => {
  it("high throughput highest", () => {
    expect(throughput("high_throughput_short_cone")).toBeGreaterThan(throughput("high_efficiency_long_cone"));
  });
});

describe("pressureDrop", () => {
  it("high throughput lowest pressure drop", () => {
    expect(pressureDrop("high_throughput_short_cone")).toBeGreaterThan(pressureDrop("high_efficiency_long_cone"));
  });
});

describe("cyCost", () => {
  it("multi clone most expensive", () => {
    expect(cyCost("multi_clone_parallel_array")).toBeGreaterThan(cyCost("standard_tangential_entry"));
  });
});

describe("wet", () => {
  it("hydrocyclone is wet", () => {
    expect(wet("hydrocyclone_liquid_solid")).toBe(true);
  });
  it("standard not wet", () => {
    expect(wet("standard_tangential_entry")).toBe(false);
  });
});

describe("forDust", () => {
  it("standard for dust", () => {
    expect(forDust("standard_tangential_entry")).toBe(true);
  });
  it("hydrocyclone not for dust", () => {
    expect(forDust("hydrocyclone_liquid_solid")).toBe(false);
  });
});

describe("vortex", () => {
  it("hydrocyclone uses liquid tangential", () => {
    expect(vortex("hydrocyclone_liquid_solid")).toBe("liquid_tangential_underflow_apex");
  });
});

describe("bestUse", () => {
  it("standard for general dust", () => {
    expect(bestUse("standard_tangential_entry")).toBe("general_dust_collection_pre_filter");
  });
});

describe("cycloneSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(cycloneSeparatorTypes()).toHaveLength(5);
  });
});
