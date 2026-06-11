import { describe, it, expect } from "vitest";
import {
  capacity, reusability, stackability, cleanability,
  icCost, collapsible, forHazmat, material,
  bestUse, ibcContainerTypes,
} from "../ibc-container-calc.js";

describe("capacity", () => {
  it("flexible bulk bag largest capacity", () => {
    expect(capacity("flexible_bulk_bag")).toBeGreaterThan(capacity("stainless_tote_tank"));
  });
});

describe("reusability", () => {
  it("stainless tote most reusable", () => {
    expect(reusability("stainless_tote_tank")).toBeGreaterThan(reusability("flexible_bulk_bag"));
  });
});

describe("stackability", () => {
  it("folding ibc best stackability", () => {
    expect(stackability("folding_ibc_collapsible")).toBeGreaterThan(stackability("flexible_bulk_bag"));
  });
});

describe("cleanability", () => {
  it("stainless tote best cleanability", () => {
    expect(cleanability("stainless_tote_tank")).toBeGreaterThan(cleanability("flexible_bulk_bag"));
  });
});

describe("icCost", () => {
  it("heated ibc most expensive", () => {
    expect(icCost("heated_ibc_jacketed")).toBeGreaterThan(icCost("flexible_bulk_bag"));
  });
});

describe("collapsible", () => {
  it("folding ibc is collapsible", () => {
    expect(collapsible("folding_ibc_collapsible")).toBe(true);
  });
  it("rigid composite not collapsible", () => {
    expect(collapsible("rigid_composite_cage")).toBe(false);
  });
});

describe("forHazmat", () => {
  it("stainless tote for hazmat", () => {
    expect(forHazmat("stainless_tote_tank")).toBe(true);
  });
  it("flexible bulk bag not for hazmat", () => {
    expect(forHazmat("flexible_bulk_bag")).toBe(false);
  });
});

describe("material", () => {
  it("heated ibc uses stainless jacket", () => {
    expect(material("heated_ibc_jacketed")).toBe("stainless_jacket_insulate_heat_trace");
  });
});

describe("bestUse", () => {
  it("flexible bulk bag for dry powder", () => {
    expect(bestUse("flexible_bulk_bag")).toBe("dry_powder_granule_one_trip_bulk");
  });
});

describe("ibcContainerTypes", () => {
  it("returns 5 types", () => {
    expect(ibcContainerTypes()).toHaveLength(5);
  });
});
