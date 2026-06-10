import { describe, it, expect } from "vitest";
import {
  capacity, durability, portability, weatherProtect,
  bagCost, hasWheels, waterproof, openingStyle,
  bestTrip, duffelBags,
} from "../duffel-bag-calc.js";

describe("capacity", () => {
  it("wheeled rolling travel largest capacity", () => {
    expect(capacity("wheeled_rolling_travel")).toBeGreaterThan(capacity("gym_barrel_basic"));
  });
});

describe("durability", () => {
  it("waterproof dry bag most durable", () => {
    expect(durability("waterproof_dry_bag")).toBeGreaterThan(durability("gym_barrel_basic"));
  });
});

describe("portability", () => {
  it("packable ultralight fold most portable", () => {
    expect(portability("packable_ultralight_fold")).toBeGreaterThan(portability("wheeled_rolling_travel"));
  });
});

describe("weatherProtect", () => {
  it("waterproof dry bag best weather protection", () => {
    expect(weatherProtect("waterproof_dry_bag")).toBeGreaterThan(weatherProtect("gym_barrel_basic"));
  });
});

describe("bagCost", () => {
  it("leather weekender most expensive", () => {
    expect(bagCost("leather_weekender")).toBeGreaterThan(bagCost("gym_barrel_basic"));
  });
});

describe("hasWheels", () => {
  it("wheeled rolling travel has wheels", () => {
    expect(hasWheels("wheeled_rolling_travel")).toBe(true);
  });
  it("gym barrel basic has no wheels", () => {
    expect(hasWheels("gym_barrel_basic")).toBe(false);
  });
});

describe("waterproof", () => {
  it("waterproof dry bag is waterproof", () => {
    expect(waterproof("waterproof_dry_bag")).toBe(true);
  });
  it("leather weekender is not waterproof", () => {
    expect(waterproof("leather_weekender")).toBe(false);
  });
});

describe("openingStyle", () => {
  it("waterproof dry bag uses roll top buckle seal", () => {
    expect(openingStyle("waterproof_dry_bag")).toBe("roll_top_buckle_seal");
  });
});

describe("bestTrip", () => {
  it("leather weekender best for weekend getaway style", () => {
    expect(bestTrip("leather_weekender")).toBe("weekend_getaway_style");
  });
});

describe("duffelBags", () => {
  it("returns 5 types", () => {
    expect(duffelBags()).toHaveLength(5);
  });
});
