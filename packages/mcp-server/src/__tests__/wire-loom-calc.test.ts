import { describe, it, expect } from "vitest";
import {
  abrasionResist, flexibility, heatResist, installEase,
  loomCost, splitOpen, forHighTemp, material,
  bestUse, wireLooms,
} from "../wire-loom-calc.js";

describe("abrasionResist", () => {
  it("corrugated solid tube best abrasion resistance", () => {
    expect(abrasionResist("corrugated_solid_tube")).toBeGreaterThan(abrasionResist("spiral_wrap_band"));
  });
});

describe("flexibility", () => {
  it("woven fabric sleeve most flexible", () => {
    expect(flexibility("woven_fabric_sleeve")).toBeGreaterThan(flexibility("corrugated_solid_tube"));
  });
});

describe("heatResist", () => {
  it("woven fabric sleeve best heat resistance", () => {
    expect(heatResist("woven_fabric_sleeve")).toBeGreaterThan(heatResist("spiral_wrap_band"));
  });
});

describe("installEase", () => {
  it("spiral wrap band easiest install", () => {
    expect(installEase("spiral_wrap_band")).toBeGreaterThan(installEase("corrugated_solid_tube"));
  });
});

describe("loomCost", () => {
  it("woven fabric sleeve most expensive", () => {
    expect(loomCost("woven_fabric_sleeve")).toBeGreaterThan(loomCost("split_convoluted_tube"));
  });
});

describe("splitOpen", () => {
  it("split convoluted tube is split open", () => {
    expect(splitOpen("split_convoluted_tube")).toBe(true);
  });
  it("braided expandable not split open", () => {
    expect(splitOpen("braided_expandable")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("woven fabric sleeve is for high temp", () => {
    expect(forHighTemp("woven_fabric_sleeve")).toBe(true);
  });
  it("split convoluted tube not for high temp", () => {
    expect(forHighTemp("split_convoluted_tube")).toBe(false);
  });
});

describe("material", () => {
  it("braided expandable uses pet monofilament braid", () => {
    expect(material("braided_expandable")).toBe("pet_monofilament_braid");
  });
});

describe("bestUse", () => {
  it("woven fabric sleeve best for engine bay wire protect", () => {
    expect(bestUse("woven_fabric_sleeve")).toBe("engine_bay_wire_protect");
  });
});

describe("wireLooms", () => {
  it("returns 5 types", () => {
    expect(wireLooms()).toHaveLength(5);
  });
});
