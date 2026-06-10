import { describe, it, expect } from "vitest";
import {
  heightCm, widthCm, thicknessCm, weightKg,
  wheelRequired, arrowResistance, fireResistance, viewSlotCount,
  constructionHours, costEstimate, mantletMaterials,
} from "../mantlet-calc.js";

describe("heightCm", () => {
  it("1.2x shielder height", () => {
    expect(heightCm(180)).toBe(216);
  });
});

describe("widthCm", () => {
  it("60cm per person", () => {
    expect(widthCm(3)).toBe(180);
  });
});

describe("thicknessCm", () => {
  it("earth filled thickest", () => {
    expect(thicknessCm("earth_filled")).toBeGreaterThan(thicknessCm("iron_faced"));
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(216, 180, "timber")).toBeGreaterThan(0);
  });
  it("iron faced heaviest", () => {
    expect(weightKg(216, 180, "iron_faced")).toBeGreaterThan(weightKg(216, 180, "wicker"));
  });
});

describe("wheelRequired", () => {
  it("heavy needs wheels", () => {
    expect(wheelRequired(100)).toBe(true);
  });
  it("light no wheels", () => {
    expect(wheelRequired(30)).toBe(false);
  });
});

describe("arrowResistance", () => {
  it("iron faced best", () => {
    expect(arrowResistance("iron_faced")).toBeGreaterThan(arrowResistance("wicker"));
  });
});

describe("fireResistance", () => {
  it("iron faced best", () => {
    expect(fireResistance("iron_faced")).toBeGreaterThan(fireResistance("wicker"));
  });
});

describe("viewSlotCount", () => {
  it("at least 1", () => {
    expect(viewSlotCount(60)).toBe(1);
  });
});

describe("constructionHours", () => {
  it("iron faced longest", () => {
    expect(constructionHours("iron_faced")).toBeGreaterThan(constructionHours("wicker"));
  });
});

describe("costEstimate", () => {
  it("iron faced most expensive", () => {
    expect(costEstimate("iron_faced", 100)).toBeGreaterThan(costEstimate("wicker", 100));
  });
});

describe("mantletMaterials", () => {
  it("returns 5 materials", () => {
    expect(mantletMaterials()).toHaveLength(5);
  });
});
