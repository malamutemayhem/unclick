import { describe, it, expect } from "vitest";
import {
  fermentationDays, tempCelsius, saltPercent,
  umamiLevel, enzymeActivity, grainSubstrate,
  alcoholic, shelfLifeMonths, costPerKg, kojiProducts,
} from "../koji-ferment-calc.js";

describe("fermentationDays", () => {
  it("soy sauce ferments longest", () => {
    expect(fermentationDays("soy_sauce")).toBeGreaterThan(
      fermentationDays("amazake")
    );
  });
});

describe("tempCelsius", () => {
  it("amazake needs highest temp", () => {
    expect(tempCelsius("amazake")).toBeGreaterThan(
      tempCelsius("sake")
    );
  });
});

describe("saltPercent", () => {
  it("soy sauce is saltiest", () => {
    expect(saltPercent("soy_sauce")).toBeGreaterThan(
      saltPercent("sake")
    );
  });
});

describe("umamiLevel", () => {
  it("soy sauce has most umami", () => {
    expect(umamiLevel("soy_sauce")).toBeGreaterThan(
      umamiLevel("amazake")
    );
  });
});

describe("enzymeActivity", () => {
  it("sake has highest enzyme activity", () => {
    expect(enzymeActivity("sake")).toBeGreaterThan(
      enzymeActivity("miso")
    );
  });
});

describe("grainSubstrate", () => {
  it("miso uses soybeans", () => {
    expect(grainSubstrate("miso")).toBe("soybeans");
  });
});

describe("alcoholic", () => {
  it("sake is alcoholic", () => {
    expect(alcoholic("sake")).toBe(true);
  });
  it("miso is not", () => {
    expect(alcoholic("miso")).toBe(false);
  });
});

describe("shelfLifeMonths", () => {
  it("soy sauce lasts longest", () => {
    expect(shelfLifeMonths("soy_sauce")).toBeGreaterThan(
      shelfLifeMonths("amazake")
    );
  });
});

describe("costPerKg", () => {
  it("sake costs most", () => {
    expect(costPerKg("sake")).toBeGreaterThan(
      costPerKg("amazake")
    );
  });
});

describe("kojiProducts", () => {
  it("returns 5 products", () => {
    expect(kojiProducts()).toHaveLength(5);
  });
});
