import { describe, it, expect } from "vitest";
import {
  accuracy, rangeability, pressureDrop, density,
  cfCost, massFlow, forGas, tube,
  bestUse, coriolisFlowTypes,
} from "../coriolis-flow-calc.js";

describe("accuracy", () => {
  it("u tube bent highest accuracy", () => {
    expect(accuracy("u_tube_bent")).toBeGreaterThan(accuracy("straight_tube_single"));
  });
});

describe("rangeability", () => {
  it("high capacity large best rangeability", () => {
    expect(rangeability("high_capacity_large")).toBeGreaterThan(rangeability("straight_tube_single"));
  });
});

describe("pressureDrop", () => {
  it("straight tube lowest pressure drop (highest score)", () => {
    expect(pressureDrop("straight_tube_single")).toBeGreaterThan(pressureDrop("high_capacity_large"));
  });
});

describe("density", () => {
  it("u tube bent best density measurement", () => {
    expect(density("u_tube_bent")).toBeGreaterThan(density("straight_tube_single"));
  });
});

describe("cfCost", () => {
  it("high capacity large most expensive", () => {
    expect(cfCost("high_capacity_large")).toBeGreaterThan(cfCost("straight_tube_single"));
  });
});

describe("massFlow", () => {
  it("all coriolis meters measure mass flow", () => {
    expect(massFlow("u_tube_bent")).toBe(true);
    expect(massFlow("straight_tube_single")).toBe(true);
  });
});

describe("forGas", () => {
  it("dual tube parallel for gas", () => {
    expect(forGas("dual_tube_parallel")).toBe(true);
  });
  it("u tube bent not for gas", () => {
    expect(forGas("u_tube_bent")).toBe(false);
  });
});

describe("tube", () => {
  it("micro motion uses compact sensor", () => {
    expect(tube("micro_motion_compact")).toBe("compact_sensor_integral_transmitter");
  });
});

describe("bestUse", () => {
  it("u tube bent for custody transfer", () => {
    expect(bestUse("u_tube_bent")).toBe("custody_transfer_oil_gas_billing");
  });
});

describe("coriolisFlowTypes", () => {
  it("returns 5 types", () => {
    expect(coriolisFlowTypes()).toHaveLength(5);
  });
});
