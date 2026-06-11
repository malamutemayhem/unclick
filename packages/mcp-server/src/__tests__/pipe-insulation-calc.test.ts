import { describe, it, expect } from "vitest";
import {
  thermal, tempRange, moisture, fireRating,
  piCost, closedCell, forCold, jacket,
  bestUse, pipeInsulationTypes,
} from "../pipe-insulation-calc.js";

describe("thermal", () => {
  it("aerogel best thermal", () => {
    expect(thermal("aerogel_blanket_thin_layer")).toBeGreaterThan(thermal("calcium_silicate_high_temp"));
  });
});

describe("tempRange", () => {
  it("calcium silicate highest temp range", () => {
    expect(tempRange("calcium_silicate_high_temp")).toBeGreaterThan(tempRange("elastomeric_foam_rubber"));
  });
});

describe("moisture", () => {
  it("elastomeric foam best moisture", () => {
    expect(moisture("elastomeric_foam_rubber")).toBeGreaterThan(moisture("mineral_wool_rock_wrap"));
  });
});

describe("fireRating", () => {
  it("mineral wool best fire rating", () => {
    expect(fireRating("mineral_wool_rock_wrap")).toBeGreaterThan(fireRating("elastomeric_foam_rubber"));
  });
});

describe("piCost", () => {
  it("aerogel most expensive", () => {
    expect(piCost("aerogel_blanket_thin_layer")).toBeGreaterThan(piCost("fiberglass_preformed_section"));
  });
});

describe("closedCell", () => {
  it("elastomeric is closed cell", () => {
    expect(closedCell("elastomeric_foam_rubber")).toBe(true);
  });
  it("fiberglass not closed cell", () => {
    expect(closedCell("fiberglass_preformed_section")).toBe(false);
  });
});

describe("forCold", () => {
  it("elastomeric for cold", () => {
    expect(forCold("elastomeric_foam_rubber")).toBe(true);
  });
  it("fiberglass not for cold", () => {
    expect(forCold("fiberglass_preformed_section")).toBe(false);
  });
});

describe("jacket", () => {
  it("elastomeric needs no jacket", () => {
    expect(jacket("elastomeric_foam_rubber")).toBe("self_seal_no_jacket_required");
  });
});

describe("bestUse", () => {
  it("calcium silicate for steam turbine", () => {
    expect(bestUse("calcium_silicate_high_temp")).toBe("steam_turbine_high_pressure_pipe");
  });
});

describe("pipeInsulationTypes", () => {
  it("returns 5 types", () => {
    expect(pipeInsulationTypes()).toHaveLength(5);
  });
});
