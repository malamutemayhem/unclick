import { describe, it, expect } from "vitest";
import {
  complexityScore, dimensionalityImpact, informationRetention,
  computeCost, interpretability, requiresTraining,
  lossy, bestForDataType, outputType, featureEngineeringMethods,
} from "../feature-engineering-calc.js";

describe("complexityScore", () => {
  it("embedding most complex", () => {
    expect(complexityScore("embedding")).toBeGreaterThan(
      complexityScore("one_hot_encoding")
    );
  });
});

describe("dimensionalityImpact", () => {
  it("one hot encoding increases dimensions most", () => {
    expect(dimensionalityImpact("one_hot_encoding")).toBeGreaterThan(
      dimensionalityImpact("pca")
    );
  });
});

describe("informationRetention", () => {
  it("one hot encoding retains all info", () => {
    expect(informationRetention("one_hot_encoding")).toBeGreaterThan(
      informationRetention("binning")
    );
  });
});

describe("computeCost", () => {
  it("embedding most expensive", () => {
    expect(computeCost("embedding")).toBeGreaterThan(
      computeCost("normalization")
    );
  });
});

describe("interpretability", () => {
  it("one hot encoding most interpretable", () => {
    expect(interpretability("one_hot_encoding")).toBeGreaterThan(
      interpretability("embedding")
    );
  });
});

describe("requiresTraining", () => {
  it("pca requires training", () => {
    expect(requiresTraining("pca")).toBe(true);
  });
  it("normalization does not", () => {
    expect(requiresTraining("normalization")).toBe(false);
  });
});

describe("lossy", () => {
  it("binning is lossy", () => {
    expect(lossy("binning")).toBe(true);
  });
  it("one hot encoding is not", () => {
    expect(lossy("one_hot_encoding")).toBe(false);
  });
});

describe("bestForDataType", () => {
  it("pca for high dimensional data", () => {
    expect(bestForDataType("pca")).toBe("high_dimensional");
  });
});

describe("outputType", () => {
  it("embedding outputs dense vector", () => {
    expect(outputType("embedding")).toBe("dense_vector");
  });
});

describe("featureEngineeringMethods", () => {
  it("returns 5 methods", () => {
    expect(featureEngineeringMethods()).toHaveLength(5);
  });
});
