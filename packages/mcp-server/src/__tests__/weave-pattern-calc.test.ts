import { describe, it, expect } from "vitest";
import {
  threadCount, drapeability, durability,
  sheenLevel, reversible, weavingDifficulty,
  minShafts, bestApplication, yarnWastePercent, weavePatterns,
} from "../weave-pattern-calc.js";

describe("threadCount", () => {
  it("satin has highest thread count", () => {
    expect(threadCount("satin")).toBeGreaterThan(
      threadCount("basket")
    );
  });
});

describe("drapeability", () => {
  it("satin drapes best", () => {
    expect(drapeability("satin")).toBeGreaterThan(
      drapeability("basket")
    );
  });
});

describe("durability", () => {
  it("twill is most durable", () => {
    expect(durability("twill")).toBeGreaterThan(
      durability("satin")
    );
  });
});

describe("sheenLevel", () => {
  it("satin has highest sheen", () => {
    expect(sheenLevel("satin")).toBeGreaterThan(
      sheenLevel("plain")
    );
  });
});

describe("reversible", () => {
  it("plain weave is reversible", () => {
    expect(reversible("plain")).toBe(true);
  });
  it("satin is not", () => {
    expect(reversible("satin")).toBe(false);
  });
});

describe("weavingDifficulty", () => {
  it("satin is hardest to weave", () => {
    expect(weavingDifficulty("satin")).toBeGreaterThan(
      weavingDifficulty("plain")
    );
  });
});

describe("minShafts", () => {
  it("satin needs most shafts", () => {
    expect(minShafts("satin")).toBeGreaterThan(
      minShafts("plain")
    );
  });
});

describe("bestApplication", () => {
  it("twill is best for denim", () => {
    expect(bestApplication("twill")).toBe("denim");
  });
});

describe("yarnWastePercent", () => {
  it("satin wastes most yarn", () => {
    expect(yarnWastePercent("satin")).toBeGreaterThan(
      yarnWastePercent("plain")
    );
  });
});

describe("weavePatterns", () => {
  it("returns 5 patterns", () => {
    expect(weavePatterns()).toHaveLength(5);
  });
});
