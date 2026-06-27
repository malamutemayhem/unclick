import { describe, it, expect } from "vitest";
import {
  heatOutputBtu, flavorIntensity, sweetnessRating,
  burnDurationHours, sparkResistance, bestForMeat,
  smokeColor, ashContent, costPerKg, smokingWoods,
} from "../smoking-wood-calc.js";

describe("heatOutputBtu", () => {
  it("mesquite has highest heat", () => {
    expect(heatOutputBtu("mesquite")).toBeGreaterThan(
      heatOutputBtu("cherry")
    );
  });
});

describe("flavorIntensity", () => {
  it("mesquite is most intense", () => {
    expect(flavorIntensity("mesquite")).toBeGreaterThan(
      flavorIntensity("apple")
    );
  });
});

describe("sweetnessRating", () => {
  it("cherry is sweetest", () => {
    expect(sweetnessRating("cherry")).toBeGreaterThan(
      sweetnessRating("mesquite")
    );
  });
});

describe("burnDurationHours", () => {
  it("oak burns longest", () => {
    expect(burnDurationHours("oak")).toBeGreaterThan(
      burnDurationHours("mesquite")
    );
  });
});

describe("sparkResistance", () => {
  it("cherry resists sparks best", () => {
    expect(sparkResistance("cherry")).toBeGreaterThan(
      sparkResistance("mesquite")
    );
  });
});

describe("bestForMeat", () => {
  it("hickory is best for pork", () => {
    expect(bestForMeat("hickory")).toBe("pork");
  });
});

describe("smokeColor", () => {
  it("apple produces light gold smoke", () => {
    expect(smokeColor("apple")).toBe("light_gold");
  });
});

describe("ashContent", () => {
  it("oak produces most ash", () => {
    expect(ashContent("oak")).toBeGreaterThan(
      ashContent("mesquite")
    );
  });
});

describe("costPerKg", () => {
  it("cherry costs most", () => {
    expect(costPerKg("cherry")).toBeGreaterThan(
      costPerKg("oak")
    );
  });
});

describe("smokingWoods", () => {
  it("returns 5 woods", () => {
    expect(smokingWoods()).toHaveLength(5);
  });
});
