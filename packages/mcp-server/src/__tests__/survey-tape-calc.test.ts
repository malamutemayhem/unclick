import { describe, it, expect } from "vitest";
import {
  measureAccuracy, reelSpeed, weatherResist, maxLength,
  tapeCost, digital, stretchFree, tapeBody,
  bestUse, surveyTapes,
} from "../survey-tape-calc.js";

describe("measureAccuracy", () => {
  it("invar precision bar most accurate", () => {
    expect(measureAccuracy("invar_precision_bar")).toBeGreaterThan(measureAccuracy("cloth_chain_link"));
  });
});

describe("reelSpeed", () => {
  it("laser digital measure fastest reel", () => {
    expect(reelSpeed("laser_digital_measure")).toBeGreaterThan(reelSpeed("invar_precision_bar"));
  });
});

describe("weatherResist", () => {
  it("fiberglass closed reel best weather resist", () => {
    expect(weatherResist("fiberglass_closed_reel")).toBeGreaterThan(weatherResist("cloth_chain_link"));
  });
});

describe("maxLength", () => {
  it("laser digital measure longest range", () => {
    expect(maxLength("laser_digital_measure")).toBeGreaterThan(maxLength("invar_precision_bar"));
  });
});

describe("tapeCost", () => {
  it("invar precision bar most expensive", () => {
    expect(tapeCost("invar_precision_bar")).toBeGreaterThan(tapeCost("cloth_chain_link"));
  });
});

describe("digital", () => {
  it("laser digital measure is digital", () => {
    expect(digital("laser_digital_measure")).toBe(true);
  });
  it("steel open reel not digital", () => {
    expect(digital("steel_open_reel")).toBe(false);
  });
});

describe("stretchFree", () => {
  it("steel open reel is stretch free", () => {
    expect(stretchFree("steel_open_reel")).toBe(true);
  });
  it("fiberglass closed reel not stretch free", () => {
    expect(stretchFree("fiberglass_closed_reel")).toBe(false);
  });
});

describe("tapeBody", () => {
  it("invar precision bar uses invar alloy bar", () => {
    expect(tapeBody("invar_precision_bar")).toBe("invar_alloy_bar");
  });
});

describe("bestUse", () => {
  it("laser digital measure best for rapid distance read", () => {
    expect(bestUse("laser_digital_measure")).toBe("rapid_distance_read");
  });
});

describe("surveyTapes", () => {
  it("returns 5 types", () => {
    expect(surveyTapes()).toHaveLength(5);
  });
});
