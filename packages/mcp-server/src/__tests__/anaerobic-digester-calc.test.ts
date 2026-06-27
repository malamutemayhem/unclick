import { describe, it, expect } from "vitest";
import {
  biogasYield, loading, retention, stability,
  adCost, highRate, forSolids, reactor,
  bestUse, anaerobicDigesterTypes,
} from "../anaerobic-digester-calc.js";

describe("biogasYield", () => {
  it("EGSB highest biogas yield", () => {
    expect(biogasYield("egsb_expanded_granular")).toBeGreaterThan(biogasYield("plug_flow_covered_lagoon"));
  });
});

describe("loading", () => {
  it("EGSB highest loading rate", () => {
    expect(loading("egsb_expanded_granular")).toBeGreaterThan(loading("cstr_complete_mix"));
  });
});

describe("retention", () => {
  it("EGSB shortest retention time", () => {
    expect(retention("egsb_expanded_granular")).toBeGreaterThan(retention("plug_flow_covered_lagoon"));
  });
});

describe("stability", () => {
  it("CSTR most stable", () => {
    expect(stability("cstr_complete_mix")).toBeGreaterThan(stability("uasb_upflow_blanket"));
  });
});

describe("adCost", () => {
  it("EGSB more expensive than lagoon", () => {
    expect(adCost("egsb_expanded_granular")).toBeGreaterThan(adCost("plug_flow_covered_lagoon"));
  });
});

describe("highRate", () => {
  it("UASB is high rate", () => {
    expect(highRate("uasb_upflow_blanket")).toBe(true);
  });
  it("CSTR not high rate", () => {
    expect(highRate("cstr_complete_mix")).toBe(false);
  });
});

describe("forSolids", () => {
  it("CSTR for solids", () => {
    expect(forSolids("cstr_complete_mix")).toBe(true);
  });
  it("UASB not for solids", () => {
    expect(forSolids("uasb_upflow_blanket")).toBe(false);
  });
});

describe("reactor", () => {
  it("dry batch uses garage style", () => {
    expect(reactor("dry_batch_garage")).toBe("garage_style_batch_percolate");
  });
});

describe("bestUse", () => {
  it("UASB for brewery wastewater", () => {
    expect(bestUse("uasb_upflow_blanket")).toBe("brewery_distillery_wastewater");
  });
});

describe("anaerobicDigesterTypes", () => {
  it("returns 5 types", () => {
    expect(anaerobicDigesterTypes()).toHaveLength(5);
  });
});
