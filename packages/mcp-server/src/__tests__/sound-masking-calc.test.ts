import { describe, it, expect } from "vitest";
import {
  coverage, uniformity, adjustability, aesthetic,
  smCost, networked, forOpenOffice, speaker,
  bestUse, soundMaskingTypes,
} from "../sound-masking-calc.js";

describe("coverage", () => {
  it("networked widest coverage", () => {
    expect(coverage("networked_zone_ip")).toBeGreaterThan(coverage("desktop_personal_unit"));
  });
});

describe("uniformity", () => {
  it("networked most uniform", () => {
    expect(uniformity("networked_zone_ip")).toBeGreaterThan(uniformity("desktop_personal_unit"));
  });
});

describe("adjustability", () => {
  it("networked most adjustable", () => {
    expect(adjustability("networked_zone_ip")).toBeGreaterThan(adjustability("in_plenum_speaker"));
  });
});

describe("aesthetic", () => {
  it("in plenum best aesthetic", () => {
    expect(aesthetic("in_plenum_speaker")).toBeGreaterThan(aesthetic("desktop_personal_unit"));
  });
});

describe("smCost", () => {
  it("networked most expensive", () => {
    expect(smCost("networked_zone_ip")).toBeGreaterThan(smCost("desktop_personal_unit"));
  });
});

describe("networked", () => {
  it("networked is networked", () => {
    expect(networked("networked_zone_ip")).toBe(true);
  });
  it("plenum not networked", () => {
    expect(networked("in_plenum_speaker")).toBe(false);
  });
});

describe("forOpenOffice", () => {
  it("plenum for open office", () => {
    expect(forOpenOffice("in_plenum_speaker")).toBe(true);
  });
  it("desktop not open office", () => {
    expect(forOpenOffice("desktop_personal_unit")).toBe(false);
  });
});

describe("speaker", () => {
  it("outdoor uses landscape rock", () => {
    expect(speaker("outdoor_landscape_mask")).toBe("landscape_rock_bollard_speaker");
  });
});

describe("bestUse", () => {
  it("networked for large campus", () => {
    expect(bestUse("networked_zone_ip")).toBe("large_campus_multi_zone_control");
  });
});

describe("soundMaskingTypes", () => {
  it("returns 5 types", () => {
    expect(soundMaskingTypes()).toHaveLength(5);
  });
});
