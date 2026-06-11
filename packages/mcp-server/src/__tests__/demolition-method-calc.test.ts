import { describe, it, expect } from "vitest";
import {
  speed, precision, noise, debris,
  dmCost, explosive, forConcrete, method,
  bestUse, demolitionMethodTypes,
} from "../demolition-method-calc.js";

describe("speed", () => {
  it("implosion fastest", () => {
    expect(speed("implosion_controlled_blast")).toBeGreaterThan(speed("deconstruction_hand_salvage"));
  });
});

describe("precision", () => {
  it("deconstruction most precise", () => {
    expect(precision("deconstruction_hand_salvage")).toBeGreaterThan(precision("mechanical_excavator_crush"));
  });
});

describe("noise", () => {
  it("chemical expansion quietest", () => {
    expect(noise("chemical_expansion_silent")).toBeGreaterThan(noise("implosion_controlled_blast"));
  });
});

describe("debris", () => {
  it("deconstruction least debris", () => {
    expect(debris("deconstruction_hand_salvage")).toBeGreaterThan(debris("implosion_controlled_blast"));
  });
});

describe("dmCost", () => {
  it("implosion most expensive", () => {
    expect(dmCost("implosion_controlled_blast")).toBeGreaterThan(dmCost("mechanical_excavator_crush"));
  });
});

describe("explosive", () => {
  it("implosion is explosive", () => {
    expect(explosive("implosion_controlled_blast")).toBe(true);
  });
  it("mechanical not explosive", () => {
    expect(explosive("mechanical_excavator_crush")).toBe(false);
  });
});

describe("forConcrete", () => {
  it("mechanical for concrete", () => {
    expect(forConcrete("mechanical_excavator_crush")).toBe(true);
  });
  it("deconstruction not for concrete", () => {
    expect(forConcrete("deconstruction_hand_salvage")).toBe(false);
  });
});

describe("method", () => {
  it("chemical uses expansive grout", () => {
    expect(method("chemical_expansion_silent")).toBe("expansive_grout_drill_hole_crack");
  });
});

describe("bestUse", () => {
  it("implosion for high rise", () => {
    expect(bestUse("implosion_controlled_blast")).toBe("high_rise_tower_stadium_urban_drop");
  });
});

describe("demolitionMethodTypes", () => {
  it("returns 5 types", () => {
    expect(demolitionMethodTypes()).toHaveLength(5);
  });
});
