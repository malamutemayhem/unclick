import { describe, it, expect } from "vitest";
import {
  rebound, faceHardness, hornTaper, weightStable,
  anvilCost, doubleHorn, forFarrier, bodyMaterial,
  bestUse, anvilHorns,
} from "../anvil-horn-calc.js";

describe("rebound", () => {
  it("london pattern standard best rebound", () => {
    expect(rebound("london_pattern_standard")).toBeGreaterThan(rebound("cast_iron_hobby"));
  });
});

describe("faceHardness", () => {
  it("london pattern standard hardest face", () => {
    expect(faceHardness("london_pattern_standard")).toBeGreaterThan(faceHardness("cast_iron_hobby"));
  });
});

describe("hornTaper", () => {
  it("double horn european best horn taper", () => {
    expect(hornTaper("double_horn_european")).toBeGreaterThan(hornTaper("cast_iron_hobby"));
  });
});

describe("weightStable", () => {
  it("london pattern standard most weight stable", () => {
    expect(weightStable("london_pattern_standard")).toBeGreaterThan(weightStable("stake_anvil_sheet"));
  });
});

describe("anvilCost", () => {
  it("double horn european most expensive", () => {
    expect(anvilCost("double_horn_european")).toBeGreaterThan(anvilCost("cast_iron_hobby"));
  });
});

describe("doubleHorn", () => {
  it("double horn european has double horn", () => {
    expect(doubleHorn("double_horn_european")).toBe(true);
  });
  it("london pattern standard not double horn", () => {
    expect(doubleHorn("london_pattern_standard")).toBe(false);
  });
});

describe("forFarrier", () => {
  it("farrier turning clip is for farrier", () => {
    expect(forFarrier("farrier_turning_clip")).toBe(true);
  });
  it("london pattern standard not for farrier", () => {
    expect(forFarrier("london_pattern_standard")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("cast iron hobby uses cast iron economy", () => {
    expect(bodyMaterial("cast_iron_hobby")).toBe("cast_iron_economy");
  });
});

describe("bestUse", () => {
  it("double horn european best for artistic scroll work", () => {
    expect(bestUse("double_horn_european")).toBe("artistic_scroll_work");
  });
});

describe("anvilHorns", () => {
  it("returns 5 types", () => {
    expect(anvilHorns()).toHaveLength(5);
  });
});
