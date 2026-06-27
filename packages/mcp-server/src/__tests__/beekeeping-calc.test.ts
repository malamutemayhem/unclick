import { describe, it, expect } from "vitest";
import {
  honeyPerFrame, honeyYield, honeyJars, waxYield, beePopulation,
  foragingRange, sugarSyrupRatio, feedAmount, inspectionInterval,
  swarmRisk, varroaTreatmentWindow, queenReplacementInterval,
  hiveWeight, pollinationValue, annualCostPerHive, breakEvenJars,
  hiveTypes,
} from "../beekeeping-calc.js";

describe("honeyPerFrame", () => {
  it("langstroth ~2.3 kg", () => {
    expect(honeyPerFrame("langstroth")).toBe(2.3);
  });

  it("flow hive produces most", () => {
    expect(honeyPerFrame("flow")).toBeGreaterThan(honeyPerFrame("langstroth"));
  });
});

describe("honeyYield", () => {
  it("positive for full frames", () => {
    expect(honeyYield(10, "langstroth")).toBeGreaterThan(0);
  });

  it("less at lower fill", () => {
    expect(honeyYield(10, "langstroth", 50)).toBeLessThan(honeyYield(10, "langstroth", 80));
  });
});

describe("honeyJars", () => {
  it("reasonable jar count", () => {
    expect(honeyJars(10)).toBeGreaterThan(10);
  });
});

describe("waxYield", () => {
  it("small fraction of honey", () => {
    expect(waxYield(10)).toBeLessThan(1);
  });
});

describe("beePopulation", () => {
  it("summer > winter", () => {
    expect(beePopulation(10, "summer")).toBeGreaterThan(beePopulation(10, "winter"));
  });
});

describe("foragingRange", () => {
  it("0 when cold", () => {
    expect(foragingRange(5)).toBe(0);
  });

  it("increases with temp", () => {
    expect(foragingRange(25)).toBeGreaterThan(foragingRange(12));
  });
});

describe("sugarSyrupRatio", () => {
  it("1:1 in spring", () => {
    const r = sugarSyrupRatio("spring");
    expect(r.sugar).toBe(1);
    expect(r.water).toBe(1);
  });

  it("2:1 in autumn", () => {
    expect(sugarSyrupRatio("autumn").sugar).toBe(2);
  });
});

describe("feedAmount", () => {
  it("no feed in summer", () => {
    expect(feedAmount(5, "summer")).toBe(0);
  });

  it("most feed in winter", () => {
    expect(feedAmount(1, "winter")).toBeGreaterThan(feedAmount(1, "spring"));
  });
});

describe("inspectionInterval", () => {
  it("weekly in spring", () => {
    expect(inspectionInterval("spring")).toBe(7);
  });

  it("monthly in winter", () => {
    expect(inspectionInterval("winter")).toBe(30);
  });
});

describe("swarmRisk", () => {
  it("low in winter", () => {
    expect(swarmRisk(10, 3, "winter")).toBe("low");
  });

  it("high with old queen in spring", () => {
    expect(swarmRisk(10, 3, "spring")).toBe("high");
  });
});

describe("varroaTreatmentWindow", () => {
  it("true in summer/autumn", () => {
    expect(varroaTreatmentWindow("summer")).toBe(true);
    expect(varroaTreatmentWindow("autumn")).toBe(true);
  });

  it("false in spring/winter", () => {
    expect(varroaTreatmentWindow("spring")).toBe(false);
    expect(varroaTreatmentWindow("winter")).toBe(false);
  });
});

describe("queenReplacementInterval", () => {
  it("every 2 years", () => {
    expect(queenReplacementInterval()).toBe(2);
  });
});

describe("hiveWeight", () => {
  it("increases with honey", () => {
    expect(hiveWeight("langstroth", 2, 20)).toBeGreaterThan(hiveWeight("langstroth", 2, 0));
  });
});

describe("pollinationValue", () => {
  it("scales with hectares", () => {
    expect(pollinationValue(10, "almond")).toBeGreaterThan(pollinationValue(5, "almond"));
  });
});

describe("annualCostPerHive", () => {
  it("positive cost", () => {
    expect(annualCostPerHive("langstroth")).toBeGreaterThan(0);
  });
});

describe("breakEvenJars", () => {
  it("finite for positive margin", () => {
    expect(breakEvenJars(150, 10, 3)).toBeGreaterThan(0);
    expect(breakEvenJars(150, 10, 3)).toBeLessThan(100);
  });

  it("infinity for no margin", () => {
    expect(breakEvenJars(150, 5, 5)).toBe(Infinity);
  });
});

describe("hiveTypes", () => {
  it("returns 4 types", () => {
    expect(hiveTypes()).toHaveLength(4);
    expect(hiveTypes()).toContain("langstroth");
  });
});
