import { describe, it, expect } from "vitest";
import {
  speed, fineness, capacity, temperature,
  mgCost, continuous, forSausage, cutting,
  bestUse, meatGrinderTypes,
} from "../meat-grinder-calc.js";

describe("speed", () => {
  it("emulsifier fastest", () => {
    expect(speed("emulsifier")).toBeGreaterThan(speed("mixer_grinder"));
  });
});

describe("fineness", () => {
  it("bowl cutter finest cut", () => {
    expect(fineness("bowl_cutter")).toBeGreaterThan(fineness("flaker_chipper"));
  });
});

describe("capacity", () => {
  it("mixer grinder highest capacity", () => {
    expect(capacity("mixer_grinder")).toBeGreaterThan(capacity("bowl_cutter"));
  });
});

describe("temperature", () => {
  it("flaker chipper best temperature control", () => {
    expect(temperature("flaker_chipper")).toBeGreaterThan(temperature("mixer_grinder"));
  });
});

describe("mgCost", () => {
  it("emulsifier most expensive", () => {
    expect(mgCost("emulsifier")).toBeGreaterThan(mgCost("plate_grinder"));
  });
});

describe("continuous", () => {
  it("plate grinder is continuous", () => {
    expect(continuous("plate_grinder")).toBe(true);
  });
  it("bowl cutter not continuous", () => {
    expect(continuous("bowl_cutter")).toBe(false);
  });
});

describe("forSausage", () => {
  it("bowl cutter for sausage", () => {
    expect(forSausage("bowl_cutter")).toBe(true);
  });
  it("flaker chipper not for sausage", () => {
    expect(forSausage("flaker_chipper")).toBe(false);
  });
});

describe("cutting", () => {
  it("plate grinder uses auger feed", () => {
    expect(cutting("plate_grinder")).toBe("auger_feed_rotating_knife_against_perforated_plate_extrude");
  });
});

describe("bestUse", () => {
  it("bowl cutter for frankfurt hot dog", () => {
    expect(bestUse("bowl_cutter")).toBe("frankfurt_hot_dog_emulsion_sausage_paste_fine_comminution");
  });
});

describe("meatGrinderTypes", () => {
  it("returns 5 types", () => {
    expect(meatGrinderTypes()).toHaveLength(5);
  });
});
