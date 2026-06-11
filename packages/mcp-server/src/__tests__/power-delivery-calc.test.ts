import { describe, it, expect } from "vitest";
import {
  maxPower, efficiency, cableSimplicity, safety,
  pdCost, dcOnly, forEdge, standard,
  bestUse, powerDeliveries,
} from "../power-delivery-calc.js";

describe("maxPower", () => {
  it("rack 48v dc highest max power", () => {
    expect(maxPower("rack_48v_dc")).toBeGreaterThan(maxPower("poe_plus_plus"));
  });
});

describe("efficiency", () => {
  it("rack 48v dc best efficiency", () => {
    expect(efficiency("rack_48v_dc")).toBeGreaterThan(efficiency("atx_desktop"));
  });
});

describe("cableSimplicity", () => {
  it("poe plus plus simplest cabling", () => {
    expect(cableSimplicity("poe_plus_plus")).toBeGreaterThan(cableSimplicity("atx_desktop"));
  });
});

describe("safety", () => {
  it("poe plus plus safest", () => {
    expect(safety("poe_plus_plus")).toBeGreaterThan(safety("atx_desktop"));
  });
});

describe("pdCost", () => {
  it("rack 48v dc most expensive", () => {
    expect(pdCost("rack_48v_dc")).toBeGreaterThan(pdCost("atx_desktop"));
  });
});

describe("dcOnly", () => {
  it("rack 48v dc is dc only", () => {
    expect(dcOnly("rack_48v_dc")).toBe(true);
  });
  it("atx desktop not dc only", () => {
    expect(dcOnly("atx_desktop")).toBe(false);
  });
});

describe("forEdge", () => {
  it("poe plus plus is for edge", () => {
    expect(forEdge("poe_plus_plus")).toBe(true);
  });
  it("atx desktop not for edge", () => {
    expect(forEdge("atx_desktop")).toBe(false);
  });
});

describe("standard", () => {
  it("rack 48v dc uses open rack v3 48v", () => {
    expect(standard("rack_48v_dc")).toBe("open_rack_v3_48v");
  });
});

describe("bestUse", () => {
  it("rack 48v dc best for telecom central office", () => {
    expect(bestUse("rack_48v_dc")).toBe("telecom_central_office");
  });
});

describe("powerDeliveries", () => {
  it("returns 5 types", () => {
    expect(powerDeliveries()).toHaveLength(5);
  });
});
