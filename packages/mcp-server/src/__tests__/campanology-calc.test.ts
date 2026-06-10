import { describe, it, expect } from "vitest";
import {
  bellWeight, frequency, clapperWeight, swingAngle, stayLength,
  ropeLength, changesCount, ringDuration, partials,
  metalDensity, bellMetals,
} from "../campanology-calc.js";

describe("bellWeight", () => {
  it("positive kg", () => {
    expect(bellWeight(60)).toBeGreaterThan(0);
  });
});

describe("frequency", () => {
  it("positive Hz", () => {
    expect(frequency(30, 3)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(frequency(0, 3)).toBe(0);
  });
});

describe("clapperWeight", () => {
  it("4% of bell", () => {
    expect(clapperWeight(100)).toBe(4);
  });
});

describe("swingAngle", () => {
  it("full circle = 360", () => {
    expect(swingAngle(true)).toBe(360);
  });
  it("half = 180", () => {
    expect(swingAngle(false)).toBe(180);
  });
});

describe("stayLength", () => {
  it("90% of wheel", () => {
    expect(stayLength(100)).toBe(90);
  });
});

describe("ropeLength", () => {
  it("longer than tower", () => {
    expect(ropeLength(20, 2)).toBeGreaterThan(20);
  });
});

describe("changesCount", () => {
  it("6 bells = 720", () => {
    expect(changesCount(6)).toBe(720);
  });
});

describe("ringDuration", () => {
  it("positive minutes", () => {
    expect(ringDuration(720, 2)).toBeGreaterThan(0);
  });
});

describe("partials", () => {
  it("5 partials", () => {
    expect(partials(440)).toHaveLength(5);
  });
  it("first = fundamental", () => {
    expect(partials(440)[0]).toBe(440);
  });
});

describe("metalDensity", () => {
  it("bronze densest", () => {
    expect(metalDensity("bronze")).toBeGreaterThan(metalDensity("cast_iron"));
  });
});

describe("bellMetals", () => {
  it("returns 4 metals", () => {
    expect(bellMetals()).toHaveLength(4);
  });
});
