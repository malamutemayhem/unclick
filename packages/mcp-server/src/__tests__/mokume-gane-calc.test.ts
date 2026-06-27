import { describe, it, expect } from "vitest";
import {
  layerCount, bondingTempCelsius, patternContrast,
  carveDepthMm, etchingResponse, delaminationRisk,
  traditionalJapanese, difficultyRating, costPerSheet, mokumeCombos,
} from "../mokume-gane-calc.js";

describe("layerCount", () => {
  it("copper shakudo has most layers", () => {
    expect(layerCount("copper_shakudo")).toBeGreaterThan(
      layerCount("gold_platinum")
    );
  });
});

describe("bondingTempCelsius", () => {
  it("gold platinum needs highest temp", () => {
    expect(bondingTempCelsius("gold_platinum")).toBeGreaterThan(
      bondingTempCelsius("copper_brass")
    );
  });
});

describe("patternContrast", () => {
  it("copper shakudo has best contrast", () => {
    expect(patternContrast("copper_shakudo")).toBeGreaterThan(
      patternContrast("copper_brass")
    );
  });
});

describe("carveDepthMm", () => {
  it("copper shakudo allows deepest carving", () => {
    expect(carveDepthMm("copper_shakudo")).toBeGreaterThan(
      carveDepthMm("gold_platinum")
    );
  });
});

describe("etchingResponse", () => {
  it("copper shakudo responds best to etching", () => {
    expect(etchingResponse("copper_shakudo")).toBeGreaterThan(
      etchingResponse("nickel_silver")
    );
  });
});

describe("delaminationRisk", () => {
  it("gold platinum has highest delamination risk", () => {
    expect(delaminationRisk("gold_platinum")).toBeGreaterThan(
      delaminationRisk("copper_brass")
    );
  });
});

describe("traditionalJapanese", () => {
  it("copper shakudo is traditional", () => {
    expect(traditionalJapanese("copper_shakudo")).toBe(true);
  });
  it("copper brass is not", () => {
    expect(traditionalJapanese("copper_brass")).toBe(false);
  });
});

describe("difficultyRating", () => {
  it("gold platinum is hardest", () => {
    expect(difficultyRating("gold_platinum")).toBeGreaterThan(
      difficultyRating("copper_brass")
    );
  });
});

describe("costPerSheet", () => {
  it("gold platinum is most expensive", () => {
    expect(costPerSheet("gold_platinum")).toBeGreaterThan(
      costPerSheet("copper_shakudo")
    );
  });
});

describe("mokumeCombos", () => {
  it("returns 5 combos", () => {
    expect(mokumeCombos()).toHaveLength(5);
  });
});
