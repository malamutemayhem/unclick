import { describe, it, expect } from "vitest";
import {
  storageCapacity, organization, comfortCarry, styleAppeal,
  bagCost, insulatedPocket, changingPadIncluded, mainMaterial,
  bestParent, diaperBags,
} from "../diaper-bag-calc.js";

describe("storageCapacity", () => {
  it("backpack unisex largest capacity", () => {
    expect(storageCapacity("backpack_unisex")).toBeGreaterThan(storageCapacity("mini_clutch"));
  });
});

describe("organization", () => {
  it("convertible stroller best organization", () => {
    expect(organization("convertible_stroller")).toBeGreaterThan(organization("mini_clutch"));
  });
});

describe("comfortCarry", () => {
  it("backpack unisex most comfortable carry", () => {
    expect(comfortCarry("backpack_unisex")).toBeGreaterThan(comfortCarry("tote_fashion"));
  });
});

describe("styleAppeal", () => {
  it("tote fashion most stylish", () => {
    expect(styleAppeal("tote_fashion")).toBeGreaterThan(styleAppeal("convertible_stroller"));
  });
});

describe("bagCost", () => {
  it("tote fashion most expensive", () => {
    expect(bagCost("tote_fashion")).toBeGreaterThan(bagCost("mini_clutch"));
  });
});

describe("insulatedPocket", () => {
  it("backpack unisex has insulated pocket", () => {
    expect(insulatedPocket("backpack_unisex")).toBe(true);
  });
  it("mini clutch does not", () => {
    expect(insulatedPocket("mini_clutch")).toBe(false);
  });
});

describe("changingPadIncluded", () => {
  it("backpack unisex includes changing pad", () => {
    expect(changingPadIncluded("backpack_unisex")).toBe(true);
  });
  it("messenger crossbody does not", () => {
    expect(changingPadIncluded("messenger_crossbody")).toBe(false);
  });
});

describe("mainMaterial", () => {
  it("tote fashion uses vegan leather quilted", () => {
    expect(mainMaterial("tote_fashion")).toBe("vegan_leather_quilted");
  });
});

describe("bestParent", () => {
  it("backpack unisex for hands free active parent", () => {
    expect(bestParent("backpack_unisex")).toBe("hands_free_active_parent");
  });
});

describe("diaperBags", () => {
  it("returns 5 types", () => {
    expect(diaperBags()).toHaveLength(5);
  });
});
