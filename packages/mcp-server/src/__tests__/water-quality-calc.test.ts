import { describe, it, expect } from "vitest";
import {
  parameters, accuracy, fieldUse, speed,
  wqCost, realtime, forDrinking, method,
  bestUse, waterQualityTypes,
} from "../water-quality-calc.js";

describe("parameters", () => {
  it("multiprobe measures most parameters", () => {
    expect(parameters("multiprobe_sonde_insitu")).toBeGreaterThan(parameters("turbidimeter_nephelometric"));
  });
});

describe("accuracy", () => {
  it("spectrophotometer most accurate", () => {
    expect(accuracy("spectrophotometer_lab_uv")).toBeGreaterThan(accuracy("bod_dissolved_oxygen"));
  });
});

describe("fieldUse", () => {
  it("multiprobe best field use", () => {
    expect(fieldUse("multiprobe_sonde_insitu")).toBeGreaterThan(fieldUse("spectrophotometer_lab_uv"));
  });
});

describe("speed", () => {
  it("turbidimeter fastest", () => {
    expect(speed("turbidimeter_nephelometric")).toBeGreaterThan(speed("bod_dissolved_oxygen"));
  });
});

describe("wqCost", () => {
  it("multiprobe most expensive", () => {
    expect(wqCost("multiprobe_sonde_insitu")).toBeGreaterThan(wqCost("ion_selective_electrode"));
  });
});

describe("realtime", () => {
  it("multiprobe is realtime", () => {
    expect(realtime("multiprobe_sonde_insitu")).toBe(true);
  });
  it("bod not realtime", () => {
    expect(realtime("bod_dissolved_oxygen")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("turbidimeter for drinking", () => {
    expect(forDrinking("turbidimeter_nephelometric")).toBe(true);
  });
  it("multiprobe not for drinking", () => {
    expect(forDrinking("multiprobe_sonde_insitu")).toBe(false);
  });
});

describe("method", () => {
  it("bod uses winkler titration", () => {
    expect(method("bod_dissolved_oxygen")).toBe("winkler_titration_5day_incub");
  });
});

describe("bestUse", () => {
  it("ion selective best for drinking water fluoride", () => {
    expect(bestUse("ion_selective_electrode")).toBe("drinking_water_fluoride_nitrate");
  });
});

describe("waterQualityTypes", () => {
  it("returns 5 types", () => {
    expect(waterQualityTypes()).toHaveLength(5);
  });
});
