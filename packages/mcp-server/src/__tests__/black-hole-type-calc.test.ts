import { describe, it, expect } from "vitest";
import {
  massSolarMultiple, eventHorizonKm, hawkingRadiation,
  tidalForce, observationalEvidence, confirmed,
  galacticCenter, formationMechanism, lifetimeYears, blackHoleTypes,
} from "../black-hole-type-calc.js";

describe("massSolarMultiple", () => {
  it("supermassive is most massive", () => {
    expect(massSolarMultiple("supermassive")).toBeGreaterThan(
      massSolarMultiple("stellar")
    );
  });
});

describe("eventHorizonKm", () => {
  it("supermassive has largest horizon", () => {
    expect(eventHorizonKm("supermassive")).toBeGreaterThan(
      eventHorizonKm("stellar")
    );
  });
});

describe("hawkingRadiation", () => {
  it("micro has most hawking radiation", () => {
    expect(hawkingRadiation("micro")).toBeGreaterThan(
      hawkingRadiation("supermassive")
    );
  });
});

describe("tidalForce", () => {
  it("stellar has strong tidal force", () => {
    expect(tidalForce("stellar")).toBeGreaterThan(
      tidalForce("supermassive")
    );
  });
});

describe("observationalEvidence", () => {
  it("supermassive has most evidence", () => {
    expect(observationalEvidence("supermassive")).toBeGreaterThan(
      observationalEvidence("primordial")
    );
  });
});

describe("confirmed", () => {
  it("stellar is confirmed", () => {
    expect(confirmed("stellar")).toBe(true);
  });
  it("primordial is not confirmed", () => {
    expect(confirmed("primordial")).toBe(false);
  });
});

describe("galacticCenter", () => {
  it("supermassive is at galactic center", () => {
    expect(galacticCenter("supermassive")).toBe(true);
  });
  it("stellar is not", () => {
    expect(galacticCenter("stellar")).toBe(false);
  });
});

describe("formationMechanism", () => {
  it("stellar forms by core collapse", () => {
    expect(formationMechanism("stellar")).toBe("core_collapse");
  });
});

describe("lifetimeYears", () => {
  it("supermassive lives longest", () => {
    expect(lifetimeYears("supermassive")).toBeGreaterThan(
      lifetimeYears("micro")
    );
  });
});

describe("blackHoleTypes", () => {
  it("returns 5 types", () => {
    expect(blackHoleTypes()).toHaveLength(5);
  });
});
