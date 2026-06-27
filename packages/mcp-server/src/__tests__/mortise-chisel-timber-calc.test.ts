import { describe, it, expect } from "vitest";
import {
  wasteRemove, wallClean, depthReach, durability,
  chiselCost, socketHandle, forDeep, bladeSection,
  bestUse, mortiseChiselTimbers,
} from "../mortise-chisel-timber-calc.js";

describe("wasteRemove", () => {
  it("registered socket heavy best waste remove", () => {
    expect(wasteRemove("registered_socket_heavy")).toBeGreaterThan(wasteRemove("corner_chisel_square"));
  });
});

describe("wallClean", () => {
  it("swan neck lock mortise cleanest wall", () => {
    expect(wallClean("swan_neck_lock_mortise")).toBeGreaterThan(wallClean("pigsticker_narrow_deep"));
  });
});

describe("depthReach", () => {
  it("pigsticker narrow deep deepest reach", () => {
    expect(depthReach("pigsticker_narrow_deep")).toBeGreaterThan(depthReach("corner_chisel_square"));
  });
});

describe("durability", () => {
  it("registered socket heavy most durable", () => {
    expect(durability("registered_socket_heavy")).toBeGreaterThan(durability("swan_neck_lock_mortise"));
  });
});

describe("chiselCost", () => {
  it("japanese nomi laminate most expensive", () => {
    expect(chiselCost("japanese_nomi_laminate")).toBeGreaterThan(chiselCost("corner_chisel_square"));
  });
});

describe("socketHandle", () => {
  it("registered socket heavy has socket handle", () => {
    expect(socketHandle("registered_socket_heavy")).toBe(true);
  });
  it("swan neck lock mortise no socket handle", () => {
    expect(socketHandle("swan_neck_lock_mortise")).toBe(false);
  });
});

describe("forDeep", () => {
  it("pigsticker narrow deep is for deep", () => {
    expect(forDeep("pigsticker_narrow_deep")).toBe(true);
  });
  it("corner chisel square not for deep", () => {
    expect(forDeep("corner_chisel_square")).toBe(false);
  });
});

describe("bladeSection", () => {
  it("japanese nomi laminate uses laminate hollow back", () => {
    expect(bladeSection("japanese_nomi_laminate")).toBe("laminate_hollow_back");
  });
});

describe("bestUse", () => {
  it("pigsticker narrow deep best for deep narrow mortise", () => {
    expect(bestUse("pigsticker_narrow_deep")).toBe("deep_narrow_mortise");
  });
});

describe("mortiseChiselTimbers", () => {
  it("returns 5 types", () => {
    expect(mortiseChiselTimbers()).toHaveLength(5);
  });
});
