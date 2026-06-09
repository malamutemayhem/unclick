import { describe, it, expect } from "vitest";
import {
  mohsHardness, specificGravity, caratWeight, mmToCarats,
  caratsToMm, roughToFinished, gritSequence, cuttingSpeed,
  polishingTime, dopAngle, crownAngle, pavilionAngle,
  tablePercent, pricePerCarat, gemstoneTypes,
} from "../lapidary-calc.js";

describe("mohsHardness", () => {
  it("diamond is 10", () => {
    expect(mohsHardness("diamond")).toBe(10);
  });

  it("opal is softest", () => {
    expect(mohsHardness("opal")).toBeLessThan(mohsHardness("ruby"));
  });
});

describe("specificGravity", () => {
  it("ruby is dense", () => {
    expect(specificGravity("ruby")).toBeGreaterThan(specificGravity("amethyst"));
  });
});

describe("caratWeight", () => {
  it("positive carats", () => {
    expect(caratWeight(100, "diamond")).toBeGreaterThan(0);
  });
});

describe("mmToCarats", () => {
  it("positive for real dimensions", () => {
    expect(mmToCarats(6, 4, "diamond")).toBeGreaterThan(0);
  });
});

describe("caratsToMm", () => {
  it("positive mm", () => {
    expect(caratsToMm(1, "diamond")).toBeGreaterThan(0);
  });
});

describe("roughToFinished", () => {
  it("cabochon has best yield", () => {
    expect(roughToFinished(10, "cabochon")).toBeGreaterThan(roughToFinished(10, "round"));
  });

  it("less than rough weight", () => {
    expect(roughToFinished(10, "round")).toBeLessThan(10);
  });
});

describe("gritSequence", () => {
  it("ascending grits", () => {
    const grits = gritSequence("diamond");
    for (let i = 1; i < grits.length; i++) {
      expect(grits[i]).toBeGreaterThan(grits[i - 1]);
    }
  });

  it("harder gems need more grits", () => {
    expect(gritSequence("diamond").length).toBeGreaterThanOrEqual(gritSequence("opal").length);
  });
});

describe("cuttingSpeed", () => {
  it("slower for harder gems", () => {
    expect(cuttingSpeed("diamond")).toBeLessThan(cuttingSpeed("opal"));
  });
});

describe("polishingTime", () => {
  it("more time for harder gems", () => {
    expect(polishingTime(1, "diamond")).toBeGreaterThan(polishingTime(1, "opal"));
  });
});

describe("dopAngle", () => {
  it("cabochon has no facet angle", () => {
    expect(dopAngle("cabochon")).toBe(0);
  });

  it("round has standard angle", () => {
    expect(dopAngle("round")).toBeGreaterThan(0);
  });
});

describe("crownAngle", () => {
  it("34.5 degrees", () => {
    expect(crownAngle()).toBe(34.5);
  });
});

describe("pavilionAngle", () => {
  it("40.75 degrees", () => {
    expect(pavilionAngle()).toBe(40.75);
  });
});

describe("tablePercent", () => {
  it("emerald cut has largest table", () => {
    expect(tablePercent("emerald_cut")).toBeGreaterThan(tablePercent("round"));
  });
});

describe("pricePerCarat", () => {
  it("diamond is most expensive", () => {
    expect(pricePerCarat("diamond", "medium")).toBeGreaterThan(pricePerCarat("amethyst", "medium"));
  });

  it("quality scales price", () => {
    expect(pricePerCarat("ruby", "high")).toBeGreaterThan(pricePerCarat("ruby", "low"));
  });
});

describe("gemstoneTypes", () => {
  it("returns 8 types", () => {
    expect(gemstoneTypes()).toHaveLength(8);
    expect(gemstoneTypes()).toContain("diamond");
  });
});
