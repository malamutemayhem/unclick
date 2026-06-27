import { describe, it, expect } from "vitest";
import {
  tensileStrength, constructionTimeMinutes, captureEfficiency,
  windResistance, stickyThreadCount, geometric,
  underground, exampleSpider, silkInvestment, spiderWebTypes,
} from "../spider-web-calc.js";

describe("tensileStrength", () => {
  it("orb web is strongest", () => {
    expect(tensileStrength("orb")).toBeGreaterThan(
      tensileStrength("trapdoor")
    );
  });
});

describe("constructionTimeMinutes", () => {
  it("trapdoor takes longest to build", () => {
    expect(constructionTimeMinutes("trapdoor")).toBeGreaterThan(
      constructionTimeMinutes("orb")
    );
  });
});

describe("captureEfficiency", () => {
  it("orb web captures most efficiently", () => {
    expect(captureEfficiency("orb")).toBeGreaterThan(
      captureEfficiency("cobweb")
    );
  });
});

describe("windResistance", () => {
  it("trapdoor is most wind resistant", () => {
    expect(windResistance("trapdoor")).toBeGreaterThan(
      windResistance("sheet")
    );
  });
});

describe("stickyThreadCount", () => {
  it("orb has most sticky threads", () => {
    expect(stickyThreadCount("orb")).toBeGreaterThan(
      stickyThreadCount("trapdoor")
    );
  });
});

describe("geometric", () => {
  it("orb web is geometric", () => {
    expect(geometric("orb")).toBe(true);
  });
  it("funnel web is not", () => {
    expect(geometric("funnel")).toBe(false);
  });
});

describe("underground", () => {
  it("trapdoor web is underground", () => {
    expect(underground("trapdoor")).toBe(true);
  });
  it("orb web is not", () => {
    expect(underground("orb")).toBe(false);
  });
});

describe("exampleSpider", () => {
  it("cobweb example is black widow", () => {
    expect(exampleSpider("cobweb")).toBe("black_widow");
  });
});

describe("silkInvestment", () => {
  it("sheet web uses most silk", () => {
    expect(silkInvestment("sheet")).toBeGreaterThan(
      silkInvestment("trapdoor")
    );
  });
});

describe("spiderWebTypes", () => {
  it("returns 5 types", () => {
    expect(spiderWebTypes()).toHaveLength(5);
  });
});
