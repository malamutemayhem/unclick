import { describe, it, expect } from "vitest";
import {
  smeltingTempCelsius, yieldPercent, charcoalKgPerKgIron,
  slagVolume, bloomQuality, crushingRequired,
  smeltHours, phosphorusContent, costPerKgOre, bloomOres,
} from "../bloom-smelting-calc.js";

describe("smeltingTempCelsius", () => {
  it("magnetite needs highest temp", () => {
    expect(smeltingTempCelsius("magnetite")).toBeGreaterThan(
      smeltingTempCelsius("bog_iron")
    );
  });
});

describe("yieldPercent", () => {
  it("magnetite has highest yield", () => {
    expect(yieldPercent("magnetite")).toBeGreaterThan(
      yieldPercent("limonite")
    );
  });
});

describe("charcoalKgPerKgIron", () => {
  it("limonite needs most charcoal", () => {
    expect(charcoalKgPerKgIron("limonite")).toBeGreaterThan(
      charcoalKgPerKgIron("magnetite")
    );
  });
});

describe("slagVolume", () => {
  it("limonite produces most slag", () => {
    expect(slagVolume("limonite")).toBeGreaterThan(
      slagVolume("magnetite")
    );
  });
});

describe("bloomQuality", () => {
  it("magnetite produces best bloom", () => {
    expect(bloomQuality("magnetite")).toBeGreaterThan(
      bloomQuality("limonite")
    );
  });
});

describe("crushingRequired", () => {
  it("magnetite needs crushing", () => {
    expect(crushingRequired("magnetite")).toBe(true);
  });
  it("bog iron does not", () => {
    expect(crushingRequired("bog_iron")).toBe(false);
  });
});

describe("smeltHours", () => {
  it("magnetite takes longest", () => {
    expect(smeltHours("magnetite")).toBeGreaterThan(
      smeltHours("limonite")
    );
  });
});

describe("phosphorusContent", () => {
  it("bog iron has most phosphorus", () => {
    expect(phosphorusContent("bog_iron")).toBeGreaterThan(
      phosphorusContent("magnetite")
    );
  });
});

describe("costPerKgOre", () => {
  it("magnetite costs most", () => {
    expect(costPerKgOre("magnetite")).toBeGreaterThan(
      costPerKgOre("bog_iron")
    );
  });
});

describe("bloomOres", () => {
  it("returns 5 ores", () => {
    expect(bloomOres()).toHaveLength(5);
  });
});
