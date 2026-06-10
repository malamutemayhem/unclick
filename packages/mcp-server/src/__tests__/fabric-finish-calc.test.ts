import { describe, it, expect } from "vitest";
import {
  softness, lustEnhancement, shrinkageControl,
  durabilityEffect, processCost, chemicalProcess,
  permanent, bestForFiber, mechanismType, fabricFinishes,
} from "../fabric-finish-calc.js";

describe("softness", () => {
  it("napped softest finish", () => {
    expect(softness("napped")).toBeGreaterThan(
      softness("waterproof")
    );
  });
});

describe("lustEnhancement", () => {
  it("mercerized most lustrous", () => {
    expect(lustEnhancement("mercerized")).toBeGreaterThan(
      lustEnhancement("napped")
    );
  });
});

describe("shrinkageControl", () => {
  it("sanforized best shrinkage control", () => {
    expect(shrinkageControl("sanforized")).toBeGreaterThan(
      shrinkageControl("napped")
    );
  });
});

describe("durabilityEffect", () => {
  it("mercerized improves durability most", () => {
    expect(durabilityEffect("mercerized")).toBeGreaterThan(
      durabilityEffect("napped")
    );
  });
});

describe("processCost", () => {
  it("waterproof most expensive process", () => {
    expect(processCost("waterproof")).toBeGreaterThan(
      processCost("calendered")
    );
  });
});

describe("chemicalProcess", () => {
  it("mercerized is chemical", () => {
    expect(chemicalProcess("mercerized")).toBe(true);
  });
  it("calendered is not", () => {
    expect(chemicalProcess("calendered")).toBe(false);
  });
});

describe("permanent", () => {
  it("mercerized is permanent", () => {
    expect(permanent("mercerized")).toBe(true);
  });
  it("napped is not", () => {
    expect(permanent("napped")).toBe(false);
  });
});

describe("bestForFiber", () => {
  it("sanforized for cotton denim", () => {
    expect(bestForFiber("sanforized")).toBe("cotton_denim");
  });
});

describe("mechanismType", () => {
  it("napped uses wire brush raising", () => {
    expect(mechanismType("napped")).toBe("wire_brush_raising");
  });
});

describe("fabricFinishes", () => {
  it("returns 5 finishes", () => {
    expect(fabricFinishes()).toHaveLength(5);
  });
});
