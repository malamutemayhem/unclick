import { describe, it, expect } from "vitest";
import {
  developmentSpeedMonths, storageTemperatureC, immuneResponseStrength,
  safetyProfile, productionCost, requiresColdChain,
  containsLivePathogen, mechanismOfAction, exampleDisease, vaccineTypes,
} from "../vaccine-type-calc.js";

describe("developmentSpeedMonths", () => {
  it("mrna fastest to develop", () => {
    expect(developmentSpeedMonths("live_attenuated")).toBeGreaterThan(
      developmentSpeedMonths("mrna")
    );
  });
});

describe("storageTemperatureC", () => {
  it("viral vector warmer storage", () => {
    expect(storageTemperatureC("viral_vector")).toBeGreaterThan(
      storageTemperatureC("mrna")
    );
  });
});

describe("immuneResponseStrength", () => {
  it("live attenuated strongest response", () => {
    expect(immuneResponseStrength("live_attenuated")).toBeGreaterThan(
      immuneResponseStrength("inactivated")
    );
  });
});

describe("safetyProfile", () => {
  it("subunit safest", () => {
    expect(safetyProfile("subunit")).toBeGreaterThan(
      safetyProfile("live_attenuated")
    );
  });
});

describe("productionCost", () => {
  it("mrna most expensive", () => {
    expect(productionCost("mrna")).toBeGreaterThan(
      productionCost("inactivated")
    );
  });
});

describe("requiresColdChain", () => {
  it("mrna requires cold chain", () => {
    expect(requiresColdChain("mrna")).toBe(true);
  });
  it("subunit also requires cold chain", () => {
    expect(requiresColdChain("subunit")).toBe(true);
  });
});

describe("containsLivePathogen", () => {
  it("live attenuated contains live pathogen", () => {
    expect(containsLivePathogen("live_attenuated")).toBe(true);
  });
  it("mrna does not", () => {
    expect(containsLivePathogen("mrna")).toBe(false);
  });
});

describe("mechanismOfAction", () => {
  it("mrna provides protein blueprint", () => {
    expect(mechanismOfAction("mrna")).toBe("protein_blueprint");
  });
});

describe("exampleDisease", () => {
  it("live attenuated example is measles", () => {
    expect(exampleDisease("live_attenuated")).toBe("measles");
  });
});

describe("vaccineTypes", () => {
  it("returns 5 types", () => {
    expect(vaccineTypes()).toHaveLength(5);
  });
});
