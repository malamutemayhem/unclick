import { describe, it, expect } from "vitest";
import {
  closureStrength, aesthetics, easeOfUse, flushClose,
  ringCost, solderNeeded, doubleWrap, wireShape,
  bestProject, jumpRings,
} from "../jump-ring-calc.js";

describe("closureStrength", () => {
  it("split ring double strongest closure", () => {
    expect(closureStrength("split_ring_double")).toBeGreaterThan(closureStrength("twisted_wire_texture"));
  });
});

describe("aesthetics", () => {
  it("twisted wire texture best aesthetics", () => {
    expect(aesthetics("twisted_wire_texture")).toBeGreaterThan(aesthetics("split_ring_double"));
  });
});

describe("easeOfUse", () => {
  it("round wire standard easiest to use", () => {
    expect(easeOfUse("round_wire_standard")).toBeGreaterThan(easeOfUse("split_ring_double"));
  });
});

describe("flushClose", () => {
  it("square wire flat best flush close", () => {
    expect(flushClose("square_wire_flat")).toBeGreaterThan(flushClose("twisted_wire_texture"));
  });
});

describe("ringCost", () => {
  it("square wire flat more expensive than round wire", () => {
    expect(ringCost("square_wire_flat")).toBeGreaterThan(ringCost("round_wire_standard"));
  });
});

describe("solderNeeded", () => {
  it("round wire standard does not need solder", () => {
    expect(solderNeeded("round_wire_standard")).toBe(false);
  });
});

describe("doubleWrap", () => {
  it("split ring double has double wrap", () => {
    expect(doubleWrap("split_ring_double")).toBe(true);
  });
  it("round wire standard has no double wrap", () => {
    expect(doubleWrap("round_wire_standard")).toBe(false);
  });
});

describe("wireShape", () => {
  it("twisted wire texture uses twisted round wire", () => {
    expect(wireShape("twisted_wire_texture")).toBe("twisted_round_wire");
  });
});

describe("bestProject", () => {
  it("split ring double best for clasp secure connect", () => {
    expect(bestProject("split_ring_double")).toBe("clasp_secure_connect");
  });
});

describe("jumpRings", () => {
  it("returns 5 types", () => {
    expect(jumpRings()).toHaveLength(5);
  });
});
