import { describe, it, expect } from "vitest";
import {
  range, accuracy, stability, response,
  tcCost, nobleMetal, forHigh, junction,
  bestUse, thermocoupleTypes,
} from "../thermocouple-type-calc.js";

describe("range", () => {
  it("type s widest range", () => {
    expect(range("type_s_platinum_rhodium")).toBeGreaterThan(range("type_t_copper_constantan"));
  });
});

describe("accuracy", () => {
  it("type e most accurate", () => {
    expect(accuracy("type_e_chromel_constantan")).toBeGreaterThan(accuracy("type_k_chromel_alumel"));
  });
});

describe("stability", () => {
  it("type s most stable", () => {
    expect(stability("type_s_platinum_rhodium")).toBeGreaterThan(stability("type_j_iron_constantan"));
  });
});

describe("response", () => {
  it("type e fastest response", () => {
    expect(response("type_e_chromel_constantan")).toBeGreaterThan(response("type_s_platinum_rhodium"));
  });
});

describe("tcCost", () => {
  it("type s most expensive", () => {
    expect(tcCost("type_s_platinum_rhodium")).toBeGreaterThan(tcCost("type_j_iron_constantan"));
  });
});

describe("nobleMetal", () => {
  it("type s is noble metal", () => {
    expect(nobleMetal("type_s_platinum_rhodium")).toBe(true);
  });
  it("type k not noble metal", () => {
    expect(nobleMetal("type_k_chromel_alumel")).toBe(false);
  });
});

describe("forHigh", () => {
  it("type k for high temp", () => {
    expect(forHigh("type_k_chromel_alumel")).toBe(true);
  });
  it("type t not for high temp", () => {
    expect(forHigh("type_t_copper_constantan")).toBe(false);
  });
});

describe("junction", () => {
  it("type t uses copper constantan", () => {
    expect(junction("type_t_copper_constantan")).toBe("copper_constantan_low_temp_pair");
  });
});

describe("bestUse", () => {
  it("type k for general industrial", () => {
    expect(bestUse("type_k_chromel_alumel")).toBe("general_industrial_kiln_exhaust_wide");
  });
});

describe("thermocoupleTypes", () => {
  it("returns 5 types", () => {
    expect(thermocoupleTypes()).toHaveLength(5);
  });
});
