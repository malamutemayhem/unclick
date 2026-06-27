import { describe, it, expect } from "vitest";
import { ConfusionMatrix } from "../confusion-matrix.js";

describe("ConfusionMatrix", () => {
  function createBinaryMatrix(): ConfusionMatrix {
    const cm = new ConfusionMatrix(["pos", "neg"]);
    cm.addBatch(
      ["pos", "pos", "pos", "neg", "neg", "neg", "pos", "neg", "pos", "neg"],
      ["pos", "pos", "neg", "neg", "neg", "pos", "pos", "neg", "neg", "neg"],
    );
    return cm;
  }

  it("add records predictions", () => {
    const cm = new ConfusionMatrix(["A", "B"]);
    cm.add("A", "A");
    expect(cm.matrix[0][0]).toBe(1);
  });

  it("addBatch records multiple predictions", () => {
    const cm = createBinaryMatrix();
    expect(cm.total()).toBe(10);
  });

  it("accuracy computes correctly", () => {
    const cm = createBinaryMatrix();
    expect(cm.accuracy()).toBe(0.7);
  });

  it("precision computes correctly", () => {
    const cm = createBinaryMatrix();
    const p = cm.precision("pos");
    expect(p).toBeGreaterThan(0);
    expect(p).toBeLessThanOrEqual(1);
  });

  it("recall computes correctly", () => {
    const cm = createBinaryMatrix();
    const r = cm.recall("pos");
    expect(r).toBeGreaterThan(0);
    expect(r).toBeLessThanOrEqual(1);
  });

  it("f1Score is harmonic mean of precision and recall", () => {
    const cm = createBinaryMatrix();
    const f1 = cm.f1Score("pos");
    expect(f1).toBeGreaterThan(0);
    expect(f1).toBeLessThanOrEqual(1);
  });

  it("macroPrecision averages across classes", () => {
    const cm = createBinaryMatrix();
    expect(cm.macroPrecision()).toBeGreaterThan(0);
  });

  it("macroRecall averages across classes", () => {
    const cm = createBinaryMatrix();
    expect(cm.macroRecall()).toBeGreaterThan(0);
  });

  it("macroF1 computes from macro precision and recall", () => {
    const cm = createBinaryMatrix();
    expect(cm.macroF1()).toBeGreaterThan(0);
  });

  it("render produces formatted output", () => {
    const cm = createBinaryMatrix();
    const text = cm.render();
    expect(text).toContain("pos");
    expect(text).toContain("neg");
  });

  it("perfect classifier has accuracy 1", () => {
    const cm = new ConfusionMatrix(["A", "B"]);
    cm.addBatch(["A", "A", "B", "B"], ["A", "A", "B", "B"]);
    expect(cm.accuracy()).toBe(1);
  });
});
