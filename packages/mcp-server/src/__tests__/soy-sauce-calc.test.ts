import { describe, it, expect } from "vitest";
import {
  fermentationMonths, saltPercent, colorDarkness,
  umamiIntensity, wheatPercent, glutenFree,
  bestUse, viscosity, costPerLiter, soySauceTypes,
} from "../soy-sauce-calc.js";

describe("fermentationMonths", () => {
  it("saishikomi ferments longest", () => {
    expect(fermentationMonths("saishikomi")).toBeGreaterThan(
      fermentationMonths("koikuchi")
    );
  });
});

describe("saltPercent", () => {
  it("usukuchi is saltiest", () => {
    expect(saltPercent("usukuchi")).toBeGreaterThan(
      saltPercent("shiro")
    );
  });
});

describe("colorDarkness", () => {
  it("saishikomi is darkest", () => {
    expect(colorDarkness("saishikomi")).toBeGreaterThan(
      colorDarkness("koikuchi")
    );
  });
});

describe("umamiIntensity", () => {
  it("saishikomi has most umami", () => {
    expect(umamiIntensity("saishikomi")).toBeGreaterThan(
      umamiIntensity("koikuchi")
    );
  });
});

describe("wheatPercent", () => {
  it("shiro has most wheat", () => {
    expect(wheatPercent("shiro")).toBeGreaterThan(
      wheatPercent("tamari")
    );
  });
});

describe("glutenFree", () => {
  it("tamari is gluten free", () => {
    expect(glutenFree("tamari")).toBe(true);
  });
  it("koikuchi is not", () => {
    expect(glutenFree("koikuchi")).toBe(false);
  });
});

describe("bestUse", () => {
  it("koikuchi is general purpose", () => {
    expect(bestUse("koikuchi")).toBe("general_purpose");
  });
});

describe("viscosity", () => {
  it("tamari is most viscous", () => {
    expect(viscosity("tamari")).toBeGreaterThan(
      viscosity("shiro")
    );
  });
});

describe("costPerLiter", () => {
  it("saishikomi is most expensive", () => {
    expect(costPerLiter("saishikomi")).toBeGreaterThan(
      costPerLiter("koikuchi")
    );
  });
});

describe("soySauceTypes", () => {
  it("returns 5 types", () => {
    expect(soySauceTypes()).toHaveLength(5);
  });
});
