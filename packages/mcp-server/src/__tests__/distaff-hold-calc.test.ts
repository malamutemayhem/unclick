import { describe, it, expect } from "vitest";
import {
  fiberHold, draftEase, fiberCapacity, portability,
  distaffCost, freestanding, forFlax, mountStyle,
  bestUse, distaffHolds,
} from "../distaff-hold-calc.js";

describe("fiberHold", () => {
  it("floor distaff tall best fiber hold", () => {
    expect(fiberHold("floor_distaff_tall")).toBeGreaterThan(fiberHold("belt_distaff_waist"));
  });
});

describe("draftEase", () => {
  it("belt distaff waist easiest draft", () => {
    expect(draftEase("belt_distaff_waist")).toBeGreaterThan(draftEase("lantern_cage_wrap"));
  });
});

describe("fiberCapacity", () => {
  it("floor distaff tall highest capacity", () => {
    expect(fiberCapacity("floor_distaff_tall")).toBeGreaterThan(fiberCapacity("belt_distaff_waist"));
  });
});

describe("portability", () => {
  it("belt distaff waist most portable", () => {
    expect(portability("belt_distaff_waist")).toBeGreaterThan(portability("floor_distaff_tall"));
  });
});

describe("distaffCost", () => {
  it("lantern cage wrap most expensive", () => {
    expect(distaffCost("lantern_cage_wrap")).toBeGreaterThan(distaffCost("belt_distaff_waist"));
  });
});

describe("freestanding", () => {
  it("floor distaff tall is freestanding", () => {
    expect(freestanding("floor_distaff_tall")).toBe(true);
  });
  it("belt distaff waist not freestanding", () => {
    expect(freestanding("belt_distaff_waist")).toBe(false);
  });
});

describe("forFlax", () => {
  it("floor distaff tall is for flax", () => {
    expect(forFlax("floor_distaff_tall")).toBe(true);
  });
  it("belt distaff waist not for flax", () => {
    expect(forFlax("belt_distaff_waist")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("russian paddle flat uses flat paddle board", () => {
    expect(mountStyle("russian_paddle_flat")).toBe("flat_paddle_board");
  });
});

describe("bestUse", () => {
  it("floor distaff tall best for flax linen spin", () => {
    expect(bestUse("floor_distaff_tall")).toBe("flax_linen_spin");
  });
});

describe("distaffHolds", () => {
  it("returns 5 types", () => {
    expect(distaffHolds()).toHaveLength(5);
  });
});
