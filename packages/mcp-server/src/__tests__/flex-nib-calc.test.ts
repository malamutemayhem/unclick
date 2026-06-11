import { describe, it, expect } from "vitest";
import {
  flexRange, lineVariation, controlFine, durability,
  nibCost, forBeginner, hairline, nibMetal,
  bestUse, flexNibs,
} from "../flex-nib-calc.js";

describe("flexRange", () => {
  it("leonardt principal flex widest flex range", () => {
    expect(flexRange("leonardt_principal_flex")).toBeGreaterThan(flexRange("nikko_g_beginner"));
  });
});

describe("lineVariation", () => {
  it("leonardt principal flex most line variation", () => {
    expect(lineVariation("leonardt_principal_flex")).toBeGreaterThan(lineVariation("nikko_g_beginner"));
  });
});

describe("controlFine", () => {
  it("nikko g beginner finest control", () => {
    expect(controlFine("nikko_g_beginner")).toBeGreaterThan(controlFine("leonardt_principal_flex"));
  });
});

describe("durability", () => {
  it("nikko g beginner most durable", () => {
    expect(durability("nikko_g_beginner")).toBeGreaterThan(durability("gillott_303_hairline"));
  });
});

describe("nibCost", () => {
  it("leonardt principal flex most expensive", () => {
    expect(nibCost("leonardt_principal_flex")).toBeGreaterThan(nibCost("nikko_g_beginner"));
  });
});

describe("forBeginner", () => {
  it("nikko g beginner is for beginner", () => {
    expect(forBeginner("nikko_g_beginner")).toBe(true);
  });
  it("leonardt principal flex not for beginner", () => {
    expect(forBeginner("leonardt_principal_flex")).toBe(false);
  });
});

describe("hairline", () => {
  it("brause 66 extra fine is hairline", () => {
    expect(hairline("brause_66_extra_fine")).toBe(true);
  });
  it("nikko g beginner not hairline", () => {
    expect(hairline("nikko_g_beginner")).toBe(false);
  });
});

describe("nibMetal", () => {
  it("nikko g beginner uses chrome plated steel", () => {
    expect(nibMetal("nikko_g_beginner")).toBe("chrome_plated_steel");
  });
});

describe("bestUse", () => {
  it("hunt 101 standard best for general pointed pen", () => {
    expect(bestUse("hunt_101_standard")).toBe("general_pointed_pen");
  });
});

describe("flexNibs", () => {
  it("returns 5 types", () => {
    expect(flexNibs()).toHaveLength(5);
  });
});
