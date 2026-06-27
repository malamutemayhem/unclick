import { describe, it, expect } from "vitest";
import {
  sensitivity, throughput, selectivity, speedOfOperation,
  grCost, directional, forHighResistance, relayConfig,
  bestUse, groundingRelayTypes,
} from "../grounding-relay-calc.js";

describe("sensitivity", () => {
  it("zero sequence best sensitivity", () => {
    expect(sensitivity("zero_sequence")).toBeGreaterThan(sensitivity("overcurrent_ground"));
  });
});

describe("throughput", () => {
  it("distance ground highest throughput", () => {
    expect(throughput("distance_ground")).toBeGreaterThan(throughput("differential_ground"));
  });
});

describe("selectivity", () => {
  it("differential ground best selectivity", () => {
    expect(selectivity("differential_ground")).toBeGreaterThan(selectivity("overcurrent_ground"));
  });
});

describe("speedOfOperation", () => {
  it("differential ground fastest operation", () => {
    expect(speedOfOperation("differential_ground")).toBeGreaterThan(speedOfOperation("overcurrent_ground"));
  });
});

describe("grCost", () => {
  it("distance ground most expensive", () => {
    expect(grCost("distance_ground")).toBeGreaterThan(grCost("overcurrent_ground"));
  });
});

describe("directional", () => {
  it("directional ground is directional", () => {
    expect(directional("directional_ground")).toBe(true);
  });
  it("overcurrent ground not directional", () => {
    expect(directional("overcurrent_ground")).toBe(false);
  });
});

describe("forHighResistance", () => {
  it("differential ground for high resistance", () => {
    expect(forHighResistance("differential_ground")).toBe(true);
  });
  it("overcurrent ground not for high resistance", () => {
    expect(forHighResistance("overcurrent_ground")).toBe(false);
  });
});

describe("relayConfig", () => {
  it("zero sequence uses core balance ct residual sum detect leak", () => {
    expect(relayConfig("zero_sequence")).toBe("zero_sequence_relay_core_balance_ct_residual_sum_detect_leak");
  });
});

describe("bestUse", () => {
  it("directional ground for ring bus selective fault direction trip", () => {
    expect(bestUse("directional_ground")).toBe("ring_bus_directional_ground_relay_selective_fault_direction_trip");
  });
});

describe("groundingRelayTypes", () => {
  it("returns 5 types", () => {
    expect(groundingRelayTypes()).toHaveLength(5);
  });
});
