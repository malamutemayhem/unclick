import { describe, it, expect } from "vitest";
import {
  hardnessJanka, grainConsistency, detailHolding,
  splittingResistance, finishQuality, paintable,
  bestProject, toolEdgeRetention, costPerBoardFoot, carvingWoods,
} from "../carving-wood-calc.js";

describe("hardnessJanka", () => {
  it("walnut is hardest", () => {
    expect(hardnessJanka("walnut")).toBeGreaterThan(
      hardnessJanka("basswood")
    );
  });
});

describe("grainConsistency", () => {
  it("basswood has most consistent grain", () => {
    expect(grainConsistency("basswood")).toBeGreaterThan(
      grainConsistency("walnut")
    );
  });
});

describe("detailHolding", () => {
  it("basswood holds detail well", () => {
    expect(detailHolding("basswood")).toBeGreaterThan(
      detailHolding("butternut")
    );
  });
});

describe("splittingResistance", () => {
  it("mahogany resists splitting best", () => {
    expect(splittingResistance("mahogany")).toBeGreaterThan(
      splittingResistance("butternut")
    );
  });
});

describe("finishQuality", () => {
  it("walnut finishes best", () => {
    expect(finishQuality("walnut")).toBeGreaterThan(
      finishQuality("basswood")
    );
  });
});

describe("paintable", () => {
  it("basswood is paintable", () => {
    expect(paintable("basswood")).toBe(true);
  });
  it("walnut is not paintable", () => {
    expect(paintable("walnut")).toBe(false);
  });
});

describe("bestProject", () => {
  it("basswood best for figurines", () => {
    expect(bestProject("basswood")).toBe("figurines");
  });
});

describe("toolEdgeRetention", () => {
  it("basswood preserves tool edges best", () => {
    expect(toolEdgeRetention("basswood")).toBeGreaterThan(
      toolEdgeRetention("walnut")
    );
  });
});

describe("costPerBoardFoot", () => {
  it("mahogany costs most", () => {
    expect(costPerBoardFoot("mahogany")).toBeGreaterThan(
      costPerBoardFoot("basswood")
    );
  });
});

describe("carvingWoods", () => {
  it("returns 5 woods", () => {
    expect(carvingWoods()).toHaveLength(5);
  });
});
