import { describe, it, expect } from "vitest";
import {
  skillRequired, productionSpeed, wallUniformity,
  sizeRange, formFreedom, requiresWheel,
  suitableForMassProduction, typicalProduct, surfaceFinish, wheelTechniques,
} from "../wheel-technique-calc.js";

describe("skillRequired", () => {
  it("throwing needs most skill", () => {
    expect(skillRequired("throwing")).toBeGreaterThan(
      skillRequired("pinching")
    );
  });
});

describe("productionSpeed", () => {
  it("slip casting fastest", () => {
    expect(productionSpeed("slip_casting")).toBeGreaterThan(
      productionSpeed("pinching")
    );
  });
});

describe("wallUniformity", () => {
  it("slip casting most uniform walls", () => {
    expect(wallUniformity("slip_casting")).toBeGreaterThan(
      wallUniformity("pinching")
    );
  });
});

describe("sizeRange", () => {
  it("coiling widest size range", () => {
    expect(sizeRange("coiling")).toBeGreaterThan(
      sizeRange("pinching")
    );
  });
});

describe("formFreedom", () => {
  it("slab building most form freedom", () => {
    expect(formFreedom("slab_building")).toBeGreaterThan(
      formFreedom("throwing")
    );
  });
});

describe("requiresWheel", () => {
  it("throwing requires wheel", () => {
    expect(requiresWheel("throwing")).toBe(true);
  });
  it("coiling does not", () => {
    expect(requiresWheel("coiling")).toBe(false);
  });
});

describe("suitableForMassProduction", () => {
  it("slip casting suitable for mass production", () => {
    expect(suitableForMassProduction("slip_casting")).toBe(true);
  });
  it("throwing is not", () => {
    expect(suitableForMassProduction("throwing")).toBe(false);
  });
});

describe("typicalProduct", () => {
  it("coiling for large vessels", () => {
    expect(typicalProduct("coiling")).toBe("large_vessels");
  });
});

describe("surfaceFinish", () => {
  it("pinching has organic fingermarks", () => {
    expect(surfaceFinish("pinching")).toBe("organic_fingermarks");
  });
});

describe("wheelTechniques", () => {
  it("returns 5 techniques", () => {
    expect(wheelTechniques()).toHaveLength(5);
  });
});
