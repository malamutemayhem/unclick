import { describe, it, expect } from "vitest";
import {
  pourAccuracy, pourSpeed, markReadability, spillResistance,
  jiggerCost, internalMarks, stackable, designStyle,
  bestBartender, jiggers,
} from "../jigger-calc.js";

describe("pourAccuracy", () => {
  it("japanese tall most accurate pour", () => {
    expect(pourAccuracy("japanese_tall")).toBeGreaterThan(pourAccuracy("measured_pour_spout"));
  });
});

describe("pourSpeed", () => {
  it("measured pour spout fastest pour", () => {
    expect(pourSpeed("measured_pour_spout")).toBeGreaterThan(pourSpeed("graduated_beaker"));
  });
});

describe("markReadability", () => {
  it("oxo angled best mark readability", () => {
    expect(markReadability("oxo_angled")).toBeGreaterThan(markReadability("bell_double"));
  });
});

describe("spillResistance", () => {
  it("graduated beaker best spill resistance", () => {
    expect(spillResistance("graduated_beaker")).toBeGreaterThan(spillResistance("bell_double"));
  });
});

describe("jiggerCost", () => {
  it("japanese tall most expensive", () => {
    expect(jiggerCost("japanese_tall")).toBeGreaterThan(jiggerCost("bell_double"));
  });
});

describe("internalMarks", () => {
  it("japanese tall has internal marks", () => {
    expect(internalMarks("japanese_tall")).toBe(true);
  });
  it("bell double does not", () => {
    expect(internalMarks("bell_double")).toBe(false);
  });
});

describe("stackable", () => {
  it("japanese tall is stackable", () => {
    expect(stackable("japanese_tall")).toBe(true);
  });
  it("oxo angled is not", () => {
    expect(stackable("oxo_angled")).toBe(false);
  });
});

describe("designStyle", () => {
  it("oxo angled uses mini cup angled face", () => {
    expect(designStyle("oxo_angled")).toBe("mini_cup_angled_face");
  });
});

describe("bestBartender", () => {
  it("japanese tall for craft cocktail precision", () => {
    expect(bestBartender("japanese_tall")).toBe("craft_cocktail_precision");
  });
});

describe("jiggers", () => {
  it("returns 5 types", () => {
    expect(jiggers()).toHaveLength(5);
  });
});
