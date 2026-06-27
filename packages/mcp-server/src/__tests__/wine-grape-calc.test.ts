import { describe, it, expect } from "vitest";
import {
  tanninLevel, acidityLevel, bodyWeight,
  agingPotentialYears, idealServingTempC, red,
  aromaticVariety, bestRegion, foodPairing, wineGrapes,
} from "../wine-grape-calc.js";

describe("tanninLevel", () => {
  it("cabernet sauvignon has most tannin", () => {
    expect(tanninLevel("cabernet_sauvignon")).toBeGreaterThan(
      tanninLevel("chardonnay")
    );
  });
});

describe("acidityLevel", () => {
  it("riesling is most acidic", () => {
    expect(acidityLevel("riesling")).toBeGreaterThan(
      acidityLevel("merlot")
    );
  });
});

describe("bodyWeight", () => {
  it("cabernet sauvignon is heaviest body", () => {
    expect(bodyWeight("cabernet_sauvignon")).toBeGreaterThan(
      bodyWeight("riesling")
    );
  });
});

describe("agingPotentialYears", () => {
  it("cabernet sauvignon ages longest", () => {
    expect(agingPotentialYears("cabernet_sauvignon")).toBeGreaterThan(
      agingPotentialYears("merlot")
    );
  });
});

describe("idealServingTempC", () => {
  it("cabernet sauvignon served warmest", () => {
    expect(idealServingTempC("cabernet_sauvignon")).toBeGreaterThan(
      idealServingTempC("riesling")
    );
  });
});

describe("red", () => {
  it("cabernet sauvignon is red", () => {
    expect(red("cabernet_sauvignon")).toBe(true);
  });
  it("chardonnay is not", () => {
    expect(red("chardonnay")).toBe(false);
  });
});

describe("aromaticVariety", () => {
  it("riesling is aromatic", () => {
    expect(aromaticVariety("riesling")).toBe(true);
  });
  it("merlot is not", () => {
    expect(aromaticVariety("merlot")).toBe(false);
  });
});

describe("bestRegion", () => {
  it("riesling best in mosel", () => {
    expect(bestRegion("riesling")).toBe("mosel");
  });
});

describe("foodPairing", () => {
  it("chardonnay pairs with seafood", () => {
    expect(foodPairing("chardonnay")).toBe("seafood");
  });
});

describe("wineGrapes", () => {
  it("returns 5 types", () => {
    expect(wineGrapes()).toHaveLength(5);
  });
});
