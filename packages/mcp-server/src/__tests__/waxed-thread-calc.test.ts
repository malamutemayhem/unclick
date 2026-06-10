import { describe, it, expect } from "vitest";
import {
  strength, knotEase, waxCoat, fineness,
  threadCost, archival, natural, threadFiber,
  bestUse, waxedThreads,
} from "../waxed-thread-calc.js";

describe("strength", () => {
  it("polyester waxed smooth strongest", () => {
    expect(strength("polyester_waxed_smooth")).toBeGreaterThan(strength("cotton_waxed_soft"));
  });
});

describe("knotEase", () => {
  it("silk waxed fine easiest knot", () => {
    expect(knotEase("silk_waxed_fine")).toBeGreaterThan(knotEase("polyester_waxed_smooth"));
  });
});

describe("waxCoat", () => {
  it("hemp waxed rustic heaviest wax coat", () => {
    expect(waxCoat("hemp_waxed_rustic")).toBeGreaterThan(waxCoat("cotton_waxed_soft"));
  });
});

describe("fineness", () => {
  it("silk waxed fine finest", () => {
    expect(fineness("silk_waxed_fine")).toBeGreaterThan(fineness("hemp_waxed_rustic"));
  });
});

describe("threadCost", () => {
  it("silk waxed fine most expensive", () => {
    expect(threadCost("silk_waxed_fine")).toBeGreaterThan(threadCost("cotton_waxed_soft"));
  });
});

describe("archival", () => {
  it("linen waxed thick is archival", () => {
    expect(archival("linen_waxed_thick")).toBe(true);
  });
  it("hemp waxed rustic not archival", () => {
    expect(archival("hemp_waxed_rustic")).toBe(false);
  });
});

describe("natural", () => {
  it("linen waxed thick is natural", () => {
    expect(natural("linen_waxed_thick")).toBe(true);
  });
  it("polyester waxed smooth not natural", () => {
    expect(natural("polyester_waxed_smooth")).toBe(false);
  });
});

describe("threadFiber", () => {
  it("linen waxed thick uses flax beeswax coat", () => {
    expect(threadFiber("linen_waxed_thick")).toBe("flax_beeswax_coat");
  });
});

describe("bestUse", () => {
  it("linen waxed thick best for traditional book sew", () => {
    expect(bestUse("linen_waxed_thick")).toBe("traditional_book_sew");
  });
});

describe("waxedThreads", () => {
  it("returns 5 types", () => {
    expect(waxedThreads()).toHaveLength(5);
  });
});
