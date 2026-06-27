import { describe, it, expect } from "vitest";
import {
  beamLengthMeters, counterweightKg, bucketCapacityLiters,
  liftHeightMeters, cyclesPerHour, operatorRequired,
  durabilityYears, effortRating, costEstimate, shadufMaterials,
} from "../shaduf-calc.js";

describe("beamLengthMeters", () => {
  it("metal has longest beam", () => {
    expect(beamLengthMeters("metal")).toBeGreaterThan(
      beamLengthMeters("palm")
    );
  });
});

describe("counterweightKg", () => {
  it("metal has heaviest counterweight", () => {
    expect(counterweightKg("metal")).toBeGreaterThan(
      counterweightKg("bamboo")
    );
  });
});

describe("bucketCapacityLiters", () => {
  it("metal holds most", () => {
    expect(bucketCapacityLiters("metal")).toBeGreaterThan(
      bucketCapacityLiters("palm")
    );
  });
});

describe("liftHeightMeters", () => {
  it("metal lifts highest", () => {
    expect(liftHeightMeters("metal")).toBeGreaterThan(
      liftHeightMeters("palm")
    );
  });
});

describe("cyclesPerHour", () => {
  it("bamboo cycles fastest", () => {
    expect(cyclesPerHour("bamboo")).toBeGreaterThan(
      cyclesPerHour("metal")
    );
  });
});

describe("operatorRequired", () => {
  it("all require operator", () => {
    expect(operatorRequired("wood")).toBe(true);
    expect(operatorRequired("metal")).toBe(true);
  });
});

describe("durabilityYears", () => {
  it("metal lasts longest", () => {
    expect(durabilityYears("metal")).toBeGreaterThan(
      durabilityYears("bamboo")
    );
  });
});

describe("effortRating", () => {
  it("metal requires most effort", () => {
    expect(effortRating("metal")).toBeGreaterThan(
      effortRating("bamboo")
    );
  });
});

describe("costEstimate", () => {
  it("metal is most expensive", () => {
    expect(costEstimate("metal")).toBeGreaterThan(
      costEstimate("palm")
    );
  });
});

describe("shadufMaterials", () => {
  it("returns 5 materials", () => {
    expect(shadufMaterials()).toHaveLength(5);
  });
});
