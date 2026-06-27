import { describe, it, expect } from "vitest";
import {
  removalRate, throughput, surfaceCoverage, reliability,
  ssCost, submerged, forPrimary, skimmerConfig,
  bestUse, scumSkimmerTypes,
} from "../scum-skimmer-calc.js";

describe("removalRate", () => {
  it("floating weir best removal rate", () => {
    expect(removalRate("floating_weir_skim")).toBeGreaterThan(removalRate("beach_plate_skim"));
  });
});

describe("throughput", () => {
  it("chain flight highest throughput", () => {
    expect(throughput("chain_flight_skim")).toBeGreaterThan(throughput("floating_weir_skim"));
  });
});

describe("surfaceCoverage", () => {
  it("floating weir best surface coverage", () => {
    expect(surfaceCoverage("floating_weir_skim")).toBeGreaterThan(surfaceCoverage("beach_plate_skim"));
  });
});

describe("reliability", () => {
  it("beach plate best reliability", () => {
    expect(reliability("beach_plate_skim")).toBeGreaterThan(reliability("floating_weir_skim"));
  });
});

describe("ssCost", () => {
  it("helical most expensive", () => {
    expect(ssCost("helical_skim")).toBeGreaterThan(ssCost("beach_plate_skim"));
  });
});

describe("submerged", () => {
  it("chain flight is submerged", () => {
    expect(submerged("chain_flight_skim")).toBe(true);
  });
  it("beach plate not submerged", () => {
    expect(submerged("beach_plate_skim")).toBe(false);
  });
});

describe("forPrimary", () => {
  it("chain flight for primary", () => {
    expect(forPrimary("chain_flight_skim")).toBe(true);
  });
  it("beach plate not for primary", () => {
    expect(forPrimary("beach_plate_skim")).toBe(false);
  });
});

describe("skimmerConfig", () => {
  it("floating weir uses adjustable level thin layer precise skim", () => {
    expect(skimmerConfig("floating_weir_skim")).toBe("floating_weir_skimmer_adjustable_level_thin_layer_precise_skim");
  });
});

describe("bestUse", () => {
  it("chain flight for primary clarifier full surface scum remove", () => {
    expect(bestUse("chain_flight_skim")).toBe("primary_clarifier_chain_flight_skimmer_full_surface_scum_remove");
  });
});

describe("scumSkimmerTypes", () => {
  it("returns 5 types", () => {
    expect(scumSkimmerTypes()).toHaveLength(5);
  });
});
