import { describe, it, expect } from "vitest";
import {
  cutAccuracy, throughput, edgeQuality, nestingEfficiency,
  ppCost, contactFree, forMultiPly, cutterConfig,
  bestUse, prepregCutterTypes,
} from "../prepreg-cutter-calc.js";

describe("cutAccuracy", () => {
  it("ultrasonic knife best cut accuracy", () => {
    expect(cutAccuracy("ultrasonic_knife")).toBeGreaterThan(cutAccuracy("reciprocating_blade"));
  });
});

describe("throughput", () => {
  it("reciprocating blade highest throughput", () => {
    expect(throughput("reciprocating_blade")).toBeGreaterThan(throughput("laser_ply"));
  });
});

describe("edgeQuality", () => {
  it("ultrasonic knife best edge quality", () => {
    expect(edgeQuality("ultrasonic_knife")).toBeGreaterThan(edgeQuality("reciprocating_blade"));
  });
});

describe("nestingEfficiency", () => {
  it("laser ply best nesting efficiency", () => {
    expect(nestingEfficiency("laser_ply")).toBeGreaterThan(nestingEfficiency("reciprocating_blade"));
  });
});

describe("ppCost", () => {
  it("laser ply most expensive", () => {
    expect(ppCost("laser_ply")).toBeGreaterThan(ppCost("reciprocating_blade"));
  });
});

describe("contactFree", () => {
  it("laser ply is contact free", () => {
    expect(contactFree("laser_ply")).toBe(true);
  });
  it("ultrasonic knife not contact free", () => {
    expect(contactFree("ultrasonic_knife")).toBe(false);
  });
});

describe("forMultiPly", () => {
  it("ultrasonic knife for multi ply", () => {
    expect(forMultiPly("ultrasonic_knife")).toBe(true);
  });
  it("drag knife not for multi ply", () => {
    expect(forMultiPly("drag_knife")).toBe(false);
  });
});

describe("cutterConfig", () => {
  it("drag knife uses swivel blade single ply tight nest", () => {
    expect(cutterConfig("drag_knife")).toBe("drag_knife_prepreg_cutter_swivel_blade_single_ply_tight_nest");
  });
});

describe("bestUse", () => {
  it("ultrasonic knife for wing ply clean edge composite", () => {
    expect(bestUse("ultrasonic_knife")).toBe("wing_ply_ultrasonic_knife_prepreg_cutter_clean_edge_composite");
  });
});

describe("prepregCutterTypes", () => {
  it("returns 5 types", () => {
    expect(prepregCutterTypes()).toHaveLength(5);
  });
});
