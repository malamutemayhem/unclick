import { describe, it, expect } from "vitest";
import {
  weaveTight, comfortSit, durability, speedWeave,
  seatCost, natural, twisted, fiberSource,
  bestUse, rushSeats,
} from "../rush-seat-calc.js";

describe("weaveTight", () => {
  it("danish cord woven tightest weave", () => {
    expect(weaveTight("danish_cord_woven")).toBeGreaterThan(weaveTight("paper_rush_budget"));
  });
});

describe("comfortSit", () => {
  it("danish cord woven most comfortable sit", () => {
    expect(comfortSit("danish_cord_woven")).toBeGreaterThan(comfortSit("paper_rush_budget"));
  });
});

describe("durability", () => {
  it("danish cord woven most durable", () => {
    expect(durability("danish_cord_woven")).toBeGreaterThan(durability("paper_rush_budget"));
  });
});

describe("speedWeave", () => {
  it("paper rush budget fastest weave", () => {
    expect(speedWeave("paper_rush_budget")).toBeGreaterThan(speedWeave("natural_rush_standard"));
  });
});

describe("seatCost", () => {
  it("danish cord woven most expensive", () => {
    expect(seatCost("danish_cord_woven")).toBeGreaterThan(seatCost("paper_rush_budget"));
  });
});

describe("natural", () => {
  it("natural rush standard is natural", () => {
    expect(natural("natural_rush_standard")).toBe(true);
  });
  it("fiber rush modern not natural", () => {
    expect(natural("fiber_rush_modern")).toBe(false);
  });
});

describe("twisted", () => {
  it("natural rush standard is twisted", () => {
    expect(twisted("natural_rush_standard")).toBe(true);
  });
  it("danish cord woven not twisted", () => {
    expect(twisted("danish_cord_woven")).toBe(false);
  });
});

describe("fiberSource", () => {
  it("seagrass twist green uses woven seagrass cord", () => {
    expect(fiberSource("seagrass_twist_green")).toBe("woven_seagrass_cord");
  });
});

describe("bestUse", () => {
  it("natural rush standard best for traditional rush seat", () => {
    expect(bestUse("natural_rush_standard")).toBe("traditional_rush_seat");
  });
});

describe("rushSeats", () => {
  it("returns 5 types", () => {
    expect(rushSeats()).toHaveLength(5);
  });
});
