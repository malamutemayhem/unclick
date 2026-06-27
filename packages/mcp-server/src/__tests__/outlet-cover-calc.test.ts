import { describe, it, expect } from "vitest";
import {
  durability, aestheticAppeal, installEase, safetyRating,
  coverCost, outdoorRated, screwless, plateMaterial,
  bestLocation, outletCovers,
} from "../outlet-cover-calc.js";

describe("durability", () => {
  it("weatherproof bubble clear most durable", () => {
    expect(durability("weatherproof_bubble_clear")).toBeGreaterThan(durability("usb_charger_combo"));
  });
});

describe("aestheticAppeal", () => {
  it("decorator screwless snap highest aesthetic", () => {
    expect(aestheticAppeal("decorator_screwless_snap")).toBeGreaterThan(aestheticAppeal("standard_duplex_nylon"));
  });
});

describe("installEase", () => {
  it("decorator screwless snap easiest install", () => {
    expect(installEase("decorator_screwless_snap")).toBeGreaterThan(installEase("floor_outlet_brass"));
  });
});

describe("safetyRating", () => {
  it("weatherproof bubble clear highest safety", () => {
    expect(safetyRating("weatherproof_bubble_clear")).toBeGreaterThan(safetyRating("usb_charger_combo"));
  });
});

describe("coverCost", () => {
  it("floor outlet brass most expensive", () => {
    expect(coverCost("floor_outlet_brass")).toBeGreaterThan(coverCost("standard_duplex_nylon"));
  });
});

describe("outdoorRated", () => {
  it("weatherproof bubble clear is outdoor rated", () => {
    expect(outdoorRated("weatherproof_bubble_clear")).toBe(true);
  });
  it("standard duplex nylon is not", () => {
    expect(outdoorRated("standard_duplex_nylon")).toBe(false);
  });
});

describe("screwless", () => {
  it("decorator screwless snap is screwless", () => {
    expect(screwless("decorator_screwless_snap")).toBe(true);
  });
  it("standard duplex nylon is not", () => {
    expect(screwless("standard_duplex_nylon")).toBe(false);
  });
});

describe("plateMaterial", () => {
  it("floor outlet brass uses solid brass hinged", () => {
    expect(plateMaterial("floor_outlet_brass")).toBe("solid_brass_hinged");
  });
});

describe("bestLocation", () => {
  it("weatherproof bubble clear best for exterior patio deck", () => {
    expect(bestLocation("weatherproof_bubble_clear")).toBe("exterior_patio_deck");
  });
});

describe("outletCovers", () => {
  it("returns 5 types", () => {
    expect(outletCovers()).toHaveLength(5);
  });
});
