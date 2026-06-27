import { describe, it, expect } from "vitest";
import {
  knifeGentle, durability, hygieneLevel, gripSurface,
  boardCost, dishwasherSafe, nonSlip, boardMaterial,
  bestTask, cuttingBoards,
} from "../cutting-board-calc.js";

describe("knifeGentle", () => {
  it("end grain wood most knife gentle", () => {
    expect(knifeGentle("end_grain_wood")).toBeGreaterThan(knifeGentle("glass_tempered"));
  });
});

describe("durability", () => {
  it("rubber commercial most durable", () => {
    expect(durability("rubber_commercial")).toBeGreaterThan(durability("plastic_dishwasher"));
  });
});

describe("hygieneLevel", () => {
  it("glass tempered most hygienic", () => {
    expect(hygieneLevel("glass_tempered")).toBeGreaterThan(hygieneLevel("edge_grain_bamboo"));
  });
});

describe("gripSurface", () => {
  it("rubber commercial best grip", () => {
    expect(gripSurface("rubber_commercial")).toBeGreaterThan(gripSurface("glass_tempered"));
  });
});

describe("boardCost", () => {
  it("end grain wood most expensive", () => {
    expect(boardCost("end_grain_wood")).toBeGreaterThan(boardCost("plastic_dishwasher"));
  });
});

describe("dishwasherSafe", () => {
  it("plastic dishwasher is dishwasher safe", () => {
    expect(dishwasherSafe("plastic_dishwasher")).toBe(true);
  });
  it("end grain wood is not", () => {
    expect(dishwasherSafe("end_grain_wood")).toBe(false);
  });
});

describe("nonSlip", () => {
  it("rubber commercial is non slip", () => {
    expect(nonSlip("rubber_commercial")).toBe(true);
  });
  it("glass tempered is not", () => {
    expect(nonSlip("glass_tempered")).toBe(false);
  });
});

describe("boardMaterial", () => {
  it("end grain wood uses walnut maple end grain", () => {
    expect(boardMaterial("end_grain_wood")).toBe("walnut_maple_end_grain");
  });
});

describe("bestTask", () => {
  it("rubber commercial best for restaurant sushi chef", () => {
    expect(bestTask("rubber_commercial")).toBe("restaurant_sushi_chef");
  });
});

describe("cuttingBoards", () => {
  it("returns 5 types", () => {
    expect(cuttingBoards()).toHaveLength(5);
  });
});
