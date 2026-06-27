import { describe, it, expect } from "vitest";
import {
  comfortLevel, durability, installEase, cleanability,
  seatCost, softClose, needsOutlet, hingeMaterial,
  bestBathroom, toiletSeats,
} from "../toilet-seat-calc.js";

describe("comfortLevel", () => {
  it("bidet integrated most comfortable", () => {
    expect(comfortLevel("bidet_integrated")).toBeGreaterThan(comfortLevel("standard_round"));
  });
});

describe("durability", () => {
  it("elongated soft close most durable", () => {
    expect(durability("elongated_soft_close")).toBeGreaterThan(durability("child_family"));
  });
});

describe("installEase", () => {
  it("standard round easiest install", () => {
    expect(installEase("standard_round")).toBeGreaterThan(installEase("bidet_integrated"));
  });
});

describe("cleanability", () => {
  it("bidet integrated easiest to clean", () => {
    expect(cleanability("bidet_integrated")).toBeGreaterThan(cleanability("standard_round"));
  });
});

describe("seatCost", () => {
  it("bidet integrated most expensive", () => {
    expect(seatCost("bidet_integrated")).toBeGreaterThan(seatCost("standard_round"));
  });
});

describe("softClose", () => {
  it("elongated soft close has soft close", () => {
    expect(softClose("elongated_soft_close")).toBe(true);
  });
  it("standard round does not", () => {
    expect(softClose("standard_round")).toBe(false);
  });
});

describe("needsOutlet", () => {
  it("heated electric needs outlet", () => {
    expect(needsOutlet("heated_electric")).toBe(true);
  });
  it("elongated soft close does not", () => {
    expect(needsOutlet("elongated_soft_close")).toBe(false);
  });
});

describe("hingeMaterial", () => {
  it("bidet integrated uses steel plate mount", () => {
    expect(hingeMaterial("bidet_integrated")).toBe("steel_plate_mount");
  });
});

describe("bestBathroom", () => {
  it("child family for kids potty training", () => {
    expect(bestBathroom("child_family")).toBe("kids_potty_training");
  });
});

describe("toiletSeats", () => {
  it("returns 5 types", () => {
    expect(toiletSeats()).toHaveLength(5);
  });
});
