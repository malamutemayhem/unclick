import { describe, it, expect } from "vitest";
import {
  pelletDensity, throughput, nutrientRetention, sizeConsistency,
  fpCost, heated, forAqua, pelletizerConfig,
  bestUse, feedPelletizerTypes,
} from "../feed-pelletizer-calc.js";

describe("pelletDensity", () => {
  it("screw extruder best pellet density", () => {
    expect(pelletDensity("screw_extruder")).toBeGreaterThanOrEqual(pelletDensity("twin_screw"));
  });
});

describe("throughput", () => {
  it("ring die highest throughput", () => {
    expect(throughput("ring_die")).toBeGreaterThan(throughput("flat_die"));
  });
});

describe("nutrientRetention", () => {
  it("cold pellet best nutrient retention", () => {
    expect(nutrientRetention("cold_pellet")).toBeGreaterThan(nutrientRetention("screw_extruder"));
  });
});

describe("sizeConsistency", () => {
  it("twin screw best size consistency", () => {
    expect(sizeConsistency("twin_screw")).toBeGreaterThan(sizeConsistency("cold_pellet"));
  });
});

describe("fpCost", () => {
  it("twin screw most expensive", () => {
    expect(fpCost("twin_screw")).toBeGreaterThan(fpCost("cold_pellet"));
  });
});

describe("heated", () => {
  it("ring die is heated", () => {
    expect(heated("ring_die")).toBe(true);
  });
  it("flat die not heated", () => {
    expect(heated("flat_die")).toBe(false);
  });
});

describe("forAqua", () => {
  it("screw extruder for aquaculture", () => {
    expect(forAqua("screw_extruder")).toBe(true);
  });
  it("ring die not for aquaculture", () => {
    expect(forAqua("ring_die")).toBe(false);
  });
});

describe("pelletizerConfig", () => {
  it("twin screw uses co rotating barrel precise cook", () => {
    expect(pelletizerConfig("twin_screw")).toBe("twin_screw_feed_pelletizer_co_rotating_barrel_precise_cook_shape");
  });
});

describe("bestUse", () => {
  it("cold pellet for organic farm preserve vitamin enzyme", () => {
    expect(bestUse("cold_pellet")).toBe("organic_farm_cold_pelletizer_no_heat_preserve_vitamin_enzyme");
  });
});

describe("feedPelletizerTypes", () => {
  it("returns 5 types", () => {
    expect(feedPelletizerTypes()).toHaveLength(5);
  });
});
