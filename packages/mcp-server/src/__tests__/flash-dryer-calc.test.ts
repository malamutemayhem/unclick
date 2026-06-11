import { describe, it, expect } from "vitest";
import {
  drySpeed, particleControl, heatEfficiency, throughput,
  flCost, singlePass, forWetCake, airflow,
  bestUse, flashDryerTypes,
} from "../flash-dryer-calc.js";

describe("drySpeed", () => {
  it("spin flash agitated fastest drying", () => {
    expect(drySpeed("spin_flash_agitated")).toBeGreaterThan(drySpeed("cascade_flash_multi_stage"));
  });
});

describe("particleControl", () => {
  it("spin flash best particle control", () => {
    expect(particleControl("spin_flash_agitated")).toBeGreaterThan(particleControl("pneumatic_straight_tube"));
  });
});

describe("heatEfficiency", () => {
  it("superheated steam most efficient", () => {
    expect(heatEfficiency("superheated_steam_flash")).toBeGreaterThan(heatEfficiency("pneumatic_straight_tube"));
  });
});

describe("throughput", () => {
  it("cascade flash highest throughput", () => {
    expect(throughput("cascade_flash_multi_stage")).toBeGreaterThan(throughput("spin_flash_agitated"));
  });
});

describe("flCost", () => {
  it("superheated steam most expensive", () => {
    expect(flCost("superheated_steam_flash")).toBeGreaterThan(flCost("pneumatic_straight_tube"));
  });
});

describe("singlePass", () => {
  it("pneumatic straight tube is single pass", () => {
    expect(singlePass("pneumatic_straight_tube")).toBe(true);
  });
  it("ring dryer not single pass", () => {
    expect(singlePass("ring_dryer_recirculate")).toBe(false);
  });
});

describe("forWetCake", () => {
  it("spin flash for wet cake", () => {
    expect(forWetCake("spin_flash_agitated")).toBe(true);
  });
  it("superheated steam not for wet cake", () => {
    expect(forWetCake("superheated_steam_flash")).toBe(false);
  });
});

describe("airflow", () => {
  it("ring dryer uses classifier loop", () => {
    expect(airflow("ring_dryer_recirculate")).toBe("classifier_ring_return_oversize_loop");
  });
});

describe("bestUse", () => {
  it("superheated steam for solvent wet explosive", () => {
    expect(bestUse("superheated_steam_flash")).toBe("solvent_wet_explosive_inert_safe_dry");
  });
});

describe("flashDryerTypes", () => {
  it("returns 5 types", () => {
    expect(flashDryerTypes()).toHaveLength(5);
  });
});
