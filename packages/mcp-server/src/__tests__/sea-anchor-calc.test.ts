import { describe, it, expect } from "vitest";
import {
  driftReduction, sternStability, deploymentEase, retrievalDifficulty,
  storageSize, multihullSafe, heavyWeatherRated, primaryFunction,
  designerOrigin, seaAnchors,
} from "../sea-anchor-calc.js";

describe("driftReduction", () => {
  it("parachute best drift reduction", () => {
    expect(driftReduction("parachute")).toBeGreaterThan(driftReduction("galerider"));
  });
});

describe("sternStability", () => {
  it("series best stern stability", () => {
    expect(sternStability("series")).toBeGreaterThan(sternStability("parachute"));
  });
});

describe("deploymentEase", () => {
  it("galerider easiest to deploy", () => {
    expect(deploymentEase("galerider")).toBeGreaterThan(deploymentEase("series"));
  });
});

describe("retrievalDifficulty", () => {
  it("parachute hardest to retrieve", () => {
    expect(retrievalDifficulty("parachute")).toBeGreaterThan(retrievalDifficulty("galerider"));
  });
});

describe("storageSize", () => {
  it("series largest storage", () => {
    expect(storageSize("series")).toBeGreaterThan(storageSize("galerider"));
  });
});

describe("multihullSafe", () => {
  it("drogue is multihull safe", () => {
    expect(multihullSafe("drogue")).toBe(true);
  });
  it("parachute is not", () => {
    expect(multihullSafe("parachute")).toBe(false);
  });
});

describe("heavyWeatherRated", () => {
  it("parachute is heavy weather rated", () => {
    expect(heavyWeatherRated("parachute")).toBe(true);
  });
  it("drogue is not", () => {
    expect(heavyWeatherRated("drogue")).toBe(false);
  });
});

describe("primaryFunction", () => {
  it("parachute for bow hold position", () => {
    expect(primaryFunction("parachute")).toBe("bow_hold_position");
  });
});

describe("designerOrigin", () => {
  it("series is don jordan invention", () => {
    expect(designerOrigin("series")).toBe("don_jordan_invention");
  });
});

describe("seaAnchors", () => {
  it("returns 5 anchors", () => {
    expect(seaAnchors()).toHaveLength(5);
  });
});
