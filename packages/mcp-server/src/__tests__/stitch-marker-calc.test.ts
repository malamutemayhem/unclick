import { describe, it, expect } from "vitest";
import {
  easeOfUse, stayPut, yarnSafe, visibility,
  markerCost, removable, countsRows, markerMaterial,
  bestCraft, stitchMarkers,
} from "../stitch-marker-calc.js";

describe("easeOfUse", () => {
  it("ring closed slide easiest to use", () => {
    expect(easeOfUse("ring_closed_slide")).toBeGreaterThan(easeOfUse("digital_row_counter"));
  });
});

describe("stayPut", () => {
  it("locking plastic clip stays best", () => {
    expect(stayPut("locking_plastic_clip")).toBeGreaterThan(stayPut("bulb_pin_removable"));
  });
});

describe("yarnSafe", () => {
  it("ring closed slide most yarn safe", () => {
    expect(yarnSafe("ring_closed_slide")).toBeGreaterThan(yarnSafe("bulb_pin_removable"));
  });
});

describe("visibility", () => {
  it("digital row counter most visibility", () => {
    expect(visibility("digital_row_counter")).toBeGreaterThan(visibility("split_ring_metal"));
  });
});

describe("markerCost", () => {
  it("digital row counter more expensive than split ring", () => {
    expect(markerCost("digital_row_counter")).toBeGreaterThan(markerCost("split_ring_metal"));
  });
});

describe("removable", () => {
  it("locking plastic clip is removable", () => {
    expect(removable("locking_plastic_clip")).toBe(true);
  });
  it("ring closed slide is not removable", () => {
    expect(removable("ring_closed_slide")).toBe(false);
  });
});

describe("countsRows", () => {
  it("digital row counter counts rows", () => {
    expect(countsRows("digital_row_counter")).toBe(true);
  });
  it("split ring metal does not count rows", () => {
    expect(countsRows("split_ring_metal")).toBe(false);
  });
});

describe("markerMaterial", () => {
  it("locking plastic clip uses abs plastic lobster", () => {
    expect(markerMaterial("locking_plastic_clip")).toBe("abs_plastic_lobster");
  });
});

describe("bestCraft", () => {
  it("ring closed slide best for circular knitting round", () => {
    expect(bestCraft("ring_closed_slide")).toBe("circular_knitting_round");
  });
});

describe("stitchMarkers", () => {
  it("returns 5 types", () => {
    expect(stitchMarkers()).toHaveLength(5);
  });
});
