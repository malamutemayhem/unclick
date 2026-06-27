import { describe, it, expect } from "vitest";
import {
  suctionPower, tankCapacity, portability, noiseLevel,
  vacCost, handlesWet, cordless, filterType,
  bestUse, shopVacs,
} from "../shop-vac-calc.js";

describe("suctionPower", () => {
  it("dust collector barrel strongest suction", () => {
    expect(suctionPower("dust_collector_barrel")).toBeGreaterThan(suctionPower("cordless_portable"));
  });
});

describe("tankCapacity", () => {
  it("dust collector barrel largest tank", () => {
    expect(tankCapacity("dust_collector_barrel")).toBeGreaterThan(tankCapacity("cordless_portable"));
  });
});

describe("portability", () => {
  it("cordless portable most portable", () => {
    expect(portability("cordless_portable")).toBeGreaterThan(portability("dust_collector_barrel"));
  });
});

describe("noiseLevel", () => {
  it("cordless portable quietest", () => {
    expect(noiseLevel("cordless_portable")).toBeGreaterThan(noiseLevel("dust_collector_barrel"));
  });
});

describe("vacCost", () => {
  it("dust collector barrel most expensive", () => {
    expect(vacCost("dust_collector_barrel")).toBeGreaterThan(vacCost("ash_vacuum_fireplace"));
  });
});

describe("handlesWet", () => {
  it("wet dry standard handles wet", () => {
    expect(handlesWet("wet_dry_standard")).toBe(true);
  });
  it("dust collector barrel does not", () => {
    expect(handlesWet("dust_collector_barrel")).toBe(false);
  });
});

describe("cordless", () => {
  it("cordless portable is cordless", () => {
    expect(cordless("cordless_portable")).toBe(true);
  });
  it("wet dry standard is not", () => {
    expect(cordless("wet_dry_standard")).toBe(false);
  });
});

describe("filterType", () => {
  it("ash vacuum fireplace uses metal mesh heat rated", () => {
    expect(filterType("ash_vacuum_fireplace")).toBe("metal_mesh_heat_rated");
  });
});

describe("bestUse", () => {
  it("dust collector barrel best for woodshop table saw dust", () => {
    expect(bestUse("dust_collector_barrel")).toBe("woodshop_table_saw_dust");
  });
});

describe("shopVacs", () => {
  it("returns 5 types", () => {
    expect(shopVacs()).toHaveLength(5);
  });
});
