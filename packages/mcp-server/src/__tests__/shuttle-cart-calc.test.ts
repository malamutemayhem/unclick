import { describe, it, expect } from "vitest";
import {
  storageDensity, throughput, flexibility, scalability,
  scCost, multiLevel, forDeepLane, transport,
  bestUse, shuttleCartTypes,
} from "../shuttle-cart-calc.js";

describe("storageDensity", () => {
  it("pallet shuttle deep highest density", () => {
    expect(storageDensity("pallet_shuttle_deep")).toBeGreaterThan(storageDensity("goods_to_person_bot"));
  });
});

describe("throughput", () => {
  it("multi level shuttle highest throughput", () => {
    expect(throughput("multi_level_shuttle")).toBeGreaterThan(throughput("pallet_shuttle_deep"));
  });
});

describe("flexibility", () => {
  it("goods to person bot most flexible", () => {
    expect(flexibility("goods_to_person_bot")).toBeGreaterThan(flexibility("pallet_shuttle_deep"));
  });
});

describe("scalability", () => {
  it("goods to person bot most scalable", () => {
    expect(scalability("goods_to_person_bot")).toBeGreaterThan(scalability("pallet_shuttle_deep"));
  });
});

describe("scCost", () => {
  it("multi level shuttle most expensive", () => {
    expect(scCost("multi_level_shuttle")).toBeGreaterThan(scCost("pallet_shuttle_deep"));
  });
});

describe("multiLevel", () => {
  it("multi level shuttle is multi level", () => {
    expect(multiLevel("multi_level_shuttle")).toBe(true);
  });
  it("pallet shuttle deep not multi level", () => {
    expect(multiLevel("pallet_shuttle_deep")).toBe(false);
  });
});

describe("forDeepLane", () => {
  it("pallet shuttle deep for deep lane", () => {
    expect(forDeepLane("pallet_shuttle_deep")).toBe(true);
  });
  it("goods to person bot not for deep lane", () => {
    expect(forDeepLane("goods_to_person_bot")).toBe(false);
  });
});

describe("transport", () => {
  it("autonomous cube bot uses grid running robot", () => {
    expect(transport("autonomous_cube_bot")).toBe("grid_running_robot_bin_dig_stack_port_delivery");
  });
});

describe("bestUse", () => {
  it("goods to person bot for ecommerce fulfillment", () => {
    expect(bestUse("goods_to_person_bot")).toBe("ecommerce_fulfillment_dynamic_slotting_each_pick");
  });
});

describe("shuttleCartTypes", () => {
  it("returns 5 types", () => {
    expect(shuttleCartTypes()).toHaveLength(5);
  });
});
