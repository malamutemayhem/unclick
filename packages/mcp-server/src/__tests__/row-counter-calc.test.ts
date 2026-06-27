import { describe, it, expect } from "vitest";
import {
  countAccuracy, easeOfUse, multiCount, durability,
  counterCost, handsFree, needsBattery, counterType,
  bestProject, rowCounters,
} from "../row-counter-calc.js";

describe("countAccuracy", () => {
  it("digital lcd press most accurate", () => {
    expect(countAccuracy("digital_lcd_press")).toBeGreaterThan(countAccuracy("kacha_kacha_ring"));
  });
});

describe("easeOfUse", () => {
  it("kacha kacha ring easiest to use", () => {
    expect(easeOfUse("kacha_kacha_ring")).toBeGreaterThan(easeOfUse("peg_board_manual"));
  });
});

describe("multiCount", () => {
  it("app phone tap best multi count", () => {
    expect(multiCount("app_phone_tap")).toBeGreaterThan(multiCount("barrel_click_thumb"));
  });
});

describe("durability", () => {
  it("peg board manual most durable", () => {
    expect(durability("peg_board_manual")).toBeGreaterThan(durability("app_phone_tap"));
  });
});

describe("counterCost", () => {
  it("digital lcd press more expensive than barrel click", () => {
    expect(counterCost("digital_lcd_press")).toBeGreaterThan(counterCost("barrel_click_thumb"));
  });
});

describe("handsFree", () => {
  it("kacha kacha ring is hands free", () => {
    expect(handsFree("kacha_kacha_ring")).toBe(true);
  });
  it("barrel click thumb is not hands free", () => {
    expect(handsFree("barrel_click_thumb")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("digital lcd press needs battery", () => {
    expect(needsBattery("digital_lcd_press")).toBe(true);
  });
  it("barrel click thumb does not need battery", () => {
    expect(needsBattery("barrel_click_thumb")).toBe(false);
  });
});

describe("counterType", () => {
  it("kacha kacha ring is finger ring click", () => {
    expect(counterType("kacha_kacha_ring")).toBe("finger_ring_click");
  });
});

describe("bestProject", () => {
  it("app phone tap best for pattern integrate note", () => {
    expect(bestProject("app_phone_tap")).toBe("pattern_integrate_note");
  });
});

describe("rowCounters", () => {
  it("returns 5 types", () => {
    expect(rowCounters()).toHaveLength(5);
  });
});
