import { describe, it, expect } from "vitest";
import {
  markMinimal, stability, tempRange, reuse,
  stiltCost, highFire, flatBase, pointCount,
  bestUse, stiltsKilns,
} from "../stilts-kiln-calc.js";

describe("markMinimal", () => {
  it("wire stilt minimal most minimal marks", () => {
    expect(markMinimal("wire_stilt_minimal")).toBeGreaterThan(markMinimal("high_fire_heavy"));
  });
});

describe("stability", () => {
  it("four point stable most stable", () => {
    expect(stability("four_point_stable")).toBeGreaterThan(stability("wire_stilt_minimal"));
  });
});

describe("tempRange", () => {
  it("high fire heavy widest temp range", () => {
    expect(tempRange("high_fire_heavy")).toBeGreaterThan(tempRange("wire_stilt_minimal"));
  });
});

describe("reuse", () => {
  it("high fire heavy most reusable", () => {
    expect(reuse("high_fire_heavy")).toBeGreaterThan(reuse("wire_stilt_minimal"));
  });
});

describe("stiltCost", () => {
  it("high fire heavy most expensive", () => {
    expect(stiltCost("high_fire_heavy")).toBeGreaterThan(stiltCost("wire_stilt_minimal"));
  });
});

describe("highFire", () => {
  it("high fire heavy is high fire", () => {
    expect(highFire("high_fire_heavy")).toBe(true);
  });
  it("three point standard not high fire", () => {
    expect(highFire("three_point_standard")).toBe(false);
  });
});

describe("flatBase", () => {
  it("star stilt flat has flat base", () => {
    expect(flatBase("star_stilt_flat")).toBe(true);
  });
  it("three point standard no flat base", () => {
    expect(flatBase("three_point_standard")).toBe(false);
  });
});

describe("pointCount", () => {
  it("star stilt flat uses six point star", () => {
    expect(pointCount("star_stilt_flat")).toBe("six_point_star");
  });
});

describe("bestUse", () => {
  it("three point standard best for general low fire stilt", () => {
    expect(bestUse("three_point_standard")).toBe("general_low_fire_stilt");
  });
});

describe("stiltsKilns", () => {
  it("returns 5 types", () => {
    expect(stiltsKilns()).toHaveLength(5);
  });
});
