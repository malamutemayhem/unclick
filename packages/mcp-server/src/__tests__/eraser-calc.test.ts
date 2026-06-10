import { describe, it, expect } from "vitest";
import {
  erasingPower, paperGentle, smearFree, precisionDetail,
  eraserCost, reusable, erasesInk, eraserMaterial,
  bestUse, erasers,
} from "../eraser-calc.js";

describe("erasingPower", () => {
  it("electric battery strongest erasing", () => {
    expect(erasingPower("electric_battery")).toBeGreaterThan(erasingPower("kneaded_putty"));
  });
});

describe("paperGentle", () => {
  it("kneaded putty most gentle", () => {
    expect(paperGentle("kneaded_putty")).toBeGreaterThan(paperGentle("ink_sand_grit"));
  });
});

describe("smearFree", () => {
  it("electric battery most smear free", () => {
    expect(smearFree("electric_battery")).toBeGreaterThan(smearFree("pink_rubber"));
  });
});

describe("precisionDetail", () => {
  it("electric battery best precision", () => {
    expect(precisionDetail("electric_battery")).toBeGreaterThan(precisionDetail("pink_rubber"));
  });
});

describe("eraserCost", () => {
  it("electric battery most expensive", () => {
    expect(eraserCost("electric_battery")).toBeGreaterThan(eraserCost("pink_rubber"));
  });
});

describe("reusable", () => {
  it("kneaded putty is reusable", () => {
    expect(reusable("kneaded_putty")).toBe(true);
  });
  it("white vinyl is not", () => {
    expect(reusable("white_vinyl")).toBe(false);
  });
});

describe("erasesInk", () => {
  it("ink sand grit erases ink", () => {
    expect(erasesInk("ink_sand_grit")).toBe(true);
  });
  it("pink rubber does not", () => {
    expect(erasesInk("pink_rubber")).toBe(false);
  });
});

describe("eraserMaterial", () => {
  it("kneaded putty uses malleable rubber putty", () => {
    expect(eraserMaterial("kneaded_putty")).toBe("malleable_rubber_putty");
  });
});

describe("bestUse", () => {
  it("kneaded putty best for charcoal pastel lift", () => {
    expect(bestUse("kneaded_putty")).toBe("charcoal_pastel_lift");
  });
});

describe("erasers", () => {
  it("returns 5 types", () => {
    expect(erasers()).toHaveLength(5);
  });
});
