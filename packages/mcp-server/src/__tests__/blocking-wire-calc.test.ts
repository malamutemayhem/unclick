import { describe, it, expect } from "vitest";
import {
  edgeStraight, curveAbility, durability, precision,
  wireCost, rustResist, flexWire, wireMaterial,
  bestUse, blockingWires,
} from "../blocking-wire-calc.js";

describe("edgeStraight", () => {
  it("straight steel long straightest edge", () => {
    expect(edgeStraight("straight_steel_long")).toBeGreaterThan(edgeStraight("flexible_cable_set"));
  });
});

describe("curveAbility", () => {
  it("flexible cable set best curve ability", () => {
    expect(curveAbility("flexible_cable_set")).toBeGreaterThan(curveAbility("straight_steel_long"));
  });
});

describe("durability", () => {
  it("rust proof coated most durable", () => {
    expect(durability("rust_proof_coated")).toBeGreaterThan(durability("lace_pin_fine"));
  });
});

describe("precision", () => {
  it("lace pin fine most precise", () => {
    expect(precision("lace_pin_fine")).toBeGreaterThan(precision("flexible_cable_set"));
  });
});

describe("wireCost", () => {
  it("combi wire pin most expensive", () => {
    expect(wireCost("combi_wire_pin")).toBeGreaterThan(wireCost("lace_pin_fine"));
  });
});

describe("rustResist", () => {
  it("rust proof coated resists rust", () => {
    expect(rustResist("rust_proof_coated")).toBe(true);
  });
  it("straight steel long does not resist rust", () => {
    expect(rustResist("straight_steel_long")).toBe(false);
  });
});

describe("flexWire", () => {
  it("flexible cable set is flexible", () => {
    expect(flexWire("flexible_cable_set")).toBe(true);
  });
  it("straight steel long is not flexible", () => {
    expect(flexWire("straight_steel_long")).toBe(false);
  });
});

describe("wireMaterial", () => {
  it("rust proof coated uses nickel plated steel", () => {
    expect(wireMaterial("rust_proof_coated")).toBe("nickel_plated_steel");
  });
});

describe("bestUse", () => {
  it("flexible cable set best for curved shawl edge", () => {
    expect(bestUse("flexible_cable_set")).toBe("curved_shawl_edge");
  });
});

describe("blockingWires", () => {
  it("returns 5 types", () => {
    expect(blockingWires()).toHaveLength(5);
  });
});
