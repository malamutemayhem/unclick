import { describe, it, expect } from "vitest";
import {
  abvPercent, waterRatio, waterMl, loucheLevel, servingTemp,
  sugarCubes, dripRate, macerationDays, distillationTemp,
  thujoneLimit, colorSource, herbTypes,
} from "../absinthe-calc.js";

describe("abvPercent", () => {
  it("140 proof = 70%", () => {
    expect(abvPercent(140)).toBe(70);
  });
});

describe("waterRatio", () => {
  it("high abv = 5", () => {
    expect(waterRatio(70)).toBe(5);
  });
  it("low abv = 2", () => {
    expect(waterRatio(40)).toBe(2);
  });
});

describe("waterMl", () => {
  it("positive ml", () => {
    expect(waterMl(30, 60)).toBeGreaterThan(0);
  });
});

describe("loucheLevel", () => {
  it("no water = none", () => {
    expect(loucheLevel(65, 0.5)).toBe("none");
  });
  it("full louche", () => {
    expect(loucheLevel(65, 4)).toBe("full");
  });
});

describe("servingTemp", () => {
  it("is 4C", () => {
    expect(servingTemp()).toBe(4);
  });
});

describe("sugarCubes", () => {
  it("none = 0", () => {
    expect(sugarCubes("none")).toBe(0);
  });
});

describe("dripRate", () => {
  it("returns a string", () => {
    expect(dripRate()).toContain("drop");
  });
});

describe("macerationDays", () => {
  it("wormwood = 14", () => {
    expect(macerationDays("wormwood")).toBe(14);
  });
});

describe("distillationTemp", () => {
  it("is 78C", () => {
    expect(distillationTemp()).toBe(78);
  });
});

describe("thujoneLimit", () => {
  it("is 35 mg/L", () => {
    expect(thujoneLimit()).toBe(35);
  });
});

describe("colorSource", () => {
  it("returns 3 herbs", () => {
    expect(colorSource()).toHaveLength(3);
  });
});

describe("herbTypes", () => {
  it("returns 6 herbs", () => {
    expect(herbTypes()).toHaveLength(6);
  });
});
