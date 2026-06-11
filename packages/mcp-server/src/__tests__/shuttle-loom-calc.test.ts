import { describe, it, expect } from "vitest";
import {
  throwSmooth, weftEven, speedWeave, yarnRange,
  shuttleCost, tensioned, forRag, shuttleShape,
  bestUse, shuttleLooms,
} from "../shuttle-loom-calc.js";

describe("throwSmooth", () => {
  it("boat shuttle standard smoothest throw", () => {
    expect(throwSmooth("boat_shuttle_standard")).toBeGreaterThan(throwSmooth("rag_shuttle_wide"));
  });
});

describe("weftEven", () => {
  it("end feed tension most even weft", () => {
    expect(weftEven("end_feed_tension")).toBeGreaterThan(weftEven("rag_shuttle_wide"));
  });
});

describe("speedWeave", () => {
  it("ski shuttle long fastest weave", () => {
    expect(speedWeave("ski_shuttle_long")).toBeGreaterThan(speedWeave("stick_shuttle_flat"));
  });
});

describe("yarnRange", () => {
  it("rag shuttle wide widest yarn range", () => {
    expect(yarnRange("rag_shuttle_wide")).toBeGreaterThan(yarnRange("end_feed_tension"));
  });
});

describe("shuttleCost", () => {
  it("end feed tension most expensive", () => {
    expect(shuttleCost("end_feed_tension")).toBeGreaterThan(shuttleCost("stick_shuttle_flat"));
  });
});

describe("tensioned", () => {
  it("end feed tension is tensioned", () => {
    expect(tensioned("end_feed_tension")).toBe(true);
  });
  it("boat shuttle standard not tensioned", () => {
    expect(tensioned("boat_shuttle_standard")).toBe(false);
  });
});

describe("forRag", () => {
  it("rag shuttle wide is for rag", () => {
    expect(forRag("rag_shuttle_wide")).toBe(true);
  });
  it("boat shuttle standard not for rag", () => {
    expect(forRag("boat_shuttle_standard")).toBe(false);
  });
});

describe("shuttleShape", () => {
  it("ski shuttle long uses long ski curved", () => {
    expect(shuttleShape("ski_shuttle_long")).toBe("long_ski_curved");
  });
});

describe("bestUse", () => {
  it("boat shuttle standard best for general fine weave", () => {
    expect(bestUse("boat_shuttle_standard")).toBe("general_fine_weave");
  });
});

describe("shuttleLooms", () => {
  it("returns 5 types", () => {
    expect(shuttleLooms()).toHaveLength(5);
  });
});
