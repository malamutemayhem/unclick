import { describe, it, expect } from "vitest";
import {
  leafExpansion, fineFilter, easyClean, portability,
  infuserCost, reusable, multiCup, filterMaterial,
  bestTea, teaInfusers,
} from "../tea-infuser-calc.js";

describe("leafExpansion", () => {
  it("teapot built in best leaf expansion", () => {
    expect(leafExpansion("teapot_built_in")).toBeGreaterThan(leafExpansion("mesh_ball_chain"));
  });
});

describe("fineFilter", () => {
  it("cloth bag reusable finest filter", () => {
    expect(fineFilter("cloth_bag_reusable")).toBeGreaterThan(fineFilter("mesh_ball_chain"));
  });
});

describe("easyClean", () => {
  it("basket mug sit easiest clean", () => {
    expect(easyClean("basket_mug_sit")).toBeGreaterThan(easyClean("cloth_bag_reusable"));
  });
});

describe("portability", () => {
  it("travel bottle filter most portable", () => {
    expect(portability("travel_bottle_filter")).toBeGreaterThan(portability("teapot_built_in"));
  });
});

describe("infuserCost", () => {
  it("teapot built in most expensive", () => {
    expect(infuserCost("teapot_built_in")).toBeGreaterThan(infuserCost("mesh_ball_chain"));
  });
});

describe("reusable", () => {
  it("all infusers are reusable", () => {
    expect(reusable("mesh_ball_chain")).toBe(true);
    expect(reusable("cloth_bag_reusable")).toBe(true);
  });
});

describe("multiCup", () => {
  it("teapot built in serves multi cup", () => {
    expect(multiCup("teapot_built_in")).toBe(true);
  });
  it("mesh ball chain does not", () => {
    expect(multiCup("mesh_ball_chain")).toBe(false);
  });
});

describe("filterMaterial", () => {
  it("cloth bag reusable uses organic cotton drawstring", () => {
    expect(filterMaterial("cloth_bag_reusable")).toBe("organic_cotton_drawstring");
  });
});

describe("bestTea", () => {
  it("teapot built in best for gongfu multiple steep", () => {
    expect(bestTea("teapot_built_in")).toBe("gongfu_multiple_steep");
  });
});

describe("teaInfusers", () => {
  it("returns 5 types", () => {
    expect(teaInfusers()).toHaveLength(5);
  });
});
