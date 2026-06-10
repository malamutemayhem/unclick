import { describe, it, expect } from "vitest";
import {
  surfaceTempK, luminositySolar, massSolar,
  lifespanBillionYears, radiusSolar, mainSequence,
  habZonePossible, exampleStar, abundanceInGalaxy, starClasses,
} from "../star-class-calc.js";

describe("surfaceTempK", () => {
  it("blue giant is hottest", () => {
    expect(surfaceTempK("blue_giant")).toBeGreaterThan(
      surfaceTempK("red_dwarf")
    );
  });
});

describe("luminositySolar", () => {
  it("blue giant is most luminous", () => {
    expect(luminositySolar("blue_giant")).toBeGreaterThan(
      luminositySolar("yellow_dwarf")
    );
  });
});

describe("massSolar", () => {
  it("blue giant is most massive", () => {
    expect(massSolar("blue_giant")).toBeGreaterThan(
      massSolar("red_dwarf")
    );
  });
});

describe("lifespanBillionYears", () => {
  it("red dwarf lives longest", () => {
    expect(lifespanBillionYears("red_dwarf")).toBeGreaterThan(
      lifespanBillionYears("blue_giant")
    );
  });
});

describe("radiusSolar", () => {
  it("red giant is largest", () => {
    expect(radiusSolar("red_giant")).toBeGreaterThan(
      radiusSolar("white_dwarf")
    );
  });
});

describe("mainSequence", () => {
  it("yellow dwarf is main sequence", () => {
    expect(mainSequence("yellow_dwarf")).toBe(true);
  });
  it("white dwarf is not", () => {
    expect(mainSequence("white_dwarf")).toBe(false);
  });
});

describe("habZonePossible", () => {
  it("yellow dwarf can have habitable zone", () => {
    expect(habZonePossible("yellow_dwarf")).toBe(true);
  });
  it("blue giant cannot", () => {
    expect(habZonePossible("blue_giant")).toBe(false);
  });
});

describe("exampleStar", () => {
  it("yellow dwarf example is sun", () => {
    expect(exampleStar("yellow_dwarf")).toBe("sun");
  });
});

describe("abundanceInGalaxy", () => {
  it("red dwarf is most abundant", () => {
    expect(abundanceInGalaxy("red_dwarf")).toBeGreaterThan(
      abundanceInGalaxy("blue_giant")
    );
  });
});

describe("starClasses", () => {
  it("returns 5 classes", () => {
    expect(starClasses()).toHaveLength(5);
  });
});
