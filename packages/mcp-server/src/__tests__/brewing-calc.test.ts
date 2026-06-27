import { describe, it, expect } from "vitest";
import {
  abv, abw, apparentAttenuation, realAttenuation,
  calories, sgToPlato, platoToSG,
  ibu, srm, mcu, srmToHex,
  strikeWaterTemp, boilOffVolume, preboilVolume,
  dilution, carbonation, STYLES,
} from "../brewing-calc.js";

describe("abv", () => {
  it("computes ABV from OG/FG", () => {
    const result = abv(1.050, 1.010);
    expect(result).toBeCloseTo(5.25, 0);
  });
});

describe("abw", () => {
  it("converts ABV to ABW", () => {
    const result = abw(1.050, 1.010);
    expect(result).toBeLessThan(abv(1.050, 1.010));
  });
});

describe("apparentAttenuation", () => {
  it("computes attenuation percentage", () => {
    const aa = apparentAttenuation(1.050, 1.010);
    expect(aa).toBeCloseTo(80, 0);
  });
});

describe("realAttenuation", () => {
  it("is less than apparent", () => {
    const ra = realAttenuation(1.050, 1.010);
    const aa = apparentAttenuation(1.050, 1.010);
    expect(ra).toBeLessThan(aa);
  });
});

describe("calories", () => {
  it("estimates calories per 12oz", () => {
    const cal = calories(1.050, 1.010);
    expect(cal).toBeGreaterThan(100);
    expect(cal).toBeLessThan(300);
  });
});

describe("sgToPlato / platoToSG", () => {
  it("converts SG to Plato", () => {
    const plato = sgToPlato(1.050);
    expect(plato).toBeCloseTo(12.4, 0);
  });

  it("round-trips", () => {
    const sg = 1.060;
    expect(platoToSG(sgToPlato(sg))).toBeCloseTo(sg, 2);
  });
});

describe("ibu", () => {
  it("computes IBU from hop addition", () => {
    const result = ibu(6.5, 1.5, 60, 5, 1.050);
    expect(result).toBeGreaterThan(20);
    expect(result).toBeLessThan(60);
  });
});

describe("srm / mcu", () => {
  it("computes MCU", () => {
    const result = mcu(3, 10, 5);
    expect(result).toBe(6);
  });

  it("converts MCU to SRM", () => {
    const result = srm(6);
    expect(result).toBeGreaterThan(4);
  });
});

describe("srmToHex", () => {
  it("returns hex color", () => {
    const hex = srmToHex(5);
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("darker for higher SRM", () => {
    const light = srmToHex(3);
    const dark = srmToHex(30);
    const lightR = parseInt(light.slice(1, 3), 16);
    const darkR = parseInt(dark.slice(1, 3), 16);
    expect(darkR).toBeLessThan(lightR);
  });
});

describe("strikeWaterTemp", () => {
  it("computes strike temperature", () => {
    const temp = strikeWaterTemp(70, 152, 1.5);
    expect(temp).toBeGreaterThan(152);
  });
});

describe("boilOffVolume", () => {
  it("computes evaporation", () => {
    expect(boilOffVolume(6, 60)).toBeCloseTo(1.5);
  });
});

describe("preboilVolume", () => {
  it("adds boil-off to target", () => {
    expect(preboilVolume(5, 60)).toBeCloseTo(6.5);
  });
});

describe("dilution", () => {
  it("computes water to add", () => {
    const water = dilution(1.060, 5, 1.050);
    expect(water).toBeGreaterThan(0);
  });
});

describe("carbonation", () => {
  it("computes priming pressure", () => {
    const psi = carbonation(68, 2.5);
    expect(psi).toBeGreaterThan(0);
  });
});

describe("STYLES", () => {
  it("has beer styles", () => {
    expect(STYLES.length).toBeGreaterThan(0);
    expect(STYLES.find(s => s.name === "IPA")).toBeDefined();
  });
});
