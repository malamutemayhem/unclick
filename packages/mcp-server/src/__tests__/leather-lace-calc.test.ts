import { describe, it, expect } from "vitest";
import {
  tensileStrength, braidEase, softness, durability,
  laceCost, stretchResist, forBraiding, hideSource,
  bestUse, leatherLaces,
} from "../leather-lace-calc.js";

describe("tensileStrength", () => {
  it("kangaroo round thin strongest", () => {
    expect(tensileStrength("kangaroo_round_thin")).toBeGreaterThan(tensileStrength("deerskin_soft_suede"));
  });
});

describe("braidEase", () => {
  it("deerskin soft suede easiest braid", () => {
    expect(braidEase("deerskin_soft_suede")).toBeGreaterThan(braidEase("latigo_oil_tan"));
  });
});

describe("softness", () => {
  it("deerskin soft suede softest", () => {
    expect(softness("deerskin_soft_suede")).toBeGreaterThan(softness("synthetic_poly_cord"));
  });
});

describe("durability", () => {
  it("kangaroo round thin most durable", () => {
    expect(durability("kangaroo_round_thin")).toBeGreaterThan(durability("deerskin_soft_suede"));
  });
});

describe("laceCost", () => {
  it("kangaroo round thin most expensive", () => {
    expect(laceCost("kangaroo_round_thin")).toBeGreaterThan(laceCost("synthetic_poly_cord"));
  });
});

describe("stretchResist", () => {
  it("kangaroo round thin is stretch resist", () => {
    expect(stretchResist("kangaroo_round_thin")).toBe(true);
  });
  it("cowhide flat wide not stretch resist", () => {
    expect(stretchResist("cowhide_flat_wide")).toBe(false);
  });
});

describe("forBraiding", () => {
  it("kangaroo round thin is for braiding", () => {
    expect(forBraiding("kangaroo_round_thin")).toBe(true);
  });
  it("cowhide flat wide not for braiding", () => {
    expect(forBraiding("cowhide_flat_wide")).toBe(false);
  });
});

describe("hideSource", () => {
  it("deerskin soft suede uses deer brain tan", () => {
    expect(hideSource("deerskin_soft_suede")).toBe("deer_brain_tan");
  });
});

describe("bestUse", () => {
  it("kangaroo round thin best for premium braid work", () => {
    expect(bestUse("kangaroo_round_thin")).toBe("premium_braid_work");
  });
});

describe("leatherLaces", () => {
  it("returns 5 types", () => {
    expect(leatherLaces()).toHaveLength(5);
  });
});
