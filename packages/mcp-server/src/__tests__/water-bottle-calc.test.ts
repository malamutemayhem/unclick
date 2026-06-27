import { describe, it, expect } from "vitest";
import {
  insulation, durability, tastePurity, portability,
  bottleCost, keepsCold24h, dishwasherSafe, wallType,
  bestUse, waterBottles,
} from "../water-bottle-calc.js";

describe("insulation", () => {
  it("stainless insulated best insulation", () => {
    expect(insulation("stainless_insulated")).toBeGreaterThan(insulation("plastic_bpa_free"));
  });
});

describe("durability", () => {
  it("stainless insulated most durable", () => {
    expect(durability("stainless_insulated")).toBeGreaterThan(durability("glass_silicone_sleeve"));
  });
});

describe("tastePurity", () => {
  it("glass silicone sleeve purest taste", () => {
    expect(tastePurity("glass_silicone_sleeve")).toBeGreaterThan(tastePurity("plastic_bpa_free"));
  });
});

describe("portability", () => {
  it("collapsible silicone most portable", () => {
    expect(portability("collapsible_silicone")).toBeGreaterThan(portability("glass_silicone_sleeve"));
  });
});

describe("bottleCost", () => {
  it("filtered built in most expensive", () => {
    expect(bottleCost("filtered_built_in")).toBeGreaterThan(bottleCost("plastic_bpa_free"));
  });
});

describe("keepsCold24h", () => {
  it("stainless insulated keeps cold 24h", () => {
    expect(keepsCold24h("stainless_insulated")).toBe(true);
  });
  it("glass silicone sleeve does not", () => {
    expect(keepsCold24h("glass_silicone_sleeve")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("glass silicone sleeve is dishwasher safe", () => {
    expect(dishwasherSafe("glass_silicone_sleeve")).toBe(true);
  });
  it("stainless insulated is not", () => {
    expect(dishwasherSafe("stainless_insulated")).toBe(false);
  });
});

describe("wallType", () => {
  it("stainless insulated uses double wall vacuum steel", () => {
    expect(wallType("stainless_insulated")).toBe("double_wall_vacuum_steel");
  });
});

describe("bestUse", () => {
  it("collapsible silicone best for travel hiking pack flat", () => {
    expect(bestUse("collapsible_silicone")).toBe("travel_hiking_pack_flat");
  });
});

describe("waterBottles", () => {
  it("returns 5 types", () => {
    expect(waterBottles()).toHaveLength(5);
  });
});
