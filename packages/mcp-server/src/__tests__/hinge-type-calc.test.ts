import { describe, it, expect } from "vitest";
import {
  loadCapacity, durability, aesthetic, adjustability,
  htCost, selfClosing, forHeavy, material,
  bestUse, hingeTypeTypes,
} from "../hinge-type-calc.js";

describe("loadCapacity", () => {
  it("continuous piano highest load", () => {
    expect(loadCapacity("continuous_piano_full_length")).toBeGreaterThan(loadCapacity("concealed_invisible_european"));
  });
});

describe("durability", () => {
  it("continuous piano most durable", () => {
    expect(durability("continuous_piano_full_length")).toBeGreaterThan(durability("spring_hinge_self_closing"));
  });
});

describe("aesthetic", () => {
  it("concealed best aesthetic", () => {
    expect(aesthetic("concealed_invisible_european")).toBeGreaterThan(aesthetic("butt_hinge_mortise_standard"));
  });
});

describe("adjustability", () => {
  it("concealed most adjustable", () => {
    expect(adjustability("concealed_invisible_european")).toBeGreaterThan(adjustability("continuous_piano_full_length"));
  });
});

describe("htCost", () => {
  it("pivot hinge most expensive", () => {
    expect(htCost("pivot_hinge_floor_top")).toBeGreaterThan(htCost("butt_hinge_mortise_standard"));
  });
});

describe("selfClosing", () => {
  it("spring hinge is self closing", () => {
    expect(selfClosing("spring_hinge_self_closing")).toBe(true);
  });
  it("butt hinge not self closing", () => {
    expect(selfClosing("butt_hinge_mortise_standard")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("continuous piano for heavy", () => {
    expect(forHeavy("continuous_piano_full_length")).toBe(true);
  });
  it("butt hinge not for heavy", () => {
    expect(forHeavy("butt_hinge_mortise_standard")).toBe(false);
  });
});

describe("material", () => {
  it("concealed uses zinc alloy", () => {
    expect(material("concealed_invisible_european")).toBe("zinc_alloy_three_way_adjust");
  });
});

describe("bestUse", () => {
  it("spring hinge for fire rated door", () => {
    expect(bestUse("spring_hinge_self_closing")).toBe("fire_rated_door_self_close_code");
  });
});

describe("hingeTypeTypes", () => {
  it("returns 5 types", () => {
    expect(hingeTypeTypes()).toHaveLength(5);
  });
});
