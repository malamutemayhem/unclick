import { describe, it, expect } from "vitest";
import {
  weatherProtect, breathability, packWeight, livability,
  bivvyCost, reusable, hasHoop, shellFabric,
  bestUse, bivvyBags,
} from "../bivvy-bag-calc.js";

describe("weatherProtect", () => {
  it("goretex breathable shell most weather protect", () => {
    expect(weatherProtect("goretex_breathable_shell")).toBeGreaterThan(weatherProtect("emergency_mylar_reflective"));
  });
});

describe("breathability", () => {
  it("goretex breathable shell most breathable", () => {
    expect(breathability("goretex_breathable_shell")).toBeGreaterThan(breathability("emergency_mylar_reflective"));
  });
});

describe("packWeight", () => {
  it("emergency mylar reflective lightest", () => {
    expect(packWeight("emergency_mylar_reflective")).toBeGreaterThan(packWeight("hooped_pole_mini_tent"));
  });
});

describe("livability", () => {
  it("hooped pole mini tent most livable", () => {
    expect(livability("hooped_pole_mini_tent")).toBeGreaterThan(livability("emergency_mylar_reflective"));
  });
});

describe("bivvyCost", () => {
  it("goretex breathable shell more expensive than basic nylon", () => {
    expect(bivvyCost("goretex_breathable_shell")).toBeGreaterThan(bivvyCost("waterproof_nylon_basic"));
  });
});

describe("reusable", () => {
  it("goretex breathable shell is reusable", () => {
    expect(reusable("goretex_breathable_shell")).toBe(true);
  });
  it("emergency mylar reflective is not reusable", () => {
    expect(reusable("emergency_mylar_reflective")).toBe(false);
  });
});

describe("hasHoop", () => {
  it("hooped pole mini tent has hoop", () => {
    expect(hasHoop("hooped_pole_mini_tent")).toBe(true);
  });
  it("goretex breathable shell has no hoop", () => {
    expect(hasHoop("goretex_breathable_shell")).toBe(false);
  });
});

describe("shellFabric", () => {
  it("emergency mylar reflective uses aluminized mylar film", () => {
    expect(shellFabric("emergency_mylar_reflective")).toBe("aluminized_mylar_film");
  });
});

describe("bestUse", () => {
  it("emergency mylar reflective best for survival kit emergency", () => {
    expect(bestUse("emergency_mylar_reflective")).toBe("survival_kit_emergency");
  });
});

describe("bivvyBags", () => {
  it("returns 5 types", () => {
    expect(bivvyBags()).toHaveLength(5);
  });
});
