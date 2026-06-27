import { describe, it, expect } from "vitest";
import {
  colorDepth, durability, applyEase, drySpeed,
  finishCost, protective, antique, chemBase,
  bestUse, patinaFinishs,
} from "../patina-finish-calc.js";

describe("colorDepth", () => {
  it("black patina dark deepest color", () => {
    expect(colorDepth("black_patina_dark")).toBeGreaterThan(colorDepth("clear_wax_protect"));
  });
});

describe("durability", () => {
  it("clear wax protect most durable", () => {
    expect(durability("clear_wax_protect")).toBeGreaterThan(durability("green_patina_antique"));
  });
});

describe("applyEase", () => {
  it("clear wax protect easiest apply", () => {
    expect(applyEase("clear_wax_protect")).toBeGreaterThan(applyEase("green_patina_antique"));
  });
});

describe("drySpeed", () => {
  it("clear wax protect fastest dry", () => {
    expect(drySpeed("clear_wax_protect")).toBeGreaterThan(drySpeed("green_patina_antique"));
  });
});

describe("finishCost", () => {
  it("green patina antique most expensive", () => {
    expect(finishCost("green_patina_antique")).toBeGreaterThan(finishCost("clear_wax_protect"));
  });
});

describe("protective", () => {
  it("clear wax protect is protective", () => {
    expect(protective("clear_wax_protect")).toBe(true);
  });
  it("black patina dark not protective", () => {
    expect(protective("black_patina_dark")).toBe(false);
  });
});

describe("antique", () => {
  it("green patina antique is antique", () => {
    expect(antique("green_patina_antique")).toBe(true);
  });
  it("black patina dark not antique", () => {
    expect(antique("black_patina_dark")).toBe(false);
  });
});

describe("chemBase", () => {
  it("copper patina warm uses copper sulfate solution", () => {
    expect(chemBase("copper_patina_warm")).toBe("copper_sulfate_solution");
  });
});

describe("bestUse", () => {
  it("black patina dark best for dark solder line finish", () => {
    expect(bestUse("black_patina_dark")).toBe("dark_solder_line_finish");
  });
});

describe("patinaFinishs", () => {
  it("returns 5 types", () => {
    expect(patinaFinishs()).toHaveLength(5);
  });
});
