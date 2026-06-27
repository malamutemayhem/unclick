import { describe, it, expect } from "vitest";
import {
  protection, presentation, stackability, sustainability,
  pkCost, recyclable, forEcommerce, material,
  bestUse, packagingTypes,
} from "../packaging-type-calc.js";

describe("protection", () => {
  it("rigid setup best protection", () => {
    expect(protection("rigid_setup_luxury")).toBeGreaterThan(protection("shrink_wrap_bundle"));
  });
});

describe("presentation", () => {
  it("rigid setup best presentation", () => {
    expect(presentation("rigid_setup_luxury")).toBeGreaterThan(presentation("corrugated_rsc_box"));
  });
});

describe("stackability", () => {
  it("corrugated best stackability", () => {
    expect(stackability("corrugated_rsc_box")).toBeGreaterThan(stackability("flexible_pouch_stand"));
  });
});

describe("sustainability", () => {
  it("corrugated most sustainable", () => {
    expect(sustainability("corrugated_rsc_box")).toBeGreaterThan(sustainability("blister_thermoform"));
  });
});

describe("pkCost", () => {
  it("rigid setup most expensive", () => {
    expect(pkCost("rigid_setup_luxury")).toBeGreaterThan(pkCost("shrink_wrap_bundle"));
  });
});

describe("recyclable", () => {
  it("corrugated is recyclable", () => {
    expect(recyclable("corrugated_rsc_box")).toBe(true);
  });
  it("blister not recyclable", () => {
    expect(recyclable("blister_thermoform")).toBe(false);
  });
});

describe("forEcommerce", () => {
  it("corrugated for ecommerce", () => {
    expect(forEcommerce("corrugated_rsc_box")).toBe(true);
  });
  it("rigid setup not for ecommerce", () => {
    expect(forEcommerce("rigid_setup_luxury")).toBe(false);
  });
});

describe("material", () => {
  it("flexible pouch uses laminated film", () => {
    expect(material("flexible_pouch_stand")).toBe("laminated_film_foil");
  });
});

describe("bestUse", () => {
  it("blister best for pharmaceutical peg hang", () => {
    expect(bestUse("blister_thermoform")).toBe("pharmaceutical_hardware_peg_hang");
  });
});

describe("packagingTypes", () => {
  it("returns 5 types", () => {
    expect(packagingTypes()).toHaveLength(5);
  });
});
