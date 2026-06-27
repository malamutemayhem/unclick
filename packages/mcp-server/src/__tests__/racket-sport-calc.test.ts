import { describe, it, expect } from "vitest";
import {
  courtLengthM, shuttleSpeedKmh, rallyLength,
  fitnessRequirement, globalPopularity, usesWalls,
  olympicSport, racketMaterial, scoringSystem, racketSports,
} from "../racket-sport-calc.js";

describe("courtLengthM", () => {
  it("tennis longest court", () => {
    expect(courtLengthM("tennis")).toBeGreaterThan(
      courtLengthM("squash")
    );
  });
});

describe("shuttleSpeedKmh", () => {
  it("badminton fastest projectile", () => {
    expect(shuttleSpeedKmh("badminton")).toBeGreaterThan(
      shuttleSpeedKmh("tennis")
    );
  });
});

describe("rallyLength", () => {
  it("squash longest rallies", () => {
    expect(rallyLength("squash")).toBeGreaterThan(
      rallyLength("tennis")
    );
  });
});

describe("fitnessRequirement", () => {
  it("squash highest fitness", () => {
    expect(fitnessRequirement("squash")).toBeGreaterThan(
      fitnessRequirement("table_tennis")
    );
  });
});

describe("globalPopularity", () => {
  it("tennis most popular", () => {
    expect(globalPopularity("tennis")).toBeGreaterThan(
      globalPopularity("squash")
    );
  });
});

describe("usesWalls", () => {
  it("squash uses walls", () => {
    expect(usesWalls("squash")).toBe(true);
  });
  it("tennis does not", () => {
    expect(usesWalls("tennis")).toBe(false);
  });
});

describe("olympicSport", () => {
  it("tennis is olympic", () => {
    expect(olympicSport("tennis")).toBe(true);
  });
  it("padel is not", () => {
    expect(olympicSport("padel")).toBe(false);
  });
});

describe("racketMaterial", () => {
  it("table tennis uses wood rubber", () => {
    expect(racketMaterial("table_tennis")).toBe("wood_rubber");
  });
});

describe("scoringSystem", () => {
  it("badminton rally point 21", () => {
    expect(scoringSystem("badminton")).toBe("rally_point_21");
  });
});

describe("racketSports", () => {
  it("returns 5 sports", () => {
    expect(racketSports()).toHaveLength(5);
  });
});
