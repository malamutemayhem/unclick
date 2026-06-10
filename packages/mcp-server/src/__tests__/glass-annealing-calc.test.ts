import { describe, it, expect } from "vitest";
import {
  soakTempCelsius, coolingRateCelsiusPerHour, stressReliefRating,
  maxPieceWeightKg, controllerRequired, totalTimeHours,
  repeatability, energyCost, costEstimate, annealMethods,
} from "../glass-annealing-calc.js";

describe("soakTempCelsius", () => {
  it("kiln soak reaches proper temp", () => {
    expect(soakTempCelsius("kiln_soak")).toBeGreaterThan(
      soakTempCelsius("vermiculite")
    );
  });
});

describe("coolingRateCelsiusPerHour", () => {
  it("programmable cools slowest", () => {
    expect(coolingRateCelsiusPerHour("programmable")).toBeLessThan(
      coolingRateCelsiusPerHour("vermiculite")
    );
  });
});

describe("stressReliefRating", () => {
  it("programmable gives best stress relief", () => {
    expect(stressReliefRating("programmable")).toBeGreaterThan(
      stressReliefRating("vermiculite")
    );
  });
});

describe("maxPieceWeightKg", () => {
  it("lehr handles heaviest pieces", () => {
    expect(maxPieceWeightKg("lehr")).toBeGreaterThan(
      maxPieceWeightKg("vermiculite")
    );
  });
});

describe("controllerRequired", () => {
  it("programmable needs controller", () => {
    expect(controllerRequired("programmable")).toBe(true);
  });
  it("vermiculite does not", () => {
    expect(controllerRequired("vermiculite")).toBe(false);
  });
});

describe("totalTimeHours", () => {
  it("thicker pieces take longer", () => {
    expect(totalTimeHours("kiln_soak", 3)).toBeGreaterThan(
      totalTimeHours("kiln_soak", 1)
    );
  });
});

describe("repeatability", () => {
  it("programmable is most repeatable", () => {
    expect(repeatability("programmable")).toBeGreaterThan(
      repeatability("vermiculite")
    );
  });
});

describe("energyCost", () => {
  it("lehr costs most energy", () => {
    expect(energyCost("lehr")).toBeGreaterThan(
      energyCost("vermiculite")
    );
  });
});

describe("costEstimate", () => {
  it("lehr is most expensive", () => {
    expect(costEstimate("lehr")).toBeGreaterThan(
      costEstimate("vermiculite")
    );
  });
});

describe("annealMethods", () => {
  it("returns 5 methods", () => {
    expect(annealMethods()).toHaveLength(5);
  });
});
