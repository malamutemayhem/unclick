import { describe, it, expect } from "vitest";
import {
  savings, flexibility, automation, reliability,
  drCost, automated, forResidential, mechanism,
  bestUse, demandResponseTypes,
} from "../demand-response-calc.js";

describe("savings", () => {
  it("vpp most savings", () => {
    expect(savings("aggregated_virtual_plant")).toBeGreaterThan(savings("direct_load_control"));
  });
});

describe("flexibility", () => {
  it("real time most flexible", () => {
    expect(flexibility("real_time_pricing")).toBeGreaterThan(flexibility("direct_load_control"));
  });
});

describe("automation", () => {
  it("vpp most automated", () => {
    expect(automation("aggregated_virtual_plant")).toBeGreaterThan(automation("real_time_pricing"));
  });
});

describe("reliability", () => {
  it("vpp most reliable", () => {
    expect(reliability("aggregated_virtual_plant")).toBeGreaterThan(reliability("real_time_pricing"));
  });
});

describe("drCost", () => {
  it("vpp most expensive", () => {
    expect(drCost("aggregated_virtual_plant")).toBeGreaterThan(drCost("direct_load_control"));
  });
});

describe("automated", () => {
  it("direct load is automated", () => {
    expect(automated("direct_load_control")).toBe(true);
  });
  it("curtailable not automated", () => {
    expect(automated("curtailable_interruptible")).toBe(false);
  });
});

describe("forResidential", () => {
  it("critical peak for residential", () => {
    expect(forResidential("critical_peak_pricing")).toBe(true);
  });
  it("vpp not residential", () => {
    expect(forResidential("aggregated_virtual_plant")).toBe(false);
  });
});

describe("mechanism", () => {
  it("vpp uses derms", () => {
    expect(mechanism("aggregated_virtual_plant")).toBe("vpp_aggregator_cloud_derms");
  });
});

describe("bestUse", () => {
  it("direct load for residential ac", () => {
    expect(bestUse("direct_load_control")).toBe("residential_peak_shaving_ac");
  });
});

describe("demandResponseTypes", () => {
  it("returns 5 types", () => {
    expect(demandResponseTypes()).toHaveLength(5);
  });
});
