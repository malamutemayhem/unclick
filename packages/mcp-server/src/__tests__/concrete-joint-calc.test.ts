import { describe, it, expect } from "vitest";
import {
  crackControl, loadTransfer, sealability, durability,
  cjCost, doweled, forSlab, filler,
  bestUse, concreteJointTypes,
} from "../concrete-joint-calc.js";

describe("crackControl", () => {
  it("contraction saw cut best crack control", () => {
    expect(crackControl("contraction_saw_cut_control")).toBeGreaterThan(crackControl("construction_bulkhead_day"));
  });
});

describe("loadTransfer", () => {
  it("doweled best load transfer", () => {
    expect(loadTransfer("doweled_load_transfer_bar")).toBeGreaterThan(loadTransfer("isolation_column_pad_foam"));
  });
});

describe("sealability", () => {
  it("expansion best sealability", () => {
    expect(sealability("expansion_full_depth_filler")).toBeGreaterThan(sealability("construction_bulkhead_day"));
  });
});

describe("durability", () => {
  it("construction bulkhead most durable", () => {
    expect(durability("construction_bulkhead_day")).toBeGreaterThan(durability("contraction_saw_cut_control"));
  });
});

describe("cjCost", () => {
  it("doweled most expensive", () => {
    expect(cjCost("doweled_load_transfer_bar")).toBeGreaterThan(cjCost("isolation_column_pad_foam"));
  });
});

describe("doweled", () => {
  it("doweled load transfer is doweled", () => {
    expect(doweled("doweled_load_transfer_bar")).toBe(true);
  });
  it("contraction not doweled", () => {
    expect(doweled("contraction_saw_cut_control")).toBe(false);
  });
});

describe("forSlab", () => {
  it("all for slab", () => {
    expect(forSlab("expansion_full_depth_filler")).toBe(true);
  });
});

describe("filler", () => {
  it("isolation uses closed cell foam", () => {
    expect(filler("isolation_column_pad_foam")).toBe("closed_cell_foam_wrap_pad");
  });
});

describe("bestUse", () => {
  it("doweled for heavy duty warehouse", () => {
    expect(bestUse("doweled_load_transfer_bar")).toBe("heavy_duty_warehouse_forklift_joint");
  });
});

describe("concreteJointTypes", () => {
  it("returns 5 types", () => {
    expect(concreteJointTypes()).toHaveLength(5);
  });
});
