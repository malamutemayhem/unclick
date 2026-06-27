import { describe, it, expect } from "vitest";
import {
  holdSecure, removEase, durability, fitRange,
  pegCost, reusable, tapered, material,
  bestUse, caningPegs,
} from "../caning-peg-calc.js";

describe("holdSecure", () => {
  it("tapered peg tight most secure hold", () => {
    expect(holdSecure("tapered_peg_tight")).toBeGreaterThan(holdSecure("golf_tee_quick"));
  });
});

describe("removEase", () => {
  it("golf tee quick easiest removal", () => {
    expect(removEase("golf_tee_quick")).toBeGreaterThan(removEase("tapered_peg_tight"));
  });
});

describe("durability", () => {
  it("brass peg durable most durable", () => {
    expect(durability("brass_peg_durable")).toBeGreaterThan(durability("golf_tee_quick"));
  });
});

describe("fitRange", () => {
  it("tapered peg tight widest fit range", () => {
    expect(fitRange("tapered_peg_tight")).toBeGreaterThan(fitRange("golf_tee_quick"));
  });
});

describe("pegCost", () => {
  it("brass peg durable most expensive", () => {
    expect(pegCost("brass_peg_durable")).toBeGreaterThan(pegCost("plastic_peg_budget"));
  });
});

describe("reusable", () => {
  it("wooden peg standard is reusable", () => {
    expect(reusable("wooden_peg_standard")).toBe(true);
  });
  it("plastic peg budget not reusable", () => {
    expect(reusable("plastic_peg_budget")).toBe(false);
  });
});

describe("tapered", () => {
  it("tapered peg tight is tapered", () => {
    expect(tapered("tapered_peg_tight")).toBe(true);
  });
  it("wooden peg standard not tapered", () => {
    expect(tapered("wooden_peg_standard")).toBe(false);
  });
});

describe("material", () => {
  it("brass peg durable uses solid brass pin", () => {
    expect(material("brass_peg_durable")).toBe("solid_brass_pin");
  });
});

describe("bestUse", () => {
  it("wooden peg standard best for general cane hold", () => {
    expect(bestUse("wooden_peg_standard")).toBe("general_cane_hold");
  });
});

describe("caningPegs", () => {
  it("returns 5 types", () => {
    expect(caningPegs()).toHaveLength(5);
  });
});
