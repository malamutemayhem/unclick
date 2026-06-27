import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, speedRange, durability,
  bwCost, contactFree, forTradeApproved, weigherConfig,
  bestUse, beltWeigherTypes,
} from "../belt-weigher-calc.js";

describe("accuracy", () => {
  it("weigh belt feeder best accuracy", () => {
    expect(accuracy("weigh_belt_feeder")).toBeGreaterThan(accuracy("single_idler"));
  });
});

describe("throughput", () => {
  it("nuclear gauge highest throughput", () => {
    expect(throughput("nuclear_gauge")).toBeGreaterThan(throughput("weigh_belt_feeder"));
  });
});

describe("speedRange", () => {
  it("nuclear gauge best speed range", () => {
    expect(speedRange("nuclear_gauge")).toBeGreaterThan(speedRange("impact_plate"));
  });
});

describe("durability", () => {
  it("nuclear gauge best durability", () => {
    expect(durability("nuclear_gauge")).toBeGreaterThan(durability("weigh_belt_feeder"));
  });
});

describe("bwCost", () => {
  it("nuclear gauge most expensive", () => {
    expect(bwCost("nuclear_gauge")).toBeGreaterThan(bwCost("single_idler"));
  });
});

describe("contactFree", () => {
  it("nuclear gauge is contact free", () => {
    expect(contactFree("nuclear_gauge")).toBe(true);
  });
  it("single idler not contact free", () => {
    expect(contactFree("single_idler")).toBe(false);
  });
});

describe("forTradeApproved", () => {
  it("multi idler for trade approved", () => {
    expect(forTradeApproved("multi_idler")).toBe(true);
  });
  it("single idler not for trade approved", () => {
    expect(forTradeApproved("single_idler")).toBe(false);
  });
});

describe("weigherConfig", () => {
  it("impact plate uses deflect plate force sensor robust", () => {
    expect(weigherConfig("impact_plate")).toBe("impact_plate_belt_weigher_deflect_plate_force_sensor_robust");
  });
});

describe("bestUse", () => {
  it("weigh belt feeder for ingredient dose gravimetric rate control blend", () => {
    expect(bestUse("weigh_belt_feeder")).toBe("ingredient_dose_weigh_belt_feeder_gravimetric_rate_control_blend");
  });
});

describe("beltWeigherTypes", () => {
  it("returns 5 types", () => {
    expect(beltWeigherTypes()).toHaveLength(5);
  });
});
