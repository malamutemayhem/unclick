import { describe, it, expect } from "vitest";
import {
  compressionLevel, comfort, breathability, durability,
  sockCost, moistureWicking, toeOpen, fabricBlend,
  bestActivity, compressionSocks,
} from "../compression-sock-calc.js";

describe("compressionLevel", () => {
  it("graduated medical highest compression", () => {
    expect(compressionLevel("graduated_medical")).toBeGreaterThan(compressionLevel("athletic_calf_sleeve"));
  });
});

describe("comfort", () => {
  it("athletic calf sleeve most comfortable", () => {
    expect(comfort("athletic_calf_sleeve")).toBeGreaterThan(comfort("recovery_full_leg"));
  });
});

describe("breathability", () => {
  it("open toe toeless most breathable", () => {
    expect(breathability("open_toe_toeless")).toBeGreaterThan(breathability("recovery_full_leg"));
  });
});

describe("durability", () => {
  it("graduated medical most durable", () => {
    expect(durability("graduated_medical")).toBeGreaterThan(durability("open_toe_toeless"));
  });
});

describe("sockCost", () => {
  it("recovery full leg most expensive", () => {
    expect(sockCost("recovery_full_leg")).toBeGreaterThan(sockCost("athletic_calf_sleeve"));
  });
});

describe("moistureWicking", () => {
  it("athletic calf sleeve is moisture wicking", () => {
    expect(moistureWicking("athletic_calf_sleeve")).toBe(true);
  });
  it("recovery full leg is not", () => {
    expect(moistureWicking("recovery_full_leg")).toBe(false);
  });
});

describe("toeOpen", () => {
  it("open toe toeless has open toe", () => {
    expect(toeOpen("open_toe_toeless")).toBe(true);
  });
  it("graduated medical does not", () => {
    expect(toeOpen("graduated_medical")).toBe(false);
  });
});

describe("fabricBlend", () => {
  it("travel knee high uses merino nylon anti odor", () => {
    expect(fabricBlend("travel_knee_high")).toBe("merino_nylon_anti_odor");
  });
});

describe("bestActivity", () => {
  it("travel knee high best for long flight sitting edema", () => {
    expect(bestActivity("travel_knee_high")).toBe("long_flight_sitting_edema");
  });
});

describe("compressionSocks", () => {
  it("returns 5 types", () => {
    expect(compressionSocks()).toHaveLength(5);
  });
});
