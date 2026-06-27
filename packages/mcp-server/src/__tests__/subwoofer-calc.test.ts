import { describe, it, expect } from "vitest";
import {
  bassExtension, bassAccuracy, outputVolume, cabinetSize,
  subCost, roomFriendly, selfPowered, designPrinciple,
  bestContent, subwoofers,
} from "../subwoofer-calc.js";

describe("bassExtension", () => {
  it("horn loaded deepest extension", () => {
    expect(bassExtension("horn_loaded")).toBeGreaterThan(bassExtension("sealed_compact"));
  });
});

describe("bassAccuracy", () => {
  it("servo controlled most accurate", () => {
    expect(bassAccuracy("servo_controlled")).toBeGreaterThan(bassAccuracy("horn_loaded"));
  });
});

describe("outputVolume", () => {
  it("horn loaded loudest", () => {
    expect(outputVolume("horn_loaded")).toBeGreaterThan(outputVolume("sealed_compact"));
  });
});

describe("cabinetSize", () => {
  it("horn loaded largest cabinet", () => {
    expect(cabinetSize("horn_loaded")).toBeGreaterThan(cabinetSize("sealed_compact"));
  });
});

describe("subCost", () => {
  it("servo controlled most expensive", () => {
    expect(subCost("servo_controlled")).toBeGreaterThan(subCost("sealed_compact"));
  });
});

describe("roomFriendly", () => {
  it("sealed compact is room friendly", () => {
    expect(roomFriendly("sealed_compact")).toBe(true);
  });
  it("horn loaded is not", () => {
    expect(roomFriendly("horn_loaded")).toBe(false);
  });
});

describe("selfPowered", () => {
  it("sealed compact is self powered", () => {
    expect(selfPowered("sealed_compact")).toBe(true);
  });
  it("horn loaded is not", () => {
    expect(selfPowered("horn_loaded")).toBe(false);
  });
});

describe("designPrinciple", () => {
  it("servo controlled uses feedback loop cone correct", () => {
    expect(designPrinciple("servo_controlled")).toBe("feedback_loop_cone_correct");
  });
});

describe("bestContent", () => {
  it("sealed compact for music tight accurate bass", () => {
    expect(bestContent("sealed_compact")).toBe("music_tight_accurate_bass");
  });
});

describe("subwoofers", () => {
  it("returns 5 types", () => {
    expect(subwoofers()).toHaveLength(5);
  });
});
