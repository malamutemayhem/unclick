import { describe, it, expect } from "vitest";
import {
  groundReliability, comfort, mobility, durability,
  strapCost, continuous, wireless, groundMethod,
  bestUse, esdStraps,
} from "../esd-strap-calc.js";

describe("groundReliability", () => {
  it("wrist strap coil most reliable ground", () => {
    expect(groundReliability("wrist_strap_coil")).toBeGreaterThan(groundReliability("wireless_monitor_strap"));
  });
});

describe("comfort", () => {
  it("wireless monitor strap most comfortable", () => {
    expect(comfort("wireless_monitor_strap")).toBeGreaterThan(comfort("disposable_single_use"));
  });
});

describe("mobility", () => {
  it("wireless monitor strap most mobile", () => {
    expect(mobility("wireless_monitor_strap")).toBeGreaterThan(mobility("wrist_strap_coil"));
  });
});

describe("durability", () => {
  it("wrist strap coil most durable", () => {
    expect(durability("wrist_strap_coil")).toBeGreaterThan(durability("disposable_single_use"));
  });
});

describe("strapCost", () => {
  it("wireless monitor strap most expensive", () => {
    expect(strapCost("wireless_monitor_strap")).toBeGreaterThan(strapCost("disposable_single_use"));
  });
});

describe("continuous", () => {
  it("wrist strap coil is continuous", () => {
    expect(continuous("wrist_strap_coil")).toBe(true);
  });
  it("heel strap ground not continuous", () => {
    expect(continuous("heel_strap_ground")).toBe(false);
  });
});

describe("wireless", () => {
  it("wireless monitor strap is wireless", () => {
    expect(wireless("wireless_monitor_strap")).toBe(true);
  });
  it("wrist strap coil not wireless", () => {
    expect(wireless("wrist_strap_coil")).toBe(false);
  });
});

describe("groundMethod", () => {
  it("heel strap uses conductive heel tab", () => {
    expect(groundMethod("heel_strap_ground")).toBe("conductive_heel_tab");
  });
});

describe("bestUse", () => {
  it("disposable single use best for visitor cleanroom entry", () => {
    expect(bestUse("disposable_single_use")).toBe("visitor_cleanroom_entry");
  });
});

describe("esdStraps", () => {
  it("returns 5 types", () => {
    expect(esdStraps()).toHaveLength(5);
  });
});
