import { describe, it, expect } from "vitest";
import {
  hardnessMohs, specificGravity, crustalAbundance,
  cleavagePlanes, luster, transparent,
  effervescesInAcid, crystalSystem, industrialUse, mineralTypes,
} from "../mineral-type-calc.js";

describe("hardnessMohs", () => {
  it("quartz is hardest", () => {
    expect(hardnessMohs("quartz")).toBeGreaterThan(
      hardnessMohs("calcite")
    );
  });
});

describe("specificGravity", () => {
  it("olivine is densest", () => {
    expect(specificGravity("olivine")).toBeGreaterThan(
      specificGravity("feldspar")
    );
  });
});

describe("crustalAbundance", () => {
  it("feldspar is most abundant", () => {
    expect(crustalAbundance("feldspar")).toBeGreaterThan(
      crustalAbundance("olivine")
    );
  });
});

describe("cleavagePlanes", () => {
  it("calcite has most cleavage planes", () => {
    expect(cleavagePlanes("calcite")).toBeGreaterThan(
      cleavagePlanes("quartz")
    );
  });
});

describe("luster", () => {
  it("mica has highest luster", () => {
    expect(luster("mica")).toBeGreaterThan(luster("calcite"));
  });
});

describe("transparent", () => {
  it("quartz is transparent", () => {
    expect(transparent("quartz")).toBe(true);
  });
  it("feldspar is not transparent", () => {
    expect(transparent("feldspar")).toBe(false);
  });
});

describe("effervescesInAcid", () => {
  it("calcite effervesces", () => {
    expect(effervescesInAcid("calcite")).toBe(true);
  });
  it("quartz does not", () => {
    expect(effervescesInAcid("quartz")).toBe(false);
  });
});

describe("crystalSystem", () => {
  it("quartz is hexagonal", () => {
    expect(crystalSystem("quartz")).toBe("hexagonal");
  });
});

describe("industrialUse", () => {
  it("quartz for electronics", () => {
    expect(industrialUse("quartz")).toBe("electronics");
  });
});

describe("mineralTypes", () => {
  it("returns 5 types", () => {
    expect(mineralTypes()).toHaveLength(5);
  });
});
