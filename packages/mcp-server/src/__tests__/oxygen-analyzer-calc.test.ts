import { describe, it, expect } from "vitest";
import {
  accuracy, response, rangeSpan, maintenance,
  oaCost, inSitu, forCombustion, sensor,
  bestUse, oxygenAnalyzerTypes,
} from "../oxygen-analyzer-calc.js";

describe("accuracy", () => {
  it("paramagnetic most accurate", () => {
    expect(accuracy("paramagnetic_extract")).toBeGreaterThan(accuracy("electrochemical_galvanic"));
  });
});

describe("response", () => {
  it("tunable diode fastest response", () => {
    expect(response("tunable_diode_o2")).toBeGreaterThan(response("paramagnetic_extract"));
  });
});

describe("rangeSpan", () => {
  it("paramagnetic widest range", () => {
    expect(rangeSpan("paramagnetic_extract")).toBeGreaterThan(rangeSpan("electrochemical_galvanic"));
  });
});

describe("maintenance", () => {
  it("tunable diode lowest maintenance", () => {
    expect(maintenance("tunable_diode_o2")).toBeGreaterThan(maintenance("zirconia_probe_insitu"));
  });
});

describe("oaCost", () => {
  it("tunable diode most expensive", () => {
    expect(oaCost("tunable_diode_o2")).toBeGreaterThan(oaCost("electrochemical_galvanic"));
  });
});

describe("inSitu", () => {
  it("zirconia probe is in situ", () => {
    expect(inSitu("zirconia_probe_insitu")).toBe(true);
  });
  it("paramagnetic not in situ", () => {
    expect(inSitu("paramagnetic_extract")).toBe(false);
  });
});

describe("forCombustion", () => {
  it("zirconia for combustion", () => {
    expect(forCombustion("zirconia_probe_insitu")).toBe(true);
  });
  it("electrochemical not for combustion", () => {
    expect(forCombustion("electrochemical_galvanic")).toBe(false);
  });
});

describe("sensor", () => {
  it("paramagnetic uses dumbbell", () => {
    expect(sensor("paramagnetic_extract")).toBe("paramagnetic_susceptibility_dumbbell");
  });
});

describe("bestUse", () => {
  it("electrochemical for portable safety", () => {
    expect(bestUse("electrochemical_galvanic")).toBe("portable_safety_confined_space_entry");
  });
});

describe("oxygenAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(oxygenAnalyzerTypes()).toHaveLength(5);
  });
});
