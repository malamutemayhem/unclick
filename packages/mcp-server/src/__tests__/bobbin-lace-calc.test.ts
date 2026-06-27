import { describe, it, expect } from "vitest";
import {
  bobbinsRequired, threadWeightTex, gridAngleDeg,
  detailLevel, freeformDesign, hoursPerCm2,
  pinDensityPerCm2, difficultyRating, costPerM, bobbinLaceStyles,
} from "../bobbin-lace-calc.js";

describe("bobbinsRequired", () => {
  it("chantilly needs most bobbins", () => {
    expect(bobbinsRequired("chantilly")).toBeGreaterThan(
      bobbinsRequired("honiton")
    );
  });
});

describe("threadWeightTex", () => {
  it("cluny uses heaviest thread", () => {
    expect(threadWeightTex("cluny")).toBeGreaterThan(
      threadWeightTex("chantilly")
    );
  });
});

describe("gridAngleDeg", () => {
  it("cluny has steepest angle", () => {
    expect(gridAngleDeg("cluny")).toBeGreaterThan(
      gridAngleDeg("torchon")
    );
  });
});

describe("detailLevel", () => {
  it("chantilly has most detail", () => {
    expect(detailLevel("chantilly")).toBeGreaterThan(
      detailLevel("torchon")
    );
  });
});

describe("freeformDesign", () => {
  it("honiton is freeform", () => {
    expect(freeformDesign("honiton")).toBe(true);
  });
  it("torchon is not", () => {
    expect(freeformDesign("torchon")).toBe(false);
  });
});

describe("hoursPerCm2", () => {
  it("chantilly takes longest", () => {
    expect(hoursPerCm2("chantilly")).toBeGreaterThan(
      hoursPerCm2("torchon")
    );
  });
});

describe("pinDensityPerCm2", () => {
  it("chantilly has most pins", () => {
    expect(pinDensityPerCm2("chantilly")).toBeGreaterThan(
      pinDensityPerCm2("cluny")
    );
  });
});

describe("difficultyRating", () => {
  it("chantilly is hardest", () => {
    expect(difficultyRating("chantilly")).toBeGreaterThan(
      difficultyRating("torchon")
    );
  });
});

describe("costPerM", () => {
  it("chantilly is most expensive", () => {
    expect(costPerM("chantilly")).toBeGreaterThan(
      costPerM("cluny")
    );
  });
});

describe("bobbinLaceStyles", () => {
  it("returns 5 styles", () => {
    expect(bobbinLaceStyles()).toHaveLength(5);
  });
});
