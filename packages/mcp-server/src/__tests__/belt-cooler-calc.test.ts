import { describe, it, expect } from "vitest";
import {
  coolingRate, throughput, tempDrop, productGentleness,
  bcCost, contactCool, forChocolate, coolerConfig,
  bestUse, beltCoolerTypes,
} from "../belt-cooler-calc.js";

describe("coolingRate", () => {
  it("cryogenic belt best cooling rate", () => {
    expect(coolingRate("cryogenic_belt")).toBeGreaterThan(coolingRate("wire_mesh_cool"));
  });
});

describe("throughput", () => {
  it("steel belt highest throughput", () => {
    expect(throughput("steel_belt_cool")).toBeGreaterThan(throughput("cryogenic_belt"));
  });
});

describe("tempDrop", () => {
  it("cryogenic belt best temp drop", () => {
    expect(tempDrop("cryogenic_belt")).toBeGreaterThan(tempDrop("wire_mesh_cool"));
  });
});

describe("productGentleness", () => {
  it("modular plastic best product gentleness", () => {
    expect(productGentleness("modular_plastic")).toBeGreaterThan(productGentleness("cryogenic_belt"));
  });
});

describe("bcCost", () => {
  it("cryogenic belt most expensive", () => {
    expect(bcCost("cryogenic_belt")).toBeGreaterThan(bcCost("wire_mesh_cool"));
  });
});

describe("contactCool", () => {
  it("steel belt uses contact cool", () => {
    expect(contactCool("steel_belt_cool")).toBe(true);
  });
  it("wire mesh no contact cool", () => {
    expect(contactCool("wire_mesh_cool")).toBe(false);
  });
});

describe("forChocolate", () => {
  it("steel belt for chocolate", () => {
    expect(forChocolate("steel_belt_cool")).toBe(true);
  });
  it("wire mesh not for chocolate", () => {
    expect(forChocolate("wire_mesh_cool")).toBe(false);
  });
});

describe("coolerConfig", () => {
  it("air blast uses forced cold air jet rapid surface chill", () => {
    expect(coolerConfig("air_blast_cool")).toBe("air_blast_belt_cooler_forced_cold_air_jet_rapid_surface_chill");
  });
});

describe("bestUse", () => {
  it("cryogenic belt for iqf product liquid nitrogen flash freeze", () => {
    expect(bestUse("cryogenic_belt")).toBe("iqf_product_cryogenic_belt_cooler_liquid_nitrogen_flash_freeze");
  });
});

describe("beltCoolerTypes", () => {
  it("returns 5 types", () => {
    expect(beltCoolerTypes()).toHaveLength(5);
  });
});
