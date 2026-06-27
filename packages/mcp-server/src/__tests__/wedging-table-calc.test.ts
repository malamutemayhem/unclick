import { describe, it, expect } from "vitest";
import {
  surfaceGrip, moistureAbsorb, durability, heightComfort,
  tableCost, portable, absorbent, surfaceType,
  bestUse, wedgingTables,
} from "../wedging-table-calc.js";

describe("surfaceGrip", () => {
  it("canvas top grip best surface grip", () => {
    expect(surfaceGrip("canvas_top_grip")).toBeGreaterThan(surfaceGrip("portable_board_light"));
  });
});

describe("moistureAbsorb", () => {
  it("plaster slab standard best moisture absorb", () => {
    expect(moistureAbsorb("plaster_slab_standard")).toBeGreaterThan(moistureAbsorb("portable_board_light"));
  });
});

describe("durability", () => {
  it("concrete slab heavy most durable", () => {
    expect(durability("concrete_slab_heavy")).toBeGreaterThan(durability("plaster_slab_standard"));
  });
});

describe("heightComfort", () => {
  it("portable board light most comfortable height", () => {
    expect(heightComfort("portable_board_light")).toBeGreaterThan(heightComfort("concrete_slab_heavy"));
  });
});

describe("tableCost", () => {
  it("concrete slab heavy most expensive", () => {
    expect(tableCost("concrete_slab_heavy")).toBeGreaterThan(tableCost("portable_board_light"));
  });
});

describe("portable", () => {
  it("portable board light is portable", () => {
    expect(portable("portable_board_light")).toBe(true);
  });
  it("plaster slab standard not portable", () => {
    expect(portable("plaster_slab_standard")).toBe(false);
  });
});

describe("absorbent", () => {
  it("plaster slab standard is absorbent", () => {
    expect(absorbent("plaster_slab_standard")).toBe(true);
  });
  it("canvas top grip not absorbent", () => {
    expect(absorbent("canvas_top_grip")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("wire cut wedge uses plaster with wire", () => {
    expect(surfaceType("wire_cut_wedge")).toBe("plaster_with_wire");
  });
});

describe("bestUse", () => {
  it("plaster slab standard best for general clay wedge", () => {
    expect(bestUse("plaster_slab_standard")).toBe("general_clay_wedge");
  });
});

describe("wedgingTables", () => {
  it("returns 5 types", () => {
    expect(wedgingTables()).toHaveLength(5);
  });
});
