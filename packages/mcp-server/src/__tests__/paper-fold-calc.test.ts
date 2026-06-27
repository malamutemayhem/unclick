import { describe, it, expect } from "vitest";
import {
  panelCount, contentArea, foldComplexity, mailingEase,
  productionCost, selfMailer, requiresScoring, foldDirection,
  bestUse, paperFolds,
} from "../paper-fold-calc.js";

describe("panelCount", () => {
  it("roll fold most panels", () => {
    expect(panelCount("roll_fold")).toBeGreaterThan(panelCount("half_fold"));
  });
});

describe("contentArea", () => {
  it("roll fold largest content area", () => {
    expect(contentArea("roll_fold")).toBeGreaterThan(contentArea("half_fold"));
  });
});

describe("foldComplexity", () => {
  it("gate fold most complex", () => {
    expect(foldComplexity("gate_fold")).toBeGreaterThan(foldComplexity("half_fold"));
  });
});

describe("mailingEase", () => {
  it("tri fold easiest to mail", () => {
    expect(mailingEase("tri_fold")).toBeGreaterThan(mailingEase("gate_fold"));
  });
});

describe("productionCost", () => {
  it("gate fold most expensive", () => {
    expect(productionCost("gate_fold")).toBeGreaterThan(productionCost("half_fold"));
  });
});

describe("selfMailer", () => {
  it("tri fold is self mailer", () => {
    expect(selfMailer("tri_fold")).toBe(true);
  });
  it("gate fold is not", () => {
    expect(selfMailer("gate_fold")).toBe(false);
  });
});

describe("requiresScoring", () => {
  it("tri fold requires scoring", () => {
    expect(requiresScoring("tri_fold")).toBe(true);
  });
  it("half fold does not", () => {
    expect(requiresScoring("half_fold")).toBe(false);
  });
});

describe("foldDirection", () => {
  it("z fold uses accordion direction", () => {
    expect(foldDirection("z_fold")).toBe("two_parallel_accordion");
  });
});

describe("bestUse", () => {
  it("z fold for map reference guide", () => {
    expect(bestUse("z_fold")).toBe("map_reference_guide");
  });
});

describe("paperFolds", () => {
  it("returns 5 folds", () => {
    expect(paperFolds()).toHaveLength(5);
  });
});
