import { describe, it, expect } from "vitest";
import {
  holeClean, sizeAccuracy, cutSpeed, taperControl,
  borerCost, adjustable, forTaper, bitShape,
  bestUse, bungBorers,
} from "../bung-borer-calc.js";

describe("holeClean", () => {
  it("pod auger pull cleanest hole", () => {
    expect(holeClean("pod_auger_pull")).toBeGreaterThan(holeClean("adjustable_bit_set"));
  });
});

describe("sizeAccuracy", () => {
  it("plug cutter match most accurate", () => {
    expect(sizeAccuracy("plug_cutter_match")).toBeGreaterThan(sizeAccuracy("spoon_bit_scoop"));
  });
});

describe("cutSpeed", () => {
  it("pod auger pull fastest cut", () => {
    expect(cutSpeed("pod_auger_pull")).toBeGreaterThan(cutSpeed("adjustable_bit_set"));
  });
});

describe("taperControl", () => {
  it("tapered reamer cone best taper control", () => {
    expect(taperControl("tapered_reamer_cone")).toBeGreaterThan(taperControl("pod_auger_pull"));
  });
});

describe("borerCost", () => {
  it("adjustable bit set most expensive", () => {
    expect(borerCost("adjustable_bit_set")).toBeGreaterThan(borerCost("spoon_bit_scoop"));
  });
});

describe("adjustable", () => {
  it("adjustable bit set is adjustable", () => {
    expect(adjustable("adjustable_bit_set")).toBe(true);
  });
  it("tapered reamer cone not adjustable", () => {
    expect(adjustable("tapered_reamer_cone")).toBe(false);
  });
});

describe("forTaper", () => {
  it("tapered reamer cone is for taper", () => {
    expect(forTaper("tapered_reamer_cone")).toBe(true);
  });
  it("spoon bit scoop not for taper", () => {
    expect(forTaper("spoon_bit_scoop")).toBe(false);
  });
});

describe("bitShape", () => {
  it("plug cutter match uses matching plug ring", () => {
    expect(bitShape("plug_cutter_match")).toBe("matching_plug_ring");
  });
});

describe("bestUse", () => {
  it("pod auger pull best for deep barrel bore", () => {
    expect(bestUse("pod_auger_pull")).toBe("deep_barrel_bore");
  });
});

describe("bungBorers", () => {
  it("returns 5 types", () => {
    expect(bungBorers()).toHaveLength(5);
  });
});
