import { describe, it, expect } from "vitest";
import {
  sensitivity, responseSpeed, spectralRange, linearity,
  sensorCost, analog, forLowLight, sensingElement,
  bestUse, photoresistors,
} from "../photoresistor-calc.js";

describe("sensitivity", () => {
  it("photodiode precision most sensitive", () => {
    expect(sensitivity("photodiode_precision")).toBeGreaterThan(sensitivity("cds_cell_standard"));
  });
});

describe("responseSpeed", () => {
  it("photodiode precision fastest response", () => {
    expect(responseSpeed("photodiode_precision")).toBeGreaterThan(responseSpeed("cds_cell_standard"));
  });
});

describe("spectralRange", () => {
  it("uv sensor broadband widest spectral range", () => {
    expect(spectralRange("uv_sensor_broadband")).toBeGreaterThan(spectralRange("phototransistor_fast"));
  });
});

describe("linearity", () => {
  it("ambient light ic best linearity", () => {
    expect(linearity("ambient_light_ic")).toBeGreaterThan(linearity("cds_cell_standard"));
  });
});

describe("sensorCost", () => {
  it("uv sensor broadband most expensive", () => {
    expect(sensorCost("uv_sensor_broadband")).toBeGreaterThan(sensorCost("cds_cell_standard"));
  });
});

describe("analog", () => {
  it("cds cell standard is analog", () => {
    expect(analog("cds_cell_standard")).toBe(true);
  });
  it("ambient light ic not analog", () => {
    expect(analog("ambient_light_ic")).toBe(false);
  });
});

describe("forLowLight", () => {
  it("cds cell standard is for low light", () => {
    expect(forLowLight("cds_cell_standard")).toBe(true);
  });
  it("phototransistor fast not for low light", () => {
    expect(forLowLight("phototransistor_fast")).toBe(false);
  });
});

describe("sensingElement", () => {
  it("phototransistor fast uses npn phototransistor", () => {
    expect(sensingElement("phototransistor_fast")).toBe("npn_phototransistor");
  });
});

describe("bestUse", () => {
  it("ambient light ic best for display brightness auto", () => {
    expect(bestUse("ambient_light_ic")).toBe("display_brightness_auto");
  });
});

describe("photoresistors", () => {
  it("returns 5 types", () => {
    expect(photoresistors()).toHaveLength(5);
  });
});
