import { describe, it, expect } from "vitest";
import {
  pickResistance, bumpResistance, durabilityRating, costFactor,
  keyComplexity, rekeyable, masterKeyCapable, commonApplication,
  originCountry, lockMechanisms,
} from "../lock-mechanism-calc.js";

describe("pickResistance", () => {
  it("magnetic most pick resistant", () => {
    expect(pickResistance("magnetic")).toBeGreaterThan(pickResistance("wafer"));
  });
});

describe("bumpResistance", () => {
  it("magnetic most bump resistant", () => {
    expect(bumpResistance("magnetic")).toBeGreaterThan(bumpResistance("pin_tumbler"));
  });
});

describe("durabilityRating", () => {
  it("disc detainer most durable", () => {
    expect(durabilityRating("disc_detainer")).toBeGreaterThan(durabilityRating("wafer"));
  });
});

describe("costFactor", () => {
  it("magnetic most expensive", () => {
    expect(costFactor("magnetic")).toBeGreaterThan(costFactor("wafer"));
  });
});

describe("keyComplexity", () => {
  it("magnetic most complex key", () => {
    expect(keyComplexity("magnetic")).toBeGreaterThan(keyComplexity("wafer"));
  });
});

describe("rekeyable", () => {
  it("pin tumbler is rekeyable", () => {
    expect(rekeyable("pin_tumbler")).toBe(true);
  });
  it("disc detainer is not", () => {
    expect(rekeyable("disc_detainer")).toBe(false);
  });
});

describe("masterKeyCapable", () => {
  it("pin tumbler supports master key", () => {
    expect(masterKeyCapable("pin_tumbler")).toBe(true);
  });
  it("magnetic does not", () => {
    expect(masterKeyCapable("magnetic")).toBe(false);
  });
});

describe("commonApplication", () => {
  it("wafer for cabinets automotive", () => {
    expect(commonApplication("wafer")).toBe("cabinets_automotive");
  });
});

describe("originCountry", () => {
  it("disc detainer from finland", () => {
    expect(originCountry("disc_detainer")).toBe("finland");
  });
});

describe("lockMechanisms", () => {
  it("returns 5 mechanisms", () => {
    expect(lockMechanisms()).toHaveLength(5);
  });
});
