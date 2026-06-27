import { describe, it, expect } from "vitest";
import {
  smoothAbility, shapeControl, clayRemoval, flexibility,
  ribCost, compresses, forTrimming, ribMaterial,
  bestStage, ribTools,
} from "../rib-tool-calc.js";

describe("smoothAbility", () => {
  it("rubber rib flex best smoothing", () => {
    expect(smoothAbility("rubber_rib_flex")).toBeGreaterThan(smoothAbility("surform_rib_rasp"));
  });
});

describe("shapeControl", () => {
  it("metal rib steel best shape control", () => {
    expect(shapeControl("metal_rib_steel")).toBeGreaterThan(shapeControl("credit_card_rib"));
  });
});

describe("clayRemoval", () => {
  it("surform rib rasp best clay removal", () => {
    expect(clayRemoval("surform_rib_rasp")).toBeGreaterThan(clayRemoval("rubber_rib_flex"));
  });
});

describe("flexibility", () => {
  it("rubber rib flex most flexible", () => {
    expect(flexibility("rubber_rib_flex")).toBeGreaterThan(flexibility("surform_rib_rasp"));
  });
});

describe("ribCost", () => {
  it("surform rib rasp most expensive", () => {
    expect(ribCost("surform_rib_rasp")).toBeGreaterThan(ribCost("wood_rib_kidney"));
  });
});

describe("compresses", () => {
  it("wood rib kidney compresses clay", () => {
    expect(compresses("wood_rib_kidney")).toBe(true);
  });
  it("surform rib rasp does not compress", () => {
    expect(compresses("surform_rib_rasp")).toBe(false);
  });
});

describe("forTrimming", () => {
  it("metal rib steel is for trimming", () => {
    expect(forTrimming("metal_rib_steel")).toBe(true);
  });
  it("wood rib kidney is not for trimming", () => {
    expect(forTrimming("wood_rib_kidney")).toBe(false);
  });
});

describe("ribMaterial", () => {
  it("rubber rib flex is silicone rubber sheet", () => {
    expect(ribMaterial("rubber_rib_flex")).toBe("silicone_rubber_sheet");
  });
});

describe("bestStage", () => {
  it("surform rib rasp best for leather hard carve", () => {
    expect(bestStage("surform_rib_rasp")).toBe("leather_hard_carve");
  });
});

describe("ribTools", () => {
  it("returns 5 types", () => {
    expect(ribTools()).toHaveLength(5);
  });
});
