import { describe, it, expect } from "vitest";
import {
  choppingPower, bowlCapacity, attachmentVariety, compactStorage,
  processorCost, doughCapable, dishwasherSafe, driveType,
  bestTask, foodProcessors,
} from "../food-processor-calc.js";

describe("choppingPower", () => {
  it("commercial batch most chopping power", () => {
    expect(choppingPower("commercial_batch")).toBeGreaterThan(choppingPower("mini_chopper_3_cup"));
  });
});

describe("bowlCapacity", () => {
  it("commercial batch largest bowl capacity", () => {
    expect(bowlCapacity("commercial_batch")).toBeGreaterThan(bowlCapacity("mini_chopper_3_cup"));
  });
});

describe("attachmentVariety", () => {
  it("spiralizer attachment most attachment variety", () => {
    expect(attachmentVariety("spiralizer_attachment")).toBeGreaterThan(attachmentVariety("commercial_batch"));
  });
});

describe("compactStorage", () => {
  it("mini chopper 3 cup most compact storage", () => {
    expect(compactStorage("mini_chopper_3_cup")).toBeGreaterThan(compactStorage("commercial_batch"));
  });
});

describe("processorCost", () => {
  it("commercial batch most expensive", () => {
    expect(processorCost("commercial_batch")).toBeGreaterThan(processorCost("mini_chopper_3_cup"));
  });
});

describe("doughCapable", () => {
  it("full size 14 cup is dough capable", () => {
    expect(doughCapable("full_size_14_cup")).toBe(true);
  });
  it("mini chopper 3 cup is not", () => {
    expect(doughCapable("mini_chopper_3_cup")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("full size 14 cup is dishwasher safe", () => {
    expect(dishwasherSafe("full_size_14_cup")).toBe(true);
  });
  it("commercial batch is not", () => {
    expect(dishwasherSafe("commercial_batch")).toBe(false);
  });
});

describe("driveType", () => {
  it("spiralizer attachment uses mandoline spiral disc", () => {
    expect(driveType("spiralizer_attachment")).toBe("mandoline_spiral_disc");
  });
});

describe("bestTask", () => {
  it("mini chopper 3 cup for garlic herb quick chop", () => {
    expect(bestTask("mini_chopper_3_cup")).toBe("garlic_herb_quick_chop");
  });
});

describe("foodProcessors", () => {
  it("returns 5 types", () => {
    expect(foodProcessors()).toHaveLength(5);
  });
});
