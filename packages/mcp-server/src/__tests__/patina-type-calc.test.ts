import { describe, it, expect } from "vitest";
import {
  developmentYears, protectiveQuality, aestheticValue,
  colorRichness, reversibility, desirable,
  naturalProcess, baseMetal, preservationDifficulty, patinaTypes,
} from "../patina-type-calc.js";

describe("developmentYears", () => {
  it("wabi sabi takes longest", () => {
    expect(developmentYears("wabi_sabi")).toBeGreaterThan(
      developmentYears("rust")
    );
  });
});

describe("protectiveQuality", () => {
  it("verdigris is most protective", () => {
    expect(protectiveQuality("verdigris")).toBeGreaterThan(
      protectiveQuality("rust")
    );
  });
});

describe("aestheticValue", () => {
  it("wabi sabi is most valued", () => {
    expect(aestheticValue("wabi_sabi")).toBeGreaterThan(
      aestheticValue("rust")
    );
  });
});

describe("colorRichness", () => {
  it("verdigris has richest color", () => {
    expect(colorRichness("verdigris")).toBeGreaterThan(
      colorRichness("tarnish")
    );
  });
});

describe("reversibility", () => {
  it("tarnish is most reversible", () => {
    expect(reversibility("tarnish")).toBeGreaterThan(
      reversibility("wabi_sabi")
    );
  });
});

describe("desirable", () => {
  it("verdigris is desirable", () => {
    expect(desirable("verdigris")).toBe(true);
  });
  it("rust is not desirable", () => {
    expect(desirable("rust")).toBe(false);
  });
});

describe("naturalProcess", () => {
  it("verdigris is natural", () => {
    expect(naturalProcess("verdigris")).toBe(true);
  });
  it("forced is not natural", () => {
    expect(naturalProcess("forced")).toBe(false);
  });
});

describe("baseMetal", () => {
  it("verdigris on copper", () => {
    expect(baseMetal("verdigris")).toBe("copper");
  });
});

describe("preservationDifficulty", () => {
  it("rust is hardest to preserve", () => {
    expect(preservationDifficulty("rust")).toBeGreaterThan(
      preservationDifficulty("wabi_sabi")
    );
  });
});

describe("patinaTypes", () => {
  it("returns 5 types", () => {
    expect(patinaTypes()).toHaveLength(5);
  });
});
