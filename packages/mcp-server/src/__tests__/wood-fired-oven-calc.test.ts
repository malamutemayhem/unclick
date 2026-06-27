import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, heatRetentionHours, buildDays,
  cookingArea, smokeExposure, fireRemoved,
  bestFood, fuelEfficiency, buildCost, ovenTypes,
} from "../wood-fired-oven-calc.js";

describe("maxTempCelsius", () => {
  it("igloo reaches highest temp", () => {
    expect(maxTempCelsius("igloo")).toBeGreaterThan(
      maxTempCelsius("white_oven")
    );
  });
});

describe("heatRetentionHours", () => {
  it("beehive retains heat longest", () => {
    expect(heatRetentionHours("beehive")).toBeGreaterThan(
      heatRetentionHours("white_oven")
    );
  });
});

describe("buildDays", () => {
  it("white oven takes longest to build", () => {
    expect(buildDays("white_oven")).toBeGreaterThan(
      buildDays("black_oven")
    );
  });
});

describe("cookingArea", () => {
  it("barrel vault has largest cooking area", () => {
    expect(cookingArea("barrel_vault")).toBeGreaterThan(
      cookingArea("black_oven")
    );
  });
});

describe("smokeExposure", () => {
  it("black oven has most smoke", () => {
    expect(smokeExposure("black_oven")).toBeGreaterThan(
      smokeExposure("white_oven")
    );
  });
});

describe("fireRemoved", () => {
  it("igloo removes fire before cooking", () => {
    expect(fireRemoved("igloo")).toBe(true);
  });
  it("black oven keeps fire", () => {
    expect(fireRemoved("black_oven")).toBe(false);
  });
});

describe("bestFood", () => {
  it("igloo best for pizza", () => {
    expect(bestFood("igloo")).toBe("pizza");
  });
});

describe("fuelEfficiency", () => {
  it("beehive is most fuel efficient", () => {
    expect(fuelEfficiency("beehive")).toBeGreaterThan(
      fuelEfficiency("black_oven")
    );
  });
});

describe("buildCost", () => {
  it("white oven costs most", () => {
    expect(buildCost("white_oven")).toBeGreaterThan(
      buildCost("black_oven")
    );
  });
});

describe("ovenTypes", () => {
  it("returns 5 types", () => {
    expect(ovenTypes()).toHaveLength(5);
  });
});
