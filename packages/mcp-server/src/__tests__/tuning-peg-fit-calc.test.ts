import { describe, it, expect } from "vitest";
import {
  fitAccuracy, turnSmooth, holdTune, speedFit,
  fitCost, forRepair, compound, fitMethod,
  bestUse, tuningPegFits,
} from "../tuning-peg-fit-calc.js";

describe("fitAccuracy", () => {
  it("taper reamer standard most accurate fit", () => {
    expect(fitAccuracy("taper_reamer_standard")).toBeGreaterThan(fitAccuracy("friction_chalk_grip"));
  });
});

describe("turnSmooth", () => {
  it("compound paste smooth smoothest turn", () => {
    expect(turnSmooth("compound_paste_smooth")).toBeGreaterThan(turnSmooth("friction_chalk_grip"));
  });
});

describe("holdTune", () => {
  it("bush insert repair best hold tune", () => {
    expect(holdTune("bush_insert_repair")).toBeGreaterThan(holdTune("compound_paste_smooth"));
  });
});

describe("speedFit", () => {
  it("friction chalk grip fastest fit", () => {
    expect(speedFit("friction_chalk_grip")).toBeGreaterThan(speedFit("bush_insert_repair"));
  });
});

describe("fitCost", () => {
  it("bush insert repair most expensive", () => {
    expect(fitCost("bush_insert_repair")).toBeGreaterThan(fitCost("friction_chalk_grip"));
  });
});

describe("forRepair", () => {
  it("bush insert repair is for repair", () => {
    expect(forRepair("bush_insert_repair")).toBe(true);
  });
  it("taper reamer standard not for repair", () => {
    expect(forRepair("taper_reamer_standard")).toBe(false);
  });
});

describe("compound", () => {
  it("compound paste smooth is compound", () => {
    expect(compound("compound_paste_smooth")).toBe(true);
  });
  it("taper reamer standard not compound", () => {
    expect(compound("taper_reamer_standard")).toBe(false);
  });
});

describe("fitMethod", () => {
  it("bush insert repair uses bush glue redrill", () => {
    expect(fitMethod("bush_insert_repair")).toBe("bush_glue_redrill");
  });
});

describe("bestUse", () => {
  it("taper reamer standard best for general peg fit", () => {
    expect(bestUse("taper_reamer_standard")).toBe("general_peg_fit");
  });
});

describe("tuningPegFits", () => {
  it("returns 5 types", () => {
    expect(tuningPegFits()).toHaveLength(5);
  });
});
