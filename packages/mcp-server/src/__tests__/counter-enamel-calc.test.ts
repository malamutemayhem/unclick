import { describe, it, expect } from "vitest";
import {
  warpPrevent, adhesion, finishLook, fireTemp,
  enamelCost, transparent, forBegin, enamelBase,
  bestUse, counterEnamels,
} from "../counter-enamel-calc.js";

describe("warpPrevent", () => {
  it("matched color pair best warp prevent", () => {
    expect(warpPrevent("matched_color_pair")).toBeGreaterThan(warpPrevent("scrap_mixed_recycle"));
  });
});

describe("adhesion", () => {
  it("matched color pair best adhesion", () => {
    expect(adhesion("matched_color_pair")).toBeGreaterThan(adhesion("scrap_mixed_recycle"));
  });
});

describe("finishLook", () => {
  it("matched color pair best finish look", () => {
    expect(finishLook("matched_color_pair")).toBeGreaterThan(finishLook("scrap_mixed_recycle"));
  });
});

describe("fireTemp", () => {
  it("matched color pair best fire temp", () => {
    expect(fireTemp("matched_color_pair")).toBeGreaterThan(fireTemp("scrap_mixed_recycle"));
  });
});

describe("enamelCost", () => {
  it("matched color pair most expensive", () => {
    expect(enamelCost("matched_color_pair")).toBeGreaterThan(enamelCost("scrap_mixed_recycle"));
  });
});

describe("transparent", () => {
  it("clear flux base is transparent", () => {
    expect(transparent("clear_flux_base")).toBe(true);
  });
  it("black matte back not transparent", () => {
    expect(transparent("black_matte_back")).toBe(false);
  });
});

describe("forBegin", () => {
  it("clear flux base for beginners", () => {
    expect(forBegin("clear_flux_base")).toBe(true);
  });
  it("black matte back not for beginners", () => {
    expect(forBegin("black_matte_back")).toBe(false);
  });
});

describe("enamelBase", () => {
  it("clear flux base uses clear leaded flux", () => {
    expect(enamelBase("clear_flux_base")).toBe("clear_leaded_flux");
  });
});

describe("bestUse", () => {
  it("matched color pair best for show both sides", () => {
    expect(bestUse("matched_color_pair")).toBe("show_both_sides");
  });
});

describe("counterEnamels", () => {
  it("returns 5 types", () => {
    expect(counterEnamels()).toHaveLength(5);
  });
});
