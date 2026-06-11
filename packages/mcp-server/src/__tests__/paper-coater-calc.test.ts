import { describe, it, expect } from "vitest";
import {
  coatUniformity, throughput, coatWeight, surfaceFinish,
  pcCost, contactless, forGlossy, coaterConfig,
  bestUse, paperCoaterTypes,
} from "../paper-coater-calc.js";

describe("coatUniformity", () => {
  it("curtain coater best coat uniformity", () => {
    expect(coatUniformity("curtain_coater")).toBeGreaterThan(coatUniformity("size_press"));
  });
});

describe("throughput", () => {
  it("blade coater highest throughput", () => {
    expect(throughput("blade_coater")).toBeGreaterThanOrEqual(throughput("size_press"));
  });
});

describe("coatWeight", () => {
  it("curtain coater best coat weight", () => {
    expect(coatWeight("curtain_coater")).toBeGreaterThan(coatWeight("size_press"));
  });
});

describe("surfaceFinish", () => {
  it("curtain coater best surface finish", () => {
    expect(surfaceFinish("curtain_coater")).toBeGreaterThan(surfaceFinish("rod_coater"));
  });
});

describe("pcCost", () => {
  it("curtain coater most expensive", () => {
    expect(pcCost("curtain_coater")).toBeGreaterThan(pcCost("size_press"));
  });
});

describe("contactless", () => {
  it("curtain coater is contactless", () => {
    expect(contactless("curtain_coater")).toBe(true);
  });
  it("blade coater not contactless", () => {
    expect(contactless("blade_coater")).toBe(false);
  });
});

describe("forGlossy", () => {
  it("blade coater for glossy", () => {
    expect(forGlossy("blade_coater")).toBe(true);
  });
  it("rod coater not for glossy", () => {
    expect(forGlossy("rod_coater")).toBe(false);
  });
});

describe("coaterConfig", () => {
  it("air knife uses pressurized air jet meter excess", () => {
    expect(coaterConfig("air_knife")).toBe("air_knife_coater_paper_pressurized_air_jet_meter_excess_coat");
  });
});

describe("bestUse", () => {
  it("size press for uncoated paper surface starch", () => {
    expect(bestUse("size_press")).toBe("uncoated_paper_size_press_surface_starch_seal_improve_printability");
  });
});

describe("paperCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(paperCoaterTypes()).toHaveLength(5);
  });
});
