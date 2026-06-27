import { describe, it, expect } from "vitest";
import {
  steamEven, tempControl, capacity, setupEase,
  steamCost, electric, forProduction, steamSource,
  bestUse, silkSteams,
} from "../silk-steam-calc.js";

describe("steamEven", () => {
  it("professional cabinet most even steam", () => {
    expect(steamEven("professional_cabinet")).toBeGreaterThan(steamEven("bamboo_steamer_natural"));
  });
});

describe("tempControl", () => {
  it("professional cabinet best temp control", () => {
    expect(tempControl("professional_cabinet")).toBeGreaterThan(tempControl("stovetop_steamer_basic"));
  });
});

describe("capacity", () => {
  it("professional cabinet largest capacity", () => {
    expect(capacity("professional_cabinet")).toBeGreaterThan(capacity("bamboo_steamer_natural"));
  });
});

describe("setupEase", () => {
  it("electric steamer auto easiest setup", () => {
    expect(setupEase("electric_steamer_auto")).toBeGreaterThan(setupEase("professional_cabinet"));
  });
});

describe("steamCost", () => {
  it("professional cabinet most expensive", () => {
    expect(steamCost("professional_cabinet")).toBeGreaterThan(steamCost("bamboo_steamer_natural"));
  });
});

describe("electric", () => {
  it("electric steamer auto is electric", () => {
    expect(electric("electric_steamer_auto")).toBe(true);
  });
  it("stovetop steamer basic not electric", () => {
    expect(electric("stovetop_steamer_basic")).toBe(false);
  });
});

describe("forProduction", () => {
  it("professional cabinet is for production", () => {
    expect(forProduction("professional_cabinet")).toBe(true);
  });
  it("stovetop steamer basic not for production", () => {
    expect(forProduction("stovetop_steamer_basic")).toBe(false);
  });
});

describe("steamSource", () => {
  it("pressure steamer fast uses pressurized steam tank", () => {
    expect(steamSource("pressure_steamer_fast")).toBe("pressurized_steam_tank");
  });
});

describe("bestUse", () => {
  it("electric steamer auto best for reliable auto steam", () => {
    expect(bestUse("electric_steamer_auto")).toBe("reliable_auto_steam");
  });
});

describe("silkSteams", () => {
  it("returns 5 types", () => {
    expect(silkSteams()).toHaveLength(5);
  });
});
