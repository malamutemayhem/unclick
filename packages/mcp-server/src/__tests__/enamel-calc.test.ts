import { describe, it, expect } from "vitest";
import {
  metalArea, enamelWeight, firingTemp, firingDuration,
  layerCount, totalFirings, counterEnamelWeight, wireLength,
  wireWeight, grindingGrits, stoneTime, coolingRate,
  crackRisk, enamelTypes,
} from "../enamel-calc.js";

describe("metalArea", () => {
  it("width x height", () => {
    expect(metalArea(30, 40)).toBe(1200);
  });
});

describe("enamelWeight", () => {
  it("positive grams", () => {
    expect(enamelWeight(1200)).toBeGreaterThan(0);
  });
});

describe("firingTemp", () => {
  it("painted is lowest temp", () => {
    expect(firingTemp("painted").maxC).toBeLessThanOrEqual(firingTemp("cloisonne").maxC);
  });
});

describe("firingDuration", () => {
  it("longer for thicker enamel", () => {
    expect(firingDuration(1)).toBeLessThan(firingDuration(2));
  });
});

describe("layerCount", () => {
  it("painted needs most layers", () => {
    expect(layerCount("painted")).toBeGreaterThan(layerCount("guilloche"));
  });
});

describe("totalFirings", () => {
  it("layers + 1", () => {
    expect(totalFirings(4)).toBe(5);
  });
});

describe("counterEnamelWeight", () => {
  it("80% of front", () => {
    expect(counterEnamelWeight(10)).toBe(8);
  });
});

describe("wireLength", () => {
  it("includes cell wire", () => {
    expect(wireLength(100, 5)).toBeGreaterThan(100);
  });
});

describe("wireWeight", () => {
  it("positive grams", () => {
    expect(wireWeight(200)).toBeGreaterThan(0);
  });
});

describe("grindingGrits", () => {
  it("ascending grits", () => {
    const grits = grindingGrits();
    for (let i = 1; i < grits.length; i++) {
      expect(grits[i]).toBeGreaterThan(grits[i - 1]);
    }
  });
});

describe("stoneTime", () => {
  it("more area = more time", () => {
    expect(stoneTime(500)).toBeGreaterThan(stoneTime(100));
  });
});

describe("coolingRate", () => {
  it("thin = fast", () => {
    expect(coolingRate(0.2)).toBe("fast");
  });

  it("thick = slow", () => {
    expect(coolingRate(1.0)).toBe("slow");
  });
});

describe("crackRisk", () => {
  it("high for fast cooling on thin metal", () => {
    expect(crackRisk("fast", 0.3)).toBe("high");
  });

  it("low for slow cooling", () => {
    expect(crackRisk("slow", 1)).toBe("low");
  });
});

describe("enamelTypes", () => {
  it("returns 6 types", () => {
    expect(enamelTypes()).toHaveLength(6);
    expect(enamelTypes()).toContain("cloisonne");
  });
});
