import { describe, it, expect } from "vitest";
import {
  accuracyMeters, allWeatherReliability, collisionAvoidance,
  powerConsumption, learningDifficulty, requiresElectricity,
  tracksOtherVessels, bestUse, inventionDecade, marineNavs,
} from "../marine-nav-calc.js";

describe("accuracyMeters", () => {
  it("gps is most accurate", () => {
    expect(accuracyMeters("gps")).toBeLessThan(
      accuracyMeters("sextant")
    );
  });
});

describe("allWeatherReliability", () => {
  it("radar is most reliable in all weather", () => {
    expect(allWeatherReliability("radar")).toBeGreaterThan(
      allWeatherReliability("sextant")
    );
  });
});

describe("collisionAvoidance", () => {
  it("ais best for collision avoidance", () => {
    expect(collisionAvoidance("ais")).toBeGreaterThan(
      collisionAvoidance("gps")
    );
  });
});

describe("powerConsumption", () => {
  it("sextant uses no power", () => {
    expect(powerConsumption("sextant")).toBe(0);
  });
  it("radar uses most power", () => {
    expect(powerConsumption("radar")).toBeGreaterThan(
      powerConsumption("gps")
    );
  });
});

describe("learningDifficulty", () => {
  it("sextant is hardest to learn", () => {
    expect(learningDifficulty("sextant")).toBeGreaterThan(
      learningDifficulty("gps")
    );
  });
});

describe("requiresElectricity", () => {
  it("gps requires electricity", () => {
    expect(requiresElectricity("gps")).toBe(true);
  });
  it("sextant does not", () => {
    expect(requiresElectricity("sextant")).toBe(false);
  });
});

describe("tracksOtherVessels", () => {
  it("ais tracks vessels", () => {
    expect(tracksOtherVessels("ais")).toBe(true);
  });
  it("gps does not", () => {
    expect(tracksOtherVessels("gps")).toBe(false);
  });
});

describe("bestUse", () => {
  it("radar for fog navigation", () => {
    expect(bestUse("radar")).toBe("fog_navigation");
  });
});

describe("inventionDecade", () => {
  it("sextant is oldest", () => {
    expect(inventionDecade("sextant")).toBe("1730s");
  });
});

describe("marineNavs", () => {
  it("returns 5 types", () => {
    expect(marineNavs()).toHaveLength(5);
  });
});
