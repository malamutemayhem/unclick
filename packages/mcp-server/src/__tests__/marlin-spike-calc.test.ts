import { describe, it, expect } from "vitest";
import {
  knotPry, pinOpen, portability, corrosionResist,
  spikeCost, folding, forMarine, spikeMaterial,
  bestUse, marlinSpikes,
} from "../marlin-spike-calc.js";

describe("knotPry", () => {
  it("fixed blade steel best knot pry", () => {
    expect(knotPry("fixed_blade_steel")).toBeGreaterThan(knotPry("folding_pocket_knife"));
  });
});

describe("pinOpen", () => {
  it("stainless marine grade best pin open", () => {
    expect(pinOpen("stainless_marine_grade")).toBeGreaterThan(pinOpen("wood_handle_spike"));
  });
});

describe("portability", () => {
  it("folding pocket knife most portable", () => {
    expect(portability("folding_pocket_knife")).toBeGreaterThan(portability("fixed_blade_steel"));
  });
});

describe("corrosionResist", () => {
  it("stainless marine grade best corrosion resist", () => {
    expect(corrosionResist("stainless_marine_grade")).toBeGreaterThan(corrosionResist("wood_handle_spike"));
  });
});

describe("spikeCost", () => {
  it("titanium light strong most expensive", () => {
    expect(spikeCost("titanium_light_strong")).toBeGreaterThan(spikeCost("wood_handle_spike"));
  });
});

describe("folding", () => {
  it("folding pocket knife is folding", () => {
    expect(folding("folding_pocket_knife")).toBe(true);
  });
  it("fixed blade steel not folding", () => {
    expect(folding("fixed_blade_steel")).toBe(false);
  });
});

describe("forMarine", () => {
  it("stainless marine grade is for marine", () => {
    expect(forMarine("stainless_marine_grade")).toBe(true);
  });
  it("fixed blade steel not for marine", () => {
    expect(forMarine("fixed_blade_steel")).toBe(false);
  });
});

describe("spikeMaterial", () => {
  it("titanium light strong uses grade5 titanium", () => {
    expect(spikeMaterial("titanium_light_strong")).toBe("grade5_titanium");
  });
});

describe("bestUse", () => {
  it("stainless marine grade best for saltwater rigging", () => {
    expect(bestUse("stainless_marine_grade")).toBe("saltwater_rigging");
  });
});

describe("marlinSpikes", () => {
  it("returns 5 types", () => {
    expect(marlinSpikes()).toHaveLength(5);
  });
});
