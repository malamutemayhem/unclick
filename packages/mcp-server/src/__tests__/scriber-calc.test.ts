import { describe, it, expect } from "vitest";
import {
  lineFineness, hardSurface, reachAngle, portability,
  scriberCost, retractable, gaugeMounted, tipMaterial,
  bestUse, scribers,
} from "../scriber-calc.js";

describe("lineFineness", () => {
  it("height gauge scribe finest line", () => {
    expect(lineFineness("height_gauge_scribe")).toBeGreaterThan(lineFineness("pocket_clip_retract"));
  });
});

describe("hardSurface", () => {
  it("carbide tip single best on hard surface", () => {
    expect(hardSurface("carbide_tip_single")).toBeGreaterThan(hardSurface("pocket_clip_retract"));
  });
});

describe("reachAngle", () => {
  it("double end bent best reach angle", () => {
    expect(reachAngle("double_end_bent")).toBeGreaterThan(reachAngle("carbide_tip_single"));
  });
});

describe("portability", () => {
  it("pocket clip retract most portable", () => {
    expect(portability("pocket_clip_retract")).toBeGreaterThan(portability("height_gauge_scribe"));
  });
});

describe("scriberCost", () => {
  it("height gauge scribe most expensive", () => {
    expect(scriberCost("height_gauge_scribe")).toBeGreaterThan(scriberCost("carbide_tip_single"));
  });
});

describe("retractable", () => {
  it("pocket clip retract is retractable", () => {
    expect(retractable("pocket_clip_retract")).toBe(true);
  });
  it("carbide tip single not retractable", () => {
    expect(retractable("carbide_tip_single")).toBe(false);
  });
});

describe("gaugeMounted", () => {
  it("surface gauge mount is gauge mounted", () => {
    expect(gaugeMounted("surface_gauge_mount")).toBe(true);
  });
  it("double end bent not gauge mounted", () => {
    expect(gaugeMounted("double_end_bent")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("carbide tip single uses tungsten carbide point", () => {
    expect(tipMaterial("carbide_tip_single")).toBe("tungsten_carbide_point");
  });
});

describe("bestUse", () => {
  it("surface gauge mount best for surface plate layout", () => {
    expect(bestUse("surface_gauge_mount")).toBe("surface_plate_layout");
  });
});

describe("scribers", () => {
  it("returns 5 types", () => {
    expect(scribers()).toHaveLength(5);
  });
});
