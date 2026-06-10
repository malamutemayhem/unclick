import { describe, it, expect } from "vitest";
import {
  filtrationLevel, flowSpeed, installEase, filterLife,
  filterCost, removesLead, noPlumbing, filterMedia,
  bestSetup, faucetFilters,
} from "../faucet-filter-calc.js";

describe("filtrationLevel", () => {
  it("reverse osmosis under best filtration", () => {
    expect(filtrationLevel("reverse_osmosis_under")).toBeGreaterThan(filtrationLevel("pitcher_pour_through"));
  });
});

describe("flowSpeed", () => {
  it("carbon block mount fastest flow", () => {
    expect(flowSpeed("carbon_block_mount")).toBeGreaterThan(flowSpeed("ceramic_gravity"));
  });
});

describe("installEase", () => {
  it("pitcher pour through easiest install", () => {
    expect(installEase("pitcher_pour_through")).toBeGreaterThan(installEase("reverse_osmosis_under"));
  });
});

describe("filterLife", () => {
  it("ceramic gravity longest filter life", () => {
    expect(filterLife("ceramic_gravity")).toBeGreaterThan(filterLife("pitcher_pour_through"));
  });
});

describe("filterCost", () => {
  it("reverse osmosis under most expensive", () => {
    expect(filterCost("reverse_osmosis_under")).toBeGreaterThan(filterCost("pitcher_pour_through"));
  });
});

describe("removesLead", () => {
  it("carbon block mount removes lead", () => {
    expect(removesLead("carbon_block_mount")).toBe(true);
  });
  it("ceramic gravity does not", () => {
    expect(removesLead("ceramic_gravity")).toBe(false);
  });
});

describe("noPlumbing", () => {
  it("pitcher pour through needs no plumbing", () => {
    expect(noPlumbing("pitcher_pour_through")).toBe(true);
  });
  it("carbon block mount does", () => {
    expect(noPlumbing("carbon_block_mount")).toBe(false);
  });
});

describe("filterMedia", () => {
  it("reverse osmosis under uses semipermeable membrane ro", () => {
    expect(filterMedia("reverse_osmosis_under")).toBe("semipermeable_membrane_ro");
  });
});

describe("bestSetup", () => {
  it("pitcher pour through best for rental no install", () => {
    expect(bestSetup("pitcher_pour_through")).toBe("rental_no_install");
  });
});

describe("faucetFilters", () => {
  it("returns 5 types", () => {
    expect(faucetFilters()).toHaveLength(5);
  });
});
