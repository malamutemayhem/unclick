import { describe, it, expect } from "vitest";
import {
  capacity, head, solidSize, reliability,
  epCost, grinder, forSewage, impeller,
  bestUse, ejectorPumpTypes,
} from "../ejector-pump-calc.js";

describe("capacity", () => {
  it("duplex highest capacity", () => {
    expect(capacity("duplex_alternating_pair")).toBeGreaterThan(capacity("macerator_compact_inline"));
  });
});

describe("head", () => {
  it("sewage grinder highest head", () => {
    expect(head("sewage_grinder_cutter")).toBeGreaterThan(head("effluent_low_solid"));
  });
});

describe("solidSize", () => {
  it("sewage grinder handles largest solids", () => {
    expect(solidSize("sewage_grinder_cutter")).toBeGreaterThan(solidSize("effluent_low_solid"));
  });
});

describe("reliability", () => {
  it("duplex most reliable", () => {
    expect(reliability("duplex_alternating_pair")).toBeGreaterThan(reliability("macerator_compact_inline"));
  });
});

describe("epCost", () => {
  it("duplex most expensive", () => {
    expect(epCost("duplex_alternating_pair")).toBeGreaterThan(epCost("effluent_low_solid"));
  });
});

describe("grinder", () => {
  it("sewage grinder has grinder", () => {
    expect(grinder("sewage_grinder_cutter")).toBe(true);
  });
  it("effluent no grinder", () => {
    expect(grinder("effluent_low_solid")).toBe(false);
  });
});

describe("forSewage", () => {
  it("sewage grinder for sewage", () => {
    expect(forSewage("sewage_grinder_cutter")).toBe(true);
  });
  it("effluent not for sewage", () => {
    expect(forSewage("effluent_low_solid")).toBe(false);
  });
});

describe("impeller", () => {
  it("vortex uses recessed impeller", () => {
    expect(impeller("solids_handling_vortex")).toBe("recessed_vortex_non_clog");
  });
});

describe("bestUse", () => {
  it("macerator for retrofit", () => {
    expect(bestUse("macerator_compact_inline")).toBe("retrofit_half_bath_tight_space");
  });
});

describe("ejectorPumpTypes", () => {
  it("returns 5 types", () => {
    expect(ejectorPumpTypes()).toHaveLength(5);
  });
});
