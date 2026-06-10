import { describe, it, expect } from "vitest";
import {
  mohsHardness, specificGravity, crustalAbundance,
  cleavageQuality, luster, gemQuality,
  industrialUse, bestApplication, valuePerCarat, mineralTypes,
} from "../mineral-hardness-calc.js";

describe("mohsHardness", () => {
  it("diamond is hardest", () => {
    expect(mohsHardness("diamond")).toBeGreaterThan(
      mohsHardness("talc")
    );
  });
});

describe("specificGravity", () => {
  it("corundum is densest", () => {
    expect(specificGravity("corundum")).toBeGreaterThan(
      specificGravity("quartz")
    );
  });
});

describe("crustalAbundance", () => {
  it("feldspar is most abundant", () => {
    expect(crustalAbundance("feldspar")).toBeGreaterThan(
      crustalAbundance("diamond")
    );
  });
});

describe("cleavageQuality", () => {
  it("diamond has best cleavage", () => {
    expect(cleavageQuality("diamond")).toBeGreaterThan(
      cleavageQuality("quartz")
    );
  });
});

describe("luster", () => {
  it("diamond has highest luster", () => {
    expect(luster("diamond")).toBeGreaterThan(
      luster("talc")
    );
  });
});

describe("gemQuality", () => {
  it("diamond is gem quality", () => {
    expect(gemQuality("diamond")).toBe(true);
  });
  it("talc is not", () => {
    expect(gemQuality("talc")).toBe(false);
  });
});

describe("industrialUse", () => {
  it("all minerals have industrial use", () => {
    expect(industrialUse("talc")).toBe(true);
    expect(industrialUse("diamond")).toBe(true);
  });
});

describe("bestApplication", () => {
  it("diamond best for cutting", () => {
    expect(bestApplication("diamond")).toBe("cutting");
  });
});

describe("valuePerCarat", () => {
  it("diamond is most valuable", () => {
    expect(valuePerCarat("diamond")).toBeGreaterThan(
      valuePerCarat("quartz")
    );
  });
});

describe("mineralTypes", () => {
  it("returns 5 types", () => {
    expect(mineralTypes()).toHaveLength(5);
  });
});
