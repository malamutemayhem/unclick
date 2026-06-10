import { describe, it, expect } from "vitest";
import {
  loadCapacity, concealability, installEase, durability,
  hingeCost, selfClosing, adjustable, hingeFinish,
  bestDoor, doorHinges,
} from "../door-hinge-calc.js";

describe("loadCapacity", () => {
  it("piano continuous highest load capacity", () => {
    expect(loadCapacity("piano_continuous")).toBeGreaterThan(loadCapacity("concealed_european"));
  });
});

describe("concealability", () => {
  it("concealed european most concealable", () => {
    expect(concealability("concealed_european")).toBeGreaterThan(concealability("butt_mortise"));
  });
});

describe("installEase", () => {
  it("spring self close easiest install", () => {
    expect(installEase("spring_self_close")).toBeGreaterThan(installEase("pivot_floor_mount"));
  });
});

describe("durability", () => {
  it("pivot floor mount most durable", () => {
    expect(durability("pivot_floor_mount")).toBeGreaterThan(durability("spring_self_close"));
  });
});

describe("hingeCost", () => {
  it("pivot floor mount most expensive", () => {
    expect(hingeCost("pivot_floor_mount")).toBeGreaterThan(hingeCost("butt_mortise"));
  });
});

describe("selfClosing", () => {
  it("spring self close is self closing", () => {
    expect(selfClosing("spring_self_close")).toBe(true);
  });
  it("butt mortise is not", () => {
    expect(selfClosing("butt_mortise")).toBe(false);
  });
});

describe("adjustable", () => {
  it("concealed european is adjustable", () => {
    expect(adjustable("concealed_european")).toBe(true);
  });
  it("butt mortise is not", () => {
    expect(adjustable("butt_mortise")).toBe(false);
  });
});

describe("hingeFinish", () => {
  it("piano continuous uses stainless steel polished", () => {
    expect(hingeFinish("piano_continuous")).toBe("stainless_steel_polished");
  });
});

describe("bestDoor", () => {
  it("spring self close best for fire rated commercial", () => {
    expect(bestDoor("spring_self_close")).toBe("fire_rated_commercial");
  });
});

describe("doorHinges", () => {
  it("returns 5 types", () => {
    expect(doorHinges()).toHaveLength(5);
  });
});
