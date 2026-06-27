import { describe, it, expect } from "vitest";
import {
  stringency, freqRange, testComplexity, marketAccess,
  emcCost, radiated, forAutomotive, scope,
  bestUse, emcStandards,
} from "../emc-standard-calc.js";

describe("stringency", () => {
  it("mil std 461g most stringent", () => {
    expect(stringency("mil_std_461g")).toBeGreaterThan(stringency("fcc_part_15"));
  });
});

describe("freqRange", () => {
  it("mil std 461g widest freq range", () => {
    expect(freqRange("mil_std_461g")).toBeGreaterThan(freqRange("fcc_part_15"));
  });
});

describe("testComplexity", () => {
  it("mil std 461g most complex testing", () => {
    expect(testComplexity("mil_std_461g")).toBeGreaterThan(testComplexity("fcc_part_15"));
  });
});

describe("marketAccess", () => {
  it("fcc part 15 best market access", () => {
    expect(marketAccess("fcc_part_15")).toBeGreaterThan(marketAccess("mil_std_461g"));
  });
});

describe("emcCost", () => {
  it("mil std 461g most expensive", () => {
    expect(emcCost("mil_std_461g")).toBeGreaterThan(emcCost("fcc_part_15"));
  });
});

describe("radiated", () => {
  it("cispr 32 emission covers radiated", () => {
    expect(radiated("cispr_32_emission")).toBe(true);
  });
});

describe("forAutomotive", () => {
  it("automotive cispr 25 for automotive", () => {
    expect(forAutomotive("automotive_cispr_25")).toBe(true);
  });
  it("fcc part 15 not for automotive", () => {
    expect(forAutomotive("fcc_part_15")).toBe(false);
  });
});

describe("scope", () => {
  it("mil std 461g covers defense platform subsystem", () => {
    expect(scope("mil_std_461g")).toBe("defense_platform_subsystem");
  });
});

describe("bestUse", () => {
  it("fcc part 15 best for us consumer electronics", () => {
    expect(bestUse("fcc_part_15")).toBe("us_consumer_electronics");
  });
});

describe("emcStandards", () => {
  it("returns 5 types", () => {
    expect(emcStandards()).toHaveLength(5);
  });
});
