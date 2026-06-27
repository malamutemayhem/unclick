import { describe, it, expect } from "vitest";
import {
  nibProtect, penCapacity, inkContain, aesthetics,
  restCost, rollProof, multiPen, restMaterial,
  bestSetup, penRests,
} from "../pen-rest-calc.js";

describe("nibProtect", () => {
  it("felt pad tray best nib protection", () => {
    expect(nibProtect("felt_pad_tray")).toBeGreaterThan(nibProtect("brass_roll_stop"));
  });
});

describe("penCapacity", () => {
  it("bamboo rack multi highest pen capacity", () => {
    expect(penCapacity("bamboo_rack_multi")).toBeGreaterThan(penCapacity("ceramic_groove_single"));
  });
});

describe("inkContain", () => {
  it("felt pad tray best ink containment", () => {
    expect(inkContain("felt_pad_tray")).toBeGreaterThan(inkContain("bamboo_rack_multi"));
  });
});

describe("aesthetics", () => {
  it("acrylic display stand best aesthetics", () => {
    expect(aesthetics("acrylic_display_stand")).toBeGreaterThan(aesthetics("felt_pad_tray"));
  });
});

describe("restCost", () => {
  it("acrylic display stand more expensive than felt pad", () => {
    expect(restCost("acrylic_display_stand")).toBeGreaterThan(restCost("felt_pad_tray"));
  });
});

describe("rollProof", () => {
  it("ceramic groove single is roll proof", () => {
    expect(rollProof("ceramic_groove_single")).toBe(true);
  });
});

describe("multiPen", () => {
  it("bamboo rack multi supports multi pen", () => {
    expect(multiPen("bamboo_rack_multi")).toBe(true);
  });
  it("ceramic groove single does not support multi pen", () => {
    expect(multiPen("ceramic_groove_single")).toBe(false);
  });
});

describe("restMaterial", () => {
  it("brass roll stop uses solid brass bar", () => {
    expect(restMaterial("brass_roll_stop")).toBe("solid_brass_bar");
  });
});

describe("bestSetup", () => {
  it("acrylic display stand best for collection display show", () => {
    expect(bestSetup("acrylic_display_stand")).toBe("collection_display_show");
  });
});

describe("penRests", () => {
  it("returns 5 types", () => {
    expect(penRests()).toHaveLength(5);
  });
});
