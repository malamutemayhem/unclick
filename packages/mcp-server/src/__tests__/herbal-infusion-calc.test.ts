import { describe, it, expect } from "vitest";
import {
  steepMinutes, extractionStrength, bitterness,
  nutrientRetention, shelfLifeHours, heatRequired,
  bestPlantPart, equipmentNeeded, costPerServing, herbalInfusions,
} from "../herbal-infusion-calc.js";

describe("steepMinutes", () => {
  it("cold brew steeps longest", () => {
    expect(steepMinutes("cold_brew")).toBeGreaterThan(
      steepMinutes("hot_water")
    );
  });
});

describe("extractionStrength", () => {
  it("decoction extracts strongest", () => {
    expect(extractionStrength("decoction")).toBeGreaterThan(
      extractionStrength("sun_tea")
    );
  });
});

describe("bitterness", () => {
  it("decoction is most bitter", () => {
    expect(bitterness("decoction")).toBeGreaterThan(
      bitterness("cold_brew")
    );
  });
});

describe("nutrientRetention", () => {
  it("cold brew retains most nutrients", () => {
    expect(nutrientRetention("cold_brew")).toBeGreaterThan(
      nutrientRetention("decoction")
    );
  });
});

describe("shelfLifeHours", () => {
  it("decoction lasts longest", () => {
    expect(shelfLifeHours("decoction")).toBeGreaterThan(
      shelfLifeHours("sun_tea")
    );
  });
});

describe("heatRequired", () => {
  it("decoction requires heat", () => {
    expect(heatRequired("decoction")).toBe(true);
  });
  it("cold brew does not", () => {
    expect(heatRequired("cold_brew")).toBe(false);
  });
});

describe("bestPlantPart", () => {
  it("decoction best for roots and bark", () => {
    expect(bestPlantPart("decoction")).toBe("roots_bark");
  });
});

describe("equipmentNeeded", () => {
  it("decoction needs most equipment", () => {
    expect(equipmentNeeded("decoction")).toBeGreaterThan(
      equipmentNeeded("sun_tea")
    );
  });
});

describe("costPerServing", () => {
  it("double infusion costs most", () => {
    expect(costPerServing("double_infusion")).toBeGreaterThan(
      costPerServing("sun_tea")
    );
  });
});

describe("herbalInfusions", () => {
  it("returns 5 methods", () => {
    expect(herbalInfusions()).toHaveLength(5);
  });
});
