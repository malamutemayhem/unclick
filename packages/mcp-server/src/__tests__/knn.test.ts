import { describe, it, expect } from "vitest";
import { KNN } from "../knn.js";

describe("KNN", () => {
  function createClassifier(): KNN {
    const knn = new KNN();
    knn.addBatch([
      { features: [1, 1], label: "A" },
      { features: [1, 2], label: "A" },
      { features: [2, 1], label: "A" },
      { features: [5, 5], label: "B" },
      { features: [5, 6], label: "B" },
      { features: [6, 5], label: "B" },
    ]);
    return knn;
  }

  it("add increases data size", () => {
    const knn = new KNN();
    knn.add([1, 2], "A");
    expect(knn.size).toBe(1);
  });

  it("predict classifies nearest neighbors", () => {
    const knn = createClassifier();
    expect(knn.predict([1.5, 1.5], 3)).toBe("A");
    expect(knn.predict([5.5, 5.5], 3)).toBe("B");
  });

  it("predictWeighted uses distance weighting", () => {
    const knn = createClassifier();
    expect(knn.predictWeighted([1, 1], 3)).toBe("A");
  });

  it("accuracy measures classification quality", () => {
    const knn = createClassifier();
    const testData = [
      { features: [1.5, 1], label: "A" },
      { features: [6, 6], label: "B" },
    ];
    expect(knn.accuracy(testData, 3)).toBe(1);
  });

  it("nearestNeighbors returns k closest points", () => {
    const knn = createClassifier();
    const neighbors = knn.nearestNeighbors([1, 1], 2);
    expect(neighbors.length).toBe(2);
    expect(neighbors[0].label).toBe("A");
  });

  it("euclidean distance computes correctly", () => {
    expect(KNN.euclidean([0, 0], [3, 4])).toBe(5);
  });

  it("manhattan distance computes correctly", () => {
    expect(KNN.manhattan([0, 0], [3, 4])).toBe(7);
  });

  it("normalize scales features to 0-1", () => {
    const data = [[0, 10], [5, 20], [10, 30]];
    const normalized = KNN.normalize(data);
    expect(normalized[0][0]).toBe(0);
    expect(normalized[2][0]).toBe(1);
    expect(normalized[1][0]).toBe(0.5);
  });

  it("normalize handles uniform dimension", () => {
    const data = [[1, 5], [1, 10]];
    const normalized = KNN.normalize(data);
    expect(normalized[0][0]).toBe(0);
  });
});
