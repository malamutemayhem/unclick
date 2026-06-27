import { describe, it, expect } from "vitest";
import {
  cableCapacity, installEase, accessibility, aestheticClean,
  trayCost, noDrilling, heightAdjustFriendly, trayMaterial,
  bestDesk, cableTrays,
} from "../cable-tray-calc.js";

describe("cableCapacity", () => {
  it("under desk mesh most cable capacity", () => {
    expect(cableCapacity("under_desk_mesh")).toBeGreaterThan(cableCapacity("j_channel_adhesive"));
  });
});

describe("installEase", () => {
  it("j channel adhesive easiest install", () => {
    expect(installEase("j_channel_adhesive")).toBeGreaterThan(installEase("raceway_wall_mount"));
  });
});

describe("accessibility", () => {
  it("basket open wire most accessible", () => {
    expect(accessibility("basket_open_wire")).toBeGreaterThan(accessibility("raceway_wall_mount"));
  });
});

describe("aestheticClean", () => {
  it("raceway wall mount cleanest aesthetic", () => {
    expect(aestheticClean("raceway_wall_mount")).toBeGreaterThan(aestheticClean("basket_open_wire"));
  });
});

describe("trayCost", () => {
  it("spine vertebrae flex most expensive", () => {
    expect(trayCost("spine_vertebrae_flex")).toBeGreaterThan(trayCost("j_channel_adhesive"));
  });
});

describe("noDrilling", () => {
  it("j channel adhesive needs no drilling", () => {
    expect(noDrilling("j_channel_adhesive")).toBe(true);
  });
  it("under desk mesh does", () => {
    expect(noDrilling("under_desk_mesh")).toBe(false);
  });
});

describe("heightAdjustFriendly", () => {
  it("spine vertebrae flex is height adjust friendly", () => {
    expect(heightAdjustFriendly("spine_vertebrae_flex")).toBe(true);
  });
  it("under desk mesh is not", () => {
    expect(heightAdjustFriendly("under_desk_mesh")).toBe(false);
  });
});

describe("trayMaterial", () => {
  it("spine vertebrae flex uses abs linked segments", () => {
    expect(trayMaterial("spine_vertebrae_flex")).toBe("abs_linked_segments");
  });
});

describe("bestDesk", () => {
  it("spine vertebrae flex best for standing desk up down", () => {
    expect(bestDesk("spine_vertebrae_flex")).toBe("standing_desk_up_down");
  });
});

describe("cableTrays", () => {
  it("returns 5 types", () => {
    expect(cableTrays()).toHaveLength(5);
  });
});
