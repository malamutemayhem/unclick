import { describe, it, expect } from "vitest";
import {
  fiberHold, draftAccess, portability, fiberVariety,
  distaffCost, freestanding, forFlax, mountType,
  bestUse, distaffs,
} from "../distaff-calc.js";

describe("fiberHold", () => {
  it("floor stand tall best fiber hold", () => {
    expect(fiberHold("floor_stand_tall")).toBeGreaterThan(fiberHold("wrist_strap_hand"));
  });
});

describe("draftAccess", () => {
  it("cup top Russian best draft access", () => {
    expect(draftAccess("cup_top_Russian")).toBeGreaterThan(draftAccess("lantern_cage_hold"));
  });
});

describe("portability", () => {
  it("belt clip portable most portable", () => {
    expect(portability("belt_clip_portable")).toBeGreaterThan(portability("floor_stand_tall"));
  });
});

describe("fiberVariety", () => {
  it("cup top Russian most fiber variety", () => {
    expect(fiberVariety("cup_top_Russian")).toBeGreaterThan(fiberVariety("wrist_strap_hand"));
  });
});

describe("distaffCost", () => {
  it("lantern cage hold more expensive than belt clip", () => {
    expect(distaffCost("lantern_cage_hold")).toBeGreaterThan(distaffCost("belt_clip_portable"));
  });
});

describe("freestanding", () => {
  it("floor stand tall is freestanding", () => {
    expect(freestanding("floor_stand_tall")).toBe(true);
  });
  it("belt clip portable not freestanding", () => {
    expect(freestanding("belt_clip_portable")).toBe(false);
  });
});

describe("forFlax", () => {
  it("floor stand tall is for flax", () => {
    expect(forFlax("floor_stand_tall")).toBe(true);
  });
  it("wrist strap hand not for flax", () => {
    expect(forFlax("wrist_strap_hand")).toBe(false);
  });
});

describe("mountType", () => {
  it("floor stand tall uses floor stand pole", () => {
    expect(mountType("floor_stand_tall")).toBe("floor_stand_pole");
  });
});

describe("bestUse", () => {
  it("belt clip portable best for walk spin mobile", () => {
    expect(bestUse("belt_clip_portable")).toBe("walk_spin_mobile");
  });
});

describe("distaffs", () => {
  it("returns 5 types", () => {
    expect(distaffs()).toHaveLength(5);
  });
});
