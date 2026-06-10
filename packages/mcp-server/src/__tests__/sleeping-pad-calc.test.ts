import { describe, it, expect } from "vitest";
import {
  comfort, insulation, packSize, durability,
  padCost, needsInflation, punctureProof, padConstruction,
  bestTrip, sleepingPads,
} from "../sleeping-pad-calc.js";

describe("comfort", () => {
  it("double wide camp most comfortable", () => {
    expect(comfort("double_wide_camp")).toBeGreaterThan(comfort("closed_cell_foam"));
  });
});

describe("insulation", () => {
  it("insulated winter four best insulation", () => {
    expect(insulation("insulated_winter_four")).toBeGreaterThan(insulation("air_pad_ultralight"));
  });
});

describe("packSize", () => {
  it("air pad ultralight smallest pack size", () => {
    expect(packSize("air_pad_ultralight")).toBeGreaterThan(packSize("double_wide_camp"));
  });
});

describe("durability", () => {
  it("closed cell foam most durable", () => {
    expect(durability("closed_cell_foam")).toBeGreaterThan(durability("air_pad_ultralight"));
  });
});

describe("padCost", () => {
  it("insulated winter four most expensive", () => {
    expect(padCost("insulated_winter_four")).toBeGreaterThan(padCost("closed_cell_foam"));
  });
});

describe("needsInflation", () => {
  it("air pad ultralight needs inflation", () => {
    expect(needsInflation("air_pad_ultralight")).toBe(true);
  });
  it("closed cell foam does not", () => {
    expect(needsInflation("closed_cell_foam")).toBe(false);
  });
});

describe("punctureProof", () => {
  it("closed cell foam is puncture proof", () => {
    expect(punctureProof("closed_cell_foam")).toBe(true);
  });
  it("air pad ultralight is not", () => {
    expect(punctureProof("air_pad_ultralight")).toBe(false);
  });
});

describe("padConstruction", () => {
  it("air pad ultralight uses ripstop nylon baffle", () => {
    expect(padConstruction("air_pad_ultralight")).toBe("ripstop_nylon_baffle");
  });
});

describe("bestTrip", () => {
  it("insulated winter four best for winter alpine snow", () => {
    expect(bestTrip("insulated_winter_four")).toBe("winter_alpine_snow");
  });
});

describe("sleepingPads", () => {
  it("returns 5 types", () => {
    expect(sleepingPads()).toHaveLength(5);
  });
});
