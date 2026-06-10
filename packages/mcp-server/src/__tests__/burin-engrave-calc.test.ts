import { describe, it, expect } from "vitest";
import {
  lineControl, shadeAbility, durability, versatility,
  burinCost, forShading, needsMushroom, crossSection,
  bestUse, burinEngravers,
} from "../burin-engrave-calc.js";

describe("lineControl", () => {
  it("knife point hair best line control", () => {
    expect(lineControl("knife_point_hair")).toBeGreaterThan(lineControl("round_belly_shade"));
  });
});

describe("shadeAbility", () => {
  it("round belly shade best shading", () => {
    expect(shadeAbility("round_belly_shade")).toBeGreaterThan(shadeAbility("knife_point_hair"));
  });
});

describe("durability", () => {
  it("flat face letter most durable", () => {
    expect(durability("flat_face_letter")).toBeGreaterThan(durability("knife_point_hair"));
  });
});

describe("versatility", () => {
  it("square point line most versatile", () => {
    expect(versatility("square_point_line")).toBeGreaterThan(versatility("knife_point_hair"));
  });
});

describe("burinCost", () => {
  it("round belly shade more expensive", () => {
    expect(burinCost("round_belly_shade")).toBeGreaterThan(burinCost("square_point_line"));
  });
});

describe("forShading", () => {
  it("round belly shade is for shading", () => {
    expect(forShading("round_belly_shade")).toBe(true);
  });
  it("square point line not for shading", () => {
    expect(forShading("square_point_line")).toBe(false);
  });
});

describe("needsMushroom", () => {
  it("square point line needs mushroom", () => {
    expect(needsMushroom("square_point_line")).toBe(true);
  });
  it("flat face letter no mushroom needed", () => {
    expect(needsMushroom("flat_face_letter")).toBe(false);
  });
});

describe("crossSection", () => {
  it("lozenge diamond fine uses diamond lozenge thin", () => {
    expect(crossSection("lozenge_diamond_fine")).toBe("diamond_lozenge_thin");
  });
});

describe("bestUse", () => {
  it("knife point hair best for hairline trace cut", () => {
    expect(bestUse("knife_point_hair")).toBe("hairline_trace_cut");
  });
});

describe("burinEngravers", () => {
  it("returns 5 types", () => {
    expect(burinEngravers()).toHaveLength(5);
  });
});
