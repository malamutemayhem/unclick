import { describe, it, expect } from "vitest";
import {
  stitchDetail, easeOfUse, colorRange, yardage,
  threadCost, mercerized, forDoily, threadFiber,
  bestProject, crochetThreads,
} from "../crochet-thread-calc.js";

describe("stitchDetail", () => {
  it("size 30 delicate most stitch detail", () => {
    expect(stitchDetail("size_30_delicate")).toBeGreaterThan(stitchDetail("size_3_thick"));
  });
});

describe("easeOfUse", () => {
  it("size 3 thick easiest to use", () => {
    expect(easeOfUse("size_3_thick")).toBeGreaterThan(easeOfUse("size_30_delicate"));
  });
});

describe("colorRange", () => {
  it("size 10 classic widest color range", () => {
    expect(colorRange("size_10_classic")).toBeGreaterThan(colorRange("size_30_delicate"));
  });
});

describe("yardage", () => {
  it("size 30 delicate most yardage", () => {
    expect(yardage("size_30_delicate")).toBeGreaterThan(yardage("size_3_thick"));
  });
});

describe("threadCost", () => {
  it("size 30 delicate more expensive than size 10 classic", () => {
    expect(threadCost("size_30_delicate")).toBeGreaterThan(threadCost("size_10_classic"));
  });
});

describe("mercerized", () => {
  it("size 10 classic is mercerized", () => {
    expect(mercerized("size_10_classic")).toBe(true);
  });
  it("size 3 thick is not mercerized", () => {
    expect(mercerized("size_3_thick")).toBe(false);
  });
});

describe("forDoily", () => {
  it("size 10 classic is for doily", () => {
    expect(forDoily("size_10_classic")).toBe(true);
  });
  it("perle cotton sheen is not for doily", () => {
    expect(forDoily("perle_cotton_sheen")).toBe(false);
  });
});

describe("threadFiber", () => {
  it("perle cotton sheen uses pearl cotton twisted", () => {
    expect(threadFiber("perle_cotton_sheen")).toBe("pearl_cotton_twisted");
  });
});

describe("bestProject", () => {
  it("size 3 thick best for coaster basket sturdy", () => {
    expect(bestProject("size_3_thick")).toBe("coaster_basket_sturdy");
  });
});

describe("crochetThreads", () => {
  it("returns 5 types", () => {
    expect(crochetThreads()).toHaveLength(5);
  });
});
