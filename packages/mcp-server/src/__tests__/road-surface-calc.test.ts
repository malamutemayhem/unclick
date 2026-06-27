import { describe, it, expect } from "vitest";
import {
  loadCapacity, rideSmoothness, drainageAbility, constructionCost,
  lifespanYears, recyclable, reduceHeatIsland, maintenanceMethod,
  bestUseCase, roadSurfaces,
} from "../road-surface-calc.js";

describe("loadCapacity", () => {
  it("concrete highest load capacity", () => {
    expect(loadCapacity("concrete")).toBeGreaterThan(loadCapacity("gravel"));
  });
});

describe("rideSmoothness", () => {
  it("asphalt smoothest ride", () => {
    expect(rideSmoothness("asphalt")).toBeGreaterThan(rideSmoothness("gravel"));
  });
});

describe("drainageAbility", () => {
  it("permeable paver best drainage", () => {
    expect(drainageAbility("permeable_paver")).toBeGreaterThan(drainageAbility("concrete"));
  });
});

describe("constructionCost", () => {
  it("cobblestone most expensive", () => {
    expect(constructionCost("cobblestone")).toBeGreaterThan(constructionCost("gravel"));
  });
});

describe("lifespanYears", () => {
  it("cobblestone longest lifespan", () => {
    expect(lifespanYears("cobblestone")).toBeGreaterThan(lifespanYears("gravel"));
  });
});

describe("recyclable", () => {
  it("asphalt is recyclable", () => {
    expect(recyclable("asphalt")).toBe(true);
  });
  it("gravel is not", () => {
    expect(recyclable("gravel")).toBe(false);
  });
});

describe("reduceHeatIsland", () => {
  it("permeable paver reduces heat island", () => {
    expect(reduceHeatIsland("permeable_paver")).toBe(true);
  });
  it("asphalt does not", () => {
    expect(reduceHeatIsland("asphalt")).toBe(false);
  });
});

describe("maintenanceMethod", () => {
  it("asphalt uses crack seal overlay", () => {
    expect(maintenanceMethod("asphalt")).toBe("crack_seal_overlay");
  });
});

describe("bestUseCase", () => {
  it("concrete for heavy truck route", () => {
    expect(bestUseCase("concrete")).toBe("heavy_truck_route");
  });
});

describe("roadSurfaces", () => {
  it("returns 5 surfaces", () => {
    expect(roadSurfaces()).toHaveLength(5);
  });
});
