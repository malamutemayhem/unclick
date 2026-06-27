import { describe, it, expect } from "vitest";
import {
  infiltration, loadBearing, aesthetic, maintenance,
  ppCost, vehicleRated, forParking, surface,
  bestUse, permeablePaveTypes,
} from "../permeable-pave-calc.js";

describe("infiltration", () => {
  it("grass grid highest infiltration", () => {
    expect(infiltration("grass_grid_paver")).toBeGreaterThan(infiltration("permeable_interlocking"));
  });
});

describe("loadBearing", () => {
  it("interlocking best load bearing", () => {
    expect(loadBearing("permeable_interlocking")).toBeGreaterThan(loadBearing("grass_grid_paver"));
  });
});

describe("aesthetic", () => {
  it("interlocking best aesthetic", () => {
    expect(aesthetic("permeable_interlocking")).toBeGreaterThan(aesthetic("gravel_grid_cell"));
  });
});

describe("maintenance", () => {
  it("interlocking lowest maintenance", () => {
    expect(maintenance("permeable_interlocking")).toBeGreaterThan(maintenance("grass_grid_paver"));
  });
});

describe("ppCost", () => {
  it("interlocking most expensive", () => {
    expect(ppCost("permeable_interlocking")).toBeGreaterThan(ppCost("gravel_grid_cell"));
  });
});

describe("vehicleRated", () => {
  it("concrete is vehicle rated", () => {
    expect(vehicleRated("permeable_concrete")).toBe(true);
  });
  it("grass grid not vehicle rated", () => {
    expect(vehicleRated("grass_grid_paver")).toBe(false);
  });
});

describe("forParking", () => {
  it("porous asphalt for parking", () => {
    expect(forParking("porous_asphalt")).toBe(true);
  });
  it("grass grid not parking", () => {
    expect(forParking("grass_grid_paver")).toBe(false);
  });
});

describe("surface", () => {
  it("gravel uses geocell", () => {
    expect(surface("gravel_grid_cell")).toBe("geocell_gravel_fill_stable");
  });
});

describe("bestUse", () => {
  it("interlocking for plaza", () => {
    expect(bestUse("permeable_interlocking")).toBe("plaza_sidewalk_decorative_park");
  });
});

describe("permeablePaveTypes", () => {
  it("returns 5 types", () => {
    expect(permeablePaveTypes()).toHaveLength(5);
  });
});
