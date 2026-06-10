import { describe, it, expect } from "vitest";
import {
  prevalence, decisionImpact, awarenessLevel,
  correctionDifficulty, financialRisk, affectsGroups,
  emotionallyDriven, category, debiasStrategy, cognitiveBiases,
} from "../cognitive-bias-calc.js";

describe("prevalence", () => {
  it("confirmation bias most prevalent", () => {
    expect(prevalence("confirmation")).toBeGreaterThan(
      prevalence("dunning_kruger")
    );
  });
});

describe("decisionImpact", () => {
  it("sunk cost biggest decision impact", () => {
    expect(decisionImpact("sunk_cost")).toBeGreaterThan(
      decisionImpact("dunning_kruger")
    );
  });
});

describe("awarenessLevel", () => {
  it("sunk cost most recognized", () => {
    expect(awarenessLevel("sunk_cost")).toBeGreaterThan(
      awarenessLevel("dunning_kruger")
    );
  });
});

describe("correctionDifficulty", () => {
  it("dunning kruger hardest to correct", () => {
    expect(correctionDifficulty("dunning_kruger")).toBeGreaterThan(
      correctionDifficulty("availability")
    );
  });
});

describe("financialRisk", () => {
  it("sunk cost highest financial risk", () => {
    expect(financialRisk("sunk_cost")).toBeGreaterThan(
      financialRisk("availability")
    );
  });
});

describe("affectsGroups", () => {
  it("confirmation affects groups", () => {
    expect(affectsGroups("confirmation")).toBe(true);
  });
  it("dunning kruger does not", () => {
    expect(affectsGroups("dunning_kruger")).toBe(false);
  });
});

describe("emotionallyDriven", () => {
  it("sunk cost is emotionally driven", () => {
    expect(emotionallyDriven("sunk_cost")).toBe(true);
  });
  it("anchoring is not", () => {
    expect(emotionallyDriven("anchoring")).toBe(false);
  });
});

describe("category", () => {
  it("sunk cost is loss aversion", () => {
    expect(category("sunk_cost")).toBe("loss_aversion");
  });
});

describe("debiasStrategy", () => {
  it("confirmation counter is seek disconfirming", () => {
    expect(debiasStrategy("confirmation")).toBe("seek_disconfirming");
  });
});

describe("cognitiveBiases", () => {
  it("returns 5 biases", () => {
    expect(cognitiveBiases()).toHaveLength(5);
  });
});
