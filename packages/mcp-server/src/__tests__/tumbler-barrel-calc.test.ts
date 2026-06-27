import { describe, it, expect } from "vitest";
import {
  polishSpeed, finishQuality, capacity, noiseLevel,
  tumblerCost, selfContained, wetProcess, mediaType,
  bestUse, tumblerBarrels,
} from "../tumbler-barrel-calc.js";

describe("polishSpeed", () => {
  it("centrifugal disc heavy fastest polish", () => {
    expect(polishSpeed("centrifugal_disc_heavy")).toBeGreaterThan(polishSpeed("rotary_rubber_drum"));
  });
});

describe("finishQuality", () => {
  it("magnetic pin fine best finish quality", () => {
    expect(finishQuality("magnetic_pin_fine")).toBeGreaterThan(finishQuality("barrel_hex_rock"));
  });
});

describe("capacity", () => {
  it("barrel hex rock most capacity", () => {
    expect(capacity("barrel_hex_rock")).toBeGreaterThan(capacity("magnetic_pin_fine"));
  });
});

describe("noiseLevel", () => {
  it("magnetic pin fine quietest", () => {
    expect(noiseLevel("magnetic_pin_fine")).toBeGreaterThan(noiseLevel("centrifugal_disc_heavy"));
  });
});

describe("tumblerCost", () => {
  it("magnetic pin fine most expensive", () => {
    expect(tumblerCost("magnetic_pin_fine")).toBeGreaterThan(tumblerCost("rotary_rubber_drum"));
  });
});

describe("selfContained", () => {
  it("rotary rubber drum is self contained", () => {
    expect(selfContained("rotary_rubber_drum")).toBe(true);
  });
  it("vibratory bowl fast not self contained", () => {
    expect(selfContained("vibratory_bowl_fast")).toBe(false);
  });
});

describe("wetProcess", () => {
  it("rotary rubber drum uses wet process", () => {
    expect(wetProcess("rotary_rubber_drum")).toBe(true);
  });
  it("centrifugal disc heavy not wet process", () => {
    expect(wetProcess("centrifugal_disc_heavy")).toBe(false);
  });
});

describe("mediaType", () => {
  it("magnetic pin fine uses stainless micro pin", () => {
    expect(mediaType("magnetic_pin_fine")).toBe("stainless_micro_pin");
  });
});

describe("bestUse", () => {
  it("magnetic pin fine best for chain link polish", () => {
    expect(bestUse("magnetic_pin_fine")).toBe("chain_link_polish");
  });
});

describe("tumblerBarrels", () => {
  it("returns 5 types", () => {
    expect(tumblerBarrels()).toHaveLength(5);
  });
});
