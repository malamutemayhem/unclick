import { describe, it, expect } from "vitest";
import {
  heatTransfer, gasContact, scalability, attrition,
  frCost, continuous, forCatalytic, distributor,
  bestUse, fluidizedBedReactTypes,
} from "../fluidized-bed-react-calc.js";

describe("heatTransfer", () => {
  it("circulating bed best heat transfer", () => {
    expect(heatTransfer("circulating_bed_riser")).toBeGreaterThan(heatTransfer("spouted_bed_cone"));
  });
});

describe("gasContact", () => {
  it("circulating bed best gas contact", () => {
    expect(gasContact("circulating_bed_riser")).toBeGreaterThan(gasContact("bubbling_bed_classic"));
  });
});

describe("scalability", () => {
  it("circulating bed most scalable", () => {
    expect(scalability("circulating_bed_riser")).toBeGreaterThan(scalability("vibro_fluidized_fine"));
  });
});

describe("attrition", () => {
  it("vibro fluidized least attrition (highest score)", () => {
    expect(attrition("vibro_fluidized_fine")).toBeGreaterThan(attrition("circulating_bed_riser"));
  });
});

describe("frCost", () => {
  it("circulating bed most expensive", () => {
    expect(frCost("circulating_bed_riser")).toBeGreaterThan(frCost("spouted_bed_cone"));
  });
});

describe("continuous", () => {
  it("all fluidized bed types are continuous", () => {
    expect(continuous("bubbling_bed_classic")).toBe(true);
    expect(continuous("vibro_fluidized_fine")).toBe(true);
  });
});

describe("forCatalytic", () => {
  it("bubbling bed for catalytic", () => {
    expect(forCatalytic("bubbling_bed_classic")).toBe(true);
  });
  it("spouted bed not for catalytic", () => {
    expect(forCatalytic("spouted_bed_cone")).toBe(false);
  });
});

describe("distributor", () => {
  it("spouted bed uses conical base central spout", () => {
    expect(distributor("spouted_bed_cone")).toBe("conical_base_central_spout_annulus");
  });
});

describe("bestUse", () => {
  it("circulating bed for fcc cracking cfb boiler", () => {
    expect(bestUse("circulating_bed_riser")).toBe("fcc_cracking_cfb_boiler_large_scale");
  });
});

describe("fluidizedBedReactTypes", () => {
  it("returns 5 types", () => {
    expect(fluidizedBedReactTypes()).toHaveLength(5);
  });
});
