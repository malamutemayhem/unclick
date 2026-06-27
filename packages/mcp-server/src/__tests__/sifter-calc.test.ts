import { describe, it, expect } from "vitest";
import {
  separationAccuracy, throughput, meshRange, cleanability,
  sfCost, enclosed, forFlour, sifterConfig,
  bestUse, sifterTypes,
} from "../sifter-calc.js";

describe("separationAccuracy", () => {
  it("plansifter box best separation accuracy", () => {
    expect(separationAccuracy("plansifter_box")).toBeGreaterThan(separationAccuracy("rotary_drum"));
  });
});

describe("throughput", () => {
  it("centrifugal sifter highest throughput", () => {
    expect(throughput("centrifugal_sifter")).toBeGreaterThan(throughput("air_classifier"));
  });
});

describe("meshRange", () => {
  it("air classifier widest mesh range", () => {
    expect(meshRange("air_classifier")).toBeGreaterThan(meshRange("rotary_drum"));
  });
});

describe("cleanability", () => {
  it("centrifugal sifter best cleanability", () => {
    expect(cleanability("centrifugal_sifter")).toBeGreaterThan(cleanability("air_classifier"));
  });
});

describe("sfCost", () => {
  it("air classifier most expensive", () => {
    expect(sfCost("air_classifier")).toBeGreaterThan(sfCost("vibrating_screen"));
  });
});

describe("enclosed", () => {
  it("plansifter box is enclosed", () => {
    expect(enclosed("plansifter_box")).toBe(true);
  });
  it("vibrating screen not enclosed", () => {
    expect(enclosed("vibrating_screen")).toBe(false);
  });
});

describe("forFlour", () => {
  it("plansifter box for flour", () => {
    expect(forFlour("plansifter_box")).toBe(true);
  });
  it("vibrating screen not for flour", () => {
    expect(forFlour("vibrating_screen")).toBe(false);
  });
});

describe("sifterConfig", () => {
  it("rotary drum uses tumbling cylinder screen", () => {
    expect(sifterConfig("rotary_drum")).toBe("rotary_drum_sifter_tumbling_cylinder_screen_bulk_classify");
  });
});

describe("bestUse", () => {
  it("air classifier for ultrafine separation", () => {
    expect(bestUse("air_classifier")).toBe("specialty_flour_air_classifier_ultrafine_separation_starch_protein");
  });
});

describe("sifterTypes", () => {
  it("returns 5 types", () => {
    expect(sifterTypes()).toHaveLength(5);
  });
});
