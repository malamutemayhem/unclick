import { describe, it, expect } from "vitest";
import {
  depthMeters, areaMillionKm2, biodiversity,
  geologicalActivity, mineralResources, tectonicBoundary,
  sunlitZone, sedimentType, explorationDifficulty, seabedTypes,
} from "../seabed-type-calc.js";

describe("depthMeters", () => {
  it("trench is deepest", () => {
    expect(depthMeters("trench")).toBeGreaterThan(
      depthMeters("continental_shelf")
    );
  });
});

describe("areaMillionKm2", () => {
  it("abyssal plain is largest", () => {
    expect(areaMillionKm2("abyssal_plain")).toBeGreaterThan(
      areaMillionKm2("trench")
    );
  });
});

describe("biodiversity", () => {
  it("continental shelf has most biodiversity", () => {
    expect(biodiversity("continental_shelf")).toBeGreaterThan(
      biodiversity("abyssal_plain")
    );
  });
});

describe("geologicalActivity", () => {
  it("mid ocean ridge is most active", () => {
    expect(geologicalActivity("mid_ocean_ridge")).toBeGreaterThan(
      geologicalActivity("abyssal_plain")
    );
  });
});

describe("mineralResources", () => {
  it("mid ocean ridge has most minerals", () => {
    expect(mineralResources("mid_ocean_ridge")).toBeGreaterThan(
      mineralResources("trench")
    );
  });
});

describe("tectonicBoundary", () => {
  it("mid ocean ridge is tectonic boundary", () => {
    expect(tectonicBoundary("mid_ocean_ridge")).toBe(true);
  });
  it("continental shelf is not", () => {
    expect(tectonicBoundary("continental_shelf")).toBe(false);
  });
});

describe("sunlitZone", () => {
  it("continental shelf is sunlit", () => {
    expect(sunlitZone("continental_shelf")).toBe(true);
  });
  it("trench is not sunlit", () => {
    expect(sunlitZone("trench")).toBe(false);
  });
});

describe("sedimentType", () => {
  it("continental shelf has terrigenous sediment", () => {
    expect(sedimentType("continental_shelf")).toBe("terrigenous");
  });
});

describe("explorationDifficulty", () => {
  it("trench is hardest to explore", () => {
    expect(explorationDifficulty("trench")).toBeGreaterThan(
      explorationDifficulty("continental_shelf")
    );
  });
});

describe("seabedTypes", () => {
  it("returns 5 types", () => {
    expect(seabedTypes()).toHaveLength(5);
  });
});
