import { describe, it, expect } from "vitest";
import {
  threadDensity, drape, durability,
  patternComplexity, productionSpeed, reversible,
  shiny, bestApplication, costPerMeter, textileWeaves,
} from "../textile-weave-calc.js";

describe("threadDensity", () => {
  it("satin has highest density", () => {
    expect(threadDensity("satin")).toBeGreaterThan(
      threadDensity("plain")
    );
  });
});

describe("drape", () => {
  it("satin drapes best", () => {
    expect(drape("satin")).toBeGreaterThan(
      drape("tapestry")
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

describe("patternComplexity", () => {
  it("jacquard is most complex", () => {
    expect(patternComplexity("jacquard")).toBeGreaterThan(
      patternComplexity("plain")
    );
  });
});

describe("productionSpeed", () => {
  it("plain is fastest", () => {
    expect(productionSpeed("plain")).toBeGreaterThan(
      productionSpeed("tapestry")
    );
  });
});

describe("reversible", () => {
  it("plain is reversible", () => {
    expect(reversible("plain")).toBe(true);
  });
  it("satin is not", () => {
    expect(reversible("satin")).toBe(false);
  });
});

describe("shiny", () => {
  it("satin is shiny", () => {
    expect(shiny("satin")).toBe(true);
  });
  it("twill is not", () => {
    expect(shiny("twill")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("twill best for denim", () => {
    expect(bestApplication("twill")).toBe("denim");
  });
});

describe("costPerMeter", () => {
  it("tapestry is most expensive", () => {
    expect(costPerMeter("tapestry")).toBeGreaterThan(
      costPerMeter("plain")
    );
  });
});

describe("textileWeaves", () => {
  it("returns 5 types", () => {
    expect(textileWeaves()).toHaveLength(5);
  });
});
