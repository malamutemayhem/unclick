import { describe, it, expect } from "vitest";
import {
  waterRetention, airPorosity, phStability, costPerLiter,
  reusability, biodegradable, requiresPreTreatment, composition,
  bestSystem, growMedia,
} from "../grow-medium-calc.js";

describe("waterRetention", () => {
  it("vermiculite highest water retention", () => {
    expect(waterRetention("vermiculite")).toBeGreaterThan(waterRetention("perlite"));
  });
});

describe("airPorosity", () => {
  it("perlite highest air porosity", () => {
    expect(airPorosity("perlite")).toBeGreaterThan(airPorosity("vermiculite"));
  });
});

describe("phStability", () => {
  it("clay pebbles most ph stable", () => {
    expect(phStability("clay_pebbles")).toBeGreaterThan(phStability("rockwool"));
  });
});

describe("costPerLiter", () => {
  it("clay pebbles most expensive", () => {
    expect(costPerLiter("clay_pebbles")).toBeGreaterThan(costPerLiter("perlite"));
  });
});

describe("reusability", () => {
  it("clay pebbles most reusable", () => {
    expect(reusability("clay_pebbles")).toBeGreaterThan(reusability("rockwool"));
  });
});

describe("biodegradable", () => {
  it("coco coir is biodegradable", () => {
    expect(biodegradable("coco_coir")).toBe(true);
  });
  it("rockwool is not", () => {
    expect(biodegradable("rockwool")).toBe(false);
  });
});

describe("requiresPreTreatment", () => {
  it("rockwool requires pre treatment", () => {
    expect(requiresPreTreatment("rockwool")).toBe(true);
  });
  it("perlite does not", () => {
    expect(requiresPreTreatment("perlite")).toBe(false);
  });
});

describe("composition", () => {
  it("coco coir is coconut husk fiber", () => {
    expect(composition("coco_coir")).toBe("coconut_husk_fiber");
  });
});

describe("bestSystem", () => {
  it("clay pebbles for dwc ebb flow reuse", () => {
    expect(bestSystem("clay_pebbles")).toBe("dwc_ebb_flow_reuse");
  });
});

describe("growMedia", () => {
  it("returns 5 media", () => {
    expect(growMedia()).toHaveLength(5);
  });
});
