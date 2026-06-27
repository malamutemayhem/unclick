import { describe, it, expect } from "vitest";
import {
  warpLength, easeOfUse, portability, stability,
  boardCost, wallMount, rotary, boardMaterial,
  bestUse, warpingBoards,
} from "../warping-board-calc.js";

describe("warpLength", () => {
  it("floor stand large longest warp", () => {
    expect(warpLength("floor_stand_large")).toBeGreaterThan(warpLength("table_clamp_small"));
  });
});

describe("easeOfUse", () => {
  it("table clamp small easiest to use", () => {
    expect(easeOfUse("table_clamp_small")).toBeGreaterThan(easeOfUse("warping_mill_rotate"));
  });
});

describe("portability", () => {
  it("folding travel port most portable", () => {
    expect(portability("folding_travel_port")).toBeGreaterThan(portability("wall_mount_fixed"));
  });
});

describe("stability", () => {
  it("wall mount fixed most stable", () => {
    expect(stability("wall_mount_fixed")).toBeGreaterThan(stability("folding_travel_port"));
  });
});

describe("boardCost", () => {
  it("warping mill rotate most expensive", () => {
    expect(boardCost("warping_mill_rotate")).toBeGreaterThan(boardCost("table_clamp_small"));
  });
});

describe("wallMount", () => {
  it("wall mount fixed is wall mount", () => {
    expect(wallMount("wall_mount_fixed")).toBe(true);
  });
  it("floor stand large not wall mount", () => {
    expect(wallMount("floor_stand_large")).toBe(false);
  });
});

describe("rotary", () => {
  it("warping mill rotate is rotary", () => {
    expect(rotary("warping_mill_rotate")).toBe(true);
  });
  it("wall mount fixed not rotary", () => {
    expect(rotary("wall_mount_fixed")).toBe(false);
  });
});

describe("boardMaterial", () => {
  it("wall mount fixed uses hardwood peg board", () => {
    expect(boardMaterial("wall_mount_fixed")).toBe("hardwood_peg_board");
  });
});

describe("bestUse", () => {
  it("warping mill rotate best for production long warp", () => {
    expect(bestUse("warping_mill_rotate")).toBe("production_long_warp");
  });
});

describe("warpingBoards", () => {
  it("returns 5 types", () => {
    expect(warpingBoards()).toHaveLength(5);
  });
});
