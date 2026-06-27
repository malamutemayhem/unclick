import { describe, it, expect } from "vitest";
import {
  markFree, heatResist, stabilityHold, reuseLife,
  stiltCost, reusable, forGlaze, contactType,
  bestUse, bisqueStilts,
} from "../bisque-stilt-calc.js";

describe("markFree", () => {
  it("bead rack hang most mark free", () => {
    expect(markFree("bead_rack_hang")).toBeGreaterThan(markFree("post_prop_column"));
  });
});

describe("heatResist", () => {
  it("post prop column best heat resist", () => {
    expect(heatResist("post_prop_column")).toBeGreaterThan(heatResist("bead_rack_hang"));
  });
});

describe("stabilityHold", () => {
  it("post prop column most stable hold", () => {
    expect(stabilityHold("post_prop_column")).toBeGreaterThan(stabilityHold("bead_rack_hang"));
  });
});

describe("reuseLife", () => {
  it("post prop column longest reuse life", () => {
    expect(reuseLife("post_prop_column")).toBeGreaterThan(reuseLife("bead_rack_hang"));
  });
});

describe("stiltCost", () => {
  it("bead rack hang most expensive", () => {
    expect(stiltCost("bead_rack_hang")).toBeGreaterThan(stiltCost("cookie_disc_flat"));
  });
});

describe("reusable", () => {
  it("three point wire is reusable", () => {
    expect(reusable("three_point_wire")).toBe(true);
  });
});

describe("forGlaze", () => {
  it("three point wire is for glaze", () => {
    expect(forGlaze("three_point_wire")).toBe(true);
  });
  it("post prop column not for glaze", () => {
    expect(forGlaze("post_prop_column")).toBe(false);
  });
});

describe("contactType", () => {
  it("star stilt flat uses star point spread", () => {
    expect(contactType("star_stilt_flat")).toBe("star_point_spread");
  });
});

describe("bestUse", () => {
  it("bead rack hang best for bead pendant fire", () => {
    expect(bestUse("bead_rack_hang")).toBe("bead_pendant_fire");
  });
});

describe("bisqueStilts", () => {
  it("returns 5 types", () => {
    expect(bisqueStilts()).toHaveLength(5);
  });
});
