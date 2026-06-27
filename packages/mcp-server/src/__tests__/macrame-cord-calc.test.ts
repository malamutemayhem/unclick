import { describe, it, expect } from "vitest";
import {
  knotClarity, fringeAbility, tensileStrength, softness,
  cordCost, combable, dyesFriendly, cordStructure,
  bestProject, macrameCords,
} from "../macrame-cord-calc.js";

describe("knotClarity", () => {
  it("single twist soft best knot clarity", () => {
    expect(knotClarity("single_twist_soft")).toBeGreaterThan(knotClarity("jute_natural_rough"));
  });
});

describe("fringeAbility", () => {
  it("single twist soft best fringe ability", () => {
    expect(fringeAbility("single_twist_soft")).toBeGreaterThan(fringeAbility("braided_core_round"));
  });
});

describe("tensileStrength", () => {
  it("braided core round strongest tensile", () => {
    expect(tensileStrength("braided_core_round")).toBeGreaterThan(tensileStrength("single_twist_soft"));
  });
});

describe("softness", () => {
  it("single twist soft most soft", () => {
    expect(softness("single_twist_soft")).toBeGreaterThan(softness("jute_natural_rough"));
  });
});

describe("cordCost", () => {
  it("braided core round more expensive than jute", () => {
    expect(cordCost("braided_core_round")).toBeGreaterThan(cordCost("jute_natural_rough"));
  });
});

describe("combable", () => {
  it("single twist soft is combable", () => {
    expect(combable("single_twist_soft")).toBe(true);
  });
  it("braided core round is not combable", () => {
    expect(combable("braided_core_round")).toBe(false);
  });
});

describe("dyesFriendly", () => {
  it("single twist soft is dyes friendly", () => {
    expect(dyesFriendly("single_twist_soft")).toBe(true);
  });
  it("jute natural rough is not dyes friendly", () => {
    expect(dyesFriendly("jute_natural_rough")).toBe(false);
  });
});

describe("cordStructure", () => {
  it("braided core round is braided outer core", () => {
    expect(cordStructure("braided_core_round")).toBe("braided_outer_core");
  });
});

describe("bestProject", () => {
  it("single twist soft best for wall hanging feather", () => {
    expect(bestProject("single_twist_soft")).toBe("wall_hanging_feather");
  });
});

describe("macrameCords", () => {
  it("returns 5 types", () => {
    expect(macrameCords()).toHaveLength(5);
  });
});
