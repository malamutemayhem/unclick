import { describe, it, expect } from "vitest";
import {
  testCoverage, testSpeed, fixtureLife, setupTime,
  ictCost, fixtureless, forHighVolume, contactMethod,
  bestUse, ictFixtureTypes,
} from "../ict-fixture-calc.js";

describe("testCoverage", () => {
  it("bed of nails and vacuum fixture highest coverage", () => {
    expect(testCoverage("bed_of_nails")).toBeGreaterThan(testCoverage("boundary_scan"));
    expect(testCoverage("vacuum_fixture")).toBeGreaterThan(testCoverage("boundary_scan"));
  });
});

describe("testSpeed", () => {
  it("bed of nails and vacuum fixture fastest test speed", () => {
    expect(testSpeed("bed_of_nails")).toBeGreaterThan(testSpeed("flying_probe_ict"));
    expect(testSpeed("vacuum_fixture")).toBeGreaterThan(testSpeed("flying_probe_ict"));
  });
});

describe("fixtureLife", () => {
  it("flying probe and boundary scan longest life", () => {
    expect(fixtureLife("flying_probe_ict")).toBeGreaterThan(fixtureLife("bed_of_nails"));
    expect(fixtureLife("boundary_scan")).toBeGreaterThan(fixtureLife("bed_of_nails"));
  });
});

describe("setupTime", () => {
  it("flying probe ict fastest setup", () => {
    expect(setupTime("flying_probe_ict")).toBeGreaterThan(setupTime("bed_of_nails"));
  });
});

describe("ictCost", () => {
  it("vacuum fixture most expensive", () => {
    expect(ictCost("vacuum_fixture")).toBeGreaterThan(ictCost("boundary_scan"));
  });
});

describe("fixtureless", () => {
  it("flying probe is fixtureless", () => {
    expect(fixtureless("flying_probe_ict")).toBe(true);
  });
  it("bed of nails not fixtureless", () => {
    expect(fixtureless("bed_of_nails")).toBe(false);
  });
});

describe("forHighVolume", () => {
  it("bed of nails for high volume", () => {
    expect(forHighVolume("bed_of_nails")).toBe(true);
  });
  it("flying probe not for high volume", () => {
    expect(forHighVolume("flying_probe_ict")).toBe(false);
  });
});

describe("contactMethod", () => {
  it("boundary scan uses jtag chain", () => {
    expect(contactMethod("boundary_scan")).toBe("jtag_chain_digital_boundary_cell_test_no_physical_probe");
  });
});

describe("bestUse", () => {
  it("flying probe for prototype low volume", () => {
    expect(bestUse("flying_probe_ict")).toBe("prototype_low_volume_npi_no_fixture_cost_fast_program_change");
  });
});

describe("ictFixtureTypes", () => {
  it("returns 5 types", () => {
    expect(ictFixtureTypes()).toHaveLength(5);
  });
});
