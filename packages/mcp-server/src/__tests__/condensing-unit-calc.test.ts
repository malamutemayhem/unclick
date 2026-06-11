import { describe, it, expect } from "vitest";
import {
  coolingCapacity, throughput, energyEfficiency, footprint,
  cuCost, waterFree, forRefrigeration, unitConfig,
  bestUse, condensingUnitTypes,
} from "../condensing-unit-calc.js";

describe("coolingCapacity", () => {
  it("evaporative condenser best cooling capacity", () => {
    expect(coolingCapacity("evaporative_cond")).toBeGreaterThan(coolingCapacity("air_cooled_cond"));
  });
});

describe("throughput", () => {
  it("water cooled highest throughput", () => {
    expect(throughput("water_cooled_cond")).toBeGreaterThan(throughput("remote_condenser"));
  });
});

describe("energyEfficiency", () => {
  it("water cooled best energy efficiency", () => {
    expect(energyEfficiency("water_cooled_cond")).toBeGreaterThan(energyEfficiency("air_cooled_cond"));
  });
});

describe("footprint", () => {
  it("microchannel best footprint", () => {
    expect(footprint("microchannel_cond")).toBeGreaterThan(footprint("air_cooled_cond"));
  });
});

describe("cuCost", () => {
  it("evaporative condenser most expensive", () => {
    expect(cuCost("evaporative_cond")).toBeGreaterThan(cuCost("air_cooled_cond"));
  });
});

describe("waterFree", () => {
  it("air cooled is water free", () => {
    expect(waterFree("air_cooled_cond")).toBe(true);
  });
  it("water cooled not water free", () => {
    expect(waterFree("water_cooled_cond")).toBe(false);
  });
});

describe("forRefrigeration", () => {
  it("water cooled for refrigeration", () => {
    expect(forRefrigeration("water_cooled_cond")).toBe(true);
  });
  it("microchannel not for refrigeration", () => {
    expect(forRefrigeration("microchannel_cond")).toBe(false);
  });
});

describe("unitConfig", () => {
  it("microchannel uses flat tube low charge light weight", () => {
    expect(unitConfig("microchannel_cond")).toBe("microchannel_condenser_unit_flat_tube_low_charge_light_weight");
  });
});

describe("bestUse", () => {
  it("evaporative condenser for cold storage high capacity compact", () => {
    expect(bestUse("evaporative_cond")).toBe("cold_storage_evaporative_condenser_unit_high_capacity_compact");
  });
});

describe("condensingUnitTypes", () => {
  it("returns 5 types", () => {
    expect(condensingUnitTypes()).toHaveLength(5);
  });
});
