import { describe, it, expect } from "vitest";
import {
  divisions, quarters, blazonWords, ruleOfTincture,
  cadencyMark, shieldAspectRatio, mantlingLayers,
  supportersCount, crestHeight, tinctures,
} from "../heraldry-calc.js";

describe("divisions", () => {
  it("2^partitions", () => {
    expect(divisions(3)).toBe(8);
  });
});

describe("quarters", () => {
  it("4 per marshalling", () => {
    expect(quarters(2)).toBe(8);
  });
});

describe("blazonWords", () => {
  it("positive count", () => {
    expect(blazonWords(3, 2, 4)).toBeGreaterThan(0);
  });
});

describe("ruleOfTincture", () => {
  it("metal on colour = valid", () => {
    expect(ruleOfTincture("gules", "or")).toBe(true);
  });
  it("colour on colour = invalid", () => {
    expect(ruleOfTincture("gules", "azure")).toBe(false);
  });
});

describe("cadencyMark", () => {
  it("first child = label", () => {
    expect(cadencyMark(1)).toBe("label");
  });
  it("second child = crescent", () => {
    expect(cadencyMark(2)).toBe("crescent");
  });
});

describe("shieldAspectRatio", () => {
  it("kite tallest", () => {
    expect(shieldAspectRatio("kite")).toBeGreaterThan(shieldAspectRatio("heater"));
  });
});

describe("mantlingLayers", () => {
  it("sovereign = 4", () => {
    expect(mantlingLayers("sovereign")).toBe(4);
  });
});

describe("supportersCount", () => {
  it("noble = 2", () => {
    expect(supportersCount("noble")).toBe(2);
  });
  it("knight = 0", () => {
    expect(supportersCount("knight")).toBe(0);
  });
});

describe("crestHeight", () => {
  it("40% of shield", () => {
    expect(crestHeight(100)).toBe(40);
  });
});

describe("tinctures", () => {
  it("returns 7 tinctures", () => {
    expect(tinctures()).toHaveLength(7);
  });
});
