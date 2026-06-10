import { describe, it, expect } from "vitest";
import {
  elegance, lightControl, stackHeight, cleanEase,
  shadeCost, lined, childSafe, fabricStyle,
  bestRoom, romanShades,
} from "../roman-shade-calc.js";

describe("elegance", () => {
  it("hobbled cascading most elegant", () => {
    expect(elegance("hobbled_cascading")).toBeGreaterThan(elegance("woven_wood_natural"));
  });
});

describe("lightControl", () => {
  it("flat fold classic best light control", () => {
    expect(lightControl("flat_fold_classic")).toBeGreaterThan(lightControl("woven_wood_natural"));
  });
});

describe("stackHeight", () => {
  it("flat fold classic best stack height", () => {
    expect(stackHeight("flat_fold_classic")).toBeGreaterThan(stackHeight("balloon_gathered_pouf"));
  });
});

describe("cleanEase", () => {
  it("flat fold classic easiest to clean", () => {
    expect(cleanEase("flat_fold_classic")).toBeGreaterThan(cleanEase("balloon_gathered_pouf"));
  });
});

describe("shadeCost", () => {
  it("balloon gathered pouf most expensive", () => {
    expect(shadeCost("balloon_gathered_pouf")).toBeGreaterThan(shadeCost("flat_fold_classic"));
  });
});

describe("lined", () => {
  it("flat fold classic is lined", () => {
    expect(lined("flat_fold_classic")).toBe(true);
  });
  it("relaxed soft drape is not lined", () => {
    expect(lined("relaxed_soft_drape")).toBe(false);
  });
});

describe("childSafe", () => {
  it("all roman shades are child safe", () => {
    expect(childSafe("flat_fold_classic")).toBe(true);
    expect(childSafe("woven_wood_natural")).toBe(true);
  });
});

describe("fabricStyle", () => {
  it("hobbled cascading uses waterfall cascade fold", () => {
    expect(fabricStyle("hobbled_cascading")).toBe("waterfall_cascade_fold");
  });
});

describe("bestRoom", () => {
  it("flat fold classic best for modern clean any room", () => {
    expect(bestRoom("flat_fold_classic")).toBe("modern_clean_any_room");
  });
});

describe("romanShades", () => {
  it("returns 5 types", () => {
    expect(romanShades()).toHaveLength(5);
  });
});
