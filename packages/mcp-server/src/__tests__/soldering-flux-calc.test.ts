import { describe, it, expect } from "vitest";
import {
  meltingTempCelsius, flowAbility, oxideRemoval,
  residueCleanup, toxicFumes, preciousMetalSafe,
  bestMetal, shelfLifeMonths, costPerKg, solderingFluxes,
} from "../soldering-flux-calc.js";

describe("meltingTempCelsius", () => {
  it("borax melts at highest temp", () => {
    expect(meltingTempCelsius("borax")).toBeGreaterThan(
      meltingTempCelsius("boric_acid")
    );
  });
});

describe("flowAbility", () => {
  it("fluoride flows best", () => {
    expect(flowAbility("fluoride")).toBeGreaterThan(
      flowAbility("boric_acid")
    );
  });
});

describe("oxideRemoval", () => {
  it("fluoride removes oxide best", () => {
    expect(oxideRemoval("fluoride")).toBeGreaterThan(
      oxideRemoval("liquid")
    );
  });
});

describe("residueCleanup", () => {
  it("liquid is easiest to clean", () => {
    expect(residueCleanup("liquid")).toBeGreaterThan(
      residueCleanup("fluoride")
    );
  });
});

describe("toxicFumes", () => {
  it("fluoride has most toxic fumes", () => {
    expect(toxicFumes("fluoride")).toBeGreaterThan(
      toxicFumes("boric_acid")
    );
  });
});

describe("preciousMetalSafe", () => {
  it("borax is precious metal safe", () => {
    expect(preciousMetalSafe("borax")).toBe(true);
  });
  it("paste is not", () => {
    expect(preciousMetalSafe("paste")).toBe(false);
  });
});

describe("bestMetal", () => {
  it("borax best for gold", () => {
    expect(bestMetal("borax")).toBe("gold");
  });
});

describe("shelfLifeMonths", () => {
  it("borax lasts longest", () => {
    expect(shelfLifeMonths("borax")).toBeGreaterThan(
      shelfLifeMonths("liquid")
    );
  });
});

describe("costPerKg", () => {
  it("fluoride costs most", () => {
    expect(costPerKg("fluoride")).toBeGreaterThan(
      costPerKg("borax")
    );
  });
});

describe("solderingFluxes", () => {
  it("returns 5 fluxes", () => {
    expect(solderingFluxes()).toHaveLength(5);
  });
});
