import { describe, it, expect } from "vitest";
import {
  corrosionResist, leakDetection, installEase, longevity,
  ugCost, doubleContained, forFuel, material,
  bestUse, undergroundTankTypes,
} from "../underground-tank-calc.js";

describe("corrosionResist", () => {
  it("fiberglass best corrosion resistance", () => {
    expect(corrosionResist("fiberglass_frp")).toBeGreaterThan(corrosionResist("single_wall_steel"));
  });
});

describe("leakDetection", () => {
  it("double wall steel best leak detection", () => {
    expect(leakDetection("double_wall_steel")).toBeGreaterThan(leakDetection("flexible_bladder"));
  });
});

describe("installEase", () => {
  it("flexible bladder easiest install", () => {
    expect(installEase("flexible_bladder")).toBeGreaterThan(installEase("concrete_vault"));
  });
});

describe("longevity", () => {
  it("concrete vault most durable", () => {
    expect(longevity("concrete_vault")).toBeGreaterThan(longevity("flexible_bladder"));
  });
});

describe("ugCost", () => {
  it("concrete vault most expensive", () => {
    expect(ugCost("concrete_vault")).toBeGreaterThan(ugCost("flexible_bladder"));
  });
});

describe("doubleContained", () => {
  it("double wall steel is double contained", () => {
    expect(doubleContained("double_wall_steel")).toBe(true);
  });
  it("single wall steel not double contained", () => {
    expect(doubleContained("single_wall_steel")).toBe(false);
  });
});

describe("forFuel", () => {
  it("fiberglass for fuel", () => {
    expect(forFuel("fiberglass_frp")).toBe(true);
  });
  it("concrete vault not for fuel", () => {
    expect(forFuel("concrete_vault")).toBe(false);
  });
});

describe("material", () => {
  it("fiberglass uses frp resin laminate", () => {
    expect(material("fiberglass_frp")).toBe("fiberglass_reinforced_plastic_resin_laminate");
  });
});

describe("bestUse", () => {
  it("flexible bladder for temporary storage", () => {
    expect(bestUse("flexible_bladder")).toBe("temporary_water_storage_emergency_fuel_cache");
  });
});

describe("undergroundTankTypes", () => {
  it("returns 5 types", () => {
    expect(undergroundTankTypes()).toHaveLength(5);
  });
});
