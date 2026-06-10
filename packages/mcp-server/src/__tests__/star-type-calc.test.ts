import { describe, it, expect } from "vitest";
import {
  surfaceTemperatureK, luminosity, lifespanBillionYears,
  massSolarUnits, habitableZoneLikelihood, mainSequence,
  fusesHydrogen, spectralClass, exampleStar, starTypes,
} from "../star-type-calc.js";

describe("surfaceTemperatureK", () => {
  it("blue giant is hottest", () => {
    expect(surfaceTemperatureK("blue_giant")).toBeGreaterThan(
      surfaceTemperatureK("red_dwarf")
    );
  });
});

describe("luminosity", () => {
  it("blue giant is brightest", () => {
    expect(luminosity("blue_giant")).toBeGreaterThan(
      luminosity("red_dwarf")
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

describe("massSolarUnits", () => {
  it("blue giant is most massive", () => {
    expect(massSolarUnits("blue_giant")).toBeGreaterThan(
      massSolarUnits("red_dwarf")
    );
  });
});

describe("habitableZoneLikelihood", () => {
  it("yellow dwarf most habitable", () => {
    expect(habitableZoneLikelihood("yellow_dwarf")).toBeGreaterThan(
      habitableZoneLikelihood("blue_giant")
    );
  });
});

describe("mainSequence", () => {
  it("yellow dwarf is main sequence", () => {
    expect(mainSequence("yellow_dwarf")).toBe(true);
  });
  it("red giant is not", () => {
    expect(mainSequence("red_giant")).toBe(false);
  });
});

describe("fusesHydrogen", () => {
  it("red dwarf fuses hydrogen", () => {
    expect(fusesHydrogen("red_dwarf")).toBe(true);
  });
  it("white dwarf does not", () => {
    expect(fusesHydrogen("white_dwarf")).toBe(false);
  });
});

describe("spectralClass", () => {
  it("yellow dwarf is class G", () => {
    expect(spectralClass("yellow_dwarf")).toBe("G");
  });
});

describe("exampleStar", () => {
  it("yellow dwarf example is sun", () => {
    expect(exampleStar("yellow_dwarf")).toBe("sun");
  });
});

describe("starTypes", () => {
  it("returns 5 types", () => {
    expect(starTypes()).toHaveLength(5);
  });
});
