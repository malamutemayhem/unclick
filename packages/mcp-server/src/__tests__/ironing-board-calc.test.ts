import { describe, it, expect } from "vitest";
import {
  ironingSurface, stability, storageEase, heightAdjust,
  boardCost, foldFlat, ironRest, coverType,
  bestSetup, ironingBoards,
} from "../ironing-board-calc.js";

describe("ironingSurface", () => {
  it("full size stand largest ironing surface", () => {
    expect(ironingSurface("full_size_stand")).toBeGreaterThan(ironingSurface("sleeve_board"));
  });
});

describe("stability", () => {
  it("built in wall cabinet most stable", () => {
    expect(stability("built_in_wall_cabinet")).toBeGreaterThan(stability("over_door_fold"));
  });
});

describe("storageEase", () => {
  it("over door fold easiest storage", () => {
    expect(storageEase("over_door_fold")).toBeGreaterThan(storageEase("full_size_stand"));
  });
});

describe("heightAdjust", () => {
  it("full size stand most height adjust", () => {
    expect(heightAdjust("full_size_stand")).toBeGreaterThan(heightAdjust("sleeve_board"));
  });
});

describe("boardCost", () => {
  it("built in wall cabinet most expensive", () => {
    expect(boardCost("built_in_wall_cabinet")).toBeGreaterThan(boardCost("tabletop_mini"));
  });
});

describe("foldFlat", () => {
  it("full size stand folds flat", () => {
    expect(foldFlat("full_size_stand")).toBe(true);
  });
  it("sleeve board does not", () => {
    expect(foldFlat("sleeve_board")).toBe(false);
  });
});

describe("ironRest", () => {
  it("full size stand has iron rest", () => {
    expect(ironRest("full_size_stand")).toBe(true);
  });
  it("tabletop mini does not", () => {
    expect(ironRest("tabletop_mini")).toBe(false);
  });
});

describe("coverType", () => {
  it("built in wall cabinet uses premium thick pad", () => {
    expect(coverType("built_in_wall_cabinet")).toBe("premium_thick_pad");
  });
});

describe("bestSetup", () => {
  it("tabletop mini for apartment dorm travel", () => {
    expect(bestSetup("tabletop_mini")).toBe("apartment_dorm_travel");
  });
});

describe("ironingBoards", () => {
  it("returns 5 types", () => {
    expect(ironingBoards()).toHaveLength(5);
  });
});
