import { describe, it, expect } from "vitest";
import {
  lumens, efficiency, lifespan, heatOutput,
  hbCost, dimmable, forHazardous, mounting,
  bestUse, highBayTypes,
} from "../high-bay-calc.js";

describe("lumens", () => {
  it("ufo highest lumens", () => {
    expect(lumens("led_round_ufo_style")).toBeGreaterThan(lumens("induction_magnetic"));
  });
});

describe("efficiency", () => {
  it("ufo most efficient", () => {
    expect(efficiency("led_round_ufo_style")).toBeGreaterThan(efficiency("induction_magnetic"));
  });
});

describe("lifespan", () => {
  it("induction longest lifespan", () => {
    expect(lifespan("induction_magnetic")).toBeGreaterThan(lifespan("led_reflector_aisle"));
  });
});

describe("heatOutput", () => {
  it("ufo best heat management", () => {
    expect(heatOutput("led_round_ufo_style")).toBeGreaterThan(heatOutput("induction_magnetic"));
  });
});

describe("hbCost", () => {
  it("explosion proof most expensive", () => {
    expect(hbCost("explosion_proof_class")).toBeGreaterThan(hbCost("led_linear_strip"));
  });
});

describe("dimmable", () => {
  it("ufo is dimmable", () => {
    expect(dimmable("led_round_ufo_style")).toBe(true);
  });
  it("explosion proof not dimmable", () => {
    expect(dimmable("explosion_proof_class")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("explosion proof for hazardous", () => {
    expect(forHazardous("explosion_proof_class")).toBe(true);
  });
  it("ufo not hazardous", () => {
    expect(forHazardous("led_round_ufo_style")).toBe(false);
  });
});

describe("mounting", () => {
  it("reflector uses asymmetric", () => {
    expect(mounting("led_reflector_aisle")).toBe("asymmetric_reflector_directed");
  });
});

describe("bestUse", () => {
  it("induction for hard to reach", () => {
    expect(bestUse("induction_magnetic")).toBe("hard_to_reach_long_life_need");
  });
});

describe("highBayTypes", () => {
  it("returns 5 types", () => {
    expect(highBayTypes()).toHaveLength(5);
  });
});
