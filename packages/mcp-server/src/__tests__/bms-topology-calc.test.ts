import { describe, it, expect } from "vitest";
import {
  balanceEff, accuracy, scalability, reliability,
  bmsCost, bidirectional, forLargePack, method,
  bestUse, bmsTopologies,
} from "../bms-topology-calc.js";

describe("balanceEff", () => {
  it("active balance flyback best balance efficiency", () => {
    expect(balanceEff("active_balance_flyback")).toBeGreaterThan(balanceEff("passive_balance_bleed"));
  });
});

describe("accuracy", () => {
  it("distributed daisy chain highest accuracy", () => {
    expect(accuracy("distributed_daisy_chain")).toBeGreaterThan(accuracy("passive_balance_bleed"));
  });
});

describe("scalability", () => {
  it("distributed daisy chain most scalable", () => {
    expect(scalability("distributed_daisy_chain")).toBeGreaterThan(scalability("centralized_master"));
  });
});

describe("reliability", () => {
  it("passive balance bleed most reliable", () => {
    expect(reliability("passive_balance_bleed")).toBeGreaterThan(reliability("centralized_master"));
  });
});

describe("bmsCost", () => {
  it("wireless bms most expensive", () => {
    expect(bmsCost("wireless_bms")).toBeGreaterThan(bmsCost("passive_balance_bleed"));
  });
});

describe("bidirectional", () => {
  it("active balance flyback is bidirectional", () => {
    expect(bidirectional("active_balance_flyback")).toBe(true);
  });
  it("passive balance bleed not bidirectional", () => {
    expect(bidirectional("passive_balance_bleed")).toBe(false);
  });
});

describe("forLargePack", () => {
  it("distributed daisy chain for large pack", () => {
    expect(forLargePack("distributed_daisy_chain")).toBe(true);
  });
  it("passive balance bleed not for large pack", () => {
    expect(forLargePack("passive_balance_bleed")).toBe(false);
  });
});

describe("method", () => {
  it("wireless bms uses ble mesh cell telemetry", () => {
    expect(method("wireless_bms")).toBe("ble_mesh_cell_telemetry");
  });
});

describe("bestUse", () => {
  it("distributed daisy chain best for grid mwh battery farm", () => {
    expect(bestUse("distributed_daisy_chain")).toBe("grid_mwh_battery_farm");
  });
});

describe("bmsTopologies", () => {
  it("returns 5 types", () => {
    expect(bmsTopologies()).toHaveLength(5);
  });
});
