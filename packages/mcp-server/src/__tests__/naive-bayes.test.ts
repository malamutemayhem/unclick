import { describe, it, expect } from "vitest";
import { NaiveBayes } from "../naive-bayes.js";

describe("NaiveBayes", () => {
  const weatherData = [
    { features: { outlook: "sunny", wind: "weak" }, label: "yes" },
    { features: { outlook: "sunny", wind: "strong" }, label: "no" },
    { features: { outlook: "overcast", wind: "weak" }, label: "yes" },
    { features: { outlook: "overcast", wind: "strong" }, label: "yes" },
    { features: { outlook: "rain", wind: "weak" }, label: "yes" },
    { features: { outlook: "rain", wind: "strong" }, label: "no" },
  ];

  it("train adds samples", () => {
    const nb = new NaiveBayes();
    nb.train({ color: "red" }, "apple");
    expect(nb.classes).toContain("apple");
  });

  it("trainBatch adds multiple samples", () => {
    const nb = new NaiveBayes();
    nb.trainBatch(weatherData);
    expect(nb.classes.length).toBe(2);
  });

  it("predict returns most likely class", () => {
    const nb = new NaiveBayes();
    nb.trainBatch(weatherData);
    const result = nb.predict({ outlook: "overcast", wind: "weak" });
    expect(result).toBe("yes");
  });

  it("scores returns log probabilities for all classes", () => {
    const nb = new NaiveBayes();
    nb.trainBatch(weatherData);
    const s = nb.scores({ outlook: "sunny", wind: "weak" });
    expect(s).toHaveProperty("yes");
    expect(s).toHaveProperty("no");
  });

  it("accuracy measures classifier performance", () => {
    const nb = new NaiveBayes();
    nb.trainBatch(weatherData);
    const acc = nb.accuracy(weatherData);
    expect(acc).toBeGreaterThan(0.5);
  });

  it("classProbability returns prior", () => {
    const nb = new NaiveBayes();
    nb.trainBatch(weatherData);
    const pYes = nb.classProbability("yes");
    const pNo = nb.classProbability("no");
    expect(pYes + pNo).toBeCloseTo(1, 3);
  });

  it("handles unseen feature values with smoothing", () => {
    const nb = new NaiveBayes();
    nb.trainBatch(weatherData);
    const result = nb.predict({ outlook: "foggy", wind: "calm" });
    expect(["yes", "no"]).toContain(result);
  });

  it("classes returns all trained labels", () => {
    const nb = new NaiveBayes();
    nb.trainBatch([
      { features: { size: "small" }, label: "cat" },
      { features: { size: "large" }, label: "dog" },
      { features: { size: "medium" }, label: "fox" },
    ]);
    expect(nb.classes.length).toBe(3);
  });
});
