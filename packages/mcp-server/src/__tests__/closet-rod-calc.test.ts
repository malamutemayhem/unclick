import { describe, it, expect } from "vitest";
import {
  loadCapacity, hangingSpace, installEase, accessibility,
  rodCost, noDrilling, adaFriendly, rodProfile,
  bestCloset, closetRods,
} from "../closet-rod-calc.js";

describe("loadCapacity", () => {
  it("oval steel heavy duty highest load capacity", () => {
    expect(loadCapacity("oval_steel_heavy_duty")).toBeGreaterThan(loadCapacity("tension_no_drill_fit"));
  });
});

describe("hangingSpace", () => {
  it("double hang two tier most hanging space", () => {
    expect(hangingSpace("double_hang_two_tier")).toBeGreaterThan(hangingSpace("chrome_round_standard"));
  });
});

describe("installEase", () => {
  it("tension no drill fit easiest install", () => {
    expect(installEase("tension_no_drill_fit")).toBeGreaterThan(installEase("pull_down_ceiling_reach"));
  });
});

describe("accessibility", () => {
  it("pull down ceiling reach most accessible", () => {
    expect(accessibility("pull_down_ceiling_reach")).toBeGreaterThan(accessibility("double_hang_two_tier"));
  });
});

describe("rodCost", () => {
  it("pull down ceiling reach most expensive", () => {
    expect(rodCost("pull_down_ceiling_reach")).toBeGreaterThan(rodCost("chrome_round_standard"));
  });
});

describe("noDrilling", () => {
  it("tension no drill fit needs no drilling", () => {
    expect(noDrilling("tension_no_drill_fit")).toBe(true);
  });
  it("chrome round standard needs drilling", () => {
    expect(noDrilling("chrome_round_standard")).toBe(false);
  });
});

describe("adaFriendly", () => {
  it("pull down ceiling reach is ada friendly", () => {
    expect(adaFriendly("pull_down_ceiling_reach")).toBe(true);
  });
  it("chrome round standard is not ada friendly", () => {
    expect(adaFriendly("chrome_round_standard")).toBe(false);
  });
});

describe("rodProfile", () => {
  it("tension no drill fit uses spring loaded tube", () => {
    expect(rodProfile("tension_no_drill_fit")).toBe("spring_loaded_tube");
  });
});

describe("bestCloset", () => {
  it("tension no drill fit best for rental temporary no holes", () => {
    expect(bestCloset("tension_no_drill_fit")).toBe("rental_temporary_no_holes");
  });
});

describe("closetRods", () => {
  it("returns 5 types", () => {
    expect(closetRods()).toHaveLength(5);
  });
});
