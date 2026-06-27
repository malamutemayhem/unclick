import { describe, it, expect } from "vitest";
import {
  flySpace, barStrength, cleanAccess, portability,
  cageCost, seedGuard, weatherProof, barMaterial,
  bestBird, birdCages,
} from "../bird-cage-calc.js";

describe("flySpace", () => {
  it("aviary outdoor most fly space", () => {
    expect(flySpace("aviary_outdoor")).toBeGreaterThan(flySpace("travel_carrier"));
  });
});

describe("barStrength", () => {
  it("aviary outdoor strongest bars", () => {
    expect(barStrength("aviary_outdoor")).toBeGreaterThan(barStrength("travel_carrier"));
  });
});

describe("cleanAccess", () => {
  it("play top open easiest clean access", () => {
    expect(cleanAccess("play_top_open")).toBeGreaterThan(cleanAccess("aviary_outdoor"));
  });
});

describe("portability", () => {
  it("travel carrier most portable", () => {
    expect(portability("travel_carrier")).toBeGreaterThan(portability("aviary_outdoor"));
  });
});

describe("cageCost", () => {
  it("aviary outdoor most expensive", () => {
    expect(cageCost("aviary_outdoor")).toBeGreaterThan(cageCost("travel_carrier"));
  });
});

describe("seedGuard", () => {
  it("flight cage large has seed guard", () => {
    expect(seedGuard("flight_cage_large")).toBe(true);
  });
  it("aviary outdoor does not", () => {
    expect(seedGuard("aviary_outdoor")).toBe(false);
  });
});

describe("weatherProof", () => {
  it("aviary outdoor is weather proof", () => {
    expect(weatherProof("aviary_outdoor")).toBe(true);
  });
  it("dome top round is not", () => {
    expect(weatherProof("dome_top_round")).toBe(false);
  });
});

describe("barMaterial", () => {
  it("aviary outdoor uses galvanized welded wire", () => {
    expect(barMaterial("aviary_outdoor")).toBe("galvanized_welded_wire");
  });
});

describe("bestBird", () => {
  it("play top open for parrot interactive social", () => {
    expect(bestBird("play_top_open")).toBe("parrot_interactive_social");
  });
});

describe("birdCages", () => {
  it("returns 5 types", () => {
    expect(birdCages()).toHaveLength(5);
  });
});
