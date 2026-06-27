import { describe, it, expect } from "vitest";
import {
  moistureAbsorb, surfaceGrip, durability, cleanability,
  boardCost, absorbsWater, diyFriendly, surfaceType,
  bestUse, wedgingBoards,
} from "../wedging-board-calc.js";

describe("moistureAbsorb", () => {
  it("plaster slab absorb best moisture absorb", () => {
    expect(moistureAbsorb("plaster_slab_absorb")).toBeGreaterThan(moistureAbsorb("marble_smooth_cold"));
  });
});

describe("surfaceGrip", () => {
  it("canvas covered wood best surface grip", () => {
    expect(surfaceGrip("canvas_covered_wood")).toBeGreaterThan(surfaceGrip("marble_smooth_cold"));
  });
});

describe("durability", () => {
  it("concrete poured heavy most durable", () => {
    expect(durability("concrete_poured_heavy")).toBeGreaterThan(durability("plaster_slab_absorb"));
  });
});

describe("cleanability", () => {
  it("marble smooth cold easiest to clean", () => {
    expect(cleanability("marble_smooth_cold")).toBeGreaterThan(cleanability("canvas_covered_wood"));
  });
});

describe("boardCost", () => {
  it("marble smooth cold most expensive", () => {
    expect(boardCost("marble_smooth_cold")).toBeGreaterThan(boardCost("plaster_slab_absorb"));
  });
});

describe("absorbsWater", () => {
  it("plaster slab absorb absorbs water", () => {
    expect(absorbsWater("plaster_slab_absorb")).toBe(true);
  });
  it("marble smooth cold does not absorb water", () => {
    expect(absorbsWater("marble_smooth_cold")).toBe(false);
  });
});

describe("diyFriendly", () => {
  it("canvas covered wood is diy friendly", () => {
    expect(diyFriendly("canvas_covered_wood")).toBe(true);
  });
  it("marble smooth cold is not diy friendly", () => {
    expect(diyFriendly("marble_smooth_cold")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("plaster slab absorb uses porous plaster flat", () => {
    expect(surfaceType("plaster_slab_absorb")).toBe("porous_plaster_flat");
  });
});

describe("bestUse", () => {
  it("plaster slab absorb best for reclaim wet clay dry", () => {
    expect(bestUse("plaster_slab_absorb")).toBe("reclaim_wet_clay_dry");
  });
});

describe("wedgingBoards", () => {
  it("returns 5 types", () => {
    expect(wedgingBoards()).toHaveLength(5);
  });
});
