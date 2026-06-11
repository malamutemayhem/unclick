import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, reliability, emissions,
  mtCost, chpCapable, forDistributed, turbine,
  bestUse, microturbineTypes,
} from "../microturbine-calc.js";

describe("efficiency", () => {
  it("single shaft recuperated most efficient", () => {
    expect(efficiency("single_shaft_recuperated")).toBeGreaterThan(efficiency("biogas_fueled"));
  });
});

describe("capacity", () => {
  it("multi pack array highest capacity", () => {
    expect(capacity("multi_pack_array")).toBeGreaterThan(capacity("single_shaft_recuperated"));
  });
});

describe("reliability", () => {
  it("oil free air bearing most reliable", () => {
    expect(reliability("oil_free_air_bearing")).toBeGreaterThan(reliability("two_shaft"));
  });
});

describe("emissions", () => {
  it("biogas fueled lowest emissions", () => {
    expect(emissions("biogas_fueled")).toBeGreaterThan(emissions("two_shaft"));
  });
});

describe("mtCost", () => {
  it("multi pack array most expensive", () => {
    expect(mtCost("multi_pack_array")).toBeGreaterThan(mtCost("single_shaft_recuperated"));
  });
});

describe("chpCapable", () => {
  it("all types are chp capable", () => {
    expect(chpCapable("single_shaft_recuperated")).toBe(true);
    expect(chpCapable("biogas_fueled")).toBe(true);
  });
});

describe("forDistributed", () => {
  it("all types for distributed generation", () => {
    expect(forDistributed("oil_free_air_bearing")).toBe(true);
    expect(forDistributed("multi_pack_array")).toBe(true);
  });
});

describe("turbine", () => {
  it("oil free air bearing uses air foil bearing", () => {
    expect(turbine("oil_free_air_bearing")).toBe("air_foil_bearing_no_oil_no_coolant_single_moving_part");
  });
});

describe("bestUse", () => {
  it("biogas fueled for wastewater plant", () => {
    expect(bestUse("biogas_fueled")).toBe("wastewater_plant_landfill_dairy_farm_biogas_to_power_chp");
  });
});

describe("microturbineTypes", () => {
  it("returns 5 types", () => {
    expect(microturbineTypes()).toHaveLength(5);
  });
});
