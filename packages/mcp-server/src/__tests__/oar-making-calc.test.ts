import { describe, it, expect } from "vitest";
import {
  weightKgPerMeter, flexRating, durability,
  bladeAreaCm2, finishCoatsNeeded, waterResistance,
  carveability, grainBeauty, costPerBlank, oarWoods,
} from "../oar-making-calc.js";

describe("weightKgPerMeter", () => {
  it("ash is heaviest", () => {
    expect(weightKgPerMeter("ash")).toBeGreaterThan(
      weightKgPerMeter("cedar")
    );
  });
});

describe("flexRating", () => {
  it("ash is most flexible", () => {
    expect(flexRating("ash")).toBeGreaterThan(
      flexRating("basswood")
    );
  });
});

describe("durability", () => {
  it("ash is most durable", () => {
    expect(durability("ash")).toBeGreaterThan(
      durability("basswood")
    );
  });
});

describe("bladeAreaCm2", () => {
  it("ash has largest blade area", () => {
    expect(bladeAreaCm2("ash")).toBeGreaterThan(
      bladeAreaCm2("basswood")
    );
  });
});

describe("finishCoatsNeeded", () => {
  it("cedar needs most coats", () => {
    expect(finishCoatsNeeded("cedar")).toBeGreaterThan(
      finishCoatsNeeded("ash")
    );
  });
});

describe("waterResistance", () => {
  it("cedar resists water best", () => {
    expect(waterResistance("cedar")).toBeGreaterThan(
      waterResistance("basswood")
    );
  });
});

describe("carveability", () => {
  it("basswood carves easiest", () => {
    expect(carveability("basswood")).toBeGreaterThan(
      carveability("ash")
    );
  });
});

describe("grainBeauty", () => {
  it("cherry has most beautiful grain", () => {
    expect(grainBeauty("cherry")).toBeGreaterThan(
      grainBeauty("basswood")
    );
  });
});

describe("costPerBlank", () => {
  it("cherry is most expensive", () => {
    expect(costPerBlank("cherry")).toBeGreaterThan(
      costPerBlank("basswood")
    );
  });
});

describe("oarWoods", () => {
  it("returns 5 woods", () => {
    expect(oarWoods()).toHaveLength(5);
  });
});
