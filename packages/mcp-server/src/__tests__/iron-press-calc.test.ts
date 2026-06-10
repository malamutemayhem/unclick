import { describe, it, expect } from "vitest";
import {
  wrinkleRemoval, steamOutput, heatUpSpeed, ironWeight,
  ironCost, verticalSteam, needsBoard, solePlate,
  bestTask, ironPresses,
} from "../iron-press-calc.js";

describe("wrinkleRemoval", () => {
  it("steam generator best wrinkle removal", () => {
    expect(wrinkleRemoval("steam_generator")).toBeGreaterThan(wrinkleRemoval("dry_iron_basic"));
  });
});

describe("steamOutput", () => {
  it("steam generator highest steam output", () => {
    expect(steamOutput("steam_generator")).toBeGreaterThan(steamOutput("steam_iron_standard"));
  });
});

describe("heatUpSpeed", () => {
  it("dry iron basic fastest heat up", () => {
    expect(heatUpSpeed("dry_iron_basic")).toBeGreaterThan(heatUpSpeed("steam_generator"));
  });
});

describe("ironWeight", () => {
  it("heat press transfer heaviest", () => {
    expect(ironWeight("heat_press_transfer")).toBeGreaterThan(ironWeight("dry_iron_basic"));
  });
});

describe("ironCost", () => {
  it("steam generator most expensive", () => {
    expect(ironCost("steam_generator")).toBeGreaterThan(ironCost("dry_iron_basic"));
  });
});

describe("verticalSteam", () => {
  it("garment steamer has vertical steam", () => {
    expect(verticalSteam("garment_steamer")).toBe(true);
  });
  it("dry iron basic does not", () => {
    expect(verticalSteam("dry_iron_basic")).toBe(false);
  });
});

describe("needsBoard", () => {
  it("steam iron standard needs board", () => {
    expect(needsBoard("steam_iron_standard")).toBe(true);
  });
  it("garment steamer does not", () => {
    expect(needsBoard("garment_steamer")).toBe(false);
  });
});

describe("solePlate", () => {
  it("steam generator uses stainless precision holes", () => {
    expect(solePlate("steam_generator")).toBe("stainless_precision_holes");
  });
});

describe("bestTask", () => {
  it("heat press transfer for vinyl sublimation print", () => {
    expect(bestTask("heat_press_transfer")).toBe("vinyl_sublimation_print");
  });
});

describe("ironPresses", () => {
  it("returns 5 types", () => {
    expect(ironPresses()).toHaveLength(5);
  });
});
