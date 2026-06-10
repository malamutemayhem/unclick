import { describe, it, expect } from "vitest";
import {
  fabricHold, easeOfUse, fabricSafe, sizeRange,
  hoopCost, handsFree, forDisplay, frameMaterial,
  bestProject, embroidHoops,
} from "../embroid-hoop-calc.js";

describe("fabricHold", () => {
  it("scroll frame bar best fabric hold", () => {
    expect(fabricHold("scroll_frame_bar")).toBeGreaterThan(fabricHold("wood_round_classic"));
  });
});

describe("easeOfUse", () => {
  it("spring tension metal easiest to use", () => {
    expect(easeOfUse("spring_tension_metal")).toBeGreaterThan(easeOfUse("scroll_frame_bar"));
  });
});

describe("fabricSafe", () => {
  it("scroll frame bar safest for fabric", () => {
    expect(fabricSafe("scroll_frame_bar")).toBeGreaterThan(fabricSafe("spring_tension_metal"));
  });
});

describe("sizeRange", () => {
  it("scroll frame bar widest size range", () => {
    expect(sizeRange("scroll_frame_bar")).toBeGreaterThan(sizeRange("spring_tension_metal"));
  });
});

describe("hoopCost", () => {
  it("quilting hoop stand most expensive", () => {
    expect(hoopCost("quilting_hoop_stand")).toBeGreaterThan(hoopCost("wood_round_classic"));
  });
});

describe("handsFree", () => {
  it("quilting hoop stand is hands free", () => {
    expect(handsFree("quilting_hoop_stand")).toBe(true);
  });
  it("wood round classic is not hands free", () => {
    expect(handsFree("wood_round_classic")).toBe(false);
  });
});

describe("forDisplay", () => {
  it("wood round classic is for display", () => {
    expect(forDisplay("wood_round_classic")).toBe(true);
  });
  it("scroll frame bar is not for display", () => {
    expect(forDisplay("scroll_frame_bar")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("spring tension metal uses spring steel ring", () => {
    expect(frameMaterial("spring_tension_metal")).toBe("spring_steel_ring");
  });
});

describe("bestProject", () => {
  it("scroll frame bar best for large tapestry scroll", () => {
    expect(bestProject("scroll_frame_bar")).toBe("large_tapestry_scroll");
  });
});

describe("embroidHoops", () => {
  it("returns 5 types", () => {
    expect(embroidHoops()).toHaveLength(5);
  });
});
