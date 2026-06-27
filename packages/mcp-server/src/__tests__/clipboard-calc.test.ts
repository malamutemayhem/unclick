import { describe, it, expect } from "vitest";
import {
  clipStrength, writeSurface, storageSpace, portability,
  boardCost, hasStorage, erasable, boardMaterial,
  bestUse, clipboards,
} from "../clipboard-calc.js";

describe("clipStrength", () => {
  it("aluminum low profile strongest clip", () => {
    expect(clipStrength("aluminum_low_profile")).toBeGreaterThan(clipStrength("magnetic_dry_erase"));
  });
});

describe("writeSurface", () => {
  it("aluminum low profile best write surface", () => {
    expect(writeSurface("aluminum_low_profile")).toBeGreaterThan(writeSurface("storage_box_lid"));
  });
});

describe("storageSpace", () => {
  it("storage box lid most storage space", () => {
    expect(storageSpace("storage_box_lid")).toBeGreaterThan(storageSpace("hardboard_spring_clip"));
  });
});

describe("portability", () => {
  it("folding nurse pocket most portable", () => {
    expect(portability("folding_nurse_pocket")).toBeGreaterThan(portability("storage_box_lid"));
  });
});

describe("boardCost", () => {
  it("magnetic dry erase most expensive", () => {
    expect(boardCost("magnetic_dry_erase")).toBeGreaterThan(boardCost("hardboard_spring_clip"));
  });
});

describe("hasStorage", () => {
  it("storage box lid has storage", () => {
    expect(hasStorage("storage_box_lid")).toBe(true);
  });
  it("hardboard spring clip does not", () => {
    expect(hasStorage("hardboard_spring_clip")).toBe(false);
  });
});

describe("erasable", () => {
  it("magnetic dry erase is erasable", () => {
    expect(erasable("magnetic_dry_erase")).toBe(true);
  });
  it("hardboard spring clip is not", () => {
    expect(erasable("hardboard_spring_clip")).toBe(false);
  });
});

describe("boardMaterial", () => {
  it("folding nurse pocket uses vinyl coated foldover", () => {
    expect(boardMaterial("folding_nurse_pocket")).toBe("vinyl_coated_foldover");
  });
});

describe("bestUse", () => {
  it("magnetic dry erase best for coaching play diagram", () => {
    expect(bestUse("magnetic_dry_erase")).toBe("coaching_play_diagram");
  });
});

describe("clipboards", () => {
  it("returns 5 types", () => {
    expect(clipboards()).toHaveLength(5);
  });
});
