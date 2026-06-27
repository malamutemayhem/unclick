import { describe, it, expect } from "vitest";
import {
  impactResistance, portability, visibility, costPerUnit,
  setupTime, vehicleRated, stackable, materialComposition,
  bestApplication, constructionBarriers,
} from "../construction-barrier-calc.js";

describe("impactResistance", () => {
  it("jersey barrier highest impact resistance", () => {
    expect(impactResistance("jersey_barrier")).toBeGreaterThan(impactResistance("delineator_post"));
  });
});

describe("portability", () => {
  it("delineator post most portable", () => {
    expect(portability("delineator_post")).toBeGreaterThan(portability("jersey_barrier"));
  });
});

describe("visibility", () => {
  it("delineator post most visible", () => {
    expect(visibility("delineator_post")).toBeGreaterThan(visibility("steel_plate"));
  });
});

describe("costPerUnit", () => {
  it("steel plate most expensive", () => {
    expect(costPerUnit("steel_plate")).toBeGreaterThan(costPerUnit("delineator_post"));
  });
});

describe("setupTime", () => {
  it("steel plate slowest setup", () => {
    expect(setupTime("steel_plate")).toBeGreaterThan(setupTime("delineator_post"));
  });
});

describe("vehicleRated", () => {
  it("jersey barrier is vehicle rated", () => {
    expect(vehicleRated("jersey_barrier")).toBe(true);
  });
  it("delineator post is not", () => {
    expect(vehicleRated("delineator_post")).toBe(false);
  });
});

describe("stackable", () => {
  it("jersey barrier is stackable", () => {
    expect(stackable("jersey_barrier")).toBe(true);
  });
  it("steel plate is not", () => {
    expect(stackable("steel_plate")).toBe(false);
  });
});

describe("materialComposition", () => {
  it("jersey barrier is precast concrete", () => {
    expect(materialComposition("jersey_barrier")).toBe("precast_concrete");
  });
});

describe("bestApplication", () => {
  it("water filled for temporary lane closure", () => {
    expect(bestApplication("water_filled")).toBe("temporary_lane_closure");
  });
});

describe("constructionBarriers", () => {
  it("returns 5 barriers", () => {
    expect(constructionBarriers()).toHaveLength(5);
  });
});
