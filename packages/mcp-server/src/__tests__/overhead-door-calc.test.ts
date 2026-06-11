import { describe, it, expect } from "vitest";
import {
  insulation, speed, durability, aesthetic,
  odCost, fireRated, forWarehouse, operation,
  bestUse, overheadDoorTypes,
} from "../overhead-door-calc.js";

describe("insulation", () => {
  it("sectional best insulation", () => {
    expect(insulation("sectional_insulated_steel")).toBeGreaterThan(insulation("high_speed_fabric"));
  });
});

describe("speed", () => {
  it("high speed fastest", () => {
    expect(speed("high_speed_fabric")).toBeGreaterThan(speed("fire_rated_rolling"));
  });
});

describe("durability", () => {
  it("fire rated most durable", () => {
    expect(durability("fire_rated_rolling")).toBeGreaterThan(durability("high_speed_fabric"));
  });
});

describe("aesthetic", () => {
  it("glass full view best aesthetic", () => {
    expect(aesthetic("aluminum_glass_full_view")).toBeGreaterThan(aesthetic("fire_rated_rolling"));
  });
});

describe("odCost", () => {
  it("fire rated most expensive", () => {
    expect(odCost("fire_rated_rolling")).toBeGreaterThan(odCost("sectional_insulated_steel"));
  });
});

describe("fireRated", () => {
  it("fire rated rolling is fire rated", () => {
    expect(fireRated("fire_rated_rolling")).toBe(true);
  });
  it("sectional not fire rated", () => {
    expect(fireRated("sectional_insulated_steel")).toBe(false);
  });
});

describe("forWarehouse", () => {
  it("sectional for warehouse", () => {
    expect(forWarehouse("sectional_insulated_steel")).toBe(true);
  });
  it("glass not warehouse", () => {
    expect(forWarehouse("aluminum_glass_full_view")).toBe(false);
  });
});

describe("operation", () => {
  it("high speed uses vfd fabric", () => {
    expect(operation("high_speed_fabric")).toBe("high_speed_vfd_fabric_curtain");
  });
});

describe("bestUse", () => {
  it("glass for showroom", () => {
    expect(bestUse("aluminum_glass_full_view")).toBe("showroom_restaurant_patio");
  });
});

describe("overheadDoorTypes", () => {
  it("returns 5 types", () => {
    expect(overheadDoorTypes()).toHaveLength(5);
  });
});
