import { describe, it, expect } from "vitest";
import {
  holdForce, corrosionResist, adjustEase, durability,
  hoopCost, reusable, forWine, hoopMaterial,
  bestUse, trussHoops,
} from "../truss-hoop-calc.js";

describe("holdForce", () => {
  it("spring steel tension most hold force", () => {
    expect(holdForce("spring_steel_tension")).toBeGreaterThan(holdForce("wooden_withy_woven"));
  });
});

describe("corrosionResist", () => {
  it("stainless steel wine best corrosion resist", () => {
    expect(corrosionResist("stainless_steel_wine")).toBeGreaterThan(corrosionResist("riveted_iron_traditional"));
  });
});

describe("adjustEase", () => {
  it("wooden withy woven easiest adjust", () => {
    expect(adjustEase("wooden_withy_woven")).toBeGreaterThan(adjustEase("riveted_iron_traditional"));
  });
});

describe("durability", () => {
  it("stainless steel wine most durable", () => {
    expect(durability("stainless_steel_wine")).toBeGreaterThan(durability("wooden_withy_woven"));
  });
});

describe("hoopCost", () => {
  it("stainless steel wine most expensive", () => {
    expect(hoopCost("stainless_steel_wine")).toBeGreaterThan(hoopCost("wooden_withy_woven"));
  });
});

describe("reusable", () => {
  it("galvanized steel standard is reusable", () => {
    expect(reusable("galvanized_steel_standard")).toBe(true);
  });
  it("wooden withy woven not reusable", () => {
    expect(reusable("wooden_withy_woven")).toBe(false);
  });
});

describe("forWine", () => {
  it("stainless steel wine is for wine", () => {
    expect(forWine("stainless_steel_wine")).toBe(true);
  });
  it("galvanized steel standard not for wine", () => {
    expect(forWine("galvanized_steel_standard")).toBe(false);
  });
});

describe("hoopMaterial", () => {
  it("wooden withy woven uses woven hazel withy", () => {
    expect(hoopMaterial("wooden_withy_woven")).toBe("woven_hazel_withy");
  });
});

describe("bestUse", () => {
  it("stainless steel wine best for wine barrel finish", () => {
    expect(bestUse("stainless_steel_wine")).toBe("wine_barrel_finish");
  });
});

describe("trussHoops", () => {
  it("returns 5 types", () => {
    expect(trussHoops()).toHaveLength(5);
  });
});
