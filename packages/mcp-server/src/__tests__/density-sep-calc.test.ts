import { describe, it, expect } from "vitest";
import {
  efficiency, throughput, selectivity, waterUse,
  dsCost, heavyMedia, forCoal, principle,
  bestUse, densitySepTypes,
} from "../density-sep-calc.js";

describe("efficiency", () => {
  it("dense media cyclone most efficient", () => {
    expect(efficiency("dense_media_cyclone")).toBeGreaterThan(efficiency("jig_pulsating_bed"));
  });
});

describe("throughput", () => {
  it("dense media drum highest throughput", () => {
    expect(throughput("dense_media_drum")).toBeGreaterThan(throughput("shaking_table_wilfley"));
  });
});

describe("selectivity", () => {
  it("dense media cyclone most selective", () => {
    expect(selectivity("dense_media_cyclone")).toBeGreaterThan(selectivity("jig_pulsating_bed"));
  });
});

describe("waterUse", () => {
  it("spiral concentrator highest water use", () => {
    expect(waterUse("spiral_concentrator")).toBeGreaterThan(waterUse("dense_media_drum"));
  });
});

describe("dsCost", () => {
  it("dense media cyclone most expensive", () => {
    expect(dsCost("dense_media_cyclone")).toBeGreaterThan(dsCost("spiral_concentrator"));
  });
});

describe("heavyMedia", () => {
  it("dense media drum uses heavy media", () => {
    expect(heavyMedia("dense_media_drum")).toBe(true);
  });
  it("jig pulsating no heavy media", () => {
    expect(heavyMedia("jig_pulsating_bed")).toBe(false);
  });
});

describe("forCoal", () => {
  it("jig pulsating for coal", () => {
    expect(forCoal("jig_pulsating_bed")).toBe(true);
  });
  it("shaking table not for coal", () => {
    expect(forCoal("shaking_table_wilfley")).toBe(false);
  });
});

describe("principle", () => {
  it("spiral uses centrifugal gravity trough", () => {
    expect(principle("spiral_concentrator")).toBe("spiral_trough_centrifugal_gravity");
  });
});

describe("bestUse", () => {
  it("shaking table for tin tungsten gold", () => {
    expect(bestUse("shaking_table_wilfley")).toBe("tin_tungsten_gold_fine_concentrate");
  });
});

describe("densitySepTypes", () => {
  it("returns 5 types", () => {
    expect(densitySepTypes()).toHaveLength(5);
  });
});
