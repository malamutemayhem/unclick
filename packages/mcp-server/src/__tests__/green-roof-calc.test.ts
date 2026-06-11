import { describe, it, expect } from "vitest";
import {
  stormwater, insulation, biodiversity, maintenance,
  grCost, walkable, forRetrofit, substrate,
  bestUse, greenRoofTypes,
} from "../green-roof-calc.js";

describe("stormwater", () => {
  it("blue roof best stormwater", () => {
    expect(stormwater("blue_roof_detention")).toBeGreaterThan(stormwater("extensive_sedum_thin"));
  });
});

describe("insulation", () => {
  it("intensive best insulation", () => {
    expect(insulation("intensive_garden_deep")).toBeGreaterThan(insulation("blue_roof_detention"));
  });
});

describe("biodiversity", () => {
  it("intensive most biodiverse", () => {
    expect(biodiversity("intensive_garden_deep")).toBeGreaterThan(biodiversity("blue_roof_detention"));
  });
});

describe("maintenance", () => {
  it("extensive lowest maintenance", () => {
    expect(maintenance("extensive_sedum_thin")).toBeGreaterThan(maintenance("intensive_garden_deep"));
  });
});

describe("grCost", () => {
  it("intensive most expensive", () => {
    expect(grCost("intensive_garden_deep")).toBeGreaterThan(grCost("extensive_sedum_thin"));
  });
});

describe("walkable", () => {
  it("intensive is walkable", () => {
    expect(walkable("intensive_garden_deep")).toBe(true);
  });
  it("extensive not walkable", () => {
    expect(walkable("extensive_sedum_thin")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("extensive for retrofit", () => {
    expect(forRetrofit("extensive_sedum_thin")).toBe(true);
  });
  it("intensive not retrofit", () => {
    expect(forRetrofit("intensive_garden_deep")).toBe(false);
  });
});

describe("substrate", () => {
  it("biosolar uses sedum under pv", () => {
    expect(substrate("biosolar_pv_combo")).toBe("sedum_mat_beneath_pv_array");
  });
});

describe("bestUse", () => {
  it("blue roof for stormwater detention", () => {
    expect(bestUse("blue_roof_detention")).toBe("stormwater_detention_urban");
  });
});

describe("greenRoofTypes", () => {
  it("returns 5 types", () => {
    expect(greenRoofTypes()).toHaveLength(5);
  });
});
