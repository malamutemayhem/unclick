import { describe, it, expect } from "vitest";
import {
  particleCapture, airflowRestriction, replacementCost, odorRemoval,
  lifeSpanMonths, washable, allergenRated, mervRating,
  bestApplication, hvacFilters,
} from "../hvac-filter-calc.js";

describe("particleCapture", () => {
  it("hepa best particle capture", () => {
    expect(particleCapture("hepa")).toBeGreaterThan(particleCapture("fiberglass"));
  });
});

describe("airflowRestriction", () => {
  it("hepa most restrictive", () => {
    expect(airflowRestriction("hepa")).toBeGreaterThan(airflowRestriction("fiberglass"));
  });
});

describe("replacementCost", () => {
  it("hepa most expensive", () => {
    expect(replacementCost("hepa")).toBeGreaterThan(replacementCost("fiberglass"));
  });
});

describe("odorRemoval", () => {
  it("activated carbon best odor removal", () => {
    expect(odorRemoval("activated_carbon")).toBeGreaterThan(odorRemoval("fiberglass"));
  });
});

describe("lifeSpanMonths", () => {
  it("electrostatic longest life", () => {
    expect(lifeSpanMonths("electrostatic")).toBeGreaterThan(lifeSpanMonths("fiberglass"));
  });
});

describe("washable", () => {
  it("electrostatic is washable", () => {
    expect(washable("electrostatic")).toBe(true);
  });
  it("hepa is not", () => {
    expect(washable("hepa")).toBe(false);
  });
});

describe("allergenRated", () => {
  it("hepa is allergen rated", () => {
    expect(allergenRated("hepa")).toBe(true);
  });
  it("fiberglass is not", () => {
    expect(allergenRated("fiberglass")).toBe(false);
  });
});

describe("mervRating", () => {
  it("hepa is merv 17 20", () => {
    expect(mervRating("hepa")).toBe("merv_17_20");
  });
});

describe("bestApplication", () => {
  it("activated carbon for smoke chemical odor", () => {
    expect(bestApplication("activated_carbon")).toBe("smoke_chemical_odor");
  });
});

describe("hvacFilters", () => {
  it("returns 5 filters", () => {
    expect(hvacFilters()).toHaveLength(5);
  });
});
