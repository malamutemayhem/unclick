import { describe, it, expect } from "vitest";
import {
  pinAbility, writeAbility, durability, aesthetics,
  boardCost, magnetic, selfHealing, surfaceMaterial,
  bestSpace, bulletinBoards,
} from "../bulletin-board-calc.js";

describe("pinAbility", () => {
  it("cork natural frame best pin ability", () => {
    expect(pinAbility("cork_natural_frame")).toBeGreaterThan(pinAbility("glass_dry_erase_modern"));
  });
});

describe("writeAbility", () => {
  it("glass dry erase modern best write ability", () => {
    expect(writeAbility("glass_dry_erase_modern")).toBeGreaterThan(writeAbility("cork_natural_frame"));
  });
});

describe("durability", () => {
  it("glass dry erase modern most durable", () => {
    expect(durability("glass_dry_erase_modern")).toBeGreaterThan(durability("foam_display_lightweight"));
  });
});

describe("aesthetics", () => {
  it("glass dry erase modern best aesthetics", () => {
    expect(aesthetics("glass_dry_erase_modern")).toBeGreaterThan(aesthetics("foam_display_lightweight"));
  });
});

describe("boardCost", () => {
  it("glass dry erase modern most expensive", () => {
    expect(boardCost("glass_dry_erase_modern")).toBeGreaterThan(boardCost("cork_natural_frame"));
  });
});

describe("magnetic", () => {
  it("magnetic whiteboard combo is magnetic", () => {
    expect(magnetic("magnetic_whiteboard_combo")).toBe(true);
  });
  it("cork natural frame is not", () => {
    expect(magnetic("cork_natural_frame")).toBe(false);
  });
});

describe("selfHealing", () => {
  it("cork natural frame is self healing", () => {
    expect(selfHealing("cork_natural_frame")).toBe(true);
  });
  it("glass dry erase modern is not", () => {
    expect(selfHealing("glass_dry_erase_modern")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("glass dry erase modern uses tempered glass magnetic", () => {
    expect(surfaceMaterial("glass_dry_erase_modern")).toBe("tempered_glass_magnetic");
  });
});

describe("bestSpace", () => {
  it("cork natural frame best for home office school classic", () => {
    expect(bestSpace("cork_natural_frame")).toBe("home_office_school_classic");
  });
});

describe("bulletinBoards", () => {
  it("returns 5 types", () => {
    expect(bulletinBoards()).toHaveLength(5);
  });
});
