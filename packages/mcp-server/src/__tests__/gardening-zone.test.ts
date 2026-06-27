import { describe, it, expect } from "vitest";
import {
  getCrop, isCompanion, isEnemy, gardenArea, plantsPerArea,
  harvestDate, daysUntilHarvest, wateringSchedule,
  companionGroups, frostRisk, growingDegreeDays,
  soilMoistureLevel, CROPS,
} from "../gardening-zone.js";

describe("getCrop", () => {
  it("finds crop by name", () => {
    const tomato = getCrop("tomato");
    expect(tomato).not.toBeNull();
    expect(tomato!.daysToHarvest).toBe(80);
  });

  it("case insensitive", () => {
    expect(getCrop("TOMATO")).not.toBeNull();
  });

  it("returns null for unknown", () => {
    expect(getCrop("dragonfruit")).toBeNull();
  });
});

describe("isCompanion / isEnemy", () => {
  it("tomato and basil are companions", () => {
    expect(isCompanion("tomato", "basil")).toBe(true);
  });

  it("tomato and cabbage are enemies", () => {
    expect(isEnemy("tomato", "cabbage")).toBe(true);
  });

  it("returns null for unknown crop", () => {
    expect(isCompanion("dragonfruit", "basil")).toBeNull();
  });
});

describe("gardenArea", () => {
  it("computes plants that fit", () => {
    expect(gardenArea(4, 300, 60)).toBe(20);
  });
});

describe("plantsPerArea", () => {
  it("computes plants per square meter", () => {
    expect(plantsPerArea(10, 50)).toBe(40);
  });
});

describe("harvestDate / daysUntilHarvest", () => {
  it("computes harvest date", () => {
    expect(harvestDate(100, 80)).toBe(180);
  });

  it("counts remaining days", () => {
    expect(daysUntilHarvest(100, 150, 80)).toBe(30);
  });

  it("returns 0 if past harvest", () => {
    expect(daysUntilHarvest(100, 200, 80)).toBe(0);
  });
});

describe("wateringSchedule", () => {
  it("high water crops daily", () => {
    const tomato = getCrop("tomato")!;
    const schedule = wateringSchedule(tomato);
    expect(schedule.frequencyDays).toBe(1);
  });

  it("low water crops less frequent", () => {
    const radish = getCrop("radish")!;
    const schedule = wateringSchedule(radish);
    expect(schedule.frequencyDays).toBe(4);
  });
});

describe("companionGroups", () => {
  it("detects conflicts", () => {
    const result = companionGroups(["tomato", "cabbage", "basil"]);
    expect(result.conflicts.length).toBeGreaterThan(0);
  });

  it("groups compatible crops", () => {
    const result = companionGroups(["tomato", "basil", "carrot"]);
    expect(result.compatible.length).toBeGreaterThan(0);
  });
});

describe("frostRisk", () => {
  it("none above 5C", () => {
    expect(frostRisk(10)).toBe("none");
  });

  it("severe below -5C", () => {
    expect(frostRisk(-10)).toBe("severe");
  });
});

describe("growingDegreeDays", () => {
  it("computes GDD", () => {
    expect(growingDegreeDays(25, 15, 10)).toBe(10);
  });

  it("returns 0 below base", () => {
    expect(growingDegreeDays(8, 4, 10)).toBe(0);
  });
});

describe("soilMoistureLevel", () => {
  it("adequate when recently watered", () => {
    expect(soilMoistureLevel(10, 10, "medium")).toBe("adequate");
  });

  it("critical when long ago", () => {
    expect(soilMoistureLevel(1, 20, "high")).toBe("critical");
  });
});

describe("CROPS", () => {
  it("has multiple crops", () => {
    expect(CROPS.length).toBeGreaterThan(5);
  });
});
