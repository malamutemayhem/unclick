import { describe, it, expect } from "vitest";
import {
  fermentationMonths, saltPercent, kojiRatio, sweetness,
  umami, colorDarkness, grainBase, bestForDish,
  costPerKg, misoTypes,
} from "../miso-calc.js";

describe("fermentationMonths", () => {
  it("hatcho ferments longest", () => {
    expect(fermentationMonths("hatcho")).toBeGreaterThan(
      fermentationMonths("white_shiro")
    );
  });
});

describe("saltPercent", () => {
  it("red aka is saltiest", () => {
    expect(saltPercent("red_aka")).toBeGreaterThan(
      saltPercent("white_shiro")
    );
  });
});

describe("kojiRatio", () => {
  it("white shiro has most koji", () => {
    expect(kojiRatio("white_shiro")).toBeGreaterThan(
      kojiRatio("hatcho")
    );
  });
});

describe("sweetness", () => {
  it("white shiro is sweetest", () => {
    expect(sweetness("white_shiro")).toBeGreaterThan(
      sweetness("hatcho")
    );
  });
});

describe("umami", () => {
  it("hatcho has most umami", () => {
    expect(umami("hatcho")).toBeGreaterThan(umami("white_shiro"));
  });
});

describe("colorDarkness", () => {
  it("hatcho is darkest", () => {
    expect(colorDarkness("hatcho")).toBeGreaterThan(
      colorDarkness("white_shiro")
    );
  });
});

describe("grainBase", () => {
  it("barley mugi uses barley", () => {
    expect(grainBase("barley_mugi")).toBe("barley");
  });
});

describe("bestForDish", () => {
  it("white shiro is best for dressing", () => {
    expect(bestForDish("white_shiro")).toBe("dressing");
  });
});

describe("costPerKg", () => {
  it("hatcho is most expensive", () => {
    expect(costPerKg("hatcho")).toBeGreaterThan(
      costPerKg("white_shiro")
    );
  });
});

describe("misoTypes", () => {
  it("returns 5 types", () => {
    expect(misoTypes()).toHaveLength(5);
  });
});
