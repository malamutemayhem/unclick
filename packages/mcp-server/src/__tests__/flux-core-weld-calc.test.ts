import { describe, it, expect } from "vitest";
import {
  deposition, speed, penetration, allPosition,
  fcCost, gasRequired, forOutdoor, wire,
  bestUse, fluxCoreWeldTypes,
} from "../flux-core-weld-calc.js";

describe("deposition", () => {
  it("dual shield highest deposition", () => {
    expect(deposition("dual_shield")).toBeGreaterThan(deposition("self_shielded_e71t"));
  });
});

describe("speed", () => {
  it("metal core fastest", () => {
    expect(speed("metal_core")).toBeGreaterThan(speed("self_shielded_e71t"));
  });
});

describe("penetration", () => {
  it("dual shield deepest penetration", () => {
    expect(penetration("dual_shield")).toBeGreaterThan(penetration("self_shielded_e71t"));
  });
});

describe("allPosition", () => {
  it("self shielded best all position", () => {
    expect(allPosition("self_shielded_e71t")).toBeGreaterThan(allPosition("metal_core"));
  });
});

describe("fcCost", () => {
  it("stainless flux core most expensive", () => {
    expect(fcCost("stainless_flux_core")).toBeGreaterThan(fcCost("self_shielded_e71t"));
  });
});

describe("gasRequired", () => {
  it("gas shielded requires gas", () => {
    expect(gasRequired("gas_shielded_e71t")).toBe(true);
  });
  it("self shielded no gas required", () => {
    expect(gasRequired("self_shielded_e71t")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("self shielded for outdoor", () => {
    expect(forOutdoor("self_shielded_e71t")).toBe(true);
  });
  it("gas shielded not for outdoor", () => {
    expect(forOutdoor("gas_shielded_e71t")).toBe(false);
  });
});

describe("wire", () => {
  it("metal core uses spray transfer wire", () => {
    expect(wire("metal_core")).toBe("e70c_6m_metal_core_spray_transfer_low_spatter_high_speed");
  });
});

describe("bestUse", () => {
  it("self shielded for field erection", () => {
    expect(bestUse("self_shielded_e71t")).toBe("field_erection_bridge_deck_outdoor_windy_site_structural");
  });
});

describe("fluxCoreWeldTypes", () => {
  it("returns 5 types", () => {
    expect(fluxCoreWeldTypes()).toHaveLength(5);
  });
});
