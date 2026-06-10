import { describe, it, expect } from "vitest";
import {
  colorBright, washFast, easeOfUse, colorRange,
  dyeCost, coldProcess, forCellulose, dyeChemistry,
  bestMethod, fiberReacts,
} from "../fiber-react-calc.js";

describe("colorBright", () => {
  it("procion mx cold brightest color", () => {
    expect(colorBright("procion_mx_cold")).toBeGreaterThan(colorBright("drimarene_k_easy"));
  });
});

describe("washFast", () => {
  it("procion h steam best wash fastness", () => {
    expect(washFast("procion_h_steam")).toBeGreaterThan(washFast("drimarene_k_easy"));
  });
});

describe("easeOfUse", () => {
  it("procion mx cold easiest to use", () => {
    expect(easeOfUse("procion_mx_cold")).toBeGreaterThan(easeOfUse("procion_h_steam"));
  });
});

describe("colorRange", () => {
  it("procion mx cold widest color range", () => {
    expect(colorRange("procion_mx_cold")).toBeGreaterThan(colorRange("drimarene_k_easy"));
  });
});

describe("dyeCost", () => {
  it("procion h steam most expensive", () => {
    expect(dyeCost("procion_h_steam")).toBeGreaterThan(dyeCost("drimarene_k_easy"));
  });
});

describe("coldProcess", () => {
  it("procion mx cold is cold process", () => {
    expect(coldProcess("procion_mx_cold")).toBe(true);
  });
  it("remazol vinyl hot is not cold process", () => {
    expect(coldProcess("remazol_vinyl_hot")).toBe(false);
  });
});

describe("forCellulose", () => {
  it("procion mx cold is for cellulose", () => {
    expect(forCellulose("procion_mx_cold")).toBe(true);
  });
  it("procion h steam is for cellulose", () => {
    expect(forCellulose("procion_h_steam")).toBe(true);
  });
});

describe("dyeChemistry", () => {
  it("remazol vinyl hot uses vinyl sulfone bond", () => {
    expect(dyeChemistry("remazol_vinyl_hot")).toBe("vinyl_sulfone_bond");
  });
});

describe("bestMethod", () => {
  it("procion mx cold best for immersion tie dye", () => {
    expect(bestMethod("procion_mx_cold")).toBe("immersion_tie_dye");
  });
});

describe("fiberReacts", () => {
  it("returns 5 types", () => {
    expect(fiberReacts()).toHaveLength(5);
  });
});
