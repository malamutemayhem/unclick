import { describe, it, expect } from "vitest";
import {
  holdingAngle, pageHolding, portability, weightCapacity,
  standCost, foldable, holdsTablet, standMaterial,
  bestUse, bookStands,
} from "../book-stand-calc.js";

describe("holdingAngle", () => {
  it("bamboo adjustable tray best holding angle", () => {
    expect(holdingAngle("bamboo_adjustable_tray")).toBeGreaterThan(holdingAngle("acrylic_page_holder"));
  });
});

describe("pageHolding", () => {
  it("acrylic page holder best page holding", () => {
    expect(pageHolding("acrylic_page_holder")).toBeGreaterThan(pageHolding("tablet_book_combo"));
  });
});

describe("portability", () => {
  it("tablet book combo most portable", () => {
    expect(portability("tablet_book_combo")).toBeGreaterThan(portability("cookbook_splash_guard"));
  });
});

describe("weightCapacity", () => {
  it("bamboo adjustable tray highest weight capacity", () => {
    expect(weightCapacity("bamboo_adjustable_tray")).toBeGreaterThan(weightCapacity("tablet_book_combo"));
  });
});

describe("standCost", () => {
  it("tablet book combo most expensive", () => {
    expect(standCost("tablet_book_combo")).toBeGreaterThan(standCost("wire_frame_desktop"));
  });
});

describe("foldable", () => {
  it("wire frame desktop is foldable", () => {
    expect(foldable("wire_frame_desktop")).toBe(true);
  });
  it("acrylic page holder is not", () => {
    expect(foldable("acrylic_page_holder")).toBe(false);
  });
});

describe("holdsTablet", () => {
  it("tablet book combo holds tablet", () => {
    expect(holdsTablet("tablet_book_combo")).toBe(true);
  });
  it("wire frame desktop does not", () => {
    expect(holdsTablet("wire_frame_desktop")).toBe(false);
  });
});

describe("standMaterial", () => {
  it("bamboo adjustable tray uses moso bamboo lacquered", () => {
    expect(standMaterial("bamboo_adjustable_tray")).toBe("moso_bamboo_lacquered");
  });
});

describe("bestUse", () => {
  it("cookbook splash guard best for kitchen recipe cooking", () => {
    expect(bestUse("cookbook_splash_guard")).toBe("kitchen_recipe_cooking");
  });
});

describe("bookStands", () => {
  it("returns 5 types", () => {
    expect(bookStands()).toHaveLength(5);
  });
});
