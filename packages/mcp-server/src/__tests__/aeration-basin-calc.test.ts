import { describe, it, expect } from "vitest";
import {
  oxygenTransfer, throughput, energyEfficiency, mixingQuality,
  abCost, submerged, forHighBod, basinConfig,
  bestUse, aerationBasinTypes,
} from "../aeration-basin-calc.js";

describe("oxygenTransfer", () => {
  it("fine bubble best oxygen transfer", () => {
    expect(oxygenTransfer("fine_bubble")).toBeGreaterThan(oxygenTransfer("coarse_bubble"));
  });
});

describe("throughput", () => {
  it("coarse bubble highest throughput", () => {
    expect(throughput("coarse_bubble")).toBeGreaterThan(throughput("jet_aerator"));
  });
});

describe("energyEfficiency", () => {
  it("fine bubble best energy efficiency", () => {
    expect(energyEfficiency("fine_bubble")).toBeGreaterThan(energyEfficiency("coarse_bubble"));
  });
});

describe("mixingQuality", () => {
  it("coarse bubble best mixing quality", () => {
    expect(mixingQuality("coarse_bubble")).toBeGreaterThan(mixingQuality("fine_bubble"));
  });
});

describe("abCost", () => {
  it("membrane diffuser most expensive", () => {
    expect(abCost("membrane_diffuser")).toBeGreaterThan(abCost("coarse_bubble"));
  });
});

describe("submerged", () => {
  it("fine bubble is submerged", () => {
    expect(submerged("fine_bubble")).toBe(true);
  });
  it("surface aerator not submerged", () => {
    expect(submerged("surface_aerator")).toBe(false);
  });
});

describe("forHighBod", () => {
  it("fine bubble for high bod", () => {
    expect(forHighBod("fine_bubble")).toBe(true);
  });
  it("coarse bubble not for high bod", () => {
    expect(forHighBod("coarse_bubble")).toBe(false);
  });
});

describe("basinConfig", () => {
  it("jet aerator uses pump nozzle entrain air mix deep tank o2", () => {
    expect(basinConfig("jet_aerator")).toBe("jet_aerator_basin_pump_nozzle_entrain_air_mix_deep_tank_o2");
  });
});

describe("bestUse", () => {
  it("surface aerator for lagoon pond mechanical splash oxygen transfer", () => {
    expect(bestUse("surface_aerator")).toBe("lagoon_pond_surface_aerator_mechanical_splash_oxygen_transfer");
  });
});

describe("aerationBasinTypes", () => {
  it("returns 5 types", () => {
    expect(aerationBasinTypes()).toHaveLength(5);
  });
});
