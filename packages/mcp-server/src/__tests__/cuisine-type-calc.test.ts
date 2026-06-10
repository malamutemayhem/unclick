import { describe, it, expect } from "vitest";
import {
  spiceIntensity, techniqueComplexity, ingredientDiversity,
  globalPopularity, vegetarianFriendly, emphasizesFreshness,
  riceBasedStaple, signatureDish, cookingPhilosophy, cuisineTypes,
} from "../cuisine-type-calc.js";

describe("spiceIntensity", () => {
  it("indian most spicy", () => {
    expect(spiceIntensity("indian")).toBeGreaterThan(
      spiceIntensity("japanese")
    );
  });
});

describe("techniqueComplexity", () => {
  it("french most complex technique", () => {
    expect(techniqueComplexity("french")).toBeGreaterThan(
      techniqueComplexity("mexican")
    );
  });
});

describe("ingredientDiversity", () => {
  it("indian most diverse ingredients", () => {
    expect(ingredientDiversity("indian")).toBeGreaterThan(
      ingredientDiversity("italian")
    );
  });
});

describe("globalPopularity", () => {
  it("italian most popular globally", () => {
    expect(globalPopularity("italian")).toBeGreaterThan(
      globalPopularity("french")
    );
  });
});

describe("vegetarianFriendly", () => {
  it("indian most vegetarian friendly", () => {
    expect(vegetarianFriendly("indian")).toBeGreaterThan(
      vegetarianFriendly("french")
    );
  });
});

describe("emphasizesFreshness", () => {
  it("japanese emphasizes freshness", () => {
    expect(emphasizesFreshness("japanese")).toBe(true);
  });
  it("indian does not", () => {
    expect(emphasizesFreshness("indian")).toBe(false);
  });
});

describe("riceBasedStaple", () => {
  it("japanese is rice based", () => {
    expect(riceBasedStaple("japanese")).toBe(true);
  });
  it("italian is not", () => {
    expect(riceBasedStaple("italian")).toBe(false);
  });
});

describe("signatureDish", () => {
  it("japanese signature is sushi", () => {
    expect(signatureDish("japanese")).toBe("sushi");
  });
});

describe("cookingPhilosophy", () => {
  it("italian about quality ingredients", () => {
    expect(cookingPhilosophy("italian")).toBe("quality_ingredients");
  });
});

describe("cuisineTypes", () => {
  it("returns 5 types", () => {
    expect(cuisineTypes()).toHaveLength(5);
  });
});
