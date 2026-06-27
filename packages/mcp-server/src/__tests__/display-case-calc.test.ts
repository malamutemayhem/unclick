import { describe, it, expect } from "vitest";
import {
  objectProtection, viewingAngle, fabricationCost, spaceRequired,
  accessForCurator, dustSealed, humidityControl, glazingMaterial,
  bestContent, displayCases,
} from "../display-case-calc.js";

describe("objectProtection", () => {
  it("climate controlled best protection", () => {
    expect(objectProtection("climate_controlled")).toBeGreaterThan(objectProtection("open_pedestal"));
  });
});

describe("viewingAngle", () => {
  it("freestanding best viewing angle", () => {
    expect(viewingAngle("freestanding")).toBeGreaterThan(viewingAngle("wall_mounted"));
  });
});

describe("fabricationCost", () => {
  it("climate controlled most expensive", () => {
    expect(fabricationCost("climate_controlled")).toBeGreaterThan(fabricationCost("open_pedestal"));
  });
});

describe("spaceRequired", () => {
  it("freestanding needs most space", () => {
    expect(spaceRequired("freestanding")).toBeGreaterThan(spaceRequired("wall_mounted"));
  });
});

describe("accessForCurator", () => {
  it("open pedestal easiest access", () => {
    expect(accessForCurator("open_pedestal")).toBeGreaterThan(accessForCurator("climate_controlled"));
  });
});

describe("dustSealed", () => {
  it("freestanding is dust sealed", () => {
    expect(dustSealed("freestanding")).toBe(true);
  });
  it("open pedestal is not", () => {
    expect(dustSealed("open_pedestal")).toBe(false);
  });
});

describe("humidityControl", () => {
  it("climate controlled has humidity control", () => {
    expect(humidityControl("climate_controlled")).toBe(true);
  });
  it("freestanding does not", () => {
    expect(humidityControl("freestanding")).toBe(false);
  });
});

describe("glazingMaterial", () => {
  it("climate controlled uses laminated uv glass", () => {
    expect(glazingMaterial("climate_controlled")).toBe("laminated_uv_glass");
  });
});

describe("bestContent", () => {
  it("table vitrine for small jewelry coins", () => {
    expect(bestContent("table_vitrine")).toBe("small_jewelry_coins");
  });
});

describe("displayCases", () => {
  it("returns 5 cases", () => {
    expect(displayCases()).toHaveLength(5);
  });
});
