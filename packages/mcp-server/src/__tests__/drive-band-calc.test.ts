import { describe, it, expect } from "vitest";
import {
  gripDrive, slipControl, durability, noiseLevel,
  bandCost, stretchy, spliceJoin, bandMaterial,
  bestUse, driveBands,
} from "../drive-band-calc.js";

describe("gripDrive", () => {
  it("rubber oring loop strongest grip drive", () => {
    expect(gripDrive("rubber_oring_loop")).toBeGreaterThan(gripDrive("poly_stretch_belt"));
  });
});

describe("slipControl", () => {
  it("poly stretch belt best slip control", () => {
    expect(slipControl("poly_stretch_belt")).toBeGreaterThan(slipControl("rubber_oring_loop"));
  });
});

describe("durability", () => {
  it("leather round band most durable", () => {
    expect(durability("leather_round_band")).toBeGreaterThan(durability("cotton_cord_twist"));
  });
});

describe("noiseLevel", () => {
  it("linen waxed cord quietest", () => {
    expect(noiseLevel("linen_waxed_cord")).toBeGreaterThan(noiseLevel("leather_round_band"));
  });
});

describe("bandCost", () => {
  it("leather round band most expensive", () => {
    expect(bandCost("leather_round_band")).toBeGreaterThan(bandCost("cotton_cord_twist"));
  });
});

describe("stretchy", () => {
  it("poly stretch belt is stretchy", () => {
    expect(stretchy("poly_stretch_belt")).toBe(true);
  });
  it("cotton cord twist not stretchy", () => {
    expect(stretchy("cotton_cord_twist")).toBe(false);
  });
});

describe("spliceJoin", () => {
  it("cotton cord twist can splice join", () => {
    expect(spliceJoin("cotton_cord_twist")).toBe(true);
  });
  it("poly stretch belt cannot splice join", () => {
    expect(spliceJoin("poly_stretch_belt")).toBe(false);
  });
});

describe("bandMaterial", () => {
  it("cotton cord twist uses twisted cotton cord", () => {
    expect(bandMaterial("cotton_cord_twist")).toBe("twisted_cotton_cord");
  });
});

describe("bestUse", () => {
  it("leather round band best for heavy duty drive", () => {
    expect(bestUse("leather_round_band")).toBe("heavy_duty_drive");
  });
});

describe("driveBands", () => {
  it("returns 5 types", () => {
    expect(driveBands()).toHaveLength(5);
  });
});
