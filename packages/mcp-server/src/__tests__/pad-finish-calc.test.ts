import { describe, it, expect } from "vitest";
import {
  solderability, shelfLife, flatness, contactResist,
  finishCost, leadFree, forFinePitch, platingMethod,
  bestUse, padFinishes,
} from "../pad-finish-calc.js";

describe("solderability", () => {
  it("hasl tin lead best solderability", () => {
    expect(solderability("hasl_tin_lead")).toBeGreaterThan(solderability("osp_organic_coat"));
  });
});

describe("shelfLife", () => {
  it("enig gold nickel longest shelf life", () => {
    expect(shelfLife("enig_gold_nickel")).toBeGreaterThan(shelfLife("osp_organic_coat"));
  });
});

describe("flatness", () => {
  it("enig gold nickel best flatness", () => {
    expect(flatness("enig_gold_nickel")).toBeGreaterThan(flatness("hasl_tin_lead"));
  });
});

describe("contactResist", () => {
  it("enig gold nickel best contact resistance", () => {
    expect(contactResist("enig_gold_nickel")).toBeGreaterThan(contactResist("osp_organic_coat"));
  });
});

describe("finishCost", () => {
  it("enig gold nickel most expensive", () => {
    expect(finishCost("enig_gold_nickel")).toBeGreaterThan(finishCost("osp_organic_coat"));
  });
});

describe("leadFree", () => {
  it("enig gold nickel is lead free", () => {
    expect(leadFree("enig_gold_nickel")).toBe(true);
  });
  it("hasl tin lead not lead free", () => {
    expect(leadFree("hasl_tin_lead")).toBe(false);
  });
});

describe("forFinePitch", () => {
  it("enig gold nickel is for fine pitch", () => {
    expect(forFinePitch("enig_gold_nickel")).toBe(true);
  });
  it("hasl tin lead not for fine pitch", () => {
    expect(forFinePitch("hasl_tin_lead")).toBe(false);
  });
});

describe("platingMethod", () => {
  it("immersion silver uses chemical silver deposit", () => {
    expect(platingMethod("immersion_silver")).toBe("chemical_silver_deposit");
  });
});

describe("bestUse", () => {
  it("osp organic coat best for cost sensitive smt board", () => {
    expect(bestUse("osp_organic_coat")).toBe("cost_sensitive_smt_board");
  });
});

describe("padFinishes", () => {
  it("returns 5 types", () => {
    expect(padFinishes()).toHaveLength(5);
  });
});
