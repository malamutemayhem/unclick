import { describe, it, expect } from "vitest";
import {
  odorControl, dustLevel, absorbency, trackingMess,
  litterCost, flushable, biodegradable, baseMaterial,
  bestCat, catLitters,
} from "../cat-litter-calc.js";

describe("odorControl", () => {
  it("crystal silica best odor control", () => {
    expect(odorControl("crystal_silica")).toBeGreaterThan(odorControl("paper_recycled"));
  });
});

describe("dustLevel", () => {
  it("clumping clay most dust", () => {
    expect(dustLevel("clumping_clay")).toBeGreaterThan(dustLevel("paper_recycled"));
  });
});

describe("absorbency", () => {
  it("crystal silica most absorbent", () => {
    expect(absorbency("crystal_silica")).toBeGreaterThan(absorbency("paper_recycled"));
  });
});

describe("trackingMess", () => {
  it("clumping clay most tracking", () => {
    expect(trackingMess("clumping_clay")).toBeGreaterThan(trackingMess("paper_recycled"));
  });
});

describe("litterCost", () => {
  it("crystal silica most expensive", () => {
    expect(litterCost("crystal_silica")).toBeGreaterThan(litterCost("clumping_clay"));
  });
});

describe("flushable", () => {
  it("corn wheat is flushable", () => {
    expect(flushable("corn_wheat")).toBe(true);
  });
  it("clumping clay is not", () => {
    expect(flushable("clumping_clay")).toBe(false);
  });
});

describe("biodegradable", () => {
  it("pine pellet is biodegradable", () => {
    expect(biodegradable("pine_pellet")).toBe(true);
  });
  it("clumping clay is not", () => {
    expect(biodegradable("clumping_clay")).toBe(false);
  });
});

describe("baseMaterial", () => {
  it("crystal silica uses silica gel beads", () => {
    expect(baseMaterial("crystal_silica")).toBe("silica_gel_beads");
  });
});

describe("bestCat", () => {
  it("paper recycled for post surgery sensitive paw", () => {
    expect(bestCat("paper_recycled")).toBe("post_surgery_sensitive_paw");
  });
});

describe("catLitters", () => {
  it("returns 5 types", () => {
    expect(catLitters()).toHaveLength(5);
  });
});
