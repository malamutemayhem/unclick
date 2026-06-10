import { describe, it, expect } from "vitest";
import {
  capacity, organization, portability, aestheticAppeal,
  holderCost, tipsOver, wallMountable, holderMaterial,
  bestUser, penHolders,
} from "../pen-holder-calc.js";

describe("capacity", () => {
  it("rotating carousel most capacity", () => {
    expect(capacity("rotating_carousel")).toBeGreaterThan(capacity("leather_roll_wrap"));
  });
});

describe("organization", () => {
  it("rotating carousel best organization", () => {
    expect(organization("rotating_carousel")).toBeGreaterThan(organization("ceramic_cup_classic"));
  });
});

describe("portability", () => {
  it("leather roll wrap most portable", () => {
    expect(portability("leather_roll_wrap")).toBeGreaterThan(portability("magnetic_desk_strip"));
  });
});

describe("aestheticAppeal", () => {
  it("leather roll wrap highest aesthetic appeal", () => {
    expect(aestheticAppeal("leather_roll_wrap")).toBeGreaterThan(aestheticAppeal("mesh_metal_organizer"));
  });
});

describe("holderCost", () => {
  it("leather roll wrap most expensive", () => {
    expect(holderCost("leather_roll_wrap")).toBeGreaterThan(holderCost("mesh_metal_organizer"));
  });
});

describe("tipsOver", () => {
  it("no pen holder tips over", () => {
    expect(tipsOver("ceramic_cup_classic")).toBe(false);
    expect(tipsOver("rotating_carousel")).toBe(false);
  });
});

describe("wallMountable", () => {
  it("mesh metal organizer is wall mountable", () => {
    expect(wallMountable("mesh_metal_organizer")).toBe(true);
  });
  it("ceramic cup classic is not", () => {
    expect(wallMountable("ceramic_cup_classic")).toBe(false);
  });
});

describe("holderMaterial", () => {
  it("magnetic desk strip uses aluminum neodymium magnet", () => {
    expect(holderMaterial("magnetic_desk_strip")).toBe("aluminum_neodymium_magnet");
  });
});

describe("bestUser", () => {
  it("leather roll wrap best for artist calligrapher travel", () => {
    expect(bestUser("leather_roll_wrap")).toBe("artist_calligrapher_travel");
  });
});

describe("penHolders", () => {
  it("returns 5 types", () => {
    expect(penHolders()).toHaveLength(5);
  });
});
