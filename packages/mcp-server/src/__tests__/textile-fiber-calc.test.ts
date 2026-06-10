import { describe, it, expect } from "vitest";
import {
  breathability, moistureWicking, tensileStrength,
  costPerKg, dyeAbsorption, naturalFiber,
  animalOrigin, primaryUse, careMethod, textileFibers,
} from "../textile-fiber-calc.js";

describe("breathability", () => {
  it("linen most breathable", () => {
    expect(breathability("linen")).toBeGreaterThan(
      breathability("polyester")
    );
  });
});

describe("moistureWicking", () => {
  it("wool best wicking", () => {
    expect(moistureWicking("wool")).toBeGreaterThan(
      moistureWicking("cotton")
    );
  });
});

describe("tensileStrength", () => {
  it("polyester strongest", () => {
    expect(tensileStrength("polyester")).toBeGreaterThan(
      tensileStrength("wool")
    );
  });
});

describe("costPerKg", () => {
  it("silk most expensive", () => {
    expect(costPerKg("silk")).toBeGreaterThan(
      costPerKg("polyester")
    );
  });
});

describe("dyeAbsorption", () => {
  it("silk absorbs dye best", () => {
    expect(dyeAbsorption("silk")).toBeGreaterThan(
      dyeAbsorption("polyester")
    );
  });
});

describe("naturalFiber", () => {
  it("cotton is natural", () => {
    expect(naturalFiber("cotton")).toBe(true);
  });
  it("polyester is not", () => {
    expect(naturalFiber("polyester")).toBe(false);
  });
});

describe("animalOrigin", () => {
  it("wool is animal origin", () => {
    expect(animalOrigin("wool")).toBe(true);
  });
  it("cotton is not", () => {
    expect(animalOrigin("cotton")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("polyester for activewear", () => {
    expect(primaryUse("polyester")).toBe("activewear");
  });
});

describe("careMethod", () => {
  it("silk requires dry clean or hand wash", () => {
    expect(careMethod("silk")).toBe("dry_clean_hand_wash");
  });
});

describe("textileFibers", () => {
  it("returns 5 fibers", () => {
    expect(textileFibers()).toHaveLength(5);
  });
});
