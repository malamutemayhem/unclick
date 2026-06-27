import { describe, it, expect } from "vitest";
import {
  compartments, installEase, visibility, adjustability,
  dividerCost, toolFree, expandable, mountType,
  bestCloset, closetDividers,
} from "../closet-divider-calc.js";

describe("compartments", () => {
  it("modular cube system most compartments", () => {
    expect(compartments("modular_cube_system")).toBeGreaterThan(compartments("shelf_divider_clip"));
  });
});

describe("installEase", () => {
  it("shelf divider clip easiest install", () => {
    expect(installEase("shelf_divider_clip")).toBeGreaterThan(installEase("modular_cube_system"));
  });
});

describe("visibility", () => {
  it("door hook rack best visibility", () => {
    expect(visibility("door_hook_rack")).toBeGreaterThan(visibility("drawer_insert_grid"));
  });
});

describe("adjustability", () => {
  it("modular cube system most adjustable", () => {
    expect(adjustability("modular_cube_system")).toBeGreaterThan(adjustability("hanging_organizer"));
  });
});

describe("dividerCost", () => {
  it("modular cube system most expensive", () => {
    expect(dividerCost("modular_cube_system")).toBeGreaterThan(dividerCost("shelf_divider_clip"));
  });
});

describe("toolFree", () => {
  it("shelf divider clip is tool free", () => {
    expect(toolFree("shelf_divider_clip")).toBe(true);
  });
  it("modular cube system is not", () => {
    expect(toolFree("modular_cube_system")).toBe(false);
  });
});

describe("expandable", () => {
  it("modular cube system is expandable", () => {
    expect(expandable("modular_cube_system")).toBe(true);
  });
  it("shelf divider clip is not", () => {
    expect(expandable("shelf_divider_clip")).toBe(false);
  });
});

describe("mountType", () => {
  it("hanging organizer uses rod hook fabric shelf", () => {
    expect(mountType("hanging_organizer")).toBe("rod_hook_fabric_shelf");
  });
});

describe("bestCloset", () => {
  it("drawer insert grid for sock underwear drawer", () => {
    expect(bestCloset("drawer_insert_grid")).toBe("sock_underwear_drawer");
  });
});

describe("closetDividers", () => {
  it("returns 5 types", () => {
    expect(closetDividers()).toHaveLength(5);
  });
});
