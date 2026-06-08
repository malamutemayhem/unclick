import { describe, it, expect } from "vitest";
import { DecisionTreeID3 } from "../decision-tree-id3.js";

describe("DecisionTreeID3", () => {
  const data = [
    { outlook: "sunny", temp: "hot", play: "no" },
    { outlook: "sunny", temp: "cool", play: "yes" },
    { outlook: "overcast", temp: "hot", play: "yes" },
    { outlook: "rain", temp: "cool", play: "yes" },
    { outlook: "rain", temp: "hot", play: "no" },
  ];

  it("trains and predicts correctly", () => {
    const tree = new DecisionTreeID3();
    tree.train(data, "play");
    expect(tree.predict({ outlook: "overcast", temp: "hot" })).toBe("yes");
  });

  it("predicts known training samples", () => {
    const tree = new DecisionTreeID3();
    tree.train(data, "play");
    for (const d of data) {
      expect(tree.predict(d)).toBe(d.play);
    }
  });

  it("handles single class data", () => {
    const sameClass = [
      { a: "x", label: "yes" },
      { a: "y", label: "yes" },
    ];
    const tree = new DecisionTreeID3();
    tree.train(sameClass, "label");
    expect(tree.predict({ a: "x" })).toBe("yes");
  });

  it("informationGain is non-negative", () => {
    const labels = ["yes", "yes", "no", "no"];
    const groups = new Map([["a", ["yes", "yes"]], ["b", ["no", "no"]]]);
    const gain = DecisionTreeID3.informationGain(labels, groups);
    expect(gain).toBeGreaterThanOrEqual(0);
  });

  it("perfect split has max gain", () => {
    const labels = ["yes", "yes", "no", "no"];
    const groups = new Map([["a", ["yes", "yes"]], ["b", ["no", "no"]]]);
    const gain = DecisionTreeID3.informationGain(labels, groups);
    expect(gain).toBeCloseTo(1, 5);
  });

  it("returns null for unknown attribute value", () => {
    const tree = new DecisionTreeID3();
    tree.train(data, "play");
    expect(tree.predict({ outlook: "snowy", temp: "cold" })).toBeNull();
  });
});
