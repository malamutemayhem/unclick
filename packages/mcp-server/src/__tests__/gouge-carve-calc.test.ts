import { describe, it, expect } from "vitest";
import {
  cuttingDepth, detailWork, versatility, sharpenEase,
  gougeCost, forRelief, curveBlade, bladeProfile,
  bestCarve, gougeCarves,
} from "../gouge-carve-calc.js";

describe("cuttingDepth", () => {
  it("spoon gouge hollow deepest cutting", () => {
    expect(cuttingDepth("spoon_gouge_hollow")).toBeGreaterThan(cuttingDepth("fishtail_gouge_clean"));
  });
});

describe("detailWork", () => {
  it("v parting line best detail work", () => {
    expect(detailWork("v_parting_line")).toBeGreaterThan(detailWork("straight_gouge_flat"));
  });
});

describe("versatility", () => {
  it("straight gouge flat most versatile", () => {
    expect(versatility("straight_gouge_flat")).toBeGreaterThan(versatility("back_bent_undercut"));
  });
});

describe("sharpenEase", () => {
  it("straight gouge flat easiest to sharpen", () => {
    expect(sharpenEase("straight_gouge_flat")).toBeGreaterThan(sharpenEase("back_bent_undercut"));
  });
});

describe("gougeCost", () => {
  it("back bent undercut most expensive", () => {
    expect(gougeCost("back_bent_undercut")).toBeGreaterThan(gougeCost("straight_gouge_flat"));
  });
});

describe("forRelief", () => {
  it("straight gouge flat is for relief", () => {
    expect(forRelief("straight_gouge_flat")).toBe(true);
  });
  it("back bent undercut is not for relief", () => {
    expect(forRelief("back_bent_undercut")).toBe(false);
  });
});

describe("curveBlade", () => {
  it("spoon gouge hollow has curved blade", () => {
    expect(curveBlade("spoon_gouge_hollow")).toBe(true);
  });
  it("v parting line does not have curved blade", () => {
    expect(curveBlade("v_parting_line")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("fishtail gouge clean uses flared tail edge", () => {
    expect(bladeProfile("fishtail_gouge_clean")).toBe("flared_tail_edge");
  });
});

describe("bestCarve", () => {
  it("spoon gouge hollow best for bowl concave hollow", () => {
    expect(bestCarve("spoon_gouge_hollow")).toBe("bowl_concave_hollow");
  });
});

describe("gougeCarves", () => {
  it("returns 5 types", () => {
    expect(gougeCarves()).toHaveLength(5);
  });
});
