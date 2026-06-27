import { describe, it, expect } from "vitest";
import {
  turningResponse, protectionLevel, helmBalance,
  structuralStrength, maintenanceAccess, freeStanding,
  bluewater, bestBoatType, dragCoefficient, rudderTypes,
} from "../rudder-type-calc.js";

describe("turningResponse", () => {
  it("spade turns fastest", () => {
    expect(turningResponse("spade")).toBeGreaterThan(
      turningResponse("full_keel")
    );
  });
});

describe("protectionLevel", () => {
  it("full keel is most protected", () => {
    expect(protectionLevel("full_keel")).toBeGreaterThan(
      protectionLevel("spade")
    );
  });
});

describe("helmBalance", () => {
  it("balanced has best helm feel", () => {
    expect(helmBalance("balanced")).toBeGreaterThan(
      helmBalance("transom_hung")
    );
  });
});

describe("structuralStrength", () => {
  it("full keel is strongest", () => {
    expect(structuralStrength("full_keel")).toBeGreaterThan(
      structuralStrength("spade")
    );
  });
});

describe("maintenanceAccess", () => {
  it("transom hung is easiest to access", () => {
    expect(maintenanceAccess("transom_hung")).toBeGreaterThan(
      maintenanceAccess("full_keel")
    );
  });
});

describe("freeStanding", () => {
  it("spade is free standing", () => {
    expect(freeStanding("spade")).toBe(true);
  });
  it("skeg hung is not", () => {
    expect(freeStanding("skeg_hung")).toBe(false);
  });
});

describe("bluewater", () => {
  it("full keel is bluewater", () => {
    expect(bluewater("full_keel")).toBe(true);
  });
  it("spade is not", () => {
    expect(bluewater("spade")).toBe(false);
  });
});

describe("bestBoatType", () => {
  it("spade for racing yacht", () => {
    expect(bestBoatType("spade")).toBe("racing_yacht");
  });
});

describe("dragCoefficient", () => {
  it("full keel has most drag", () => {
    expect(dragCoefficient("full_keel")).toBeGreaterThan(
      dragCoefficient("spade")
    );
  });
});

describe("rudderTypes", () => {
  it("returns 5 types", () => {
    expect(rudderTypes()).toHaveLength(5);
  });
});
