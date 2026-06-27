import { describe, it, expect } from "vitest";
import {
  heatTransfer, gasContact, catalystAttrition, scaleUp,
  fbCost, circulating, forExothermic, regime,
  bestUse, fluidizedBedReactorTypes,
} from "../fluidized-bed-reactor-calc.js";

describe("heatTransfer", () => {
  it("turbulent bed best heat transfer", () => {
    expect(heatTransfer("turbulent_bed_mixed")).toBeGreaterThan(heatTransfer("spouted_bed_coarse"));
  });
});

describe("gasContact", () => {
  it("entrained flow best gas contact", () => {
    expect(gasContact("entrained_flow_gasify")).toBeGreaterThan(gasContact("bubbling_bed_catalyst"));
  });
});

describe("catalystAttrition", () => {
  it("spouted bed lowest attrition", () => {
    expect(catalystAttrition("spouted_bed_coarse")).toBeGreaterThan(catalystAttrition("entrained_flow_gasify"));
  });
});

describe("scaleUp", () => {
  it("bubbling bed best scale up", () => {
    expect(scaleUp("bubbling_bed_catalyst")).toBeGreaterThanOrEqual(scaleUp("circulating_bed_riser"));
  });
});

describe("fbCost", () => {
  it("entrained flow most expensive", () => {
    expect(fbCost("entrained_flow_gasify")).toBeGreaterThan(fbCost("spouted_bed_coarse"));
  });
});

describe("circulating", () => {
  it("circulating bed is circulating", () => {
    expect(circulating("circulating_bed_riser")).toBe(true);
  });
  it("bubbling bed not circulating", () => {
    expect(circulating("bubbling_bed_catalyst")).toBe(false);
  });
});

describe("forExothermic", () => {
  it("turbulent bed for exothermic", () => {
    expect(forExothermic("turbulent_bed_mixed")).toBe(true);
  });
  it("spouted bed not for exothermic", () => {
    expect(forExothermic("spouted_bed_coarse")).toBe(false);
  });
});

describe("regime", () => {
  it("spouted bed uses central spout", () => {
    expect(regime("spouted_bed_coarse")).toBe("central_spout_fountain_annulus_coarse_particle");
  });
});

describe("bestUse", () => {
  it("entrained flow for coal gasification", () => {
    expect(bestUse("entrained_flow_gasify")).toBe("coal_gasification_igcc_syngas_production");
  });
});

describe("fluidizedBedReactorTypes", () => {
  it("returns 5 types", () => {
    expect(fluidizedBedReactorTypes()).toHaveLength(5);
  });
});
