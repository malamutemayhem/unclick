import { describe, it, expect } from "vitest";
import {
  altitudeReach, effectDuration, symmetry, loudness,
  constructionComplexity, groundLevel, concussionEffect,
  burstPattern, typicalSize, pyrotechnicShells,
} from "../pyrotechnic-shell-calc.js";

describe("altitudeReach", () => {
  it("multibreak reaches highest", () => {
    expect(altitudeReach("multibreak")).toBeGreaterThan(altitudeReach("mine"));
  });
});

describe("effectDuration", () => {
  it("multibreak longest effect", () => {
    expect(effectDuration("multibreak")).toBeGreaterThan(effectDuration("salute"));
  });
});

describe("symmetry", () => {
  it("round most symmetric", () => {
    expect(symmetry("round")).toBeGreaterThan(symmetry("mine"));
  });
});

describe("loudness", () => {
  it("salute loudest", () => {
    expect(loudness("salute")).toBeGreaterThan(loudness("cylindrical"));
  });
});

describe("constructionComplexity", () => {
  it("multibreak most complex", () => {
    expect(constructionComplexity("multibreak")).toBeGreaterThan(
      constructionComplexity("salute")
    );
  });
});

describe("groundLevel", () => {
  it("mine is ground level", () => {
    expect(groundLevel("mine")).toBe(true);
  });
  it("round is not", () => {
    expect(groundLevel("round")).toBe(false);
  });
});

describe("concussionEffect", () => {
  it("salute has concussion effect", () => {
    expect(concussionEffect("salute")).toBe(true);
  });
  it("round does not", () => {
    expect(concussionEffect("round")).toBe(false);
  });
});

describe("burstPattern", () => {
  it("round is spherical symmetric", () => {
    expect(burstPattern("round")).toBe("spherical_symmetric");
  });
});

describe("typicalSize", () => {
  it("mine is mortar tube fired", () => {
    expect(typicalSize("mine")).toBe("mortar_tube_fired");
  });
});

describe("pyrotechnicShells", () => {
  it("returns 5 shell types", () => {
    expect(pyrotechnicShells()).toHaveLength(5);
  });
});
