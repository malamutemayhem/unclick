import { describe, it, expect } from "vitest";
import {
  insulationRating, stretchAbility, adhesionStrength, temperatureRange,
  tapeCost, selfFusing, moistureBarrier, backingMaterial,
  bestApplication, electricalTapes,
} from "../electrical-tape-calc.js";

describe("insulationRating", () => {
  it("kapton high temp best insulation", () => {
    expect(insulationRating("kapton_high_temp")).toBeGreaterThan(insulationRating("cloth_friction_harness"));
  });
});

describe("stretchAbility", () => {
  it("rubber splicing self most stretch", () => {
    expect(stretchAbility("rubber_splicing_self")).toBeGreaterThan(stretchAbility("kapton_high_temp"));
  });
});

describe("adhesionStrength", () => {
  it("mastic moisture seal strongest adhesion", () => {
    expect(adhesionStrength("mastic_moisture_seal")).toBeGreaterThan(adhesionStrength("kapton_high_temp"));
  });
});

describe("temperatureRange", () => {
  it("kapton high temp widest temperature range", () => {
    expect(temperatureRange("kapton_high_temp")).toBeGreaterThan(temperatureRange("vinyl_general_purpose"));
  });
});

describe("tapeCost", () => {
  it("kapton high temp most expensive", () => {
    expect(tapeCost("kapton_high_temp")).toBeGreaterThan(tapeCost("vinyl_general_purpose"));
  });
});

describe("selfFusing", () => {
  it("rubber splicing self is self fusing", () => {
    expect(selfFusing("rubber_splicing_self")).toBe(true);
  });
  it("vinyl general purpose is not", () => {
    expect(selfFusing("vinyl_general_purpose")).toBe(false);
  });
});

describe("moistureBarrier", () => {
  it("mastic moisture seal is moisture barrier", () => {
    expect(moistureBarrier("mastic_moisture_seal")).toBe(true);
  });
  it("vinyl general purpose is not", () => {
    expect(moistureBarrier("vinyl_general_purpose")).toBe(false);
  });
});

describe("backingMaterial", () => {
  it("kapton high temp uses polyimide film amber", () => {
    expect(backingMaterial("kapton_high_temp")).toBe("polyimide_film_amber");
  });
});

describe("bestApplication", () => {
  it("rubber splicing self best for cable splice repair", () => {
    expect(bestApplication("rubber_splicing_self")).toBe("cable_splice_repair");
  });
});

describe("electricalTapes", () => {
  it("returns 5 types", () => {
    expect(electricalTapes()).toHaveLength(5);
  });
});
