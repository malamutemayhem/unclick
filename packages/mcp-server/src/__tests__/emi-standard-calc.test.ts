import { describe, it, expect } from "vitest";
import {
  freqRange, limitStrictness, testComplexity, shieldReq,
  complianceCost, radiated, forConsumer, testMethod,
  bestUse, emiStandards,
} from "../emi-standard-calc.js";

describe("freqRange", () => {
  it("mil std 461g widest freq range", () => {
    expect(freqRange("mil_std_461g")).toBeGreaterThan(freqRange("cispr_32_ite"));
  });
});

describe("limitStrictness", () => {
  it("mil std 461g strictest limits", () => {
    expect(limitStrictness("mil_std_461g")).toBeGreaterThan(limitStrictness("fcc_part_15b"));
  });
});

describe("testComplexity", () => {
  it("mil std 461g most complex testing", () => {
    expect(testComplexity("mil_std_461g")).toBeGreaterThan(testComplexity("cispr_32_ite"));
  });
});

describe("shieldReq", () => {
  it("mil std 461g highest shielding req", () => {
    expect(shieldReq("mil_std_461g")).toBeGreaterThan(shieldReq("cispr_32_ite"));
  });
});

describe("complianceCost", () => {
  it("mil std 461g most expensive compliance", () => {
    expect(complianceCost("mil_std_461g")).toBeGreaterThan(complianceCost("cispr_32_ite"));
  });
});

describe("radiated", () => {
  it("all standards include radiated", () => {
    expect(radiated("cispr_32_ite")).toBe(true);
    expect(radiated("mil_std_461g")).toBe(true);
  });
});

describe("forConsumer", () => {
  it("cispr 32 ite is for consumer", () => {
    expect(forConsumer("cispr_32_ite")).toBe(true);
  });
  it("mil std 461g not for consumer", () => {
    expect(forConsumer("mil_std_461g")).toBe(false);
  });
});

describe("testMethod", () => {
  it("mil std 461g uses shielded room re102", () => {
    expect(testMethod("mil_std_461g")).toBe("shielded_room_re102");
  });
});

describe("bestUse", () => {
  it("cispr 25 auto best for automotive ecu module", () => {
    expect(bestUse("cispr_25_auto")).toBe("automotive_ecu_module");
  });
});

describe("emiStandards", () => {
  it("returns 5 types", () => {
    expect(emiStandards()).toHaveLength(5);
  });
});
