import { describe, it, expect } from "vitest";
import {
  sizeMm, precisionRequired, speedRating,
  wastePercent, cookingEvenness, requiresRocking,
  usesTourneeKnife, bestIngredient, culinaryLevel, knifeCuts,
} from "../knife-cut-calc.js";

describe("sizeMm", () => {
  it("tournee is largest cut", () => {
    expect(sizeMm("tournee")).toBeGreaterThan(sizeMm("brunoise"));
  });
});

describe("precisionRequired", () => {
  it("tournee requires most precision", () => {
    expect(precisionRequired("tournee")).toBeGreaterThan(
      precisionRequired("chiffonade")
    );
  });
});

describe("speedRating", () => {
  it("chiffonade is fastest", () => {
    expect(speedRating("chiffonade")).toBeGreaterThan(
      speedRating("tournee")
    );
  });
});

describe("wastePercent", () => {
  it("tournee has most waste", () => {
    expect(wastePercent("tournee")).toBeGreaterThan(
      wastePercent("chiffonade")
    );
  });
});

describe("cookingEvenness", () => {
  it("brunoise cooks most evenly", () => {
    expect(cookingEvenness("brunoise")).toBeGreaterThan(
      cookingEvenness("chiffonade")
    );
  });
});

describe("requiresRocking", () => {
  it("chiffonade requires rocking", () => {
    expect(requiresRocking("chiffonade")).toBe(true);
  });
  it("julienne does not", () => {
    expect(requiresRocking("julienne")).toBe(false);
  });
});

describe("usesTourneeKnife", () => {
  it("tournee uses tournee knife", () => {
    expect(usesTourneeKnife("tournee")).toBe(true);
  });
  it("julienne does not", () => {
    expect(usesTourneeKnife("julienne")).toBe(false);
  });
});

describe("bestIngredient", () => {
  it("chiffonade for basil", () => {
    expect(bestIngredient("chiffonade")).toBe("basil");
  });
});

describe("culinaryLevel", () => {
  it("tournee is professional level", () => {
    expect(culinaryLevel("tournee")).toBe("professional");
  });
});

describe("knifeCuts", () => {
  it("returns 5 types", () => {
    expect(knifeCuts()).toHaveLength(5);
  });
});
