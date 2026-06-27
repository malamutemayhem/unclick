import { describe, it, expect } from "vitest";
import {
  cellViability, scaleCapacity, contamRisk, automation,
  ypCost, continuous, forAle, propagatorConfig,
  bestUse, yeastPropagatorTypes,
} from "../yeast-propagator-calc.js";

describe("cellViability", () => {
  it("fed batch best cell viability", () => {
    expect(cellViability("fed_batch")).toBeGreaterThan(cellViability("flask_stir_plate"));
  });
});

describe("scaleCapacity", () => {
  it("continuous chemostat highest scale capacity", () => {
    expect(scaleCapacity("continuous_chemostat")).toBeGreaterThan(scaleCapacity("conical_aerated"));
  });
});

describe("contamRisk", () => {
  it("immobilized cell lowest contamination risk", () => {
    expect(contamRisk("immobilized_cell")).toBeGreaterThan(contamRisk("flask_stir_plate"));
  });
});

describe("automation", () => {
  it("immobilized cell highest automation", () => {
    expect(automation("immobilized_cell")).toBeGreaterThan(automation("conical_aerated"));
  });
});

describe("ypCost", () => {
  it("immobilized cell most expensive", () => {
    expect(ypCost("immobilized_cell")).toBeGreaterThan(ypCost("flask_stir_plate"));
  });
});

describe("continuous", () => {
  it("continuous chemostat is continuous", () => {
    expect(continuous("continuous_chemostat")).toBe(true);
  });
  it("fed batch not continuous", () => {
    expect(continuous("fed_batch")).toBe(false);
  });
});

describe("forAle", () => {
  it("conical aerated for ale", () => {
    expect(forAle("conical_aerated")).toBe(true);
  });
  it("immobilized cell not for ale", () => {
    expect(forAle("immobilized_cell")).toBe(false);
  });
});

describe("propagatorConfig", () => {
  it("fed batch uses nutrient pulse feed", () => {
    expect(propagatorConfig("fed_batch")).toBe("fed_batch_yeast_propagator_nutrient_pulse_feed_high_cell_density");
  });
});

describe("bestUse", () => {
  it("conical aerated for craft brewery", () => {
    expect(bestUse("conical_aerated")).toBe("craft_brewery_conical_aerated_propagator_pure_culture_pitch_rate");
  });
});

describe("yeastPropagatorTypes", () => {
  it("returns 5 types", () => {
    expect(yeastPropagatorTypes()).toHaveLength(5);
  });
});
