import { describe, it, expect } from "vitest";
import {
  wrinkleRemoval, speedPerGarment, fabricSafety, portability,
  purchasePrice, requiresBoard, suitableForCommercial, heatMethod,
  bestGarment, ironingMethods,
} from "../ironing-method-calc.js";

describe("wrinkleRemoval", () => {
  it("steam press best wrinkle removal", () => {
    expect(wrinkleRemoval("steam_press")).toBeGreaterThan(wrinkleRemoval("dry_iron"));
  });
});

describe("speedPerGarment", () => {
  it("rotary iron fastest per garment", () => {
    expect(speedPerGarment("rotary_iron")).toBeGreaterThan(speedPerGarment("steam_iron"));
  });
});

describe("fabricSafety", () => {
  it("garment steamer safest for fabric", () => {
    expect(fabricSafety("garment_steamer")).toBeGreaterThan(fabricSafety("rotary_iron"));
  });
});

describe("portability", () => {
  it("garment steamer most portable", () => {
    expect(portability("garment_steamer")).toBeGreaterThan(portability("steam_press"));
  });
});

describe("purchasePrice", () => {
  it("rotary iron most expensive", () => {
    expect(purchasePrice("rotary_iron")).toBeGreaterThan(purchasePrice("dry_iron"));
  });
});

describe("requiresBoard", () => {
  it("steam iron requires board", () => {
    expect(requiresBoard("steam_iron")).toBe(true);
  });
  it("garment steamer does not", () => {
    expect(requiresBoard("garment_steamer")).toBe(false);
  });
});

describe("suitableForCommercial", () => {
  it("steam press is commercial", () => {
    expect(suitableForCommercial("steam_press")).toBe(true);
  });
  it("steam iron is not", () => {
    expect(suitableForCommercial("steam_iron")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("garment steamer uses continuous steam wand", () => {
    expect(heatMethod("garment_steamer")).toBe("continuous_steam_wand");
  });
});

describe("bestGarment", () => {
  it("rotary iron for flat linen sheet tablecloth", () => {
    expect(bestGarment("rotary_iron")).toBe("flat_linen_sheet_tablecloth");
  });
});

describe("ironingMethods", () => {
  it("returns 5 methods", () => {
    expect(ironingMethods()).toHaveLength(5);
  });
});
