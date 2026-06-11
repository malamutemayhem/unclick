import { describe, it, expect } from "vitest";
import {
  bondStrength, colorFast, breathable, repairEase,
  seccoCost, traditional, forExterior, binderMethod,
  bestUse, frescoSeccos,
} from "../fresco-secco-calc.js";

describe("bondStrength", () => {
  it("silicate secco mineral strongest bond", () => {
    expect(bondStrength("silicate_secco_mineral")).toBeGreaterThan(bondStrength("acrylic_secco_modern"));
  });
});

describe("colorFast", () => {
  it("silicate secco mineral most color fast", () => {
    expect(colorFast("silicate_secco_mineral")).toBeGreaterThan(colorFast("acrylic_secco_modern"));
  });
});

describe("breathable", () => {
  it("lime secco classic most breathable", () => {
    expect(breathable("lime_secco_classic")).toBeGreaterThan(breathable("acrylic_secco_modern"));
  });
});

describe("repairEase", () => {
  it("acrylic secco modern easiest repair", () => {
    expect(repairEase("acrylic_secco_modern")).toBeGreaterThan(repairEase("silicate_secco_mineral"));
  });
});

describe("seccoCost", () => {
  it("silicate secco mineral most expensive", () => {
    expect(seccoCost("silicate_secco_mineral")).toBeGreaterThan(seccoCost("lime_secco_classic"));
  });
});

describe("traditional", () => {
  it("lime secco classic is traditional", () => {
    expect(traditional("lime_secco_classic")).toBe(true);
  });
  it("acrylic secco modern not traditional", () => {
    expect(traditional("acrylic_secco_modern")).toBe(false);
  });
});

describe("forExterior", () => {
  it("silicate secco mineral is for exterior", () => {
    expect(forExterior("silicate_secco_mineral")).toBe(true);
  });
  it("acrylic secco modern not for exterior", () => {
    expect(forExterior("acrylic_secco_modern")).toBe(false);
  });
});

describe("binderMethod", () => {
  it("egg secco tempera uses egg yolk tempera", () => {
    expect(binderMethod("egg_secco_tempera")).toBe("egg_yolk_tempera");
  });
});

describe("bestUse", () => {
  it("lime secco classic best for traditional wall mural", () => {
    expect(bestUse("lime_secco_classic")).toBe("traditional_wall_mural");
  });
});

describe("frescoSeccos", () => {
  it("returns 5 types", () => {
    expect(frescoSeccos()).toHaveLength(5);
  });
});
