import { describe, it, expect } from "vitest";
import {
  durability, coverage, speed, detail,
  lbCost, removable, forBeverage, adhesion,
  bestUse, labelTypes,
} from "../label-type-calc.js";

describe("durability", () => {
  it("in mold most durable", () => {
    expect(durability("in_mold_iml")).toBeGreaterThan(durability("rfid_smart_tag"));
  });
});

describe("coverage", () => {
  it("shrink sleeve full coverage", () => {
    expect(coverage("shrink_sleeve_full")).toBeGreaterThan(coverage("rfid_smart_tag"));
  });
});

describe("speed", () => {
  it("wet glue fastest application", () => {
    expect(speed("wet_glue_cutstack")).toBeGreaterThan(speed("rfid_smart_tag"));
  });
});

describe("detail", () => {
  it("shrink sleeve high detail", () => {
    expect(detail("shrink_sleeve_full")).toBeGreaterThan(detail("wet_glue_cutstack"));
  });
});

describe("lbCost", () => {
  it("rfid smart tag most expensive", () => {
    expect(lbCost("rfid_smart_tag")).toBeGreaterThan(lbCost("wet_glue_cutstack"));
  });
});

describe("removable", () => {
  it("pressure sensitive is removable", () => {
    expect(removable("pressure_sensitive_psa")).toBe(true);
  });
  it("shrink sleeve not removable", () => {
    expect(removable("shrink_sleeve_full")).toBe(false);
  });
});

describe("forBeverage", () => {
  it("shrink sleeve for beverage", () => {
    expect(forBeverage("shrink_sleeve_full")).toBe(true);
  });
  it("rfid not for beverage", () => {
    expect(forBeverage("rfid_smart_tag")).toBe(false);
  });
});

describe("adhesion", () => {
  it("in mold fused to substrate", () => {
    expect(adhesion("in_mold_iml")).toBe("fused_to_substrate_molding");
  });
});

describe("bestUse", () => {
  it("rfid best for inventory tracking", () => {
    expect(bestUse("rfid_smart_tag")).toBe("inventory_tracking_supply_chain");
  });
});

describe("labelTypes", () => {
  it("returns 5 types", () => {
    expect(labelTypes()).toHaveLength(5);
  });
});
