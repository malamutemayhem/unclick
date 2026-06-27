import { describe, it, expect } from "vitest";
import {
  consolidation, throughput, conformability, voidReduction,
  vbCost, reusable, forAutoclave, baggingConfig,
  bestUse, vacuumBaggingTypes,
} from "../vacuum-bagging-calc.js";

describe("consolidation", () => {
  it("elastomeric tool best consolidation", () => {
    expect(consolidation("elastomeric_tool")).toBeGreaterThan(consolidation("nylon_bag"));
  });
});

describe("throughput", () => {
  it("silicone bag highest throughput", () => {
    expect(throughput("silicone_bag")).toBeGreaterThan(throughput("double_bag"));
  });
});

describe("conformability", () => {
  it("silicone bag best conformability", () => {
    expect(conformability("silicone_bag")).toBeGreaterThan(conformability("double_bag"));
  });
});

describe("voidReduction", () => {
  it("elastomeric tool best void reduction", () => {
    expect(voidReduction("elastomeric_tool")).toBeGreaterThan(voidReduction("nylon_bag"));
  });
});

describe("vbCost", () => {
  it("integrally heated most expensive", () => {
    expect(vbCost("integrally_heated")).toBeGreaterThan(vbCost("nylon_bag"));
  });
});

describe("reusable", () => {
  it("silicone bag is reusable", () => {
    expect(reusable("silicone_bag")).toBe(true);
  });
  it("nylon bag not reusable", () => {
    expect(reusable("nylon_bag")).toBe(false);
  });
});

describe("forAutoclave", () => {
  it("nylon bag for autoclave", () => {
    expect(forAutoclave("nylon_bag")).toBe(true);
  });
  it("double bag not for autoclave", () => {
    expect(forAutoclave("double_bag")).toBe(false);
  });
});

describe("baggingConfig", () => {
  it("integrally heated uses heater mat embed zone control", () => {
    expect(baggingConfig("integrally_heated")).toBe("integrally_heated_vacuum_bagging_heater_mat_embed_zone_control");
  });
});

describe("bestUse", () => {
  it("double bag for thick laminate volatile escape path", () => {
    expect(bestUse("double_bag")).toBe("thick_laminate_double_bag_vacuum_bagging_volatile_escape_path");
  });
});

describe("vacuumBaggingTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumBaggingTypes()).toHaveLength(5);
  });
});
