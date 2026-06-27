import { describe, it, expect } from "vitest";
import {
  exerciseRange, portability, weightCapacity, adjustability,
  trainerCost, noDrilling, outdoorReady, anchorStyle,
  bestSetup, suspensionTrainers,
} from "../suspension-trainer-calc.js";

describe("exerciseRange", () => {
  it("ceiling mount gym most exercise range", () => {
    expect(exerciseRange("ceiling_mount_gym")).toBeGreaterThan(exerciseRange("door_anchor_home"));
  });
});

describe("portability", () => {
  it("outdoor tree wrap most portable", () => {
    expect(portability("outdoor_tree_wrap")).toBeGreaterThan(portability("ceiling_mount_gym"));
  });
});

describe("weightCapacity", () => {
  it("military grade heavy most weight capacity", () => {
    expect(weightCapacity("military_grade_heavy")).toBeGreaterThan(weightCapacity("door_anchor_home"));
  });
});

describe("adjustability", () => {
  it("military grade heavy most adjustable", () => {
    expect(adjustability("military_grade_heavy")).toBeGreaterThan(adjustability("outdoor_tree_wrap"));
  });
});

describe("trainerCost", () => {
  it("military grade heavy most expensive", () => {
    expect(trainerCost("military_grade_heavy")).toBeGreaterThan(trainerCost("nylon_strap_basic"));
  });
});

describe("noDrilling", () => {
  it("door anchor home needs no drilling", () => {
    expect(noDrilling("door_anchor_home")).toBe(true);
  });
  it("ceiling mount gym needs drilling", () => {
    expect(noDrilling("ceiling_mount_gym")).toBe(false);
  });
});

describe("outdoorReady", () => {
  it("outdoor tree wrap is outdoor ready", () => {
    expect(outdoorReady("outdoor_tree_wrap")).toBe(true);
  });
  it("door anchor home is not outdoor ready", () => {
    expect(outdoorReady("door_anchor_home")).toBe(false);
  });
});

describe("anchorStyle", () => {
  it("door anchor home uses foam wedge over door", () => {
    expect(anchorStyle("door_anchor_home")).toBe("foam_wedge_over_door");
  });
});

describe("bestSetup", () => {
  it("outdoor tree wrap best for park travel workout", () => {
    expect(bestSetup("outdoor_tree_wrap")).toBe("park_travel_workout");
  });
});

describe("suspensionTrainers", () => {
  it("returns 5 types", () => {
    expect(suspensionTrainers()).toHaveLength(5);
  });
});
