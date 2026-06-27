import { describe, it, expect } from "vitest";
import {
  protectionLevel, durationOfImmunity, adverseReactionRisk, boosterFrequency,
  vaccineCost, legallyRequired, intranasalOption, vaccineType,
  protectsAgainst, petVaccines,
} from "../pet-vaccine-calc.js";

describe("protectionLevel", () => {
  it("core canine high protection", () => {
    expect(protectionLevel("core_canine")).toBeGreaterThan(protectionLevel("bordetella"));
  });
});

describe("durationOfImmunity", () => {
  it("core canine longest immunity", () => {
    expect(durationOfImmunity("core_canine")).toBeGreaterThan(durationOfImmunity("bordetella"));
  });
});

describe("adverseReactionRisk", () => {
  it("leptospirosis highest reaction risk", () => {
    expect(adverseReactionRisk("leptospirosis")).toBeGreaterThan(adverseReactionRisk("bordetella"));
  });
});

describe("boosterFrequency", () => {
  it("bordetella most frequent booster", () => {
    expect(boosterFrequency("bordetella")).toBeGreaterThan(boosterFrequency("core_canine"));
  });
});

describe("vaccineCost", () => {
  it("leptospirosis most expensive", () => {
    expect(vaccineCost("leptospirosis")).toBeGreaterThan(vaccineCost("bordetella"));
  });
});

describe("legallyRequired", () => {
  it("rabies is legally required", () => {
    expect(legallyRequired("rabies")).toBe(true);
  });
  it("bordetella is not", () => {
    expect(legallyRequired("bordetella")).toBe(false);
  });
});

describe("intranasalOption", () => {
  it("bordetella has intranasal option", () => {
    expect(intranasalOption("bordetella")).toBe(true);
  });
  it("rabies does not", () => {
    expect(intranasalOption("rabies")).toBe(false);
  });
});

describe("vaccineType", () => {
  it("rabies uses killed adjuvanted recombinant", () => {
    expect(vaccineType("rabies")).toBe("killed_adjuvanted_recombinant");
  });
});

describe("protectsAgainst", () => {
  it("core canine protects against distemper parvo hepatitis", () => {
    expect(protectsAgainst("core_canine")).toBe("distemper_parvo_hepatitis");
  });
});

describe("petVaccines", () => {
  it("returns 5 vaccines", () => {
    expect(petVaccines()).toHaveLength(5);
  });
});
