import { describe, it, expect } from "vitest";
import {
  colonyImpact, spreadRate, treatmentDifficulty, detectionEase,
  economicLoss, notifiableDisease, chemicalTreatmentAvailable, causativeAgent,
  primaryControl, beeDiseases,
} from "../bee-disease-calc.js";

describe("colonyImpact", () => {
  it("varroa highest colony impact", () => {
    expect(colonyImpact("varroa")).toBeGreaterThan(colonyImpact("chalkbrood"));
  });
});

describe("spreadRate", () => {
  it("varroa spreads fastest", () => {
    expect(spreadRate("varroa")).toBeGreaterThan(spreadRate("chalkbrood"));
  });
});

describe("treatmentDifficulty", () => {
  it("american foulbrood hardest to treat", () => {
    expect(treatmentDifficulty("american_foulbrood")).toBeGreaterThan(treatmentDifficulty("chalkbrood"));
  });
});

describe("detectionEase", () => {
  it("chalkbrood easiest to detect", () => {
    expect(detectionEase("chalkbrood")).toBeGreaterThan(detectionEase("nosema"));
  });
});

describe("economicLoss", () => {
  it("varroa highest economic loss", () => {
    expect(economicLoss("varroa")).toBeGreaterThan(economicLoss("chalkbrood"));
  });
});

describe("notifiableDisease", () => {
  it("american foulbrood is notifiable", () => {
    expect(notifiableDisease("american_foulbrood")).toBe(true);
  });
  it("nosema is not", () => {
    expect(notifiableDisease("nosema")).toBe(false);
  });
});

describe("chemicalTreatmentAvailable", () => {
  it("varroa has chemical treatment", () => {
    expect(chemicalTreatmentAvailable("varroa")).toBe(true);
  });
  it("american foulbrood does not", () => {
    expect(chemicalTreatmentAvailable("american_foulbrood")).toBe(false);
  });
});

describe("causativeAgent", () => {
  it("varroa caused by varroa destructor mite", () => {
    expect(causativeAgent("varroa")).toBe("varroa_destructor_mite");
  });
});

describe("primaryControl", () => {
  it("american foulbrood burn infected equipment", () => {
    expect(primaryControl("american_foulbrood")).toBe("burn_infected_equipment");
  });
});

describe("beeDiseases", () => {
  it("returns 5 diseases", () => {
    expect(beeDiseases()).toHaveLength(5);
  });
});
