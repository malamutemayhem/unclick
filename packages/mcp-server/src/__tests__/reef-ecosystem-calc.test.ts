import { describe, it, expect } from "vitest";
import {
  areaKm2, speciesCount, depthMeters,
  resilienceScore, tourismValue, enclosesLagoon,
  attachedToShore, exampleLocation, protectionLevel, reefEcosystems,
} from "../reef-ecosystem-calc.js";

describe("areaKm2", () => {
  it("barrier reef is largest", () => {
    expect(areaKm2("barrier")).toBeGreaterThan(areaKm2("patch"));
  });
});

describe("speciesCount", () => {
  it("barrier reef has most species", () => {
    expect(speciesCount("barrier")).toBeGreaterThan(
      speciesCount("patch")
    );
  });
});

describe("depthMeters", () => {
  it("bank reef is deepest", () => {
    expect(depthMeters("bank")).toBeGreaterThan(depthMeters("patch"));
  });
});

describe("resilienceScore", () => {
  it("bank reef is most resilient", () => {
    expect(resilienceScore("bank")).toBeGreaterThan(
      resilienceScore("patch")
    );
  });
});

describe("tourismValue", () => {
  it("barrier reef has highest tourism value", () => {
    expect(tourismValue("barrier")).toBeGreaterThan(
      tourismValue("patch")
    );
  });
});

describe("enclosesLagoon", () => {
  it("atoll encloses lagoon", () => {
    expect(enclosesLagoon("atoll")).toBe(true);
  });
  it("fringing does not", () => {
    expect(enclosesLagoon("fringing")).toBe(false);
  });
});

describe("attachedToShore", () => {
  it("fringing is attached to shore", () => {
    expect(attachedToShore("fringing")).toBe(true);
  });
  it("barrier is not", () => {
    expect(attachedToShore("barrier")).toBe(false);
  });
});

describe("exampleLocation", () => {
  it("atoll example is maldives", () => {
    expect(exampleLocation("atoll")).toBe("maldives");
  });
});

describe("protectionLevel", () => {
  it("barrier reef has highest protection", () => {
    expect(protectionLevel("barrier")).toBeGreaterThan(
      protectionLevel("patch")
    );
  });
});

describe("reefEcosystems", () => {
  it("returns 5 types", () => {
    expect(reefEcosystems()).toHaveLength(5);
  });
});
