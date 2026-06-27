import { describe, it, expect } from "vitest";
import {
  clampForce, jawWidth, setupSpeed, durability,
  pressCost, quickRelease, portable, jawMaterial,
  bestUse, lyingPresses,
} from "../lying-press-calc.js";

describe("clampForce", () => {
  it("cast iron heavy most clamp force", () => {
    expect(clampForce("cast_iron_heavy")).toBeGreaterThan(clampForce("portable_bench_clamp"));
  });
});

describe("jawWidth", () => {
  it("wooden jaw classic widest jaw", () => {
    expect(jawWidth("wooden_jaw_classic")).toBeGreaterThan(jawWidth("portable_bench_clamp"));
  });
});

describe("setupSpeed", () => {
  it("quick release lever fastest setup", () => {
    expect(setupSpeed("quick_release_lever")).toBeGreaterThan(setupSpeed("cast_iron_heavy"));
  });
});

describe("durability", () => {
  it("cast iron heavy most durable", () => {
    expect(durability("cast_iron_heavy")).toBeGreaterThan(durability("portable_bench_clamp"));
  });
});

describe("pressCost", () => {
  it("nipping combo dual most expensive", () => {
    expect(pressCost("nipping_combo_dual")).toBeGreaterThan(pressCost("portable_bench_clamp"));
  });
});

describe("quickRelease", () => {
  it("quick release lever has quick release", () => {
    expect(quickRelease("quick_release_lever")).toBe(true);
  });
  it("cast iron heavy no quick release", () => {
    expect(quickRelease("cast_iron_heavy")).toBe(false);
  });
});

describe("portable", () => {
  it("portable bench clamp is portable", () => {
    expect(portable("portable_bench_clamp")).toBe(true);
  });
  it("cast iron heavy not portable", () => {
    expect(portable("cast_iron_heavy")).toBe(false);
  });
});

describe("jawMaterial", () => {
  it("wooden jaw classic uses hardwood beech", () => {
    expect(jawMaterial("wooden_jaw_classic")).toBe("hardwood_beech");
  });
});

describe("bestUse", () => {
  it("cast iron heavy best for heavy trim plough", () => {
    expect(bestUse("cast_iron_heavy")).toBe("heavy_trim_plough");
  });
});

describe("lyingPresses", () => {
  it("returns 5 types", () => {
    expect(lyingPresses()).toHaveLength(5);
  });
});
