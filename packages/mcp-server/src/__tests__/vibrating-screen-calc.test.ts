import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, moisture, durability,
  vsCost, selfCleaning, forFines, motion,
  bestUse, vibratingScreenTypes,
} from "../vibrating-screen-calc.js";

describe("capacity", () => {
  it("banana highest capacity", () => {
    expect(capacity("banana_multi_slope")).toBeGreaterThan(capacity("high_frequency_dewatering"));
  });
});

describe("efficiency", () => {
  it("flip flow most efficient", () => {
    expect(efficiency("flip_flow_elastic_panel")).toBeGreaterThan(efficiency("inclined_circular_motion"));
  });
});

describe("moisture", () => {
  it("high frequency best dewatering", () => {
    expect(moisture("high_frequency_dewatering")).toBeGreaterThan(moisture("inclined_circular_motion"));
  });
});

describe("durability", () => {
  it("flip flow most durable", () => {
    expect(durability("flip_flow_elastic_panel")).toBeGreaterThan(durability("high_frequency_dewatering"));
  });
});

describe("vsCost", () => {
  it("flip flow most expensive", () => {
    expect(vsCost("flip_flow_elastic_panel")).toBeGreaterThan(vsCost("inclined_circular_motion"));
  });
});

describe("selfCleaning", () => {
  it("banana is self cleaning", () => {
    expect(selfCleaning("banana_multi_slope")).toBe(true);
  });
  it("inclined not self cleaning", () => {
    expect(selfCleaning("inclined_circular_motion")).toBe(false);
  });
});

describe("forFines", () => {
  it("high frequency for fines", () => {
    expect(forFines("high_frequency_dewatering")).toBe(true);
  });
  it("inclined not fines", () => {
    expect(forFines("inclined_circular_motion")).toBe(false);
  });
});

describe("motion", () => {
  it("banana uses variable slope", () => {
    expect(motion("banana_multi_slope")).toBe("variable_slope_declining_angle");
  });
});

describe("bestUse", () => {
  it("flip flow for sticky material", () => {
    expect(bestUse("flip_flow_elastic_panel")).toBe("sticky_clay_wet_difficult_screen");
  });
});

describe("vibratingScreenTypes", () => {
  it("returns 5 types", () => {
    expect(vibratingScreenTypes()).toHaveLength(5);
  });
});
