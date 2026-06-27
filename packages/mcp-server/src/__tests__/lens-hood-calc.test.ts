import { describe, it, expect } from "vitest";
import {
  flareReduction, physicalProtect, compactStorage, compatibility,
  hoodCost, reverseMountable, filterFriendly, hoodMaterial,
  bestLens, lensHoods,
} from "../lens-hood-calc.js";

describe("flareReduction", () => {
  it("square matte box best flare reduction", () => {
    expect(flareReduction("square_matte_box")).toBeGreaterThan(flareReduction("collapsible_rubber_flex"));
  });
});

describe("physicalProtect", () => {
  it("square matte box best physical protection", () => {
    expect(physicalProtect("square_matte_box")).toBeGreaterThan(physicalProtect("built_in_retractable"));
  });
});

describe("compactStorage", () => {
  it("collapsible rubber flex most compact storage", () => {
    expect(compactStorage("collapsible_rubber_flex")).toBeGreaterThan(compactStorage("square_matte_box"));
  });
});

describe("compatibility", () => {
  it("collapsible rubber flex most compatible", () => {
    expect(compatibility("collapsible_rubber_flex")).toBeGreaterThan(compatibility("built_in_retractable"));
  });
});

describe("hoodCost", () => {
  it("square matte box most expensive", () => {
    expect(hoodCost("square_matte_box")).toBeGreaterThan(hoodCost("tulip_petal_wide"));
  });
});

describe("reverseMountable", () => {
  it("tulip petal wide is reverse mountable", () => {
    expect(reverseMountable("tulip_petal_wide")).toBe(true);
  });
  it("collapsible rubber flex is not reverse mountable", () => {
    expect(reverseMountable("collapsible_rubber_flex")).toBe(false);
  });
});

describe("filterFriendly", () => {
  it("tulip petal wide is filter friendly", () => {
    expect(filterFriendly("tulip_petal_wide")).toBe(true);
  });
  it("built in retractable is not filter friendly", () => {
    expect(filterFriendly("built_in_retractable")).toBe(false);
  });
});

describe("hoodMaterial", () => {
  it("square matte box uses aluminum bellows rail", () => {
    expect(hoodMaterial("square_matte_box")).toBe("aluminum_bellows_rail");
  });
});

describe("bestLens", () => {
  it("cylindrical round tele best for telephoto 70 200mm", () => {
    expect(bestLens("cylindrical_round_tele")).toBe("telephoto_70_200mm");
  });
});

describe("lensHoods", () => {
  it("returns 5 types", () => {
    expect(lensHoods()).toHaveLength(5);
  });
});
