import { describe, it, expect } from "vitest";
import {
  strikeForce, faceDurable, controlSwing, splashResist,
  maulCost, ironBound, forWedges, headWeight,
  bestUse, beetleMauls,
} from "../beetle-maul-calc.js";

describe("strikeForce", () => {
  it("iron bound ring strongest strike", () => {
    expect(strikeForce("iron_bound_ring")).toBeGreaterThan(strikeForce("rawhide_wrap_soft"));
  });
});

describe("faceDurable", () => {
  it("iron bound ring most durable face", () => {
    expect(faceDurable("iron_bound_ring")).toBeGreaterThan(faceDurable("rawhide_wrap_soft"));
  });
});

describe("controlSwing", () => {
  it("dogwood dense small best control", () => {
    expect(controlSwing("dogwood_dense_small")).toBeGreaterThan(controlSwing("iron_bound_ring"));
  });
});

describe("splashResist", () => {
  it("iron bound ring best splash resist", () => {
    expect(splashResist("iron_bound_ring")).toBeGreaterThan(splashResist("rawhide_wrap_soft"));
  });
});

describe("maulCost", () => {
  it("iron bound ring most expensive", () => {
    expect(maulCost("iron_bound_ring")).toBeGreaterThan(maulCost("elm_head_round"));
  });
});

describe("ironBound", () => {
  it("iron bound ring is iron bound", () => {
    expect(ironBound("iron_bound_ring")).toBe(true);
  });
  it("elm head round not iron bound", () => {
    expect(ironBound("elm_head_round")).toBe(false);
  });
});

describe("forWedges", () => {
  it("elm head round is for wedges", () => {
    expect(forWedges("elm_head_round")).toBe(true);
  });
  it("dogwood dense small not for wedges", () => {
    expect(forWedges("dogwood_dense_small")).toBe(false);
  });
});

describe("headWeight", () => {
  it("iron bound ring uses six pound heavy", () => {
    expect(headWeight("iron_bound_ring")).toBe("six_pound_heavy");
  });
});

describe("bestUse", () => {
  it("laminated glue stack best for split resist drive", () => {
    expect(bestUse("laminated_glue_stack")).toBe("split_resist_drive");
  });
});

describe("beetleMauls", () => {
  it("returns 5 types", () => {
    expect(beetleMauls()).toHaveLength(5);
  });
});
