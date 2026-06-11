import { describe, it, expect } from "vitest";
import {
  flatness, finish_, throughput, accuracy,
  lpCost, automated, forOptical, abrasive,
  bestUse, lappingTypes,
} from "../lapping-type-calc.js";

describe("flatness", () => {
  it("double side flattest", () => {
    expect(flatness("double_side_planetary")).toBeGreaterThan(flatness("hand_lap_valve_seat"));
  });
});

describe("finish_", () => {
  it("ultrasonic best finish", () => {
    expect(finish_("ultrasonic_assisted_slurry")).toBeGreaterThan(finish_("hand_lap_valve_seat"));
  });
});

describe("throughput", () => {
  it("double side highest throughput", () => {
    expect(throughput("double_side_planetary")).toBeGreaterThan(throughput("hand_lap_valve_seat"));
  });
});

describe("accuracy", () => {
  it("double side most accurate", () => {
    expect(accuracy("double_side_planetary")).toBeGreaterThan(accuracy("hand_lap_valve_seat"));
  });
});

describe("lpCost", () => {
  it("ultrasonic most expensive", () => {
    expect(lpCost("ultrasonic_assisted_slurry")).toBeGreaterThan(lpCost("hand_lap_valve_seat"));
  });
});

describe("automated", () => {
  it("double side is automated", () => {
    expect(automated("double_side_planetary")).toBe(true);
  });
  it("hand lap not automated", () => {
    expect(automated("hand_lap_valve_seat")).toBe(false);
  });
});

describe("forOptical", () => {
  it("single side for optical", () => {
    expect(forOptical("single_side_flat_plate")).toBe(true);
  });
  it("cylindrical not for optical", () => {
    expect(forOptical("cylindrical_centerless")).toBe(false);
  });
});

describe("abrasive", () => {
  it("double side uses diamond slurry", () => {
    expect(abrasive("double_side_planetary")).toBe("diamond_slurry_ceramic_plate");
  });
});

describe("bestUse", () => {
  it("double side for semiconductor wafer", () => {
    expect(bestUse("double_side_planetary")).toBe("semiconductor_wafer_thin_parallel");
  });
});

describe("lappingTypes", () => {
  it("returns 5 types", () => {
    expect(lappingTypes()).toHaveLength(5);
  });
});
