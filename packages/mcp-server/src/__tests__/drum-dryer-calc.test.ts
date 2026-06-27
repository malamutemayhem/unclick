import { describe, it, expect } from "vitest";
import {
  evapRate, filmControl, heatEfficiency, versatility,
  ddCost, continuous, forPaste, feed,
  bestUse, drumDryerTypes,
} from "../drum-dryer-calc.js";

describe("evapRate", () => {
  it("internally heated rotary highest evap rate", () => {
    expect(evapRate("internally_heated_rotary")).toBeGreaterThan(evapRate("vacuum_drum_low_temp"));
  });
});

describe("filmControl", () => {
  it("double drum best film control", () => {
    expect(filmControl("double_drum_nip_feed")).toBeGreaterThan(filmControl("internally_heated_rotary"));
  });
});

describe("heatEfficiency", () => {
  it("internally heated rotary most efficient", () => {
    expect(heatEfficiency("internally_heated_rotary")).toBeGreaterThan(heatEfficiency("vacuum_drum_low_temp"));
  });
});

describe("versatility", () => {
  it("internally heated rotary most versatile", () => {
    expect(versatility("internally_heated_rotary")).toBeGreaterThan(versatility("vacuum_drum_low_temp"));
  });
});

describe("ddCost", () => {
  it("vacuum drum most expensive", () => {
    expect(ddCost("vacuum_drum_low_temp")).toBeGreaterThan(ddCost("single_drum_atmospheric"));
  });
});

describe("continuous", () => {
  it("all drum dryers are continuous", () => {
    expect(continuous("single_drum_atmospheric")).toBe(true);
    expect(continuous("double_drum_nip_feed")).toBe(true);
  });
});

describe("forPaste", () => {
  it("double drum for paste", () => {
    expect(forPaste("double_drum_nip_feed")).toBe(true);
  });
  it("twin drum splash not for paste", () => {
    expect(forPaste("twin_drum_splash_feed")).toBe(false);
  });
});

describe("feed", () => {
  it("double drum uses nip gap", () => {
    expect(feed("double_drum_nip_feed")).toBe("nip_gap_metered_both_drums");
  });
});

describe("bestUse", () => {
  it("vacuum drum for heat sensitive pharma", () => {
    expect(bestUse("vacuum_drum_low_temp")).toBe("heat_sensitive_pharma_enzyme_dry");
  });
});

describe("drumDryerTypes", () => {
  it("returns 5 types", () => {
    expect(drumDryerTypes()).toHaveLength(5);
  });
});
