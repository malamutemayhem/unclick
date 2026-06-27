import { describe, it, expect } from "vitest";
import {
  capacity, accessibility, aesthetics, spaceEfficiency,
  organizerCost, wallMount, expandable, buildMaterial,
  bestSpot, mailOrganizers,
} from "../mail-organizer-calc.js";

describe("capacity", () => {
  it("letter tray stackable largest capacity", () => {
    expect(capacity("letter_tray_stackable")).toBeGreaterThan(capacity("hanging_door_pocket"));
  });
});

describe("accessibility", () => {
  it("rotating carousel spin most accessible", () => {
    expect(accessibility("rotating_carousel_spin")).toBeGreaterThan(accessibility("hanging_door_pocket"));
  });
});

describe("aesthetics", () => {
  it("desktop wood sorter best aesthetics", () => {
    expect(aesthetics("desktop_wood_sorter")).toBeGreaterThan(aesthetics("hanging_door_pocket"));
  });
});

describe("spaceEfficiency", () => {
  it("hanging door pocket most space efficient", () => {
    expect(spaceEfficiency("hanging_door_pocket")).toBeGreaterThan(spaceEfficiency("desktop_wood_sorter"));
  });
});

describe("organizerCost", () => {
  it("desktop wood sorter most expensive", () => {
    expect(organizerCost("desktop_wood_sorter")).toBeGreaterThan(organizerCost("hanging_door_pocket"));
  });
});

describe("wallMount", () => {
  it("wall mount metal tier is wall mount", () => {
    expect(wallMount("wall_mount_metal_tier")).toBe(true);
  });
  it("desktop wood sorter is not wall mount", () => {
    expect(wallMount("desktop_wood_sorter")).toBe(false);
  });
});

describe("expandable", () => {
  it("letter tray stackable is expandable", () => {
    expect(expandable("letter_tray_stackable")).toBe(true);
  });
  it("wall mount metal tier is not expandable", () => {
    expect(expandable("wall_mount_metal_tier")).toBe(false);
  });
});

describe("buildMaterial", () => {
  it("desktop wood sorter uses bamboo wood divider", () => {
    expect(buildMaterial("desktop_wood_sorter")).toBe("bamboo_wood_divider");
  });
});

describe("bestSpot", () => {
  it("wall mount metal tier best for entryway wall mudroom", () => {
    expect(bestSpot("wall_mount_metal_tier")).toBe("entryway_wall_mudroom");
  });
});

describe("mailOrganizers", () => {
  it("returns 5 types", () => {
    expect(mailOrganizers()).toHaveLength(5);
  });
});
