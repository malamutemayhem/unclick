import { describe, it, expect } from "vitest";
import {
  colorVibrancy, blendability, lightfastness, surfaceRange,
  markerCost, refillable, washable, inkType,
  bestUse, markers,
} from "../marker-calc.js";

describe("colorVibrancy", () => {
  it("alcohol art copic most vibrant", () => {
    expect(colorVibrancy("alcohol_art_copic")).toBeGreaterThan(colorVibrancy("dry_erase_whiteboard"));
  });
});

describe("blendability", () => {
  it("alcohol art copic most blendable", () => {
    expect(blendability("alcohol_art_copic")).toBeGreaterThan(blendability("permanent_sharpie"));
  });
});

describe("lightfastness", () => {
  it("permanent sharpie most lightfast", () => {
    expect(lightfastness("permanent_sharpie")).toBeGreaterThan(lightfastness("dry_erase_whiteboard"));
  });
});

describe("surfaceRange", () => {
  it("permanent sharpie widest surface range", () => {
    expect(surfaceRange("permanent_sharpie")).toBeGreaterThan(surfaceRange("dry_erase_whiteboard"));
  });
});

describe("markerCost", () => {
  it("alcohol art copic most expensive", () => {
    expect(markerCost("alcohol_art_copic")).toBeGreaterThan(markerCost("permanent_sharpie"));
  });
});

describe("refillable", () => {
  it("alcohol art copic is refillable", () => {
    expect(refillable("alcohol_art_copic")).toBe(true);
  });
  it("permanent sharpie is not", () => {
    expect(refillable("permanent_sharpie")).toBe(false);
  });
});

describe("washable", () => {
  it("dry erase whiteboard is washable", () => {
    expect(washable("dry_erase_whiteboard")).toBe(true);
  });
  it("permanent sharpie is not", () => {
    expect(washable("permanent_sharpie")).toBe(false);
  });
});

describe("inkType", () => {
  it("alcohol art copic uses alcohol dye refillable", () => {
    expect(inkType("alcohol_art_copic")).toBe("alcohol_dye_refillable");
  });
});

describe("bestUse", () => {
  it("alcohol art copic best for illustration manga render", () => {
    expect(bestUse("alcohol_art_copic")).toBe("illustration_manga_render");
  });
});

describe("markers", () => {
  it("returns 5 types", () => {
    expect(markers()).toHaveLength(5);
  });
});
