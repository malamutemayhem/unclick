import { describe, it, expect } from "vitest";
import {
  pinHoldStrength, aesthetics, surfaceArea, versatility,
  boardCost, hasWhiteboard, expandable, backingType,
  bestSpot, corkBoards,
} from "../cork-board-calc.js";

describe("pinHoldStrength", () => {
  it("natural cork framed best pin hold strength", () => {
    expect(pinHoldStrength("natural_cork_framed")).toBeGreaterThan(pinHoldStrength("decorative_tile_modular"));
  });
});

describe("aesthetics", () => {
  it("decorative tile modular best aesthetics", () => {
    expect(aesthetics("decorative_tile_modular")).toBeGreaterThan(aesthetics("self_healing_roll"));
  });
});

describe("surfaceArea", () => {
  it("self healing roll most surface area", () => {
    expect(surfaceArea("self_healing_roll")).toBeGreaterThan(surfaceArea("natural_cork_framed"));
  });
});

describe("versatility", () => {
  it("combo cork whiteboard most versatile", () => {
    expect(versatility("combo_cork_whiteboard")).toBeGreaterThan(versatility("fabric_wrapped_linen"));
  });
});

describe("boardCost", () => {
  it("decorative tile modular most expensive", () => {
    expect(boardCost("decorative_tile_modular")).toBeGreaterThan(boardCost("natural_cork_framed"));
  });
});

describe("hasWhiteboard", () => {
  it("combo cork whiteboard has whiteboard", () => {
    expect(hasWhiteboard("combo_cork_whiteboard")).toBe(true);
  });
  it("natural cork framed has no whiteboard", () => {
    expect(hasWhiteboard("natural_cork_framed")).toBe(false);
  });
});

describe("expandable", () => {
  it("decorative tile modular is expandable", () => {
    expect(expandable("decorative_tile_modular")).toBe(true);
  });
  it("natural cork framed is not expandable", () => {
    expect(expandable("natural_cork_framed")).toBe(false);
  });
});

describe("backingType", () => {
  it("fabric wrapped linen uses foam core padded", () => {
    expect(backingType("fabric_wrapped_linen")).toBe("foam_core_padded");
  });
});

describe("bestSpot", () => {
  it("combo cork whiteboard best for classroom planning", () => {
    expect(bestSpot("combo_cork_whiteboard")).toBe("classroom_planning");
  });
});

describe("corkBoards", () => {
  it("returns 5 types", () => {
    expect(corkBoards()).toHaveLength(5);
  });
});
