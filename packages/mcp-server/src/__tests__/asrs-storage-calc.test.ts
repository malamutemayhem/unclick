import { describe, it, expect } from "vitest";
import {
  storageDensity, throughput, pickAccuracy, scalability,
  asCost_, goodsToPersonGTP, forSmallParts, mechanism,
  bestUse, asrsStorageTypes,
} from "../asrs-storage-calc.js";

describe("storageDensity", () => {
  it("carousel vertical highest storage density", () => {
    expect(storageDensity("carousel_vertical")).toBeGreaterThan(storageDensity("carousel_horizontal"));
  });
});

describe("throughput", () => {
  it("mini load tote highest throughput", () => {
    expect(throughput("mini_load_tote")).toBeGreaterThan(throughput("carousel_vertical"));
  });
});

describe("pickAccuracy", () => {
  it("mini load tote best pick accuracy", () => {
    expect(pickAccuracy("mini_load_tote")).toBeGreaterThanOrEqual(pickAccuracy("vertical_lift_module"));
  });
});

describe("scalability", () => {
  it("unit load crane most scalable", () => {
    expect(scalability("unit_load_crane")).toBeGreaterThan(scalability("carousel_vertical"));
  });
});

describe("asCost_", () => {
  it("unit load crane most expensive", () => {
    expect(asCost_("unit_load_crane")).toBeGreaterThan(asCost_("carousel_horizontal"));
  });
});

describe("goodsToPersonGTP", () => {
  it("all asrs types are goods to person", () => {
    expect(goodsToPersonGTP("unit_load_crane")).toBe(true);
    expect(goodsToPersonGTP("carousel_vertical")).toBe(true);
  });
});

describe("forSmallParts", () => {
  it("mini load tote for small parts", () => {
    expect(forSmallParts("mini_load_tote")).toBe(true);
  });
  it("unit load crane not for small parts", () => {
    expect(forSmallParts("unit_load_crane")).toBe(false);
  });
});

describe("mechanism", () => {
  it("vertical lift module uses dual column tray", () => {
    expect(mechanism("vertical_lift_module")).toBe("dual_column_tray_extractor_height_sensor_dynamic");
  });
});

describe("bestUse", () => {
  it("carousel horizontal for order consolidation", () => {
    expect(bestUse("carousel_horizontal")).toBe("order_consolidation_batch_picking_pharmacy_auto");
  });
});

describe("asrsStorageTypes", () => {
  it("returns 5 types", () => {
    expect(asrsStorageTypes()).toHaveLength(5);
  });
});
