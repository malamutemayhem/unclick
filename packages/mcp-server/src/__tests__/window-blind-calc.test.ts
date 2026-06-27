import { describe, it, expect } from "vitest";
import {
  lightControl, insulation, privacyLevel, cleaningEase,
  blindCost, cordless, motorizable, slatMaterial,
  bestWindow, windowBlinds,
} from "../window-blind-calc.js";

describe("lightControl", () => {
  it("venetian aluminum best light control", () => {
    expect(lightControl("venetian_aluminum")).toBeGreaterThan(lightControl("roman_fold"));
  });
});

describe("insulation", () => {
  it("cellular honeycomb best insulation", () => {
    expect(insulation("cellular_honeycomb")).toBeGreaterThan(insulation("venetian_aluminum"));
  });
});

describe("privacyLevel", () => {
  it("cellular honeycomb best privacy", () => {
    expect(privacyLevel("cellular_honeycomb")).toBeGreaterThan(privacyLevel("vertical_pvc"));
  });
});

describe("cleaningEase", () => {
  it("vertical pvc easiest to clean", () => {
    expect(cleaningEase("vertical_pvc")).toBeGreaterThan(cleaningEase("roman_fold"));
  });
});

describe("blindCost", () => {
  it("roman fold most expensive", () => {
    expect(blindCost("roman_fold")).toBeGreaterThan(blindCost("vertical_pvc"));
  });
});

describe("cordless", () => {
  it("cellular honeycomb is cordless", () => {
    expect(cordless("cellular_honeycomb")).toBe(true);
  });
  it("venetian aluminum is not", () => {
    expect(cordless("venetian_aluminum")).toBe(false);
  });
});

describe("motorizable", () => {
  it("roller fabric is motorizable", () => {
    expect(motorizable("roller_fabric")).toBe(true);
  });
  it("roman fold is not", () => {
    expect(motorizable("roman_fold")).toBe(false);
  });
});

describe("slatMaterial", () => {
  it("cellular honeycomb uses spunbond polyester cell", () => {
    expect(slatMaterial("cellular_honeycomb")).toBe("spunbond_polyester_cell");
  });
});

describe("bestWindow", () => {
  it("vertical pvc for sliding door wide span", () => {
    expect(bestWindow("vertical_pvc")).toBe("sliding_door_wide_span");
  });
});

describe("windowBlinds", () => {
  it("returns 5 types", () => {
    expect(windowBlinds()).toHaveLength(5);
  });
});
