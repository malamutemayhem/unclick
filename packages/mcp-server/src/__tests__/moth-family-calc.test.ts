import { describe, it, expect } from "vitest";
import {
  wingspan, flightSpeed, camouflageAbility, colorfulness,
  speciesCount, diurnal, agriculturalPest, commonName,
  defenseStrategy, mothFamilies,
} from "../moth-family-calc.js";

describe("wingspan", () => {
  it("saturniidae largest wingspan", () => {
    expect(wingspan("saturniidae")).toBeGreaterThan(wingspan("geometridae"));
  });
});

describe("flightSpeed", () => {
  it("sphingidae fastest flyers", () => {
    expect(flightSpeed("sphingidae")).toBeGreaterThan(flightSpeed("saturniidae"));
  });
});

describe("camouflageAbility", () => {
  it("geometridae best camouflage", () => {
    expect(camouflageAbility("geometridae")).toBeGreaterThan(camouflageAbility("arctiidae"));
  });
});

describe("colorfulness", () => {
  it("arctiidae most colorful", () => {
    expect(colorfulness("arctiidae")).toBeGreaterThan(colorfulness("noctuidae"));
  });
});

describe("speciesCount", () => {
  it("noctuidae most species", () => {
    expect(speciesCount("noctuidae")).toBeGreaterThan(speciesCount("saturniidae"));
  });
});

describe("diurnal", () => {
  it("sphingidae can be diurnal", () => {
    expect(diurnal("sphingidae")).toBe(true);
  });
  it("noctuidae is not", () => {
    expect(diurnal("noctuidae")).toBe(false);
  });
});

describe("agriculturalPest", () => {
  it("noctuidae is agricultural pest", () => {
    expect(agriculturalPest("noctuidae")).toBe(true);
  });
  it("saturniidae is not", () => {
    expect(agriculturalPest("saturniidae")).toBe(false);
  });
});

describe("commonName", () => {
  it("sphingidae are hawk moths", () => {
    expect(commonName("sphingidae")).toBe("hawk_moths");
  });
});

describe("defenseStrategy", () => {
  it("geometridae uses twig mimicry", () => {
    expect(defenseStrategy("geometridae")).toBe("twig_mimicry");
  });
});

describe("mothFamilies", () => {
  it("returns 5 families", () => {
    expect(mothFamilies()).toHaveLength(5);
  });
});
