import { describe, it, expect } from "vitest";
import {
  sortRate, throughput, gentleness, accuracy,
  csCost, bidirectional, forSmallParcel, sorterConfig,
  bestUse, conveyorSorterTypes,
} from "../conveyor-sorter-calc.js";

describe("sortRate", () => {
  it("cross belt best sort rate", () => {
    expect(sortRate("cross_belt")).toBeGreaterThan(sortRate("divert_arm"));
  });
});

describe("throughput", () => {
  it("cross belt highest throughput", () => {
    expect(throughput("cross_belt")).toBeGreaterThan(throughput("divert_arm"));
  });
});

describe("gentleness", () => {
  it("cross belt best gentleness", () => {
    expect(gentleness("cross_belt")).toBeGreaterThan(gentleness("bomb_bay_drop"));
  });
});

describe("accuracy", () => {
  it("cross belt best accuracy", () => {
    expect(accuracy("cross_belt")).toBeGreaterThan(accuracy("divert_arm"));
  });
});

describe("csCost", () => {
  it("cross belt most expensive", () => {
    expect(csCost("cross_belt")).toBeGreaterThan(csCost("divert_arm"));
  });
});

describe("bidirectional", () => {
  it("tilt tray is bidirectional", () => {
    expect(bidirectional("tilt_tray")).toBe(true);
  });
  it("divert arm not bidirectional", () => {
    expect(bidirectional("divert_arm")).toBe(false);
  });
});

describe("forSmallParcel", () => {
  it("cross belt for small parcel", () => {
    expect(forSmallParcel("cross_belt")).toBe(true);
  });
  it("divert arm not for small parcel", () => {
    expect(forSmallParcel("divert_arm")).toBe(false);
  });
});

describe("sorterConfig", () => {
  it("sliding shoe uses angled shoe glide divert gentle", () => {
    expect(sorterConfig("sliding_shoe")).toBe("sliding_shoe_conveyor_sorter_angled_shoe_glide_divert_gentle");
  });
});

describe("bestUse", () => {
  it("tilt tray for postal sort parcel letter high dest", () => {
    expect(bestUse("tilt_tray")).toBe("postal_sort_tilt_tray_conveyor_sorter_parcel_letter_high_dest");
  });
});

describe("conveyorSorterTypes", () => {
  it("returns 5 types", () => {
    expect(conveyorSorterTypes()).toHaveLength(5);
  });
});
