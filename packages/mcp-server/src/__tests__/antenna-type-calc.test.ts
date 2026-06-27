import { describe, it, expect } from "vitest";
import {
  gainDbi, beamwidthDeg, sizeScore,
  costScore, bandwidthScore, omnidirectional,
  electronicallySteerable, typicalUse, polarization, antennaTypes,
} from "../antenna-type-calc.js";

describe("gainDbi", () => {
  it("parabolic highest gain", () => {
    expect(gainDbi("parabolic")).toBeGreaterThan(
      gainDbi("dipole")
    );
  });
});

describe("beamwidthDeg", () => {
  it("dipole widest beam", () => {
    expect(beamwidthDeg("dipole")).toBeGreaterThan(
      beamwidthDeg("yagi")
    );
  });
});

describe("sizeScore", () => {
  it("parabolic largest", () => {
    expect(sizeScore("parabolic")).toBeGreaterThan(
      sizeScore("patch")
    );
  });
});

describe("costScore", () => {
  it("phased_array most expensive", () => {
    expect(costScore("phased_array")).toBeGreaterThan(
      costScore("dipole")
    );
  });
});

describe("bandwidthScore", () => {
  it("phased_array widest bandwidth", () => {
    expect(bandwidthScore("phased_array")).toBeGreaterThan(
      bandwidthScore("yagi")
    );
  });
});

describe("omnidirectional", () => {
  it("dipole is omnidirectional", () => {
    expect(omnidirectional("dipole")).toBe(true);
  });
  it("yagi is not", () => {
    expect(omnidirectional("yagi")).toBe(false);
  });
});

describe("electronicallySteerable", () => {
  it("phased_array is steerable", () => {
    expect(electronicallySteerable("phased_array")).toBe(true);
  });
  it("parabolic is not", () => {
    expect(electronicallySteerable("parabolic")).toBe(false);
  });
});

describe("typicalUse", () => {
  it("parabolic for satellite dishes", () => {
    expect(typicalUse("parabolic")).toBe("satellite_dishes");
  });
});

describe("polarization", () => {
  it("phased_array has adaptive polarization", () => {
    expect(polarization("phased_array")).toBe("adaptive");
  });
});

describe("antennaTypes", () => {
  it("returns 5 types", () => {
    expect(antennaTypes()).toHaveLength(5);
  });
});
