import { describe, it, expect } from "vitest";
import {
  frequencyInLanguages, articulationEffort, airflowRestriction,
  perceptualSalience, childAcquisitionOrder, voiced,
  continuant, exampleSound, articulationManner, phonemeTypes,
} from "../phoneme-type-calc.js";

describe("frequencyInLanguages", () => {
  it("plosives most frequent", () => {
    expect(frequencyInLanguages("plosive")).toBeGreaterThan(
      frequencyInLanguages("affricate")
    );
  });
});

describe("articulationEffort", () => {
  it("affricate most effort", () => {
    expect(articulationEffort("affricate")).toBeGreaterThan(
      articulationEffort("approximant")
    );
  });
});

describe("airflowRestriction", () => {
  it("plosive most restricted", () => {
    expect(airflowRestriction("plosive")).toBeGreaterThan(
      airflowRestriction("approximant")
    );
  });
});

describe("perceptualSalience", () => {
  it("plosive most salient", () => {
    expect(perceptualSalience("plosive")).toBeGreaterThan(
      perceptualSalience("approximant")
    );
  });
});

describe("childAcquisitionOrder", () => {
  it("plosive acquired first", () => {
    expect(childAcquisitionOrder("plosive")).toBeLessThan(
      childAcquisitionOrder("affricate")
    );
  });
});

describe("voiced", () => {
  it("nasal is voiced", () => {
    expect(voiced("nasal")).toBe(true);
  });
  it("plosive is not", () => {
    expect(voiced("plosive")).toBe(false);
  });
});

describe("continuant", () => {
  it("fricative is continuant", () => {
    expect(continuant("fricative")).toBe(true);
  });
  it("plosive is not", () => {
    expect(continuant("plosive")).toBe(false);
  });
});

describe("exampleSound", () => {
  it("nasal example is m", () => {
    expect(exampleSound("nasal")).toBe("m_as_in_mat");
  });
});

describe("articulationManner", () => {
  it("plosive is complete closure", () => {
    expect(articulationManner("plosive")).toBe("complete_closure");
  });
});

describe("phonemeTypes", () => {
  it("returns 5 types", () => {
    expect(phonemeTypes()).toHaveLength(5);
  });
});
