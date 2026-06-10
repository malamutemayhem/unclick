import { describe, it, expect } from "vitest";
import {
  shoeProtection, breathability, visibility, packFlat,
  shoeBagCost, waterproof, separateCompartment, closureType,
  bestShoe, shoeBags,
} from "../shoe-bag-calc.js";

describe("shoeProtection", () => {
  it("padded sneaker case best shoe protection", () => {
    expect(shoeProtection("padded_sneaker_case")).toBeGreaterThan(shoeProtection("ventilated_mesh_panel"));
  });
});

describe("breathability", () => {
  it("ventilated mesh panel most breathable", () => {
    expect(breathability("ventilated_mesh_panel")).toBeGreaterThan(breathability("waterproof_pvc_lined"));
  });
});

describe("visibility", () => {
  it("zippered nylon clear best visibility", () => {
    expect(visibility("zippered_nylon_clear")).toBeGreaterThan(visibility("drawstring_cotton_basic"));
  });
});

describe("packFlat", () => {
  it("drawstring cotton basic packs flattest", () => {
    expect(packFlat("drawstring_cotton_basic")).toBeGreaterThan(packFlat("padded_sneaker_case"));
  });
});

describe("shoeBagCost", () => {
  it("padded sneaker case most expensive", () => {
    expect(shoeBagCost("padded_sneaker_case")).toBeGreaterThan(shoeBagCost("drawstring_cotton_basic"));
  });
});

describe("waterproof", () => {
  it("waterproof pvc lined is waterproof", () => {
    expect(waterproof("waterproof_pvc_lined")).toBe(true);
  });
  it("drawstring cotton basic is not waterproof", () => {
    expect(waterproof("drawstring_cotton_basic")).toBe(false);
  });
});

describe("separateCompartment", () => {
  it("padded sneaker case has separate compartment", () => {
    expect(separateCompartment("padded_sneaker_case")).toBe(true);
  });
  it("zippered nylon clear has no separate compartment", () => {
    expect(separateCompartment("zippered_nylon_clear")).toBe(false);
  });
});

describe("closureType", () => {
  it("waterproof pvc lined uses roll top clip seal", () => {
    expect(closureType("waterproof_pvc_lined")).toBe("roll_top_clip_seal");
  });
});

describe("bestShoe", () => {
  it("padded sneaker case best for collector sneaker travel", () => {
    expect(bestShoe("padded_sneaker_case")).toBe("collector_sneaker_travel");
  });
});

describe("shoeBags", () => {
  it("returns 5 types", () => {
    expect(shoeBags()).toHaveLength(5);
  });
});
