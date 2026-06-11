import { describe, it, expect } from "vitest";
import {
  capacity, installSpeed, vibration, versatility,
  hpCost, tensionRated, forRetrofit, helix,
  bestUse, helicalPileTypes,
} from "../helical-pile-calc.js";

describe("capacity", () => {
  it("grouted highest capacity", () => {
    expect(capacity("grouted_shaft_high_cap")).toBeGreaterThan(capacity("round_shaft_light_duty"));
  });
});

describe("installSpeed", () => {
  it("round shaft fastest install", () => {
    expect(installSpeed("round_shaft_light_duty")).toBeGreaterThan(installSpeed("grouted_shaft_high_cap"));
  });
});

describe("vibration", () => {
  it("round shaft lowest vibration", () => {
    expect(vibration("round_shaft_light_duty")).toBeGreaterThan(vibration("grouted_shaft_high_cap"));
  });
});

describe("versatility", () => {
  it("micro pile most versatile", () => {
    expect(versatility("micro_pile_underpinning")).toBeGreaterThan(versatility("round_shaft_light_duty"));
  });
});

describe("hpCost", () => {
  it("grouted most expensive", () => {
    expect(hpCost("grouted_shaft_high_cap")).toBeGreaterThan(hpCost("round_shaft_light_duty"));
  });
});

describe("tensionRated", () => {
  it("square shaft is tension rated", () => {
    expect(tensionRated("square_shaft_heavy")).toBe(true);
  });
  it("grouted not tension rated", () => {
    expect(tensionRated("grouted_shaft_high_cap")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("micro pile for retrofit", () => {
    expect(forRetrofit("micro_pile_underpinning")).toBe(true);
  });
  it("round shaft not retrofit", () => {
    expect(forRetrofit("round_shaft_light_duty")).toBe(false);
  });
});

describe("helix", () => {
  it("combo uses hybrid shaft", () => {
    expect(helix("combo_shaft_hybrid")).toBe("round_lead_square_ext_hybrid");
  });
});

describe("bestUse", () => {
  it("round shaft for residential deck", () => {
    expect(bestUse("round_shaft_light_duty")).toBe("residential_deck_solar_mount");
  });
});

describe("helicalPileTypes", () => {
  it("returns 5 types", () => {
    expect(helicalPileTypes()).toHaveLength(5);
  });
});
