import { describe, it, expect } from "vitest";
import {
  freshness, durability, stackability, weightEmpty,
  containerCost, microwaveSafe, leakProof, lidType,
  bestUse, foodContainers,
} from "../food-container-calc.js";

describe("freshness", () => {
  it("vacuum seal pump best freshness", () => {
    expect(freshness("vacuum_seal_pump")).toBeGreaterThan(freshness("silicone_collapsible"));
  });
});

describe("durability", () => {
  it("stainless steel most durable", () => {
    expect(durability("stainless_steel")).toBeGreaterThan(durability("plastic_clip_lid"));
  });
});

describe("stackability", () => {
  it("plastic clip lid most stackable", () => {
    expect(stackability("plastic_clip_lid")).toBeGreaterThan(stackability("silicone_collapsible"));
  });
});

describe("weightEmpty", () => {
  it("plastic clip lid lightest", () => {
    expect(weightEmpty("plastic_clip_lid")).toBeGreaterThan(weightEmpty("glass_snap_lock"));
  });
});

describe("containerCost", () => {
  it("stainless steel most expensive", () => {
    expect(containerCost("stainless_steel")).toBeGreaterThan(containerCost("plastic_clip_lid"));
  });
});

describe("microwaveSafe", () => {
  it("glass snap lock is microwave safe", () => {
    expect(microwaveSafe("glass_snap_lock")).toBe(true);
  });
  it("stainless steel is not", () => {
    expect(microwaveSafe("stainless_steel")).toBe(false);
  });
});

describe("leakProof", () => {
  it("glass snap lock is leak proof", () => {
    expect(leakProof("glass_snap_lock")).toBe(true);
  });
  it("plastic clip lid is not", () => {
    expect(leakProof("plastic_clip_lid")).toBe(false);
  });
});

describe("lidType", () => {
  it("vacuum seal pump uses valve pump airtight", () => {
    expect(lidType("vacuum_seal_pump")).toBe("valve_pump_airtight");
  });
});

describe("bestUse", () => {
  it("glass snap lock best for meal prep oven to table", () => {
    expect(bestUse("glass_snap_lock")).toBe("meal_prep_oven_to_table");
  });
});

describe("foodContainers", () => {
  it("returns 5 types", () => {
    expect(foodContainers()).toHaveLength(5);
  });
});
