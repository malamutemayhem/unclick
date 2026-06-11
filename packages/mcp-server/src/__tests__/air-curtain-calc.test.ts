import { describe, it, expect } from "vitest";
import {
  airflow, heating, noise, coverage,
  acCost, heated, forIndustrial, mounting,
  bestUse, airCurtainTypes,
} from "../air-curtain-calc.js";

describe("airflow", () => {
  it("gas fired highest airflow", () => {
    expect(airflow("gas_fired_warehouse")).toBeGreaterThan(airflow("low_profile_retail"));
  });
});

describe("heating", () => {
  it("gas fired highest heating", () => {
    expect(heating("gas_fired_warehouse")).toBeGreaterThan(heating("low_profile_retail"));
  });
});

describe("noise", () => {
  it("low profile quietest", () => {
    expect(noise("low_profile_retail")).toBeGreaterThan(noise("gas_fired_warehouse"));
  });
});

describe("coverage", () => {
  it("gas fired widest coverage", () => {
    expect(coverage("gas_fired_warehouse")).toBeGreaterThan(coverage("low_profile_retail"));
  });
});

describe("acCost", () => {
  it("gas fired most expensive", () => {
    expect(acCost("gas_fired_warehouse")).toBeGreaterThan(acCost("unheated_ambient_recirculate"));
  });
});

describe("heated", () => {
  it("electric is heated", () => {
    expect(heated("electric_heated_commercial")).toBe(true);
  });
  it("unheated not heated", () => {
    expect(heated("unheated_ambient_recirculate")).toBe(false);
  });
});

describe("forIndustrial", () => {
  it("hot water for industrial", () => {
    expect(forIndustrial("hot_water_coil_industrial")).toBe(true);
  });
  it("retail not industrial", () => {
    expect(forIndustrial("low_profile_retail")).toBe(false);
  });
});

describe("mounting", () => {
  it("low profile uses concealed", () => {
    expect(mounting("low_profile_retail")).toBe("slim_profile_concealed_above");
  });
});

describe("bestUse", () => {
  it("unheated for convenience store", () => {
    expect(bestUse("unheated_ambient_recirculate")).toBe("convenience_store_fly_barrier");
  });
});

describe("airCurtainTypes", () => {
  it("returns 5 types", () => {
    expect(airCurtainTypes()).toHaveLength(5);
  });
});
