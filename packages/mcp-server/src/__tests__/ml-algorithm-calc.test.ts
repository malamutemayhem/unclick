import { describe, it, expect } from "vitest";
import {
  trainingSpeed, predictionAccuracy, interpretability,
  memoryUsage, hyperparameterCount, handlesNonLinear,
  requiresFeatureScaling, bestForDataSize, paradigm, mlAlgorithms,
} from "../ml-algorithm-calc.js";

describe("trainingSpeed", () => {
  it("knn fastest training", () => {
    expect(trainingSpeed("knn")).toBeGreaterThan(
      trainingSpeed("neural_network")
    );
  });
});

describe("predictionAccuracy", () => {
  it("neural network most accurate", () => {
    expect(predictionAccuracy("neural_network")).toBeGreaterThan(
      predictionAccuracy("knn")
    );
  });
});

describe("interpretability", () => {
  it("knn most interpretable", () => {
    expect(interpretability("knn")).toBeGreaterThan(
      interpretability("neural_network")
    );
  });
});

describe("memoryUsage", () => {
  it("neural network uses most memory", () => {
    expect(memoryUsage("neural_network")).toBeGreaterThan(
      memoryUsage("gradient_boosting")
    );
  });
});

describe("hyperparameterCount", () => {
  it("neural network most hyperparameters", () => {
    expect(hyperparameterCount("neural_network")).toBeGreaterThan(
      hyperparameterCount("knn")
    );
  });
});

describe("handlesNonLinear", () => {
  it("random forest handles nonlinear", () => {
    expect(handlesNonLinear("random_forest")).toBe(true);
  });
  it("svm handles nonlinear", () => {
    expect(handlesNonLinear("svm")).toBe(true);
  });
});

describe("requiresFeatureScaling", () => {
  it("neural network requires scaling", () => {
    expect(requiresFeatureScaling("neural_network")).toBe(true);
  });
  it("random forest does not", () => {
    expect(requiresFeatureScaling("random_forest")).toBe(false);
  });
});

describe("bestForDataSize", () => {
  it("neural network for very large data", () => {
    expect(bestForDataSize("neural_network")).toBe("very_large");
  });
});

describe("paradigm", () => {
  it("gradient boosting is ensemble boosting", () => {
    expect(paradigm("gradient_boosting")).toBe("ensemble_boosting");
  });
});

describe("mlAlgorithms", () => {
  it("returns 5 algorithms", () => {
    expect(mlAlgorithms()).toHaveLength(5);
  });
});
