import { describe, it, expect } from "vitest";
import {
  gripComfort, accessibility, securityLevel, aestheticAppeal,
  handleCost, lockBuiltIn, adaCompliant, handleMaterial,
  bestDoor, doorHandles,
} from "../door-handle-calc.js";

describe("gripComfort", () => {
  it("lever passage most comfortable grip", () => {
    expect(gripComfort("lever_passage")).toBeGreaterThan(gripComfort("push_plate_commercial"));
  });
});

describe("accessibility", () => {
  it("lever passage most accessible", () => {
    expect(accessibility("lever_passage")).toBeGreaterThan(accessibility("knob_privacy"));
  });
});

describe("securityLevel", () => {
  it("smart keypad entry highest security", () => {
    expect(securityLevel("smart_keypad_entry")).toBeGreaterThan(securityLevel("lever_passage"));
  });
});

describe("aestheticAppeal", () => {
  it("pull barn style most aesthetic", () => {
    expect(aestheticAppeal("pull_barn_style")).toBeGreaterThan(aestheticAppeal("push_plate_commercial"));
  });
});

describe("handleCost", () => {
  it("smart keypad entry most expensive", () => {
    expect(handleCost("smart_keypad_entry")).toBeGreaterThan(handleCost("knob_privacy"));
  });
});

describe("lockBuiltIn", () => {
  it("knob privacy has built in lock", () => {
    expect(lockBuiltIn("knob_privacy")).toBe(true);
  });
  it("lever passage does not", () => {
    expect(lockBuiltIn("lever_passage")).toBe(false);
  });
});

describe("adaCompliant", () => {
  it("lever passage is ada compliant", () => {
    expect(adaCompliant("lever_passage")).toBe(true);
  });
  it("knob privacy is not", () => {
    expect(adaCompliant("knob_privacy")).toBe(false);
  });
});

describe("handleMaterial", () => {
  it("pull barn style uses black iron flat bar", () => {
    expect(handleMaterial("pull_barn_style")).toBe("black_iron_flat_bar");
  });
});

describe("bestDoor", () => {
  it("smart keypad entry best for front entry keyless", () => {
    expect(bestDoor("smart_keypad_entry")).toBe("front_entry_keyless");
  });
});

describe("doorHandles", () => {
  it("returns 5 types", () => {
    expect(doorHandles()).toHaveLength(5);
  });
});
