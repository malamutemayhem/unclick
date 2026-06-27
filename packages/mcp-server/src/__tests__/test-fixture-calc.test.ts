import { describe, it, expect } from "vitest";
import {
  coverage, throughput, setupCost, flexibility,
  accuracy, contactBased, forNpi, probeType,
  bestUse, testFixtures,
} from "../test-fixture-calc.js";

describe("coverage", () => {
  it("bed of nails ict best coverage", () => {
    expect(coverage("bed_of_nails_ict")).toBeGreaterThan(coverage("boundary_scan_jtag"));
  });
});

describe("throughput", () => {
  it("bed of nails ict highest throughput", () => {
    expect(throughput("bed_of_nails_ict")).toBeGreaterThan(throughput("flying_probe_flex"));
  });
});

describe("setupCost", () => {
  it("bed of nails ict highest setup cost", () => {
    expect(setupCost("bed_of_nails_ict")).toBeGreaterThan(setupCost("flying_probe_flex"));
  });
});

describe("flexibility", () => {
  it("flying probe flex most flexible", () => {
    expect(flexibility("flying_probe_flex")).toBeGreaterThan(flexibility("bed_of_nails_ict"));
  });
});

describe("accuracy", () => {
  it("boundary scan jtag best accuracy", () => {
    expect(accuracy("boundary_scan_jtag")).toBeGreaterThan(accuracy("spring_probe_pogo"));
  });
});

describe("contactBased", () => {
  it("bed of nails ict is contact based", () => {
    expect(contactBased("bed_of_nails_ict")).toBe(true);
  });
  it("boundary scan jtag not contact based", () => {
    expect(contactBased("boundary_scan_jtag")).toBe(false);
  });
});

describe("forNpi", () => {
  it("flying probe flex is for npi", () => {
    expect(forNpi("flying_probe_flex")).toBe(true);
  });
  it("bed of nails ict not for npi", () => {
    expect(forNpi("bed_of_nails_ict")).toBe(false);
  });
});

describe("probeType", () => {
  it("boundary scan jtag uses jtag chain connector", () => {
    expect(probeType("boundary_scan_jtag")).toBe("jtag_chain_connector");
  });
});

describe("bestUse", () => {
  it("flying probe flex best for prototype low volume test", () => {
    expect(bestUse("flying_probe_flex")).toBe("prototype_low_volume_test");
  });
});

describe("testFixtures", () => {
  it("returns 5 types", () => {
    expect(testFixtures()).toHaveLength(5);
  });
});
