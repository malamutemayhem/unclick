import { describe, it, expect } from "vitest";
import {
  durability, applicationEase, dryingTimeScore,
  repairability, naturalFeel, waterResistant,
  foodSafe, bestApplication, sheenLevel, finishTypes,
} from "../finish-type-calc.js";

describe("durability", () => {
  it("polyurethane most durable", () => {
    expect(durability("polyurethane")).toBeGreaterThan(
      durability("wax")
    );
  });
});

describe("applicationEase", () => {
  it("wax easiest to apply", () => {
    expect(applicationEase("wax")).toBeGreaterThan(
      applicationEase("lacquer")
    );
  });
});

describe("dryingTimeScore", () => {
  it("lacquer dries fastest", () => {
    expect(dryingTimeScore("lacquer")).toBeGreaterThan(
      dryingTimeScore("tung_oil")
    );
  });
});

describe("repairability", () => {
  it("shellac most repairable", () => {
    expect(repairability("shellac")).toBeGreaterThan(
      repairability("polyurethane")
    );
  });
});

describe("naturalFeel", () => {
  it("wax most natural feel", () => {
    expect(naturalFeel("wax")).toBeGreaterThan(
      naturalFeel("polyurethane")
    );
  });
});

describe("waterResistant", () => {
  it("polyurethane is water resistant", () => {
    expect(waterResistant("polyurethane")).toBe(true);
  });
  it("shellac is not", () => {
    expect(waterResistant("shellac")).toBe(false);
  });
});

describe("foodSafe", () => {
  it("tung oil is food safe", () => {
    expect(foodSafe("tung_oil")).toBe(true);
  });
  it("lacquer is not", () => {
    expect(foodSafe("lacquer")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("polyurethane for floors tabletops", () => {
    expect(bestApplication("polyurethane")).toBe("floors_tabletops");
  });
});

describe("sheenLevel", () => {
  it("wax is soft matte", () => {
    expect(sheenLevel("wax")).toBe("soft_matte");
  });
});

describe("finishTypes", () => {
  it("returns 5 types", () => {
    expect(finishTypes()).toHaveLength(5);
  });
});
