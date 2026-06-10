import { describe, it, expect } from "vitest";
import {
  cutCleanness, oneHandUse, tapeWidth, portability,
  dispenserCost, nonSlipBase, autoAdvance, bladeType,
  bestUse, tapeDispensers,
} from "../tape-dispenser-calc.js";

describe("cutCleanness", () => {
  it("automatic cut cleanest cut", () => {
    expect(cutCleanness("automatic_cut")).toBeGreaterThan(cutCleanness("washi_multi_roll"));
  });
});

describe("oneHandUse", () => {
  it("automatic cut best one hand use", () => {
    expect(oneHandUse("automatic_cut")).toBeGreaterThan(oneHandUse("washi_multi_roll"));
  });
});

describe("tapeWidth", () => {
  it("packing tape gun widest tape", () => {
    expect(tapeWidth("packing_tape_gun")).toBeGreaterThan(tapeWidth("desktop_weighted"));
  });
});

describe("portability", () => {
  it("handheld gun most portable", () => {
    expect(portability("handheld_gun")).toBeGreaterThan(portability("desktop_weighted"));
  });
});

describe("dispenserCost", () => {
  it("automatic cut most expensive", () => {
    expect(dispenserCost("automatic_cut")).toBeGreaterThan(dispenserCost("handheld_gun"));
  });
});

describe("nonSlipBase", () => {
  it("desktop weighted has non slip base", () => {
    expect(nonSlipBase("desktop_weighted")).toBe(true);
  });
  it("handheld gun does not", () => {
    expect(nonSlipBase("handheld_gun")).toBe(false);
  });
});

describe("autoAdvance", () => {
  it("automatic cut auto advances", () => {
    expect(autoAdvance("automatic_cut")).toBe(true);
  });
  it("desktop weighted does not", () => {
    expect(autoAdvance("desktop_weighted")).toBe(false);
  });
});

describe("bladeType", () => {
  it("packing tape gun uses steel roller blade", () => {
    expect(bladeType("packing_tape_gun")).toBe("steel_roller_blade");
  });
});

describe("bestUse", () => {
  it("washi multi roll best for craft scrapbook decor", () => {
    expect(bestUse("washi_multi_roll")).toBe("craft_scrapbook_decor");
  });
});

describe("tapeDispensers", () => {
  it("returns 5 types", () => {
    expect(tapeDispensers()).toHaveLength(5);
  });
});
