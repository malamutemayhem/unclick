import { describe, it, expect } from "vitest";
import {
  transfer, efficiency, mixing, maintenance,
  aeCost, submerged, forDeepTank, element,
  bestUse, aerationTypes,
} from "../aeration-calc.js";

describe("transfer", () => {
  it("fine bubble best transfer", () => {
    expect(transfer("fine_bubble_diffuser")).toBeGreaterThan(transfer("coarse_bubble_diffuser"));
  });
});

describe("efficiency", () => {
  it("fine bubble most efficient", () => {
    expect(efficiency("fine_bubble_diffuser")).toBeGreaterThan(efficiency("coarse_bubble_diffuser"));
  });
});

describe("mixing", () => {
  it("surface mechanical best mixing", () => {
    expect(mixing("surface_mechanical_aerator")).toBeGreaterThan(mixing("fine_bubble_diffuser"));
  });
});

describe("maintenance", () => {
  it("coarse bubble lowest maintenance", () => {
    expect(maintenance("coarse_bubble_diffuser")).toBeGreaterThan(maintenance("membrane_disc_epdm"));
  });
});

describe("aeCost", () => {
  it("jet aerator most expensive", () => {
    expect(aeCost("jet_aerator_mixing")).toBeGreaterThan(aeCost("coarse_bubble_diffuser"));
  });
});

describe("submerged", () => {
  it("fine bubble is submerged", () => {
    expect(submerged("fine_bubble_diffuser")).toBe(true);
  });
  it("surface not submerged", () => {
    expect(submerged("surface_mechanical_aerator")).toBe(false);
  });
});

describe("forDeepTank", () => {
  it("jet for deep tank", () => {
    expect(forDeepTank("jet_aerator_mixing")).toBe(true);
  });
  it("surface not deep tank", () => {
    expect(forDeepTank("surface_mechanical_aerator")).toBe(false);
  });
});

describe("element", () => {
  it("coarse uses stainless tube", () => {
    expect(element("coarse_bubble_diffuser")).toBe("stainless_tube_non_clog_orifice");
  });
});

describe("bestUse", () => {
  it("fine bubble for activated sludge", () => {
    expect(bestUse("fine_bubble_diffuser")).toBe("activated_sludge_aeration_basin");
  });
});

describe("aerationTypes", () => {
  it("returns 5 types", () => {
    expect(aerationTypes()).toHaveLength(5);
  });
});
