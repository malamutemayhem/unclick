import { describe, it, expect } from "vitest";
import {
  capacity, distance, flexibility, dustControl,
  bcCost, enclosed, forBulk, belt,
  bestUse, beltConveyorTypes,
} from "../belt-conveyor-calc.js";

describe("capacity", () => {
  it("troughed belt highest capacity", () => {
    expect(capacity("troughed_belt_bulk")).toBeGreaterThan(capacity("flat_belt_general"));
  });
});

describe("distance", () => {
  it("troughed belt longest distance", () => {
    expect(distance("troughed_belt_bulk")).toBeGreaterThan(distance("steep_incline_cleated"));
  });
});

describe("flexibility", () => {
  it("pipe conveyor most flexible routing", () => {
    expect(flexibility("pipe_conveyor_curved")).toBeGreaterThan(flexibility("steep_incline_cleated"));
  });
});

describe("dustControl", () => {
  it("enclosed belt best dust control", () => {
    expect(dustControl("enclosed_belt_dust")).toBeGreaterThan(dustControl("flat_belt_general"));
  });
});

describe("bcCost", () => {
  it("pipe conveyor most expensive", () => {
    expect(bcCost("pipe_conveyor_curved")).toBeGreaterThan(bcCost("flat_belt_general"));
  });
});

describe("enclosed", () => {
  it("enclosed belt is enclosed", () => {
    expect(enclosed("enclosed_belt_dust")).toBe(true);
  });
  it("flat belt not enclosed", () => {
    expect(enclosed("flat_belt_general")).toBe(false);
  });
});

describe("forBulk", () => {
  it("troughed belt for bulk", () => {
    expect(forBulk("troughed_belt_bulk")).toBe(true);
  });
  it("flat belt not for bulk", () => {
    expect(forBulk("flat_belt_general")).toBe(false);
  });
});

describe("belt", () => {
  it("steep incline uses cleated sidewall", () => {
    expect(belt("steep_incline_cleated")).toBe("cleated_sidewall_corrugated_pocket");
  });
});

describe("bestUse", () => {
  it("troughed belt for mining aggregate", () => {
    expect(bestUse("troughed_belt_bulk")).toBe("mining_aggregate_long_distance_overland");
  });
});

describe("beltConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(beltConveyorTypes()).toHaveLength(5);
  });
});
