import { describe, it, expect } from "vitest";
import {
  frameSizeMm2, resolution, portability,
  costPerFrame, exposuresPerRoll, stillPhotography,
  selfDeveloping, bestApplication, availabilityScore, filmFormats,
} from "../film-format-calc.js";

describe("frameSizeMm2", () => {
  it("large format has biggest frame", () => {
    expect(frameSizeMm2("large_format")).toBeGreaterThan(
      frameSizeMm2("35mm")
    );
  });
});

describe("resolution", () => {
  it("large format has best resolution", () => {
    expect(resolution("large_format")).toBeGreaterThan(
      resolution("super8")
    );
  });
});

describe("portability", () => {
  it("35mm is most portable", () => {
    expect(portability("35mm")).toBeGreaterThan(
      portability("large_format")
    );
  });
});

describe("costPerFrame", () => {
  it("large format costs most per frame", () => {
    expect(costPerFrame("large_format")).toBeGreaterThan(
      costPerFrame("35mm")
    );
  });
});

describe("exposuresPerRoll", () => {
  it("super8 has most exposures", () => {
    expect(exposuresPerRoll("super8")).toBeGreaterThan(
      exposuresPerRoll("large_format")
    );
  });
});

describe("stillPhotography", () => {
  it("35mm is for stills", () => {
    expect(stillPhotography("35mm")).toBe(true);
  });
  it("super8 is not", () => {
    expect(stillPhotography("super8")).toBe(false);
  });
});

describe("selfDeveloping", () => {
  it("instant is self developing", () => {
    expect(selfDeveloping("instant")).toBe(true);
  });
  it("35mm is not", () => {
    expect(selfDeveloping("35mm")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("35mm for street photography", () => {
    expect(bestApplication("35mm")).toBe("street");
  });
});

describe("availabilityScore", () => {
  it("35mm is most available", () => {
    expect(availabilityScore("35mm")).toBeGreaterThan(
      availabilityScore("large_format")
    );
  });
});

describe("filmFormats", () => {
  it("returns 5 types", () => {
    expect(filmFormats()).toHaveLength(5);
  });
});
