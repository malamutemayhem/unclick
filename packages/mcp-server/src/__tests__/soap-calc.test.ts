import { describe, it, expect } from "vitest";
import {
  oilInfo, lyeAmount, lyeAmountKOH, waterAmount, totalBatchWeight,
  batchLye, hardnessIndex, iodineValue, cureWeeks, moldVolumeMl,
  barsFromMold, fragranceAmount, colorantAmount, costPerBar, oilTypes,
} from "../soap-calc.js";

describe("oilInfo", () => {
  it("returns SAP values", () => {
    const info = oilInfo("coconut");
    expect(info.sapNaOH).toBeGreaterThan(0);
    expect(info.sapKOH).toBeGreaterThan(info.sapNaOH);
  });
});

describe("lyeAmount", () => {
  it("positive for oil batch", () => {
    expect(lyeAmount(500, "olive")).toBeGreaterThan(0);
  });

  it("less with higher superfat", () => {
    expect(lyeAmount(500, "olive", 10)).toBeLessThan(lyeAmount(500, "olive", 0));
  });
});

describe("lyeAmountKOH", () => {
  it("more KOH than NaOH needed", () => {
    expect(lyeAmountKOH(500, "olive")).toBeGreaterThan(lyeAmount(500, "olive"));
  });
});

describe("waterAmount", () => {
  it("default 33% lye concentration", () => {
    const water = waterAmount(100);
    expect(water).toBeCloseTo(203, 0);
  });
});

describe("totalBatchWeight", () => {
  it("more than oil weight alone", () => {
    const oils = [{ oil: "olive" as const, grams: 500 }];
    expect(totalBatchWeight(oils)).toBeGreaterThan(500);
  });
});

describe("batchLye", () => {
  it("sums across oils", () => {
    const oils = [
      { oil: "olive" as const, grams: 300 },
      { oil: "coconut" as const, grams: 200 },
    ];
    expect(batchLye(oils)).toBeGreaterThan(0);
  });
});

describe("hardnessIndex", () => {
  it("coconut is harder than olive", () => {
    const coconut = hardnessIndex([{ oil: "coconut", percent: 100 }]);
    const olive = hardnessIndex([{ oil: "olive", percent: 100 }]);
    expect(coconut).toBeGreaterThan(olive);
  });
});

describe("iodineValue", () => {
  it("olive has higher iodine than coconut", () => {
    const olive = iodineValue([{ oil: "olive", percent: 100 }]);
    const coconut = iodineValue([{ oil: "coconut", percent: 100 }]);
    expect(olive).toBeGreaterThan(coconut);
  });
});

describe("cureWeeks", () => {
  it("cold process = 6 weeks", () => {
    expect(cureWeeks("cold_process")).toBe(6);
  });

  it("melt and pour = 0", () => {
    expect(cureWeeks("melt_and_pour")).toBe(0);
  });
});

describe("moldVolumeMl", () => {
  it("calculates volume", () => {
    expect(moldVolumeMl(20, 10, 8)).toBe(1600);
  });
});

describe("barsFromMold", () => {
  it("divides mold volume", () => {
    expect(barsFromMold(1600, 100)).toBe(16);
  });
});

describe("fragranceAmount", () => {
  it("6% default", () => {
    expect(fragranceAmount(500)).toBe(30);
  });
});

describe("colorantAmount", () => {
  it("positive amount", () => {
    expect(colorantAmount(500)).toBeGreaterThan(0);
  });
});

describe("costPerBar", () => {
  it("divides evenly", () => {
    expect(costPerBar(50, 10)).toBe(5);
  });

  it("0 for no bars", () => {
    expect(costPerBar(50, 0)).toBe(0);
  });
});

describe("oilTypes", () => {
  it("returns 8 oils", () => {
    expect(oilTypes()).toHaveLength(8);
    expect(oilTypes()).toContain("olive");
    expect(oilTypes()).toContain("coconut");
  });
});
