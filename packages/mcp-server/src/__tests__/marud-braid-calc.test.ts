import { describe, it, expect } from "vitest";
import {
  braidEven, patternRange, speedBraid, portability,
  braidCost, freestanding, forBeginner, diskBase,
  bestUse, marudBraids,
} from "../marud-braid-calc.js";

describe("braidEven", () => {
  it("wood marudai classic most even braid", () => {
    expect(braidEven("wood_marudai_classic")).toBeGreaterThan(braidEven("travel_disk_compact"));
  });
});

describe("patternRange", () => {
  it("wood marudai classic widest pattern range", () => {
    expect(patternRange("wood_marudai_classic")).toBeGreaterThan(patternRange("foam_disk_beginner"));
  });
});

describe("speedBraid", () => {
  it("foam disk beginner fastest braid", () => {
    expect(speedBraid("foam_disk_beginner")).toBeGreaterThan(speedBraid("weighted_stand_pro"));
  });
});

describe("portability", () => {
  it("foam disk beginner most portable", () => {
    expect(portability("foam_disk_beginner")).toBeGreaterThan(portability("weighted_stand_pro"));
  });
});

describe("braidCost", () => {
  it("weighted stand pro most expensive", () => {
    expect(braidCost("weighted_stand_pro")).toBeGreaterThan(braidCost("foam_disk_beginner"));
  });
});

describe("freestanding", () => {
  it("wood marudai classic is freestanding", () => {
    expect(freestanding("wood_marudai_classic")).toBe(true);
  });
  it("foam disk beginner not freestanding", () => {
    expect(freestanding("foam_disk_beginner")).toBe(false);
  });
});

describe("forBeginner", () => {
  it("foam disk beginner is for beginner", () => {
    expect(forBeginner("foam_disk_beginner")).toBe(true);
  });
  it("wood marudai classic not for beginner", () => {
    expect(forBeginner("wood_marudai_classic")).toBe(false);
  });
});

describe("diskBase", () => {
  it("acrylic disk light uses clear acrylic round", () => {
    expect(diskBase("acrylic_disk_light")).toBe("clear_acrylic_round");
  });
});

describe("bestUse", () => {
  it("wood marudai classic best for traditional kumi braid", () => {
    expect(bestUse("wood_marudai_classic")).toBe("traditional_kumi_braid");
  });
});

describe("marudBraids", () => {
  it("returns 5 types", () => {
    expect(marudBraids()).toHaveLength(5);
  });
});
