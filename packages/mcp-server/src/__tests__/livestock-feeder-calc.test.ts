import { describe, it, expect } from "vitest";
import {
  capacity, accuracy, laborSaving, animalCount,
  lfCost, automated, forDairy, mechanism,
  bestUse, livestockFeederTypes,
} from "../livestock-feeder-calc.js";

describe("capacity", () => {
  it("belt feeder highest capacity", () => {
    expect(capacity("belt_feeder")).toBeGreaterThan(capacity("creep_feeder"));
  });
});

describe("accuracy", () => {
  it("automatic rail most accurate", () => {
    expect(accuracy("automatic_rail")).toBeGreaterThan(accuracy("creep_feeder"));
  });
});

describe("laborSaving", () => {
  it("automatic rail most labor saving", () => {
    expect(laborSaving("automatic_rail")).toBeGreaterThan(laborSaving("creep_feeder"));
  });
});

describe("animalCount", () => {
  it("automatic rail and belt feeder highest animal count", () => {
    expect(animalCount("automatic_rail")).toBeGreaterThan(animalCount("creep_feeder"));
    expect(animalCount("belt_feeder")).toBeGreaterThan(animalCount("creep_feeder"));
  });
});

describe("lfCost", () => {
  it("automatic rail most expensive", () => {
    expect(lfCost("automatic_rail")).toBeGreaterThan(lfCost("creep_feeder"));
  });
});

describe("automated", () => {
  it("automatic rail is automated", () => {
    expect(automated("automatic_rail")).toBe(true);
  });
  it("tmr mixer wagon not automated", () => {
    expect(automated("tmr_mixer_wagon")).toBe(false);
  });
});

describe("forDairy", () => {
  it("tmr mixer wagon for dairy", () => {
    expect(forDairy("tmr_mixer_wagon")).toBe(true);
  });
  it("creep feeder not for dairy", () => {
    expect(forDairy("creep_feeder")).toBe(false);
  });
});

describe("mechanism", () => {
  it("robotic pusher uses autonomous robot", () => {
    expect(mechanism("robotic_pusher")).toBe("autonomous_robot_feed_pusher_programmed_route_bunk_sweep");
  });
});

describe("bestUse", () => {
  it("creep feeder for calf lamb piglet", () => {
    expect(bestUse("creep_feeder")).toBe("calf_lamb_piglet_creep_feed_supplement_growth_before_wean");
  });
});

describe("livestockFeederTypes", () => {
  it("returns 5 types", () => {
    expect(livestockFeederTypes()).toHaveLength(5);
  });
});
