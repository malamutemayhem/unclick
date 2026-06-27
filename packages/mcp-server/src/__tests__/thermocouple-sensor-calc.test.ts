import { describe, it, expect } from "vitest";
import {
  accuracy, tempRange, stability, response,
  tsCost, nobleMetl, forHighTemp, junction,
  bestUse, thermocoupleSensorTypes,
} from "../thermocouple-sensor-calc.js";

describe("accuracy", () => {
  it("type s most accurate", () => {
    expect(accuracy("type_s_platinum_rhodium")).toBeGreaterThan(accuracy("type_k_chromel_alumel"));
  });
});

describe("tempRange", () => {
  it("type s widest temp range", () => {
    expect(tempRange("type_s_platinum_rhodium")).toBeGreaterThan(tempRange("type_t_copper_constantan"));
  });
});

describe("stability", () => {
  it("type s most stable", () => {
    expect(stability("type_s_platinum_rhodium")).toBeGreaterThan(stability("type_j_iron_constantan"));
  });
});

describe("response", () => {
  it("type t fastest response", () => {
    expect(response("type_t_copper_constantan")).toBeGreaterThan(response("type_s_platinum_rhodium"));
  });
});

describe("tsCost", () => {
  it("type s most expensive", () => {
    expect(tsCost("type_s_platinum_rhodium")).toBeGreaterThan(tsCost("type_j_iron_constantan"));
  });
});

describe("nobleMetl", () => {
  it("type s is noble metal", () => {
    expect(nobleMetl("type_s_platinum_rhodium")).toBe(true);
  });
  it("type k not noble metal", () => {
    expect(nobleMetl("type_k_chromel_alumel")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("type s for high temp", () => {
    expect(forHighTemp("type_s_platinum_rhodium")).toBe(true);
  });
  it("type t not for high temp", () => {
    expect(forHighTemp("type_t_copper_constantan")).toBe(false);
  });
});

describe("junction", () => {
  it("type n uses nicrosil nisil", () => {
    expect(junction("type_n_nicrosil_nisil")).toBe("nicrosil_nisil_improved_k_type_stable");
  });
});

describe("bestUse", () => {
  it("type t for food pharma cryogenic", () => {
    expect(bestUse("type_t_copper_constantan")).toBe("food_pharma_cryogenic_low_temp_precise");
  });
});

describe("thermocoupleSensorTypes", () => {
  it("returns 5 types", () => {
    expect(thermocoupleSensorTypes()).toHaveLength(5);
  });
});
