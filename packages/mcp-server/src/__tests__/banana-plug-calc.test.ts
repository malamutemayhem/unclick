import { describe, it, expect } from "vitest";
import {
  contactResist, currentRating, safetyRating, durability,
  plugCost, stackable, shrouded, contactType,
  bestUse, bananaPlugs,
} from "../banana-plug-calc.js";

describe("contactResist", () => {
  it("miniature 2mm lowest contact resistance", () => {
    expect(contactResist("miniature_2mm_probe")).toBeGreaterThan(contactResist("right_angle_pcb_pin"));
  });
});

describe("currentRating", () => {
  it("shrouded safety highest current rating", () => {
    expect(currentRating("shrouded_safety_4mm")).toBeGreaterThan(currentRating("miniature_2mm_probe"));
  });
});

describe("safetyRating", () => {
  it("shrouded safety highest safety rating", () => {
    expect(safetyRating("shrouded_safety_4mm")).toBeGreaterThan(safetyRating("standard_4mm_spring"));
  });
});

describe("durability", () => {
  it("shrouded safety most durable", () => {
    expect(durability("shrouded_safety_4mm")).toBeGreaterThan(durability("miniature_2mm_probe"));
  });
});

describe("plugCost", () => {
  it("shrouded safety most expensive", () => {
    expect(plugCost("shrouded_safety_4mm")).toBeGreaterThan(plugCost("standard_4mm_spring"));
  });
});

describe("stackable", () => {
  it("stackable 4mm is stackable", () => {
    expect(stackable("stackable_4mm_socket")).toBe(true);
  });
  it("standard 4mm not stackable", () => {
    expect(stackable("standard_4mm_spring")).toBe(false);
  });
});

describe("shrouded", () => {
  it("shrouded safety is shrouded", () => {
    expect(shrouded("shrouded_safety_4mm")).toBe(true);
  });
  it("standard 4mm not shrouded", () => {
    expect(shrouded("standard_4mm_spring")).toBe(false);
  });
});

describe("contactType", () => {
  it("stackable uses cross hole socket", () => {
    expect(contactType("stackable_4mm_socket")).toBe("cross_hole_socket");
  });
});

describe("bestUse", () => {
  it("shrouded safety best for high voltage test safe", () => {
    expect(bestUse("shrouded_safety_4mm")).toBe("high_voltage_test_safe");
  });
});

describe("bananaPlugs", () => {
  it("returns 5 types", () => {
    expect(bananaPlugs()).toHaveLength(5);
  });
});
