import { describe, it, expect } from "vitest";
import {
  stability, brushCount, cleanEase, portability,
  restCost, natural, multiHolder, restShape,
  bestUse, brushRests,
} from "../brush-rest-calc.js";

describe("stability", () => {
  it("metal stand modern most stable", () => {
    expect(stability("metal_stand_modern")).toBeGreaterThan(stability("bamboo_holder_natural"));
  });
});

describe("brushCount", () => {
  it("wooden rack multi holds most brushes", () => {
    expect(brushCount("wooden_rack_multi")).toBeGreaterThan(brushCount("ceramic_mountain_rest"));
  });
});

describe("cleanEase", () => {
  it("porcelain tray elegant easiest clean", () => {
    expect(cleanEase("porcelain_tray_elegant")).toBeGreaterThan(cleanEase("wooden_rack_multi"));
  });
});

describe("portability", () => {
  it("bamboo holder natural most portable", () => {
    expect(portability("bamboo_holder_natural")).toBeGreaterThan(portability("wooden_rack_multi"));
  });
});

describe("restCost", () => {
  it("porcelain tray elegant most expensive", () => {
    expect(restCost("porcelain_tray_elegant")).toBeGreaterThan(restCost("bamboo_holder_natural"));
  });
});

describe("natural", () => {
  it("bamboo holder natural is natural", () => {
    expect(natural("bamboo_holder_natural")).toBe(true);
  });
  it("metal stand modern not natural", () => {
    expect(natural("metal_stand_modern")).toBe(false);
  });
});

describe("multiHolder", () => {
  it("wooden rack multi is multi holder", () => {
    expect(multiHolder("wooden_rack_multi")).toBe(true);
  });
  it("ceramic mountain rest not multi holder", () => {
    expect(multiHolder("ceramic_mountain_rest")).toBe(false);
  });
});

describe("restShape", () => {
  it("metal stand modern uses wire loop stand", () => {
    expect(restShape("metal_stand_modern")).toBe("wire_loop_stand");
  });
});

describe("bestUse", () => {
  it("ceramic mountain rest best for single brush writing", () => {
    expect(bestUse("ceramic_mountain_rest")).toBe("single_brush_writing");
  });
});

describe("brushRests", () => {
  it("returns 5 types", () => {
    expect(brushRests()).toHaveLength(5);
  });
});
