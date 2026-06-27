import { describe, it, expect } from "vitest";
import {
  seatCount, partitionHeightCm, floorAreaM2, drainGradientPercent,
  waterFlowLitersPerDay, ventilationOpenings, limewashCoats,
  drainChannelWidthCm, cleaningFrequencyDays, constructionCost, drainageTypes,
} from "../reredorter-calc.js";

describe("seatCount", () => {
  it("at least 4", () => {
    expect(seatCount(5)).toBe(4);
  });
  it("scales with monks", () => {
    expect(seatCount(30)).toBeGreaterThan(seatCount(10));
  });
});

describe("partitionHeightCm", () => {
  it("60% of ceiling", () => {
    expect(partitionHeightCm(3)).toBe(180);
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(8)).toBeGreaterThan(0);
  });
});

describe("drainGradientPercent", () => {
  it("positive gradient", () => {
    expect(drainGradientPercent(20, 1)).toBeGreaterThan(0);
  });
  it("zero length = 0", () => {
    expect(drainGradientPercent(0, 1)).toBe(0);
  });
});

describe("waterFlowLitersPerDay", () => {
  it("positive flow", () => {
    expect(waterFlowLitersPerDay(8)).toBeGreaterThan(0);
  });
});

describe("ventilationOpenings", () => {
  it("at least 1", () => {
    expect(ventilationOpenings(2)).toBe(1);
  });
});

describe("limewashCoats", () => {
  it("always 3", () => {
    expect(limewashCoats()).toBe(3);
  });
});

describe("drainChannelWidthCm", () => {
  it("stream widest", () => {
    expect(drainChannelWidthCm("stream")).toBeGreaterThan(drainChannelWidthCm("channel"));
  });
});

describe("cleaningFrequencyDays", () => {
  it("sewer least frequent", () => {
    expect(cleaningFrequencyDays("sewer")).toBeGreaterThan(cleaningFrequencyDays("cesspit"));
  });
});

describe("constructionCost", () => {
  it("sewer most expensive", () => {
    expect(constructionCost(8, "sewer", 500)).toBeGreaterThan(
      constructionCost(8, "cesspit", 500)
    );
  });
});

describe("drainageTypes", () => {
  it("returns 5 types", () => {
    expect(drainageTypes()).toHaveLength(5);
  });
});
