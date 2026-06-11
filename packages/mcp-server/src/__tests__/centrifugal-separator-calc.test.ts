import { describe, it, expect } from "vitest";
import {
  separationForce, throughput, solidsDryness, clarityOutput,
  csCost, continuous, forLiquidLiquid, mechanism,
  bestUse, centrifugalSeparatorTypes,
} from "../centrifugal-separator-calc.js";

describe("separationForce", () => {
  it("disc stack highest separation force", () => {
    expect(separationForce("disc_stack")).toBeGreaterThan(separationForce("hydrocyclone"));
  });
});

describe("throughput", () => {
  it("hydrocyclone highest throughput", () => {
    expect(throughput("hydrocyclone")).toBeGreaterThan(throughput("tubular_bowl"));
  });
});

describe("solidsDryness", () => {
  it("basket peeler driest solids", () => {
    expect(solidsDryness("basket_peeler")).toBeGreaterThan(solidsDryness("hydrocyclone"));
  });
});

describe("clarityOutput", () => {
  it("disc stack best clarity", () => {
    expect(clarityOutput("disc_stack")).toBeGreaterThan(clarityOutput("hydrocyclone"));
  });
});

describe("csCost", () => {
  it("disc stack most expensive", () => {
    expect(csCost("disc_stack")).toBeGreaterThan(csCost("hydrocyclone"));
  });
});

describe("continuous", () => {
  it("decanter scroll is continuous", () => {
    expect(continuous("decanter_scroll")).toBe(true);
  });
  it("basket peeler not continuous", () => {
    expect(continuous("basket_peeler")).toBe(false);
  });
});

describe("forLiquidLiquid", () => {
  it("disc stack for liquid liquid", () => {
    expect(forLiquidLiquid("disc_stack")).toBe(true);
  });
  it("decanter scroll not for liquid liquid", () => {
    expect(forLiquidLiquid("decanter_scroll")).toBe(false);
  });
});

describe("mechanism", () => {
  it("hydrocyclone uses conical vortex", () => {
    expect(mechanism("hydrocyclone")).toBe("conical_vortex_no_moving_parts_pressure_driven_classifier");
  });
});

describe("bestUse", () => {
  it("tubular bowl for pharmaceutical", () => {
    expect(bestUse("tubular_bowl")).toBe("pharmaceutical_biotech_cell_harvest_vaccine_blood_plasma");
  });
});

describe("centrifugalSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(centrifugalSeparatorTypes()).toHaveLength(5);
  });
});
