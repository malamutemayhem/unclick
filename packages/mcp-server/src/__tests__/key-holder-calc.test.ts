import { describe, it, expect } from "vitest";
import {
  keyCapacity, accessibility, security, aesthetics,
  holderCost, holdsExtras, findable, holderMaterial,
  bestUser, keyHolders,
} from "../key-holder-calc.js";

describe("keyCapacity", () => {
  it("cabinet box lockable highest capacity", () => {
    expect(keyCapacity("cabinet_box_lockable")).toBeGreaterThan(keyCapacity("smart_tracker_tile"));
  });
});

describe("accessibility", () => {
  it("magnetic strip bar most accessible", () => {
    expect(accessibility("magnetic_strip_bar")).toBeGreaterThan(accessibility("cabinet_box_lockable"));
  });
});

describe("security", () => {
  it("cabinet box lockable most secure", () => {
    expect(security("cabinet_box_lockable")).toBeGreaterThan(security("magnetic_strip_bar"));
  });
});

describe("aesthetics", () => {
  it("valet tray drop best aesthetics", () => {
    expect(aesthetics("valet_tray_drop")).toBeGreaterThan(aesthetics("smart_tracker_tile"));
  });
});

describe("holderCost", () => {
  it("smart tracker tile most expensive", () => {
    expect(holderCost("smart_tracker_tile")).toBeGreaterThan(holderCost("wall_mount_row"));
  });
});

describe("holdsExtras", () => {
  it("valet tray drop holds extras", () => {
    expect(holdsExtras("valet_tray_drop")).toBe(true);
  });
  it("wall mount row does not", () => {
    expect(holdsExtras("wall_mount_row")).toBe(false);
  });
});

describe("findable", () => {
  it("smart tracker tile is findable", () => {
    expect(findable("smart_tracker_tile")).toBe(true);
  });
  it("magnetic strip bar is not", () => {
    expect(findable("magnetic_strip_bar")).toBe(false);
  });
});

describe("holderMaterial", () => {
  it("magnetic strip bar uses neodymium walnut bar", () => {
    expect(holderMaterial("magnetic_strip_bar")).toBe("neodymium_walnut_bar");
  });
});

describe("bestUser", () => {
  it("smart tracker tile best for forgetful always losing", () => {
    expect(bestUser("smart_tracker_tile")).toBe("forgetful_always_losing");
  });
});

describe("keyHolders", () => {
  it("returns 5 types", () => {
    expect(keyHolders()).toHaveLength(5);
  });
});
