import { describe, it, expect } from "vitest";
import {
  throughput, cakeWash, moistureRemoval, footprint,
  dfCost, pressurized, forSlurry, medium,
  bestUse, discFilterTypes,
} from "../disc-filter-calc.js";

describe("throughput", () => {
  it("indexing disc highest throughput", () => {
    expect(throughput("indexing_disc_continuous")).toBeGreaterThan(throughput("capillary_disc_micro"));
  });
});

describe("cakeWash", () => {
  it("capillary disc best cake wash", () => {
    expect(cakeWash("capillary_disc_micro")).toBeGreaterThan(cakeWash("indexing_disc_continuous"));
  });
});

describe("moistureRemoval", () => {
  it("pressure disc best moisture removal", () => {
    expect(moistureRemoval("pressure_disc_enclosed")).toBeGreaterThan(moistureRemoval("vacuum_disc_cloth"));
  });
});

describe("footprint", () => {
  it("vacuum ceramic compact footprint", () => {
    expect(footprint("vacuum_disc_ceramic")).toBeGreaterThan(footprint("capillary_disc_micro"));
  });
});

describe("dfCost", () => {
  it("capillary most expensive", () => {
    expect(dfCost("capillary_disc_micro")).toBeGreaterThan(dfCost("vacuum_disc_cloth"));
  });
});

describe("pressurized", () => {
  it("pressure disc is pressurized", () => {
    expect(pressurized("pressure_disc_enclosed")).toBe(true);
  });
  it("vacuum disc not pressurized", () => {
    expect(pressurized("vacuum_disc_ceramic")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("vacuum ceramic for slurry", () => {
    expect(forSlurry("vacuum_disc_ceramic")).toBe(true);
  });
  it("capillary not for slurry", () => {
    expect(forSlurry("capillary_disc_micro")).toBe(false);
  });
});

describe("medium", () => {
  it("vacuum cloth uses polypropylene", () => {
    expect(medium("vacuum_disc_cloth")).toBe("polypropylene_cloth_sector_replaceable_filter");
  });
});

describe("bestUse", () => {
  it("pressure disc for chemical process", () => {
    expect(bestUse("pressure_disc_enclosed")).toBe("chemical_process_toxic_volatile_slurry_enclosed");
  });
});

describe("discFilterTypes", () => {
  it("returns 5 types", () => {
    expect(discFilterTypes()).toHaveLength(5);
  });
});
