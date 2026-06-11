import { describe, it, expect } from "vitest";
import {
  throughput, gentleness, accuracy, itemRange,
  ssCost_, recirculating, forFragile, mechanism,
  bestUse, sortationSystemTypes,
} from "../sortation-system-calc.js";

describe("throughput", () => {
  it("crossbelt sorter highest throughput", () => {
    expect(throughput("crossbelt_sorter")).toBeGreaterThan(throughput("pop_up_wheel_divert"));
  });
});

describe("gentleness", () => {
  it("crossbelt sorter gentlest", () => {
    expect(gentleness("crossbelt_sorter")).toBeGreaterThan(gentleness("bomb_bay_drop_sort"));
  });
});

describe("accuracy", () => {
  it("crossbelt sorter best accuracy", () => {
    expect(accuracy("crossbelt_sorter")).toBeGreaterThan(accuracy("pop_up_wheel_divert"));
  });
});

describe("itemRange", () => {
  it("crossbelt sorter widest item range", () => {
    expect(itemRange("crossbelt_sorter")).toBeGreaterThan(itemRange("pop_up_wheel_divert"));
  });
});

describe("ssCost_", () => {
  it("crossbelt sorter most expensive", () => {
    expect(ssCost_("crossbelt_sorter")).toBeGreaterThan(ssCost_("pop_up_wheel_divert"));
  });
});

describe("recirculating", () => {
  it("crossbelt sorter is recirculating", () => {
    expect(recirculating("crossbelt_sorter")).toBe(true);
  });
  it("sliding shoe sorter not recirculating", () => {
    expect(recirculating("sliding_shoe_sorter")).toBe(false);
  });
});

describe("forFragile", () => {
  it("sliding shoe sorter for fragile", () => {
    expect(forFragile("sliding_shoe_sorter")).toBe(true);
  });
  it("bomb bay drop sort not for fragile", () => {
    expect(forFragile("bomb_bay_drop_sort")).toBe(false);
  });
});

describe("mechanism", () => {
  it("pop up wheel uses angled wheels", () => {
    expect(mechanism("pop_up_wheel_divert")).toBe("pop_up_angled_wheels_conveyor_bed_divert_right_left");
  });
});

describe("bestUse", () => {
  it("bomb bay for postal flat sorter", () => {
    expect(bestUse("bomb_bay_drop_sort")).toBe("postal_flat_sorter_magazine_letter_high_speed_sort");
  });
});

describe("sortationSystemTypes", () => {
  it("returns 5 types", () => {
    expect(sortationSystemTypes()).toHaveLength(5);
  });
});
