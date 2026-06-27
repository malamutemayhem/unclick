import { describe, it, expect } from "vitest";
import {
  broadSpectrumKill, residualActivity, mammalianToxicity, environmentalPersistence,
  applicationCost, organicApproved, systemicAction, modeOfAction,
  bestTarget, insecticideTypes,
} from "../insecticide-type-calc.js";

describe("broadSpectrumKill", () => {
  it("organophosphate broadest spectrum", () => {
    expect(broadSpectrumKill("organophosphate")).toBeGreaterThan(broadSpectrumKill("biological"));
  });
});

describe("residualActivity", () => {
  it("neonicotinoid longest residual", () => {
    expect(residualActivity("neonicotinoid")).toBeGreaterThan(residualActivity("biological"));
  });
});

describe("mammalianToxicity", () => {
  it("organophosphate highest mammalian toxicity", () => {
    expect(mammalianToxicity("organophosphate")).toBeGreaterThan(mammalianToxicity("biological"));
  });
});

describe("environmentalPersistence", () => {
  it("neonicotinoid most persistent", () => {
    expect(environmentalPersistence("neonicotinoid")).toBeGreaterThan(environmentalPersistence("biological"));
  });
});

describe("applicationCost", () => {
  it("biological most expensive application", () => {
    expect(applicationCost("biological")).toBeGreaterThan(applicationCost("pyrethroid"));
  });
});

describe("organicApproved", () => {
  it("biological is organic approved", () => {
    expect(organicApproved("biological")).toBe(true);
  });
  it("pyrethroid is not", () => {
    expect(organicApproved("pyrethroid")).toBe(false);
  });
});

describe("systemicAction", () => {
  it("neonicotinoid has systemic action", () => {
    expect(systemicAction("neonicotinoid")).toBe(true);
  });
  it("pyrethroid does not", () => {
    expect(systemicAction("pyrethroid")).toBe(false);
  });
});

describe("modeOfAction", () => {
  it("biological uses bacillus thuringiensis toxin", () => {
    expect(modeOfAction("biological")).toBe("bacillus_thuringiensis_toxin");
  });
});

describe("bestTarget", () => {
  it("pyrethroid for crawling flying household", () => {
    expect(bestTarget("pyrethroid")).toBe("crawling_flying_household");
  });
});

describe("insecticideTypes", () => {
  it("returns 5 types", () => {
    expect(insecticideTypes()).toHaveLength(5);
  });
});
