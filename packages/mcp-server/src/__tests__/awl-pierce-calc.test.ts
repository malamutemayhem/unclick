import { describe, it, expect } from "vitest";
import {
  pierceClean, handleComfort, pointDurability, versatility,
  awlCost, forPaper, hasThread, pointShape,
  bestCraft, awlPierces,
} from "../awl-pierce-calc.js";

describe("pierceClean", () => {
  it("bookbinding straight cleanest pierce", () => {
    expect(pierceClean("bookbinding_straight")).toBeGreaterThan(pierceClean("scratch_awl_mark"));
  });
});

describe("handleComfort", () => {
  it("brad awl pilot most comfortable handle", () => {
    expect(handleComfort("brad_awl_pilot")).toBeGreaterThan(handleComfort("scratch_awl_mark"));
  });
});

describe("pointDurability", () => {
  it("diamond point leather most durable point", () => {
    expect(pointDurability("diamond_point_leather")).toBeGreaterThan(pointDurability("bookbinding_straight"));
  });
});

describe("versatility", () => {
  it("scratch awl mark most versatile", () => {
    expect(versatility("scratch_awl_mark")).toBeGreaterThan(versatility("bookbinding_straight"));
  });
});

describe("awlCost", () => {
  it("diamond point leather more expensive than scratch awl", () => {
    expect(awlCost("diamond_point_leather")).toBeGreaterThan(awlCost("scratch_awl_mark"));
  });
});

describe("forPaper", () => {
  it("bookbinding straight is for paper", () => {
    expect(forPaper("bookbinding_straight")).toBe(true);
  });
  it("diamond point leather is not for paper", () => {
    expect(forPaper("diamond_point_leather")).toBe(false);
  });
});

describe("hasThread", () => {
  it("sewing awl thread has thread", () => {
    expect(hasThread("sewing_awl_thread")).toBe(true);
  });
  it("bookbinding straight does not have thread", () => {
    expect(hasThread("bookbinding_straight")).toBe(false);
  });
});

describe("pointShape", () => {
  it("diamond point leather uses diamond facet point", () => {
    expect(pointShape("diamond_point_leather")).toBe("diamond_facet_point");
  });
});

describe("bestCraft", () => {
  it("bookbinding straight best for signature hole punch", () => {
    expect(bestCraft("bookbinding_straight")).toBe("signature_hole_punch");
  });
});

describe("awlPierces", () => {
  it("returns 5 types", () => {
    expect(awlPierces()).toHaveLength(5);
  });
});
