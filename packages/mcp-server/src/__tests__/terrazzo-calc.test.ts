import { describe, it, expect } from "vitest";
import {
  slabArea, slabWeight, aggregateRatio, cementAmount,
  aggregateAmount, chipSize, grindingPasses, grindingGrit,
  curingDays, dividerStripLength, sealerAmount, costPerSqM,
  aggregateTypes,
} from "../terrazzo-calc.js";

describe("slabArea", () => {
  it("100x100 = 1 m2", () => {
    expect(slabArea(100, 100)).toBe(1);
  });
});

describe("slabWeight", () => {
  it("positive kg", () => {
    expect(slabWeight(1, 3)).toBeGreaterThan(0);
  });
});

describe("aggregateRatio", () => {
  it("venetian has most aggregate", () => {
    expect(aggregateRatio("venetian")).toBeGreaterThan(aggregateRatio("palladiana"));
  });
});

describe("cementAmount", () => {
  it("positive kg", () => {
    expect(cementAmount(10, 3, 0.7)).toBeGreaterThan(0);
  });
});

describe("aggregateAmount", () => {
  it("positive kg", () => {
    expect(aggregateAmount(10, 3, 0.7)).toBeGreaterThan(0);
  });
});

describe("chipSize", () => {
  it("returns range string", () => {
    expect(chipSize("marble")).toContain("mm");
  });
});

describe("grindingPasses", () => {
  it("polished needs most", () => {
    expect(grindingPasses("polished")).toBeGreaterThan(grindingPasses("rustic"));
  });
});

describe("grindingGrit", () => {
  it("finer for later passes", () => {
    expect(grindingGrit(5, 6)).toBeGreaterThan(grindingGrit(1, 6));
  });
});

describe("curingDays", () => {
  it("at least 7 days", () => {
    expect(curingDays(1)).toBeGreaterThanOrEqual(7);
  });
});

describe("dividerStripLength", () => {
  it("positive meters", () => {
    expect(dividerStripLength(20, 1)).toBeGreaterThan(0);
  });
});

describe("sealerAmount", () => {
  it("positive liters", () => {
    expect(sealerAmount(10)).toBeGreaterThan(0);
  });
});

describe("costPerSqM", () => {
  it("mother of pearl most expensive", () => {
    expect(costPerSqM("mother_of_pearl")).toBeGreaterThan(costPerSqM("quartz"));
  });
});

describe("aggregateTypes", () => {
  it("returns 6 types", () => {
    expect(aggregateTypes()).toHaveLength(6);
  });
});
