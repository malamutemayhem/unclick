import { describe, it, expect } from "vitest";
import {
  sharpnessResult, sharpSpeed, pencilSafe, noiseLevel,
  sharpenerCost, autoStop, shavingsCatcher, bladeType,
  bestUse, pencilSharpeners,
} from "../pencil-sharpener-calc.js";

describe("sharpnessResult", () => {
  it("helical blade sharpest result", () => {
    expect(sharpnessResult("helical_blade")).toBeGreaterThan(sharpnessResult("sandpaper_block"));
  });
});

describe("sharpSpeed", () => {
  it("electric desktop fastest", () => {
    expect(sharpSpeed("electric_desktop")).toBeGreaterThan(sharpSpeed("sandpaper_block"));
  });
});

describe("pencilSafe", () => {
  it("sandpaper block safest for pencils", () => {
    expect(pencilSafe("sandpaper_block")).toBeGreaterThan(pencilSafe("electric_desktop"));
  });
});

describe("noiseLevel", () => {
  it("electric desktop noisiest", () => {
    expect(noiseLevel("electric_desktop")).toBeGreaterThan(noiseLevel("sandpaper_block"));
  });
});

describe("sharpenerCost", () => {
  it("helical blade most expensive", () => {
    expect(sharpenerCost("helical_blade")).toBeGreaterThan(sharpenerCost("sandpaper_block"));
  });
});

describe("autoStop", () => {
  it("electric desktop has auto stop", () => {
    expect(autoStop("electric_desktop")).toBe(true);
  });
  it("manual hand crank does not", () => {
    expect(autoStop("manual_hand_crank")).toBe(false);
  });
});

describe("shavingsCatcher", () => {
  it("manual hand crank has shavings catcher", () => {
    expect(shavingsCatcher("manual_hand_crank")).toBe(true);
  });
  it("sandpaper block does not", () => {
    expect(shavingsCatcher("sandpaper_block")).toBe(false);
  });
});

describe("bladeType", () => {
  it("helical blade uses multi edge helical cutter", () => {
    expect(bladeType("helical_blade")).toBe("multi_edge_helical_cutter");
  });
});

describe("bestUse", () => {
  it("electric desktop for office high volume", () => {
    expect(bestUse("electric_desktop")).toBe("office_high_volume");
  });
});

describe("pencilSharpeners", () => {
  it("returns 5 types", () => {
    expect(pencilSharpeners()).toHaveLength(5);
  });
});
