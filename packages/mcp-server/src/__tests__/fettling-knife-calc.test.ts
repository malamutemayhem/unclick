import { describe, it, expect } from "vitest";
import {
  cutClean, flexControl, seamReach, durability,
  knifeCost, flexBlade, serrated, bladeMaterial,
  bestUse, fettlingKnives,
} from "../fettling-knife-calc.js";

describe("cutClean", () => {
  it("stiff blade hard cleanest cut", () => {
    expect(cutClean("stiff_blade_hard")).toBeGreaterThan(cutClean("palette_knife_wide"));
  });
});

describe("flexControl", () => {
  it("flexible blade soft best flex control", () => {
    expect(flexControl("flexible_blade_soft")).toBeGreaterThan(flexControl("stiff_blade_hard"));
  });
});

describe("seamReach", () => {
  it("angled blade trim best seam reach", () => {
    expect(seamReach("angled_blade_trim")).toBeGreaterThan(seamReach("palette_knife_wide"));
  });
});

describe("durability", () => {
  it("stiff blade hard most durable", () => {
    expect(durability("stiff_blade_hard")).toBeGreaterThan(durability("flexible_blade_soft"));
  });
});

describe("knifeCost", () => {
  it("angled blade trim more expensive", () => {
    expect(knifeCost("angled_blade_trim")).toBeGreaterThan(knifeCost("flexible_blade_soft"));
  });
});

describe("flexBlade", () => {
  it("flexible blade soft has flex blade", () => {
    expect(flexBlade("flexible_blade_soft")).toBe(true);
  });
  it("stiff blade hard no flex blade", () => {
    expect(flexBlade("stiff_blade_hard")).toBe(false);
  });
});

describe("serrated", () => {
  it("serrated edge cut is serrated", () => {
    expect(serrated("serrated_edge_cut")).toBe(true);
  });
  it("flexible blade soft not serrated", () => {
    expect(serrated("flexible_blade_soft")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("flexible blade soft uses spring steel thin", () => {
    expect(bladeMaterial("flexible_blade_soft")).toBe("spring_steel_thin");
  });
});

describe("bestUse", () => {
  it("stiff blade hard best for slab edge trim", () => {
    expect(bestUse("stiff_blade_hard")).toBe("slab_edge_trim");
  });
});

describe("fettlingKnives", () => {
  it("returns 5 types", () => {
    expect(fettlingKnives()).toHaveLength(5);
  });
});
