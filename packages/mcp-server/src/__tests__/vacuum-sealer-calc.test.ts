import { describe, it, expect } from "vitest";
import {
  sealStrength, suctionPower, portability, easeOfUse,
  sealerCost, sealsLiquid, builtInCutter, sealMethod,
  bestUse, vacuumSealers,
} from "../vacuum-sealer-calc.js";

describe("sealStrength", () => {
  it("chamber commercial strongest seal", () => {
    expect(sealStrength("chamber_commercial")).toBeGreaterThan(sealStrength("handheld_cordless"));
  });
});

describe("suctionPower", () => {
  it("chamber commercial most suction", () => {
    expect(suctionPower("chamber_commercial")).toBeGreaterThan(suctionPower("handheld_cordless"));
  });
});

describe("portability", () => {
  it("handheld cordless most portable", () => {
    expect(portability("handheld_cordless")).toBeGreaterThan(portability("chamber_commercial"));
  });
});

describe("easeOfUse", () => {
  it("handheld cordless easiest to use", () => {
    expect(easeOfUse("handheld_cordless")).toBeGreaterThan(easeOfUse("chamber_commercial"));
  });
});

describe("sealerCost", () => {
  it("chamber commercial most expensive", () => {
    expect(sealerCost("chamber_commercial")).toBeGreaterThan(sealerCost("handheld_cordless"));
  });
});

describe("sealsLiquid", () => {
  it("chamber commercial seals liquid", () => {
    expect(sealsLiquid("chamber_commercial")).toBe(true);
  });
  it("countertop channel does not", () => {
    expect(sealsLiquid("countertop_channel")).toBe(false);
  });
});

describe("builtInCutter", () => {
  it("foodsaver roll cut has built in cutter", () => {
    expect(builtInCutter("foodsaver_roll_cut")).toBe(true);
  });
  it("chamber commercial does not", () => {
    expect(builtInCutter("chamber_commercial")).toBe(false);
  });
});

describe("sealMethod", () => {
  it("chamber commercial uses chamber vacuum impulse seal", () => {
    expect(sealMethod("chamber_commercial")).toBe("chamber_vacuum_impulse_seal");
  });
});

describe("bestUse", () => {
  it("handheld cordless best for snack bag quick reseal", () => {
    expect(bestUse("handheld_cordless")).toBe("snack_bag_quick_reseal");
  });
});

describe("vacuumSealers", () => {
  it("returns 5 types", () => {
    expect(vacuumSealers()).toHaveLength(5);
  });
});
