import { describe, it, expect } from "vitest";
import {
  storageCapacity, dischargeRate, blendingAbility, materialFlow,
  csCost_, aerated, forBulk, siloConfig,
  bestUse, cementSiloTypes,
} from "../cement-silo-calc.js";

describe("storageCapacity", () => {
  it("flat bottom best storage capacity", () => {
    expect(storageCapacity("flat_bottom")).toBeGreaterThanOrEqual(storageCapacity("dome_silo"));
  });
});

describe("dischargeRate", () => {
  it("cone bottom best discharge rate", () => {
    expect(dischargeRate("cone_bottom")).toBeGreaterThan(dischargeRate("flat_bottom"));
  });
});

describe("blendingAbility", () => {
  it("blending silo best blending ability", () => {
    expect(blendingAbility("blending_silo")).toBeGreaterThan(blendingAbility("flat_bottom"));
  });
});

describe("materialFlow", () => {
  it("cone bottom best material flow", () => {
    expect(materialFlow("cone_bottom")).toBeGreaterThan(materialFlow("flat_bottom"));
  });
});

describe("csCost_", () => {
  it("blending silo most expensive", () => {
    expect(csCost_("blending_silo")).toBeGreaterThan(csCost_("flat_bottom"));
  });
});

describe("aerated", () => {
  it("cone bottom is aerated", () => {
    expect(aerated("cone_bottom")).toBe(true);
  });
  it("flat bottom not aerated", () => {
    expect(aerated("flat_bottom")).toBe(false);
  });
});

describe("forBulk", () => {
  it("flat bottom for bulk", () => {
    expect(forBulk("flat_bottom")).toBe(true);
  });
  it("blending silo not for bulk", () => {
    expect(forBulk("blending_silo")).toBe(false);
  });
});

describe("siloConfig", () => {
  it("multi cell uses separate compartment grade store", () => {
    expect(siloConfig("multi_cell")).toBe("multi_cell_cement_silo_separate_compartment_grade_store_blend");
  });
});

describe("bestUse", () => {
  it("dome silo for weather protected large capacity", () => {
    expect(bestUse("dome_silo")).toBe("bulk_cement_storage_dome_silo_weather_protected_large_capacity");
  });
});

describe("cementSiloTypes", () => {
  it("returns 5 types", () => {
    expect(cementSiloTypes()).toHaveLength(5);
  });
});
