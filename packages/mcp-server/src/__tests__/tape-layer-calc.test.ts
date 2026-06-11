import { describe, it, expect } from "vitest";
import {
  layupSpeed, throughput, fiberSteering, gapLapControl,
  tlCost, automated, forLargePanel, layerConfig,
  bestUse, tapeLayerTypes,
} from "../tape-layer-calc.js";

describe("layupSpeed", () => {
  it("atl flat best layup speed", () => {
    expect(layupSpeed("atl_flat")).toBeGreaterThan(layupSpeed("manual_layup"));
  });
});

describe("throughput", () => {
  it("atl flat highest throughput", () => {
    expect(throughput("atl_flat")).toBeGreaterThan(throughput("afp_thermoplastic"));
  });
});

describe("fiberSteering", () => {
  it("afp thermoset best fiber steering", () => {
    expect(fiberSteering("afp_thermoset")).toBeGreaterThan(fiberSteering("atl_flat"));
  });
});

describe("gapLapControl", () => {
  it("afp thermoset best gap lap control", () => {
    expect(gapLapControl("afp_thermoset")).toBeGreaterThan(gapLapControl("manual_layup"));
  });
});

describe("tlCost", () => {
  it("afp thermoplastic most expensive", () => {
    expect(tlCost("afp_thermoplastic")).toBeGreaterThan(tlCost("manual_layup"));
  });
});

describe("automated", () => {
  it("atl flat is automated", () => {
    expect(automated("atl_flat")).toBe(true);
  });
  it("manual layup not automated", () => {
    expect(automated("manual_layup")).toBe(false);
  });
});

describe("forLargePanel", () => {
  it("atl flat for large panel", () => {
    expect(forLargePanel("atl_flat")).toBe(true);
  });
  it("afp thermoset not for large panel", () => {
    expect(forLargePanel("afp_thermoset")).toBe(false);
  });
});

describe("layerConfig", () => {
  it("afp thermoplastic uses laser heat in situ consolidate", () => {
    expect(layerConfig("afp_thermoplastic")).toBe("afp_thermoplastic_tape_layer_laser_heat_in_situ_consolidate");
  });
});

describe("bestUse", () => {
  it("atl flat for wing skin wide unidirectional fast layup", () => {
    expect(bestUse("atl_flat")).toBe("wing_skin_atl_flat_tape_layer_wide_unidirectional_fast_layup");
  });
});

describe("tapeLayerTypes", () => {
  it("returns 5 types", () => {
    expect(tapeLayerTypes()).toHaveLength(5);
  });
});
