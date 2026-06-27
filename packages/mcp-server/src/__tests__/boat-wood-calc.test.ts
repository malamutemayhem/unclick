import { describe, it, expect } from "vitest";
import {
  rotResistance, strengthToWeight, bendability,
  oilContent, glueability, dimensionalStability,
  sustainablySourced, bestUse, costPerBoardFoot, boatWoods,
} from "../boat-wood-calc.js";

describe("rotResistance", () => {
  it("teak resists rot best", () => {
    expect(rotResistance("teak")).toBeGreaterThan(
      rotResistance("marine_plywood")
    );
  });
});

describe("strengthToWeight", () => {
  it("western red cedar has best strength to weight", () => {
    expect(strengthToWeight("western_red_cedar")).toBeGreaterThan(
      strengthToWeight("white_oak")
    );
  });
});

describe("bendability", () => {
  it("white oak bends best", () => {
    expect(bendability("white_oak")).toBeGreaterThan(
      bendability("marine_plywood")
    );
  });
});

describe("oilContent", () => {
  it("teak has most oil", () => {
    expect(oilContent("teak")).toBeGreaterThan(
      oilContent("marine_plywood")
    );
  });
});

describe("glueability", () => {
  it("marine plywood glues best", () => {
    expect(glueability("marine_plywood")).toBeGreaterThan(
      glueability("teak")
    );
  });
});

describe("dimensionalStability", () => {
  it("teak is dimensionally stable", () => {
    expect(dimensionalStability("teak")).toBe(true);
  });
  it("white oak is not", () => {
    expect(dimensionalStability("white_oak")).toBe(false);
  });
});

describe("sustainablySourced", () => {
  it("white oak is sustainably sourced", () => {
    expect(sustainablySourced("white_oak")).toBe(true);
  });
  it("teak is not", () => {
    expect(sustainablySourced("teak")).toBe(false);
  });
});

describe("bestUse", () => {
  it("teak best for deck planking", () => {
    expect(bestUse("teak")).toBe("deck_planking");
  });
});

describe("costPerBoardFoot", () => {
  it("teak costs most", () => {
    expect(costPerBoardFoot("teak")).toBeGreaterThan(
      costPerBoardFoot("marine_plywood")
    );
  });
});

describe("boatWoods", () => {
  it("returns 5 woods", () => {
    expect(boatWoods()).toHaveLength(5);
  });
});
