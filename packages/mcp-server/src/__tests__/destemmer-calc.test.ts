import { describe, it, expect } from "vitest";
import {
  stemRemoval, berryDamage, throughput, sortAccuracy,
  dsCost, automated, forPremium, destemmerConfig,
  bestUse, destemmerTypes,
} from "../destemmer-calc.js";

describe("stemRemoval", () => {
  it("centrifugal destem best stem removal", () => {
    expect(stemRemoval("centrifugal_destem")).toBeGreaterThan(stemRemoval("manual_table"));
  });
});

describe("berryDamage", () => {
  it("manual table least berry damage", () => {
    expect(berryDamage("manual_table")).toBeGreaterThan(berryDamage("centrifugal_destem"));
  });
});

describe("throughput", () => {
  it("centrifugal destem highest throughput", () => {
    expect(throughput("centrifugal_destem")).toBeGreaterThan(throughput("manual_table"));
  });
});

describe("sortAccuracy", () => {
  it("optical sort best sort accuracy", () => {
    expect(sortAccuracy("optical_sort")).toBeGreaterThan(sortAccuracy("rotary_cage"));
  });
});

describe("dsCost", () => {
  it("optical sort most expensive", () => {
    expect(dsCost("optical_sort")).toBeGreaterThan(dsCost("manual_table"));
  });
});

describe("automated", () => {
  it("rotary cage is automated", () => {
    expect(automated("rotary_cage")).toBe(true);
  });
  it("manual table not automated", () => {
    expect(automated("manual_table")).toBe(false);
  });
});

describe("forPremium", () => {
  it("optical sort for premium", () => {
    expect(forPremium("optical_sort")).toBe(true);
  });
  it("rotary cage not for premium", () => {
    expect(forPremium("rotary_cage")).toBe(false);
  });
});

describe("destemmerConfig", () => {
  it("optical sort uses camera nir air jet", () => {
    expect(destemmerConfig("optical_sort")).toBe("optical_sort_destemmer_camera_nir_air_jet_mog_reject_berry_select");
  });
});

describe("bestUse", () => {
  it("manual table for boutique winery", () => {
    expect(bestUse("manual_table")).toBe("boutique_winery_manual_sorting_table_hand_select_perfect_cluster");
  });
});

describe("destemmerTypes", () => {
  it("returns 5 types", () => {
    expect(destemmerTypes()).toHaveLength(5);
  });
});
