import { describe, it, expect } from "vitest";
import {
  resistRemovalTemp, layersTypical, patternComplexity, repeatability,
  timePerPieceHours, heatRequired, toolsNeeded, bestFabric,
  costPerPiece, resistMethods,
} from "../resist-dyeing-calc.js";

describe("resistRemovalTemp", () => {
  it("wax batik needs highest temp for removal", () => {
    expect(resistRemovalTemp("wax_batik")).toBeGreaterThan(
      resistRemovalTemp("tie_dye")
    );
  });
});

describe("layersTypical", () => {
  it("wax batik uses most layers", () => {
    expect(layersTypical("wax_batik")).toBeGreaterThan(
      layersTypical("stencil")
    );
  });
});

describe("patternComplexity", () => {
  it("wax batik is most complex", () => {
    expect(patternComplexity("wax_batik")).toBeGreaterThan(
      patternComplexity("tie_dye")
    );
  });
});

describe("repeatability", () => {
  it("stencil is most repeatable", () => {
    expect(repeatability("stencil")).toBeGreaterThan(
      repeatability("tie_dye")
    );
  });
});

describe("timePerPieceHours", () => {
  it("wax batik takes longest", () => {
    expect(timePerPieceHours("wax_batik")).toBeGreaterThan(
      timePerPieceHours("tie_dye")
    );
  });
});

describe("heatRequired", () => {
  it("wax batik needs heat", () => {
    expect(heatRequired("wax_batik")).toBe(true);
  });
  it("tie dye does not need heat", () => {
    expect(heatRequired("tie_dye")).toBe(false);
  });
});

describe("toolsNeeded", () => {
  it("wax batik uses tjanting tool", () => {
    expect(toolsNeeded("wax_batik")).toBe("tjanting_tool");
  });
});

describe("bestFabric", () => {
  it("shibori works best on silk", () => {
    expect(bestFabric("shibori")).toBe("silk");
  });
});

describe("costPerPiece", () => {
  it("wax batik is most expensive", () => {
    expect(costPerPiece("wax_batik")).toBeGreaterThan(
      costPerPiece("tie_dye")
    );
  });
});

describe("resistMethods", () => {
  it("returns 5 methods", () => {
    expect(resistMethods()).toHaveLength(5);
  });
});
