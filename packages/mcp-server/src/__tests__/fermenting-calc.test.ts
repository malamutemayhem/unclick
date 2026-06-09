import { describe, it, expect } from "vitest";
import {
  specificGravityToPlato, platoToSG, abvFromGravity, attenuationPercent,
  caloriesPerServing, co2Volumes, primingSugar, yeastCells,
  fermentationTemp, fermentDuration, phTarget, brixToSG, sgToBrix,
  dilution, boilOff, ibu, srm, fermentTypes,
} from "../fermenting-calc.js";

describe("specificGravityToPlato", () => {
  it("1.000 near 0 Plato", () => {
    expect(specificGravityToPlato(1.000)).toBeCloseTo(0, 0);
  });

  it("1.050 near 12.4 Plato", () => {
    expect(specificGravityToPlato(1.050)).toBeCloseTo(12.4, 0);
  });
});

describe("platoToSG", () => {
  it("0 Plato near 1.000", () => {
    expect(platoToSG(0)).toBeCloseTo(1.0, 2);
  });

  it("round trips with specificGravityToPlato", () => {
    const sg = 1.060;
    const plato = specificGravityToPlato(sg);
    expect(platoToSG(plato)).toBeCloseTo(sg, 2);
  });
});

describe("abvFromGravity", () => {
  it("typical beer", () => {
    expect(abvFromGravity(1.050, 1.010)).toBeCloseTo(5.25, 0);
  });
});

describe("attenuationPercent", () => {
  it("positive attenuation", () => {
    expect(attenuationPercent(1.050, 1.010)).toBeGreaterThan(0);
  });

  it("0 when og = fg", () => {
    expect(attenuationPercent(1.050, 1.050)).toBe(0);
  });
});

describe("caloriesPerServing", () => {
  it("positive for typical beer", () => {
    expect(caloriesPerServing(1.050, 1.010)).toBeGreaterThan(50);
  });
});

describe("co2Volumes", () => {
  it("positive at typical pressure", () => {
    expect(co2Volumes(4, 12)).toBeGreaterThan(0);
  });
});

describe("primingSugar", () => {
  it("returns grams for batch", () => {
    const grams = primingSugar(19, 2.5);
    expect(grams).toBeGreaterThan(0);
  });
});

describe("yeastCells", () => {
  it("lager needs more cells than ale", () => {
    expect(yeastCells(1.060, 20, "lager")).toBeGreaterThan(yeastCells(1.060, 20, "ale"));
  });
});

describe("fermentationTemp", () => {
  it("beer ideal around 19", () => {
    expect(fermentationTemp("beer").ideal).toBe(19);
  });

  it("yogurt higher than beer", () => {
    expect(fermentationTemp("yogurt").ideal).toBeGreaterThan(fermentationTemp("beer").ideal);
  });
});

describe("fermentDuration", () => {
  it("wine longer than beer", () => {
    expect(fermentDuration("wine").max).toBeGreaterThan(fermentDuration("beer").max);
  });
});

describe("phTarget", () => {
  it("kombucha is acidic", () => {
    expect(phTarget("kombucha").max).toBeLessThan(4);
  });
});

describe("brixToSG", () => {
  it("0 brix near 1.000", () => {
    expect(brixToSG(0)).toBeCloseTo(1.0, 2);
  });
});

describe("sgToBrix", () => {
  it("same as specificGravityToPlato", () => {
    expect(sgToBrix(1.050)).toBe(specificGravityToPlato(1.050));
  });
});

describe("dilution", () => {
  it("positive water needed", () => {
    expect(dilution(1.080, 20, 1.050)).toBeGreaterThan(0);
  });
});

describe("boilOff", () => {
  it("volume decreases", () => {
    expect(boilOff(25, 60)).toBeLessThan(25);
  });
});

describe("ibu", () => {
  it("positive bitterness", () => {
    expect(ibu(5, 30, 20, 60)).toBeGreaterThan(0);
  });
});

describe("srm", () => {
  it("positive color", () => {
    expect(srm(3, 5, 20)).toBeGreaterThan(0);
  });
});

describe("fermentTypes", () => {
  it("returns 6 types", () => {
    expect(fermentTypes()).toHaveLength(6);
    expect(fermentTypes()).toContain("beer");
    expect(fermentTypes()).toContain("kombucha");
  });
});
