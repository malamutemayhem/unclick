import { describe, it, expect } from "vitest";
import {
  oxygenTransfer, energyEfficiency, mixing, maintenance,
  asCost_, submerged, forDeepTank, mechanism,
  bestUse, aerationSystemTypes,
} from "../aeration-system-calc.js";

describe("oxygenTransfer", () => {
  it("fine bubble diffuser best oxygen transfer", () => {
    expect(oxygenTransfer("fine_bubble_diffuser")).toBeGreaterThan(oxygenTransfer("coarse_bubble_diffuser"));
  });
});

describe("energyEfficiency", () => {
  it("fine bubble diffuser most energy efficient", () => {
    expect(energyEfficiency("fine_bubble_diffuser")).toBeGreaterThan(energyEfficiency("coarse_bubble_diffuser"));
  });
});

describe("mixing", () => {
  it("jet aeration best mixing", () => {
    expect(mixing("jet_aeration")).toBeGreaterThan(mixing("membrane_aeration"));
  });
});

describe("maintenance", () => {
  it("coarse bubble diffuser lowest maintenance", () => {
    expect(maintenance("coarse_bubble_diffuser")).toBeGreaterThan(maintenance("membrane_aeration"));
  });
});

describe("asCost_", () => {
  it("membrane aeration most expensive", () => {
    expect(asCost_("membrane_aeration")).toBeGreaterThan(asCost_("coarse_bubble_diffuser"));
  });
});

describe("submerged", () => {
  it("fine bubble diffuser is submerged", () => {
    expect(submerged("fine_bubble_diffuser")).toBe(true);
  });
  it("surface mechanical not submerged", () => {
    expect(submerged("surface_mechanical")).toBe(false);
  });
});

describe("forDeepTank", () => {
  it("fine bubble diffuser for deep tank", () => {
    expect(forDeepTank("fine_bubble_diffuser")).toBe(true);
  });
  it("coarse bubble diffuser not for deep tank", () => {
    expect(forDeepTank("coarse_bubble_diffuser")).toBe(false);
  });
});

describe("mechanism", () => {
  it("jet aeration uses venturi air entrainment", () => {
    expect(mechanism("jet_aeration")).toBe("liquid_jet_pump_venturi_air_entrainment_shear_mix");
  });
});

describe("bestUse", () => {
  it("fine bubble for activated sludge basin", () => {
    expect(bestUse("fine_bubble_diffuser")).toBe("activated_sludge_basin_municipal_wastewater_treat");
  });
});

describe("aerationSystemTypes", () => {
  it("returns 5 types", () => {
    expect(aerationSystemTypes()).toHaveLength(5);
  });
});
