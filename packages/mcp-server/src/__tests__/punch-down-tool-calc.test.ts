import { describe, it, expect } from "vitest";
import {
  termSpeed, consistency, wireRange, durability,
  toolCost, impactDrive, multiPair, bladeType,
  bestUse, punchDownTools,
} from "../punch-down-tool-calc.js";

describe("termSpeed", () => {
  it("multi pair gang fastest", () => {
    expect(termSpeed("multi_pair_gang")).toBeGreaterThan(termSpeed("non_impact_manual"));
  });
});

describe("consistency", () => {
  it("impact 110 blade most consistent", () => {
    expect(consistency("impact_110_blade")).toBeGreaterThan(consistency("non_impact_manual"));
  });
});

describe("wireRange", () => {
  it("multi pair gang widest wire range", () => {
    expect(wireRange("multi_pair_gang")).toBeGreaterThan(wireRange("non_impact_manual"));
  });
});

describe("durability", () => {
  it("impact 110 more durable than manual", () => {
    expect(durability("impact_110_blade")).toBeGreaterThan(durability("non_impact_manual"));
  });
});

describe("toolCost", () => {
  it("multi pair gang most expensive", () => {
    expect(toolCost("multi_pair_gang")).toBeGreaterThan(toolCost("non_impact_manual"));
  });
});

describe("impactDrive", () => {
  it("impact 110 blade is impact drive", () => {
    expect(impactDrive("impact_110_blade")).toBe(true);
  });
  it("non impact manual is not impact drive", () => {
    expect(impactDrive("non_impact_manual")).toBe(false);
  });
});

describe("multiPair", () => {
  it("multi pair gang is multi pair", () => {
    expect(multiPair("multi_pair_gang")).toBe(true);
  });
  it("impact 110 blade not multi pair", () => {
    expect(multiPair("impact_110_blade")).toBe(false);
  });
});

describe("bladeType", () => {
  it("krone lsa uses krone lsa insert", () => {
    expect(bladeType("krone_lsa_style")).toBe("krone_lsa_insert");
  });
});

describe("bestUse", () => {
  it("impact 66 best for telephone 66 block", () => {
    expect(bestUse("impact_66_blade")).toBe("telephone_66_block");
  });
});

describe("punchDownTools", () => {
  it("returns 5 types", () => {
    expect(punchDownTools()).toHaveLength(5);
  });
});
