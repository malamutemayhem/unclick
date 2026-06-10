import { describe, it, expect } from "vitest";
import {
  capacity, organization, portability, yarnProtect,
  bagCost, washable, seeThrough, bagMaterial,
  bestUse, projectBags,
} from "../project-bag-calc.js";

describe("capacity", () => {
  it("tote multi pocket largest capacity", () => {
    expect(capacity("tote_multi_pocket")).toBeGreaterThan(capacity("wristlet_small_travel"));
  });
});

describe("organization", () => {
  it("tote multi pocket best organization", () => {
    expect(organization("tote_multi_pocket")).toBeGreaterThan(organization("drawstring_cotton_basic"));
  });
});

describe("portability", () => {
  it("wristlet small travel most portable", () => {
    expect(portability("wristlet_small_travel")).toBeGreaterThan(portability("snap_frame_wide"));
  });
});

describe("yarnProtect", () => {
  it("zippered clear vinyl best yarn protection", () => {
    expect(yarnProtect("zippered_clear_vinyl")).toBeGreaterThan(yarnProtect("drawstring_cotton_basic"));
  });
});

describe("bagCost", () => {
  it("tote multi pocket most expensive", () => {
    expect(bagCost("tote_multi_pocket")).toBeGreaterThan(bagCost("drawstring_cotton_basic"));
  });
});

describe("washable", () => {
  it("drawstring cotton basic is washable", () => {
    expect(washable("drawstring_cotton_basic")).toBe(true);
  });
  it("snap frame wide is not washable", () => {
    expect(washable("snap_frame_wide")).toBe(false);
  });
});

describe("seeThrough", () => {
  it("zippered clear vinyl is see through", () => {
    expect(seeThrough("zippered_clear_vinyl")).toBe(true);
  });
  it("drawstring cotton basic is not see through", () => {
    expect(seeThrough("drawstring_cotton_basic")).toBe(false);
  });
});

describe("bagMaterial", () => {
  it("snap frame wide uses metal frame fabric", () => {
    expect(bagMaterial("snap_frame_wide")).toBe("metal_frame_fabric");
  });
});

describe("bestUse", () => {
  it("tote multi pocket best for multi project organize", () => {
    expect(bestUse("tote_multi_pocket")).toBe("multi_project_organize");
  });
});

describe("projectBags", () => {
  it("returns 5 types", () => {
    expect(projectBags()).toHaveLength(5);
  });
});
