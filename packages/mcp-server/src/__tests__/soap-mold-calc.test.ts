import { describe, it, expect } from "vitest";
import {
  moldRelease, batchSize, barConsistency, insulation,
  moldCost, noCutting, lyeSafe, moldShape,
  bestSoap, soapMolds,
} from "../soap-mold-calc.js";

describe("moldRelease", () => {
  it("silicone loaf flex best mold release", () => {
    expect(moldRelease("silicone_loaf_flex")).toBeGreaterThan(moldRelease("acrylic_slab_tall"));
  });
});

describe("batchSize", () => {
  it("acrylic slab tall largest batch size", () => {
    expect(batchSize("acrylic_slab_tall")).toBeGreaterThan(batchSize("individual_cavity_shape"));
  });
});

describe("barConsistency", () => {
  it("individual cavity shape best bar consistency", () => {
    expect(barConsistency("individual_cavity_shape")).toBeGreaterThan(barConsistency("silicone_loaf_flex"));
  });
});

describe("insulation", () => {
  it("wood box liner best insulation", () => {
    expect(insulation("wood_box_liner")).toBeGreaterThan(insulation("individual_cavity_shape"));
  });
});

describe("moldCost", () => {
  it("acrylic slab tall more expensive than pvc pipe", () => {
    expect(moldCost("acrylic_slab_tall")).toBeGreaterThan(moldCost("pvc_pipe_round"));
  });
});

describe("noCutting", () => {
  it("individual cavity shape needs no cutting", () => {
    expect(noCutting("individual_cavity_shape")).toBe(true);
  });
  it("silicone loaf flex needs cutting", () => {
    expect(noCutting("silicone_loaf_flex")).toBe(false);
  });
});

describe("lyeSafe", () => {
  it("silicone loaf flex is lye safe", () => {
    expect(lyeSafe("silicone_loaf_flex")).toBe(true);
  });
});

describe("moldShape", () => {
  it("pvc pipe round uses cylinder tube round", () => {
    expect(moldShape("pvc_pipe_round")).toBe("cylinder_tube_round");
  });
});

describe("bestSoap", () => {
  it("silicone loaf flex best for swirl design loaf", () => {
    expect(bestSoap("silicone_loaf_flex")).toBe("swirl_design_loaf");
  });
});

describe("soapMolds", () => {
  it("returns 5 types", () => {
    expect(soapMolds()).toHaveLength(5);
  });
});
