import { describe, it, expect } from "vitest";
import {
  capacity, lumpSize, precision, durability,
  afCost, variable, forMining, pan,
  bestUse, apronFeederTypes,
} from "../apron-feeder-calc.js";

describe("capacity", () => {
  it("heavy duty mining highest capacity", () => {
    expect(capacity("heavy_duty_mining")).toBeGreaterThan(capacity("light_duty_drag_chain"));
  });
});

describe("lumpSize", () => {
  it("heavy duty handles largest lumps", () => {
    expect(lumpSize("heavy_duty_mining")).toBeGreaterThan(lumpSize("belt_feeder_weigh"));
  });
});

describe("precision", () => {
  it("belt feeder weigh most precise", () => {
    expect(precision("belt_feeder_weigh")).toBeGreaterThan(precision("heavy_duty_mining"));
  });
});

describe("durability", () => {
  it("heavy duty mining most durable", () => {
    expect(durability("heavy_duty_mining")).toBeGreaterThan(durability("light_duty_drag_chain"));
  });
});

describe("afCost", () => {
  it("heavy duty mining most expensive", () => {
    expect(afCost("heavy_duty_mining")).toBeGreaterThan(afCost("light_duty_drag_chain"));
  });
});

describe("variable", () => {
  it("heavy duty mining is variable", () => {
    expect(variable("heavy_duty_mining")).toBe(true);
  });
  it("reciprocating plate not variable", () => {
    expect(variable("reciprocating_plate")).toBe(false);
  });
});

describe("forMining", () => {
  it("heavy duty for mining", () => {
    expect(forMining("heavy_duty_mining")).toBe(true);
  });
  it("belt feeder not for mining", () => {
    expect(forMining("belt_feeder_weigh")).toBe(false);
  });
});

describe("pan", () => {
  it("heavy duty uses manganese steel pan", () => {
    expect(pan("heavy_duty_mining")).toBe("manganese_steel_pan_heavy_chain");
  });
});

describe("bestUse", () => {
  it("belt feeder for batch plant dosing", () => {
    expect(bestUse("belt_feeder_weigh")).toBe("batch_plant_dosing_precise_weight");
  });
});

describe("apronFeederTypes", () => {
  it("returns 5 types", () => {
    expect(apronFeederTypes()).toHaveLength(5);
  });
});
