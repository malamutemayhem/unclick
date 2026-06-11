import { describe, it, expect } from "vitest";
import {
  shrinkControl, feltDense, speedFelt, textureEven,
  feltCost, manual, heated, feltMethod,
  bestUse, wetFelts,
} from "../wet-felt-calc.js";

describe("shrinkControl", () => {
  it("olive soap gentle best shrink control", () => {
    expect(shrinkControl("olive_soap_gentle")).toBeGreaterThan(shrinkControl("dryer_tumble_fast"));
  });
});

describe("feltDense", () => {
  it("dryer tumble fast densest felt", () => {
    expect(feltDense("dryer_tumble_fast")).toBeGreaterThan(feltDense("olive_soap_gentle"));
  });
});

describe("speedFelt", () => {
  it("dryer tumble fast fastest felt", () => {
    expect(speedFelt("dryer_tumble_fast")).toBeGreaterThan(speedFelt("olive_soap_gentle"));
  });
});

describe("textureEven", () => {
  it("olive soap gentle most even texture", () => {
    expect(textureEven("olive_soap_gentle")).toBeGreaterThan(textureEven("dryer_tumble_fast"));
  });
});

describe("feltCost", () => {
  it("bamboo mat textured most expensive", () => {
    expect(feltCost("bamboo_mat_textured")).toBeGreaterThan(feltCost("dryer_tumble_fast"));
  });
});

describe("manual", () => {
  it("hot water standard is manual", () => {
    expect(manual("hot_water_standard")).toBe(true);
  });
  it("dryer tumble fast not manual", () => {
    expect(manual("dryer_tumble_fast")).toBe(false);
  });
});

describe("heated", () => {
  it("hot water standard is heated", () => {
    expect(heated("hot_water_standard")).toBe(true);
  });
  it("olive soap gentle not heated", () => {
    expect(heated("olive_soap_gentle")).toBe(false);
  });
});

describe("feltMethod", () => {
  it("dryer tumble fast uses machine tumble heat", () => {
    expect(feltMethod("dryer_tumble_fast")).toBe("machine_tumble_heat");
  });
});

describe("bestUse", () => {
  it("hot water standard best for general wet felt", () => {
    expect(bestUse("hot_water_standard")).toBe("general_wet_felt");
  });
});

describe("wetFelts", () => {
  it("returns 5 types", () => {
    expect(wetFelts()).toHaveLength(5);
  });
});
