import { describe, it, expect } from "vitest";
import {
  caneAgingMonths, tipThicknessMm, totalLengthMm, scrapingPasses,
  soakingTimeMinutes, lifespanHours, makingTimeMinutes, handMade,
  costPerReed, reedTypes,
} from "../reed-making-calc.js";

describe("caneAgingMonths", () => {
  it("double reeds need longer aging", () => {
    expect(caneAgingMonths("double_oboe")).toBeGreaterThan(
      caneAgingMonths("single_clarinet")
    );
  });
});

describe("tipThicknessMm", () => {
  it("oboe has thinnest tip", () => {
    expect(tipThicknessMm("double_oboe")).toBeLessThan(
      tipThicknessMm("single_clarinet")
    );
  });
});

describe("totalLengthMm", () => {
  it("sax reed is longest", () => {
    expect(totalLengthMm("single_sax")).toBeGreaterThan(
      totalLengthMm("bagpipe")
    );
  });
});

describe("scrapingPasses", () => {
  it("oboe needs most scraping", () => {
    expect(scrapingPasses("double_oboe")).toBeGreaterThan(
      scrapingPasses("single_clarinet")
    );
  });
});

describe("soakingTimeMinutes", () => {
  it("bagpipe soaks longest", () => {
    expect(soakingTimeMinutes("bagpipe")).toBeGreaterThan(
      soakingTimeMinutes("single_clarinet")
    );
  });
});

describe("lifespanHours", () => {
  it("bagpipe reeds last longest", () => {
    expect(lifespanHours("bagpipe")).toBeGreaterThan(
      lifespanHours("double_oboe")
    );
  });
});

describe("makingTimeMinutes", () => {
  it("bassoon takes longest to make", () => {
    expect(makingTimeMinutes("double_bassoon")).toBeGreaterThan(
      makingTimeMinutes("double_oboe")
    );
  });
});

describe("handMade", () => {
  it("oboe reeds are hand made", () => {
    expect(handMade("double_oboe")).toBe(true);
  });
  it("clarinet reeds are not hand made", () => {
    expect(handMade("single_clarinet")).toBe(false);
  });
});

describe("costPerReed", () => {
  it("bassoon is most expensive", () => {
    expect(costPerReed("double_bassoon")).toBeGreaterThan(
      costPerReed("single_clarinet")
    );
  });
});

describe("reedTypes", () => {
  it("returns 5 types", () => {
    expect(reedTypes()).toHaveLength(5);
  });
});
