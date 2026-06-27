import { describe, it, expect } from "vitest";
import {
  shelfLifeMonths, nutrientRetention, energyCost,
  flavorChange, textureChange, requiresRefrigeration,
  killsPathogens, bestSuitedFood, mechanism, preservationMethods,
} from "../preservation-method-calc.js";

describe("shelfLifeMonths", () => {
  it("canning longest shelf life", () => {
    expect(shelfLifeMonths("canning")).toBeGreaterThan(
      shelfLifeMonths("freezing")
    );
  });
});

describe("nutrientRetention", () => {
  it("freezing retains most nutrients", () => {
    expect(nutrientRetention("freezing")).toBeGreaterThan(
      nutrientRetention("smoking")
    );
  });
});

describe("energyCost", () => {
  it("freezing highest energy cost", () => {
    expect(energyCost("freezing")).toBeGreaterThan(
      energyCost("pickling")
    );
  });
});

describe("flavorChange", () => {
  it("smoking changes flavor most", () => {
    expect(flavorChange("smoking")).toBeGreaterThan(
      flavorChange("freezing")
    );
  });
});

describe("textureChange", () => {
  it("dehydration changes texture most", () => {
    expect(textureChange("dehydration")).toBeGreaterThan(
      textureChange("freezing")
    );
  });
});

describe("requiresRefrigeration", () => {
  it("freezing requires refrigeration", () => {
    expect(requiresRefrigeration("freezing")).toBe(true);
  });
  it("canning does not", () => {
    expect(requiresRefrigeration("canning")).toBe(false);
  });
});

describe("killsPathogens", () => {
  it("canning kills pathogens", () => {
    expect(killsPathogens("canning")).toBe(true);
  });
  it("freezing does not", () => {
    expect(killsPathogens("freezing")).toBe(false);
  });
});

describe("bestSuitedFood", () => {
  it("smoking best for fish and meats", () => {
    expect(bestSuitedFood("smoking")).toBe("fish_meats");
  });
});

describe("mechanism", () => {
  it("pickling uses acid environment", () => {
    expect(mechanism("pickling")).toBe("acid_environment");
  });
});

describe("preservationMethods", () => {
  it("returns 5 methods", () => {
    expect(preservationMethods()).toHaveLength(5);
  });
});
