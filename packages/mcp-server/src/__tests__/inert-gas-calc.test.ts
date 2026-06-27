import { describe, it, expect } from "vitest";
import {
  purity, capacity, reliability, operating,
  igCost, onSite, forTanker, source,
  bestUse, inertGasTypes,
} from "../inert-gas-calc.js";

describe("purity", () => {
  it("psa highest purity", () => {
    expect(purity("nitrogen_generator_psa")).toBeGreaterThan(purity("flue_gas_scrubber"));
  });
});

describe("capacity", () => {
  it("flue gas highest capacity", () => {
    expect(capacity("flue_gas_scrubber")).toBeGreaterThan(capacity("argon_purge_welding"));
  });
});

describe("reliability", () => {
  it("membrane most reliable", () => {
    expect(reliability("nitrogen_generator_membrane")).toBeGreaterThan(reliability("flue_gas_scrubber"));
  });
});

describe("operating", () => {
  it("flue gas lowest operating cost", () => {
    expect(operating("flue_gas_scrubber")).toBeGreaterThan(operating("argon_purge_welding"));
  });
});

describe("igCost", () => {
  it("argon most expensive", () => {
    expect(igCost("argon_purge_welding")).toBeGreaterThan(igCost("co2_injection_food"));
  });
});

describe("onSite", () => {
  it("membrane is on site", () => {
    expect(onSite("nitrogen_generator_membrane")).toBe(true);
  });
  it("argon not on site", () => {
    expect(onSite("argon_purge_welding")).toBe(false);
  });
});

describe("forTanker", () => {
  it("flue gas for tanker", () => {
    expect(forTanker("flue_gas_scrubber")).toBe(true);
  });
  it("psa not tanker", () => {
    expect(forTanker("nitrogen_generator_psa")).toBe(false);
  });
});

describe("source", () => {
  it("co2 uses liquid bulk", () => {
    expect(source("co2_injection_food")).toBe("liquid_co2_bulk_tank_vaporizer");
  });
});

describe("bestUse", () => {
  it("flue gas for crude tanker", () => {
    expect(bestUse("flue_gas_scrubber")).toBe("crude_oil_tanker_cargo_inerting");
  });
});

describe("inertGasTypes", () => {
  it("returns 5 types", () => {
    expect(inertGasTypes()).toHaveLength(5);
  });
});
