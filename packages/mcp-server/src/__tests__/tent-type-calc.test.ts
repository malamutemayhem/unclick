import { describe, it, expect } from "vitest";
import {
  weatherRating, interiorSpace, setupSpeed, packSize,
  tentCost, freestanding, fourSeason, frameMaterial,
  bestCamping, tentTypes,
} from "../tent-type-calc.js";

describe("weatherRating", () => {
  it("tunnel best weather rating", () => {
    expect(weatherRating("tunnel")).toBeGreaterThan(weatherRating("ultralight_tarp"));
  });
});

describe("interiorSpace", () => {
  it("cabin most interior space", () => {
    expect(interiorSpace("cabin")).toBeGreaterThan(interiorSpace("ultralight_tarp"));
  });
});

describe("setupSpeed", () => {
  it("rooftop vehicle fastest setup", () => {
    expect(setupSpeed("rooftop_vehicle")).toBeGreaterThan(setupSpeed("cabin"));
  });
});

describe("packSize", () => {
  it("ultralight tarp smallest pack", () => {
    expect(packSize("ultralight_tarp")).toBeGreaterThan(packSize("rooftop_vehicle"));
  });
});

describe("tentCost", () => {
  it("rooftop vehicle most expensive", () => {
    expect(tentCost("rooftop_vehicle")).toBeGreaterThan(tentCost("ultralight_tarp"));
  });
});

describe("freestanding", () => {
  it("backpacking dome is freestanding", () => {
    expect(freestanding("backpacking_dome")).toBe(true);
  });
  it("tunnel is not", () => {
    expect(freestanding("tunnel")).toBe(false);
  });
});

describe("fourSeason", () => {
  it("tunnel is four season", () => {
    expect(fourSeason("tunnel")).toBe(true);
  });
  it("cabin is not", () => {
    expect(fourSeason("cabin")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("ultralight tarp uses trekking pole guyline", () => {
    expect(frameMaterial("ultralight_tarp")).toBe("trekking_pole_guyline");
  });
});

describe("bestCamping", () => {
  it("cabin for family car camping festival", () => {
    expect(bestCamping("cabin")).toBe("family_car_camping_festival");
  });
});

describe("tentTypes", () => {
  it("returns 5 types", () => {
    expect(tentTypes()).toHaveLength(5);
  });
});
