import { describe, it, expect } from "vitest";
import {
  squareSize, easeOfUse, shapeVariety, portability,
  loomCost, joinable, continuous, loomMaterial,
  bestUse, pinLooms,
} from "../pin-loom-calc.js";

describe("squareSize", () => {
  it("weave it rect largest square size", () => {
    expect(squareSize("weave_it_rect")).toBeGreaterThan(squareSize("triangle_tri_loom"));
  });
});

describe("easeOfUse", () => {
  it("zoom loom square easiest to use", () => {
    expect(easeOfUse("zoom_loom_square")).toBeGreaterThan(easeOfUse("triangle_tri_loom"));
  });
});

describe("shapeVariety", () => {
  it("circle round loom most shape variety", () => {
    expect(shapeVariety("circle_round_loom")).toBeGreaterThan(shapeVariety("zoom_loom_square"));
  });
});

describe("portability", () => {
  it("zoom loom square most portable", () => {
    expect(portability("zoom_loom_square")).toBeGreaterThan(portability("circle_round_loom"));
  });
});

describe("loomCost", () => {
  it("weave it rect more expensive", () => {
    expect(loomCost("weave_it_rect")).toBeGreaterThan(loomCost("zoom_loom_square"));
  });
});

describe("joinable", () => {
  it("zoom loom square is joinable", () => {
    expect(joinable("zoom_loom_square")).toBe(true);
  });
  it("circle round loom not joinable", () => {
    expect(joinable("circle_round_loom")).toBe(false);
  });
});

describe("continuous", () => {
  it("zoom loom square supports continuous", () => {
    expect(continuous("zoom_loom_square")).toBe(true);
  });
  it("weave it rect not continuous", () => {
    expect(continuous("weave_it_rect")).toBe(false);
  });
});

describe("loomMaterial", () => {
  it("zoom loom square uses metal frame pins", () => {
    expect(loomMaterial("zoom_loom_square")).toBe("metal_frame_pins");
  });
});

describe("bestUse", () => {
  it("hexagon hex loom best for hexagon blanket tile", () => {
    expect(bestUse("hexagon_hex_loom")).toBe("hexagon_blanket_tile");
  });
});

describe("pinLooms", () => {
  it("returns 5 types", () => {
    expect(pinLooms()).toHaveLength(5);
  });
});
