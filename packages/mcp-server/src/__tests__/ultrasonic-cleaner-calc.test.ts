import { describe, it, expect } from "vitest";
import {
  particleRemoval, throughput, surfaceSafety, chemicalCompat,
  ucCost, gentle, forPrecision, cleanerConfig,
  bestUse, ultrasonicCleanerTypes,
} from "../ultrasonic-cleaner-calc.js";

describe("particleRemoval", () => {
  it("megasonic clean best particle removal", () => {
    expect(particleRemoval("megasonic_clean")).toBeGreaterThan(particleRemoval("spray_rinse"));
  });
});

describe("throughput", () => {
  it("spray rinse highest throughput", () => {
    expect(throughput("spray_rinse")).toBeGreaterThan(throughput("megasonic_clean"));
  });
});

describe("surfaceSafety", () => {
  it("megasonic clean best surface safety", () => {
    expect(surfaceSafety("megasonic_clean")).toBeGreaterThan(surfaceSafety("standard_sonic"));
  });
});

describe("chemicalCompat", () => {
  it("megasonic clean best chemical compat", () => {
    expect(chemicalCompat("megasonic_clean")).toBeGreaterThan(chemicalCompat("vapor_degrease"));
  });
});

describe("ucCost", () => {
  it("megasonic clean most expensive", () => {
    expect(ucCost("megasonic_clean")).toBeGreaterThan(ucCost("spray_rinse"));
  });
});

describe("gentle", () => {
  it("megasonic clean is gentle", () => {
    expect(gentle("megasonic_clean")).toBe(true);
  });
  it("standard sonic not gentle", () => {
    expect(gentle("standard_sonic")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("megasonic clean for precision", () => {
    expect(forPrecision("megasonic_clean")).toBe(true);
  });
  it("standard sonic not for precision", () => {
    expect(forPrecision("standard_sonic")).toBe(false);
  });
});

describe("cleanerConfig", () => {
  it("multi freq uses sweep dual 40 80 120khz select", () => {
    expect(cleanerConfig("multi_freq")).toBe("multi_freq_ultrasonic_cleaner_sweep_dual_40_80_120khz_select");
  });
});

describe("bestUse", () => {
  it("megasonic clean for wafer clean gentle sub micron particle", () => {
    expect(bestUse("megasonic_clean")).toBe("wafer_clean_megasonic_cleaner_1mhz_gentle_sub_micron_particle");
  });
});

describe("ultrasonicCleanerTypes", () => {
  it("returns 5 types", () => {
    expect(ultrasonicCleanerTypes()).toHaveLength(5);
  });
});
