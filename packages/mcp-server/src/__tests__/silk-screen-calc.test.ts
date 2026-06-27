import { describe, it, expect } from "vitest";
import {
  inkDeposit, printDetail, durability, tensionHold,
  screenCost, forPhoto, forTextile, meshMaterial,
  bestUse, silkScreens,
} from "../silk-screen-calc.js";

describe("inkDeposit", () => {
  it("mesh 43 heavy most ink deposit", () => {
    expect(inkDeposit("mesh_43_heavy")).toBeGreaterThan(inkDeposit("mesh_305_photo"));
  });
});

describe("printDetail", () => {
  it("mesh 305 photo most print detail", () => {
    expect(printDetail("mesh_305_photo")).toBeGreaterThan(printDetail("mesh_43_heavy"));
  });
});

describe("durability", () => {
  it("mesh 43 heavy most durable", () => {
    expect(durability("mesh_43_heavy")).toBeGreaterThan(durability("mesh_305_photo"));
  });
});

describe("tensionHold", () => {
  it("mesh 305 photo best tension hold", () => {
    expect(tensionHold("mesh_305_photo")).toBeGreaterThan(tensionHold("mesh_43_heavy"));
  });
});

describe("screenCost", () => {
  it("mesh 305 photo most expensive", () => {
    expect(screenCost("mesh_305_photo")).toBeGreaterThan(screenCost("mesh_110_general"));
  });
});

describe("forPhoto", () => {
  it("mesh 305 photo is for photo", () => {
    expect(forPhoto("mesh_305_photo")).toBe(true);
  });
  it("mesh 110 general not for photo", () => {
    expect(forPhoto("mesh_110_general")).toBe(false);
  });
});

describe("forTextile", () => {
  it("mesh 110 general is for textile", () => {
    expect(forTextile("mesh_110_general")).toBe(true);
  });
  it("mesh 305 photo not for textile", () => {
    expect(forTextile("mesh_305_photo")).toBe(false);
  });
});

describe("meshMaterial", () => {
  it("mesh 110 general uses polyester monofilament", () => {
    expect(meshMaterial("mesh_110_general")).toBe("polyester_monofilament");
  });
});

describe("bestUse", () => {
  it("mesh 43 heavy best for thick ink deposit", () => {
    expect(bestUse("mesh_43_heavy")).toBe("thick_ink_deposit");
  });
});

describe("silkScreens", () => {
  it("returns 5 types", () => {
    expect(silkScreens()).toHaveLength(5);
  });
});
