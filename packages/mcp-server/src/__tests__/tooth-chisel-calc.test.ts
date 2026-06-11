import { describe, it, expect } from "vitest";
import {
  surfaceEven, textureControl, wasteSpeed, finishQuality,
  chiselCost, forMarble, forTexture, toothCount,
  bestUse, toothChisels,
} from "../tooth-chisel-calc.js";

describe("surfaceEven", () => {
  it("six tooth fine most even surface", () => {
    expect(surfaceEven("six_tooth_fine")).toBeGreaterThan(surfaceEven("two_tooth_coarse"));
  });
});

describe("textureControl", () => {
  it("bush tooth texture best texture control", () => {
    expect(textureControl("bush_tooth_texture")).toBeGreaterThan(textureControl("two_tooth_coarse"));
  });
});

describe("wasteSpeed", () => {
  it("two tooth coarse fastest waste", () => {
    expect(wasteSpeed("two_tooth_coarse")).toBeGreaterThan(wasteSpeed("six_tooth_fine"));
  });
});

describe("finishQuality", () => {
  it("six tooth fine best finish quality", () => {
    expect(finishQuality("six_tooth_fine")).toBeGreaterThan(finishQuality("two_tooth_coarse"));
  });
});

describe("chiselCost", () => {
  it("bush tooth texture more expensive than two tooth", () => {
    expect(chiselCost("bush_tooth_texture")).toBeGreaterThan(chiselCost("two_tooth_coarse"));
  });
});

describe("forMarble", () => {
  it("claw tooth marble is for marble", () => {
    expect(forMarble("claw_tooth_marble")).toBe(true);
  });
  it("four tooth medium not for marble", () => {
    expect(forMarble("four_tooth_medium")).toBe(false);
  });
});

describe("forTexture", () => {
  it("bush tooth texture is for texture", () => {
    expect(forTexture("bush_tooth_texture")).toBe(true);
  });
  it("four tooth medium not for texture", () => {
    expect(forTexture("four_tooth_medium")).toBe(false);
  });
});

describe("toothCount", () => {
  it("bush tooth texture uses grid bush pattern", () => {
    expect(toothCount("bush_tooth_texture")).toBe("grid_bush_pattern");
  });
});

describe("bestUse", () => {
  it("claw tooth marble best for marble sculpture shape", () => {
    expect(bestUse("claw_tooth_marble")).toBe("marble_sculpture_shape");
  });
});

describe("toothChisels", () => {
  it("returns 5 types", () => {
    expect(toothChisels()).toHaveLength(5);
  });
});
