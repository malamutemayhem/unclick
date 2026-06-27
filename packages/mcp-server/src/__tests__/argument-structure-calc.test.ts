import { describe, it, expect } from "vitest";
import {
  conclusionCertainty, evidenceRequirement, creativePotential,
  scientificUse, everydayFrequency, truthPreserving,
  ampliative, classicExample, strengthMeasure, argumentStructures,
} from "../argument-structure-calc.js";

describe("conclusionCertainty", () => {
  it("deductive most certain", () => {
    expect(conclusionCertainty("deductive")).toBeGreaterThan(
      conclusionCertainty("analogical")
    );
  });
});

describe("evidenceRequirement", () => {
  it("inductive needs most evidence", () => {
    expect(evidenceRequirement("inductive")).toBeGreaterThan(
      evidenceRequirement("deductive")
    );
  });
});

describe("creativePotential", () => {
  it("abductive most creative", () => {
    expect(creativePotential("abductive")).toBeGreaterThan(
      creativePotential("deductive")
    );
  });
});

describe("scientificUse", () => {
  it("inductive most used in science", () => {
    expect(scientificUse("inductive")).toBeGreaterThan(
      scientificUse("analogical")
    );
  });
});

describe("everydayFrequency", () => {
  it("causal most used daily", () => {
    expect(everydayFrequency("causal")).toBeGreaterThan(
      everydayFrequency("deductive")
    );
  });
});

describe("truthPreserving", () => {
  it("deductive is truth preserving", () => {
    expect(truthPreserving("deductive")).toBe(true);
  });
  it("inductive is not", () => {
    expect(truthPreserving("inductive")).toBe(false);
  });
});

describe("ampliative", () => {
  it("inductive is ampliative", () => {
    expect(ampliative("inductive")).toBe(true);
  });
  it("deductive is not", () => {
    expect(ampliative("deductive")).toBe(false);
  });
});

describe("classicExample", () => {
  it("deductive example is all men are mortal", () => {
    expect(classicExample("deductive")).toBe("all_men_are_mortal");
  });
});

describe("strengthMeasure", () => {
  it("deductive measured by validity", () => {
    expect(strengthMeasure("deductive")).toBe("validity");
  });
});

describe("argumentStructures", () => {
  it("returns 5 structures", () => {
    expect(argumentStructures()).toHaveLength(5);
  });
});
