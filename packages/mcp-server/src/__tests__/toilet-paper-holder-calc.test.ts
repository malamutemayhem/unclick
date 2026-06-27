import { describe, it, expect } from "vitest";
import {
  rollCapacity, rollChangeEase, aesthetics, stability,
  holderCost, noDrilling, hasShelf, mountType,
  bestBathroom, toiletPaperHolders,
} from "../toilet-paper-holder-calc.js";

describe("rollCapacity", () => {
  it("industrial jumbo roll biggest capacity", () => {
    expect(rollCapacity("industrial_jumbo_roll")).toBeGreaterThan(rollCapacity("spring_rod_recessed"));
  });
});

describe("rollChangeEase", () => {
  it("freestanding floor stand easiest roll change", () => {
    expect(rollChangeEase("freestanding_floor_stand")).toBeGreaterThan(rollChangeEase("industrial_jumbo_roll"));
  });
});

describe("aesthetics", () => {
  it("double roll shelf best aesthetics", () => {
    expect(aesthetics("double_roll_shelf")).toBeGreaterThan(aesthetics("industrial_jumbo_roll"));
  });
});

describe("stability", () => {
  it("spring rod recessed most stable", () => {
    expect(stability("spring_rod_recessed")).toBeGreaterThan(stability("freestanding_floor_stand"));
  });
});

describe("holderCost", () => {
  it("double roll shelf most expensive", () => {
    expect(holderCost("double_roll_shelf")).toBeGreaterThan(holderCost("spring_rod_recessed"));
  });
});

describe("noDrilling", () => {
  it("freestanding floor stand needs no drilling", () => {
    expect(noDrilling("freestanding_floor_stand")).toBe(true);
  });
  it("wall mount pivot needs drilling", () => {
    expect(noDrilling("wall_mount_pivot")).toBe(false);
  });
});

describe("hasShelf", () => {
  it("double roll shelf has shelf", () => {
    expect(hasShelf("double_roll_shelf")).toBe(true);
  });
  it("wall mount pivot does not", () => {
    expect(hasShelf("wall_mount_pivot")).toBe(false);
  });
});

describe("mountType", () => {
  it("industrial jumbo roll uses bolt mount enclosed", () => {
    expect(mountType("industrial_jumbo_roll")).toBe("bolt_mount_enclosed");
  });
});

describe("bestBathroom", () => {
  it("double roll shelf best for modern phone shelf combo", () => {
    expect(bestBathroom("double_roll_shelf")).toBe("modern_phone_shelf_combo");
  });
});

describe("toiletPaperHolders", () => {
  it("returns 5 types", () => {
    expect(toiletPaperHolders()).toHaveLength(5);
  });
});
