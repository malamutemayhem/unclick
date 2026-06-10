import { describe, it, expect } from "vitest";
import {
  edgeFinish, seamStrength, threadingEase, versatilityScore,
  sergerCost, differentialFeed, coverstitch, looperType,
  bestUse, sergers,
} from "../serger-calc.js";

describe("edgeFinish", () => {
  it("five thread coverlock best edge finish", () => {
    expect(edgeFinish("five_thread_coverlock")).toBeGreaterThan(edgeFinish("chain_stitch"));
  });
});

describe("seamStrength", () => {
  it("five thread coverlock strongest seam", () => {
    expect(seamStrength("five_thread_coverlock")).toBeGreaterThan(seamStrength("three_thread_basic"));
  });
});

describe("threadingEase", () => {
  it("air jet threading easiest to thread", () => {
    expect(threadingEase("air_jet_threading")).toBeGreaterThan(threadingEase("five_thread_coverlock"));
  });
});

describe("versatilityScore", () => {
  it("five thread coverlock most versatile", () => {
    expect(versatilityScore("five_thread_coverlock")).toBeGreaterThan(versatilityScore("three_thread_basic"));
  });
});

describe("sergerCost", () => {
  it("air jet threading most expensive", () => {
    expect(sergerCost("air_jet_threading")).toBeGreaterThan(sergerCost("three_thread_basic"));
  });
});

describe("differentialFeed", () => {
  it("four thread safety has differential feed", () => {
    expect(differentialFeed("four_thread_safety")).toBe(true);
  });
  it("three thread basic does not", () => {
    expect(differentialFeed("three_thread_basic")).toBe(false);
  });
});

describe("coverstitch", () => {
  it("five thread coverlock has coverstitch", () => {
    expect(coverstitch("five_thread_coverlock")).toBe(true);
  });
  it("four thread safety does not", () => {
    expect(coverstitch("four_thread_safety")).toBe(false);
  });
});

describe("looperType", () => {
  it("air jet threading uses pneumatic auto looper", () => {
    expect(looperType("air_jet_threading")).toBe("pneumatic_auto_looper");
  });
});

describe("bestUse", () => {
  it("five thread coverlock for professional knitwear", () => {
    expect(bestUse("five_thread_coverlock")).toBe("professional_knitwear");
  });
});

describe("sergers", () => {
  it("returns 5 types", () => {
    expect(sergers()).toHaveLength(5);
  });
});
