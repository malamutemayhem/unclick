import { describe, it, expect } from "vitest";
import {
  shapeAccuracy, speedForm, sizeRange, durability,
  swageCost, springLoaded, forRound, swageProfile,
  bestUse, springSwages,
} from "../spring-swage-calc.js";

describe("shapeAccuracy", () => {
  it("hexagon bar hex most accurate shape", () => {
    expect(shapeAccuracy("hexagon_bar_hex")).toBeGreaterThan(shapeAccuracy("flat_spring_combo"));
  });
});

describe("speedForm", () => {
  it("flat spring combo fastest form", () => {
    expect(speedForm("flat_spring_combo")).toBeGreaterThan(speedForm("hexagon_bar_hex"));
  });
});

describe("sizeRange", () => {
  it("flat spring combo best size range", () => {
    expect(sizeRange("flat_spring_combo")).toBeGreaterThan(sizeRange("hexagon_bar_hex"));
  });
});

describe("durability", () => {
  it("round bar standard durable", () => {
    expect(durability("round_bar_standard")).toBeGreaterThan(durability("v_swage_point"));
  });
});

describe("swageCost", () => {
  it("hexagon bar hex most expensive", () => {
    expect(swageCost("hexagon_bar_hex")).toBeGreaterThan(swageCost("v_swage_point"));
  });
});

describe("springLoaded", () => {
  it("round bar standard is spring loaded", () => {
    expect(springLoaded("round_bar_standard")).toBe(true);
  });
});

describe("forRound", () => {
  it("round bar standard is for round", () => {
    expect(forRound("round_bar_standard")).toBe(true);
  });
  it("square bar corner not for round", () => {
    expect(forRound("square_bar_corner")).toBe(false);
  });
});

describe("swageProfile", () => {
  it("hexagon bar hex uses hex matched pair", () => {
    expect(swageProfile("hexagon_bar_hex")).toBe("hex_matched_pair");
  });
});

describe("bestUse", () => {
  it("round bar standard best for round bar finish", () => {
    expect(bestUse("round_bar_standard")).toBe("round_bar_finish");
  });
});

describe("springSwages", () => {
  it("returns 5 types", () => {
    expect(springSwages()).toHaveLength(5);
  });
});
