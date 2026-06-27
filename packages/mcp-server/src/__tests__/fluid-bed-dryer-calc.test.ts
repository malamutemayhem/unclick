import { describe, it, expect } from "vitest";
import {
  dryingRate, uniformity, gentleness, scaleUp,
  fbCost, continuous, forGranulation, airflow,
  bestUse, fluidBedDryerTypes,
} from "../fluid-bed-dryer-calc.js";

describe("dryingRate", () => {
  it("continuous horizontal fastest drying", () => {
    expect(dryingRate("continuous_horizontal")).toBeGreaterThan(dryingRate("batch_vertical_standard"));
  });
});

describe("uniformity", () => {
  it("pulsed fluid bed best uniformity", () => {
    expect(uniformity("pulsed_fluid_bed")).toBeGreaterThan(uniformity("batch_vertical_standard"));
  });
});

describe("gentleness", () => {
  it("pulsed fluid bed gentlest", () => {
    expect(gentleness("pulsed_fluid_bed")).toBeGreaterThan(gentleness("continuous_horizontal"));
  });
});

describe("scaleUp", () => {
  it("continuous horizontal best scale up", () => {
    expect(scaleUp("continuous_horizontal")).toBeGreaterThan(scaleUp("pulsed_fluid_bed"));
  });
});

describe("fbCost", () => {
  it("spray fluid bed most expensive", () => {
    expect(fbCost("spray_fluid_bed_granule")).toBeGreaterThan(fbCost("batch_vertical_standard"));
  });
});

describe("continuous", () => {
  it("continuous horizontal is continuous", () => {
    expect(continuous("continuous_horizontal")).toBe(true);
  });
  it("batch vertical not continuous", () => {
    expect(continuous("batch_vertical_standard")).toBe(false);
  });
});

describe("forGranulation", () => {
  it("spray fluid bed for granulation", () => {
    expect(forGranulation("spray_fluid_bed_granule")).toBe(true);
  });
  it("vibrating bed not for granulation", () => {
    expect(forGranulation("vibrating_fluid_bed")).toBe(false);
  });
});

describe("airflow", () => {
  it("vibrating uses lower air velocity", () => {
    expect(airflow("vibrating_fluid_bed")).toBe("vibration_assisted_lower_air_velocity_gentle");
  });
});

describe("bestUse", () => {
  it("batch vertical for pharmaceutical", () => {
    expect(bestUse("batch_vertical_standard")).toBe("pharmaceutical_batch_powder_granule_drying");
  });
});

describe("fluidBedDryerTypes", () => {
  it("returns 5 types", () => {
    expect(fluidBedDryerTypes()).toHaveLength(5);
  });
});
