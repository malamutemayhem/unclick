import { describe, it, expect } from "vitest";
import {
  voicingContrast, airflowRestriction, durationMs,
  crossLinguisticUse, perceptualSalience, completeBlockage,
  nasalAirflow, englishExample, articulationMechanism, consonantTypes,
} from "../consonant-type-calc.js";

describe("voicingContrast", () => {
  it("plosive strongest voicing contrast", () => {
    expect(voicingContrast("plosive")).toBeGreaterThan(
      voicingContrast("nasal")
    );
  });
});

describe("airflowRestriction", () => {
  it("plosive most restricted", () => {
    expect(airflowRestriction("plosive")).toBeGreaterThan(
      airflowRestriction("lateral")
    );
  });
});

describe("durationMs", () => {
  it("affricate longest duration", () => {
    expect(durationMs("affricate")).toBeGreaterThan(
      durationMs("plosive")
    );
  });
});

describe("crossLinguisticUse", () => {
  it("plosive universally used", () => {
    expect(crossLinguisticUse("plosive")).toBeGreaterThan(
      crossLinguisticUse("affricate")
    );
  });
});

describe("perceptualSalience", () => {
  it("plosive most salient", () => {
    expect(perceptualSalience("plosive")).toBeGreaterThan(
      perceptualSalience("lateral")
    );
  });
});

describe("completeBlockage", () => {
  it("plosive has complete blockage", () => {
    expect(completeBlockage("plosive")).toBe(true);
  });
  it("fricative does not", () => {
    expect(completeBlockage("fricative")).toBe(false);
  });
});

describe("nasalAirflow", () => {
  it("nasal has nasal airflow", () => {
    expect(nasalAirflow("nasal")).toBe(true);
  });
  it("plosive does not", () => {
    expect(nasalAirflow("plosive")).toBe(false);
  });
});

describe("englishExample", () => {
  it("nasal includes m n ng", () => {
    expect(englishExample("nasal")).toBe("m_n_ng");
  });
});

describe("articulationMechanism", () => {
  it("affricate is stop plus fricative", () => {
    expect(articulationMechanism("affricate")).toBe("stop_plus_fricative");
  });
});

describe("consonantTypes", () => {
  it("returns 5 types", () => {
    expect(consonantTypes()).toHaveLength(5);
  });
});
