import { describe, it, expect } from "vitest";
import {
  thermalRes, currentCapacity, reliability, density,
  viaCost, filled, forBga, construction,
  bestUse, thermalVias,
} from "../thermal-via-calc.js";

describe("thermalRes", () => {
  it("copper coin best thermal resistance", () => {
    expect(thermalRes("copper_coin")).toBeGreaterThan(thermalRes("standard_pth"));
  });
});

describe("currentCapacity", () => {
  it("copper coin highest current capacity", () => {
    expect(currentCapacity("copper_coin")).toBeGreaterThan(currentCapacity("standard_pth"));
  });
});

describe("reliability", () => {
  it("copper coin most reliable", () => {
    expect(reliability("copper_coin")).toBeGreaterThan(reliability("standard_pth"));
  });
});

describe("density", () => {
  it("via in pad highest density", () => {
    expect(density("via_in_pad")).toBeGreaterThan(density("standard_pth"));
  });
});

describe("viaCost", () => {
  it("copper coin most expensive", () => {
    expect(viaCost("copper_coin")).toBeGreaterThan(viaCost("standard_pth"));
  });
});

describe("filled", () => {
  it("filled capped is filled", () => {
    expect(filled("filled_capped")).toBe(true);
  });
  it("standard pth not filled", () => {
    expect(filled("standard_pth")).toBe(false);
  });
});

describe("forBga", () => {
  it("via in pad is for bga", () => {
    expect(forBga("via_in_pad")).toBe(true);
  });
  it("standard pth not for bga", () => {
    expect(forBga("standard_pth")).toBe(false);
  });
});

describe("construction", () => {
  it("copper coin uses pressed copper slug", () => {
    expect(construction("copper_coin")).toBe("pressed_copper_slug");
  });
});

describe("bestUse", () => {
  it("copper coin best for high power led substrate", () => {
    expect(bestUse("copper_coin")).toBe("high_power_led_substrate");
  });
});

describe("thermalVias", () => {
  it("returns 5 types", () => {
    expect(thermalVias()).toHaveLength(5);
  });
});
