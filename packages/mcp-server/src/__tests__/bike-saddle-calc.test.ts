import { describe, it, expect } from "vitest";
import {
  powerTransfer, comfortLevel, pressureRelief, saddleWeight,
  saddleCost, hasCutout, gelPadding, shellMaterial,
  bestRider, bikeSaddles,
} from "../bike-saddle-calc.js";

describe("powerTransfer", () => {
  it("racing narrow best power transfer", () => {
    expect(powerTransfer("racing_narrow")).toBeGreaterThan(powerTransfer("comfort_wide"));
  });
});

describe("comfortLevel", () => {
  it("comfort wide most comfortable", () => {
    expect(comfortLevel("comfort_wide")).toBeGreaterThan(comfortLevel("racing_narrow"));
  });
});

describe("pressureRelief", () => {
  it("cutout relief best pressure relief", () => {
    expect(pressureRelief("cutout_relief")).toBeGreaterThan(pressureRelief("racing_narrow"));
  });
});

describe("saddleWeight", () => {
  it("carbon lightweight lightest", () => {
    expect(saddleWeight("carbon_lightweight")).toBeGreaterThan(saddleWeight("comfort_wide"));
  });
});

describe("saddleCost", () => {
  it("carbon lightweight most expensive", () => {
    expect(saddleCost("carbon_lightweight")).toBeGreaterThan(saddleCost("comfort_wide"));
  });
});

describe("hasCutout", () => {
  it("cutout relief has cutout", () => {
    expect(hasCutout("cutout_relief")).toBe(true);
  });
  it("racing narrow does not", () => {
    expect(hasCutout("racing_narrow")).toBe(false);
  });
});

describe("gelPadding", () => {
  it("comfort wide has gel padding", () => {
    expect(gelPadding("comfort_wide")).toBe(true);
  });
  it("carbon lightweight does not", () => {
    expect(gelPadding("carbon_lightweight")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("carbon lightweight uses unidirectional carbon fiber", () => {
    expect(shellMaterial("carbon_lightweight")).toBe("unidirectional_carbon_fiber");
  });
});

describe("bestRider", () => {
  it("comfort wide for cruiser upright casual", () => {
    expect(bestRider("comfort_wide")).toBe("cruiser_upright_casual");
  });
});

describe("bikeSaddles", () => {
  it("returns 5 types", () => {
    expect(bikeSaddles()).toHaveLength(5);
  });
});
