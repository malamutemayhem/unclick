import { describe, it, expect } from "vitest";
import {
  shelfLifeMonths, smokePtCelsius, flavorTransfer,
  oxygenBarrier, solidAtRoomTemp, dairyFree,
  bestPreservedFood, nutritionalValue, costPerLiter, oilPreserves,
} from "../oil-preserve-calc.js";

describe("shelfLifeMonths", () => {
  it("ghee lasts longest", () => {
    expect(shelfLifeMonths("ghee")).toBeGreaterThan(
      shelfLifeMonths("olive_oil")
    );
  });
});

describe("smokePtCelsius", () => {
  it("ghee has highest smoke point", () => {
    expect(smokePtCelsius("ghee")).toBeGreaterThan(
      smokePtCelsius("coconut_oil")
    );
  });
});

describe("flavorTransfer", () => {
  it("duck fat transfers most flavor", () => {
    expect(flavorTransfer("duck_fat")).toBeGreaterThan(
      flavorTransfer("lard")
    );
  });
});

describe("oxygenBarrier", () => {
  it("duck fat has best oxygen barrier", () => {
    expect(oxygenBarrier("duck_fat")).toBeGreaterThan(
      oxygenBarrier("olive_oil")
    );
  });
});

describe("solidAtRoomTemp", () => {
  it("duck fat is solid at room temp", () => {
    expect(solidAtRoomTemp("duck_fat")).toBe(true);
  });
  it("olive oil is not", () => {
    expect(solidAtRoomTemp("olive_oil")).toBe(false);
  });
});

describe("dairyFree", () => {
  it("olive oil is dairy free", () => {
    expect(dairyFree("olive_oil")).toBe(true);
  });
  it("ghee is not", () => {
    expect(dairyFree("ghee")).toBe(false);
  });
});

describe("bestPreservedFood", () => {
  it("duck fat best for confit", () => {
    expect(bestPreservedFood("duck_fat")).toBe("confit");
  });
});

describe("nutritionalValue", () => {
  it("olive oil is most nutritious", () => {
    expect(nutritionalValue("olive_oil")).toBeGreaterThan(
      nutritionalValue("lard")
    );
  });
});

describe("costPerLiter", () => {
  it("duck fat costs most", () => {
    expect(costPerLiter("duck_fat")).toBeGreaterThan(
      costPerLiter("lard")
    );
  });
});

describe("oilPreserves", () => {
  it("returns 5 oils", () => {
    expect(oilPreserves()).toHaveLength(5);
  });
});
