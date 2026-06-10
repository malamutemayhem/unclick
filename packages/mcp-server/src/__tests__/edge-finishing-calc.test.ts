import { describe, it, expect } from "vitest";
import {
  passesRequired, dryingTimeMinutes, durabilityRating, waterResistance,
  toolRequired, skillLevel, timePerMeterMinutes, aestheticRating,
  costPerMeter, edgeFinishes,
} from "../edge-finishing-calc.js";

describe("passesRequired", () => {
  it("burnished needs most passes", () => {
    expect(passesRequired("burnished")).toBeGreaterThan(
      passesRequired("raw")
    );
  });
});

describe("dryingTimeMinutes", () => {
  it("painted takes longest to dry", () => {
    expect(dryingTimeMinutes("painted")).toBeGreaterThan(
      dryingTimeMinutes("burnished")
    );
  });
});

describe("durabilityRating", () => {
  it("burnished is most durable", () => {
    expect(durabilityRating("burnished")).toBeGreaterThan(
      durabilityRating("raw")
    );
  });
});

describe("waterResistance", () => {
  it("painted resists water best", () => {
    expect(waterResistance("painted")).toBeGreaterThan(
      waterResistance("raw")
    );
  });
});

describe("toolRequired", () => {
  it("raw needs no tool", () => {
    expect(toolRequired("raw")).toBe("none");
  });
});

describe("skillLevel", () => {
  it("folded needs most skill", () => {
    expect(skillLevel("folded")).toBeGreaterThan(skillLevel("raw"));
  });
});

describe("timePerMeterMinutes", () => {
  it("folded takes longest", () => {
    expect(timePerMeterMinutes("folded")).toBeGreaterThan(
      timePerMeterMinutes("raw")
    );
  });
});

describe("aestheticRating", () => {
  it("folded looks best", () => {
    expect(aestheticRating("folded")).toBeGreaterThan(
      aestheticRating("raw")
    );
  });
});

describe("costPerMeter", () => {
  it("folded is most expensive", () => {
    expect(costPerMeter("folded")).toBeGreaterThan(costPerMeter("raw"));
  });
});

describe("edgeFinishes", () => {
  it("returns 5 finishes", () => {
    expect(edgeFinishes()).toHaveLength(5);
  });
});
