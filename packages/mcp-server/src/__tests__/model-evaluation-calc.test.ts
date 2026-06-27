import { describe, it, expect } from "vitest";
import {
  simplicityScore, imbalanceRobustness, thresholdIndependence,
  communicability, multiclassSupport, singleNumber,
  penalizesFalsePositives, bestUseCase, formula, modelEvaluationMetrics,
} from "../model-evaluation-calc.js";

describe("simplicityScore", () => {
  it("accuracy simplest", () => {
    expect(simplicityScore("accuracy")).toBeGreaterThan(
      simplicityScore("auc_roc")
    );
  });
});

describe("imbalanceRobustness", () => {
  it("auc roc most robust to imbalance", () => {
    expect(imbalanceRobustness("auc_roc")).toBeGreaterThan(
      imbalanceRobustness("accuracy")
    );
  });
});

describe("thresholdIndependence", () => {
  it("auc roc is threshold independent", () => {
    expect(thresholdIndependence("auc_roc")).toBeGreaterThan(
      thresholdIndependence("precision")
    );
  });
});

describe("communicability", () => {
  it("accuracy easiest to communicate", () => {
    expect(communicability("accuracy")).toBeGreaterThan(
      communicability("auc_roc")
    );
  });
});

describe("multiclassSupport", () => {
  it("accuracy best multiclass support", () => {
    expect(multiclassSupport("accuracy")).toBeGreaterThan(
      multiclassSupport("auc_roc")
    );
  });
});

describe("singleNumber", () => {
  it("all metrics produce single number", () => {
    expect(singleNumber("accuracy")).toBe(true);
  });
  it("auc roc also single number", () => {
    expect(singleNumber("auc_roc")).toBe(true);
  });
});

describe("penalizesFalsePositives", () => {
  it("precision penalizes false positives", () => {
    expect(penalizesFalsePositives("precision")).toBe(true);
  });
  it("recall does not", () => {
    expect(penalizesFalsePositives("recall")).toBe(false);
  });
});

describe("bestUseCase", () => {
  it("recall best for medical diagnosis", () => {
    expect(bestUseCase("recall")).toBe("medical_diagnosis");
  });
});

describe("formula", () => {
  it("f1 score is harmonic mean", () => {
    expect(formula("f1_score")).toBe("harmonic_mean_prec_rec");
  });
});

describe("modelEvaluationMetrics", () => {
  it("returns 5 metrics", () => {
    expect(modelEvaluationMetrics()).toHaveLength(5);
  });
});
