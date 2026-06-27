import { describe, it, expect } from "vitest";
import {
  lineMarkingAtFathom, leadWeightKg, tallowRequired, bottomIdentification,
  castingDistanceM, soundingTimeSeconds, accuracyFathoms, lineLength,
  costEstimate, bottomTypes,
} from "../lead-line-calc.js";

describe("lineMarkingAtFathom", () => {
  it("fathom 2 has leather 2 strips", () => {
    expect(lineMarkingAtFathom(2)).toBe("leather_2_strips");
  });
  it("unmarked fathom returns unmarked", () => {
    expect(lineMarkingAtFathom(4)).toBe("unmarked");
  });
});

describe("leadWeightKg", () => {
  it("deeper water needs heavier lead", () => {
    expect(leadWeightKg(50)).toBeGreaterThan(leadWeightKg(10));
  });
});

describe("tallowRequired", () => {
  it("returns true", () => {
    expect(tallowRequired()).toBe(true);
  });
});

describe("bottomIdentification", () => {
  it("sand shows grains in tallow", () => {
    expect(bottomIdentification("sand")).toBe("grains_in_tallow");
  });
});

describe("castingDistanceM", () => {
  it("deeper water needs longer cast", () => {
    expect(castingDistanceM(20)).toBeGreaterThan(castingDistanceM(5));
  });
});

describe("soundingTimeSeconds", () => {
  it("deeper water takes longer", () => {
    expect(soundingTimeSeconds(50)).toBeGreaterThan(
      soundingTimeSeconds(10)
    );
  });
});

describe("accuracyFathoms", () => {
  it("shallow water is most accurate", () => {
    expect(accuracyFathoms(10)).toBeLessThan(accuracyFathoms(50));
  });
});

describe("lineLength", () => {
  it("deeper water needs longer line", () => {
    expect(lineLength(50)).toBeGreaterThan(lineLength(10));
  });
});

describe("costEstimate", () => {
  it("deep water equipment costs more", () => {
    expect(costEstimate(50)).toBeGreaterThan(costEstimate(10));
  });
});

describe("bottomTypes", () => {
  it("returns 5 types", () => {
    expect(bottomTypes()).toHaveLength(5);
  });
});
