import { describe, it, expect } from "vitest";
import {
  stabilityLevel, surgicalComplexity, removalRequired, infectionRisk,
  implantCost, selfDissolving, weightBearingImmediate, bestFractureType,
  materialUsed, orthopedicFixations,
} from "../orthopedic-fixation-calc.js";

describe("stabilityLevel", () => {
  it("plate screw most stable", () => {
    expect(stabilityLevel("plate_screw")).toBeGreaterThan(stabilityLevel("bioabsorbable"));
  });
});

describe("surgicalComplexity", () => {
  it("intramedullary nail most complex", () => {
    expect(surgicalComplexity("intramedullary_nail")).toBeGreaterThan(surgicalComplexity("wire_pin"));
  });
});

describe("removalRequired", () => {
  it("external fixator most removal needed", () => {
    expect(removalRequired("external_fixator")).toBeGreaterThan(removalRequired("bioabsorbable"));
  });
});

describe("infectionRisk", () => {
  it("external fixator highest infection risk", () => {
    expect(infectionRisk("external_fixator")).toBeGreaterThan(infectionRisk("bioabsorbable"));
  });
});

describe("implantCost", () => {
  it("bioabsorbable most expensive", () => {
    expect(implantCost("bioabsorbable")).toBeGreaterThan(implantCost("wire_pin"));
  });
});

describe("selfDissolving", () => {
  it("bioabsorbable is self dissolving", () => {
    expect(selfDissolving("bioabsorbable")).toBe(true);
  });
  it("plate screw is not", () => {
    expect(selfDissolving("plate_screw")).toBe(false);
  });
});

describe("weightBearingImmediate", () => {
  it("plate screw allows weight bearing", () => {
    expect(weightBearingImmediate("plate_screw")).toBe(true);
  });
  it("external fixator does not", () => {
    expect(weightBearingImmediate("external_fixator")).toBe(false);
  });
});

describe("bestFractureType", () => {
  it("intramedullary nail for diaphyseal long bone", () => {
    expect(bestFractureType("intramedullary_nail")).toBe("diaphyseal_long_bone");
  });
});

describe("materialUsed", () => {
  it("bioabsorbable uses polylactic acid polymer", () => {
    expect(materialUsed("bioabsorbable")).toBe("polylactic_acid_polymer");
  });
});

describe("orthopedicFixations", () => {
  it("returns 5 fixations", () => {
    expect(orthopedicFixations()).toHaveLength(5);
  });
});
