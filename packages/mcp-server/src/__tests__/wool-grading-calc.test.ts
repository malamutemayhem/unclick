import { describe, it, expect } from "vitest";
import {
  micronRange, stapleLengthCm, crimpPerCm,
  softness, durability, feltingAbility,
  bestUse, yieldPercent, pricePerKg, woolGrades,
} from "../wool-grading-calc.js";

describe("micronRange", () => {
  it("superfine has smallest micron", () => {
    expect(micronRange("superfine")).toBeLessThan(
      micronRange("carpet")
    );
  });
});

describe("stapleLengthCm", () => {
  it("carpet has longest staple", () => {
    expect(stapleLengthCm("carpet")).toBeGreaterThan(
      stapleLengthCm("superfine")
    );
  });
});

describe("crimpPerCm", () => {
  it("superfine has most crimp", () => {
    expect(crimpPerCm("superfine")).toBeGreaterThan(
      crimpPerCm("carpet")
    );
  });
});

describe("softness", () => {
  it("superfine is softest", () => {
    expect(softness("superfine")).toBeGreaterThan(
      softness("carpet")
    );
  });
});

describe("durability", () => {
  it("carpet is most durable", () => {
    expect(durability("carpet")).toBeGreaterThan(
      durability("superfine")
    );
  });
});

describe("feltingAbility", () => {
  it("superfine felts best", () => {
    expect(feltingAbility("superfine")).toBeGreaterThan(
      feltingAbility("carpet")
    );
  });
});

describe("bestUse", () => {
  it("superfine is next to skin", () => {
    expect(bestUse("superfine")).toBe("next_to_skin");
  });
});

describe("yieldPercent", () => {
  it("carpet has highest yield", () => {
    expect(yieldPercent("carpet")).toBeGreaterThan(
      yieldPercent("superfine")
    );
  });
});

describe("pricePerKg", () => {
  it("superfine is most expensive", () => {
    expect(pricePerKg("superfine")).toBeGreaterThan(
      pricePerKg("carpet")
    );
  });
});

describe("woolGrades", () => {
  it("returns 5 grades", () => {
    expect(woolGrades()).toHaveLength(5);
  });
});
