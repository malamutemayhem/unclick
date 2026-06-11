import { describe, it, expect } from "vitest";
import {
  temperatureUniformity, throughput, energyEfficiency, firingRange,
  ckCost, continuous, forHighTemp, kilnConfig,
  bestUse, ceramicKilnTypes,
} from "../ceramic-kiln-calc.js";

describe("temperatureUniformity", () => {
  it("tunnel kiln best temperature uniformity", () => {
    expect(temperatureUniformity("tunnel_kiln")).toBeGreaterThan(temperatureUniformity("top_hat_kiln"));
  });
});

describe("throughput", () => {
  it("tunnel kiln highest throughput", () => {
    expect(throughput("tunnel_kiln")).toBeGreaterThan(throughput("top_hat_kiln"));
  });
});

describe("energyEfficiency", () => {
  it("roller hearth best energy efficiency", () => {
    expect(energyEfficiency("roller_hearth")).toBeGreaterThan(energyEfficiency("top_hat_kiln"));
  });
});

describe("firingRange", () => {
  it("top hat kiln widest firing range", () => {
    expect(firingRange("top_hat_kiln")).toBeGreaterThan(firingRange("roller_hearth"));
  });
});

describe("ckCost", () => {
  it("tunnel kiln most expensive", () => {
    expect(ckCost("tunnel_kiln")).toBeGreaterThan(ckCost("top_hat_kiln"));
  });
});

describe("continuous", () => {
  it("tunnel kiln is continuous", () => {
    expect(continuous("tunnel_kiln")).toBe(true);
  });
  it("shuttle kiln not continuous", () => {
    expect(continuous("shuttle_kiln")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("shuttle kiln for high temp", () => {
    expect(forHighTemp("shuttle_kiln")).toBe(true);
  });
  it("roller hearth not for high temp", () => {
    expect(forHighTemp("roller_hearth")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("rotary kiln ceramic uses inclined cylinder rotate tumble calcine", () => {
    expect(kilnConfig("rotary_kiln_ceramic")).toBe("rotary_kiln_ceramic_inclined_cylinder_rotate_tumble_calcine");
  });
});

describe("bestUse", () => {
  it("roller hearth for floor tile fast fire flat ceramic high speed", () => {
    expect(bestUse("roller_hearth")).toBe("floor_tile_roller_hearth_kiln_fast_fire_flat_ceramic_high_speed");
  });
});

describe("ceramicKilnTypes", () => {
  it("returns 5 types", () => {
    expect(ceramicKilnTypes()).toHaveLength(5);
  });
});
