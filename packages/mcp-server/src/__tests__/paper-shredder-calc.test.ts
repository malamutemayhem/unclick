import { describe, it, expect } from "vitest";
import {
  securityLevel, sheetCapacity, shredSpeed, binVolume,
  shredderCost, shredsCards, jamProof, cutPattern,
  bestOffice, paperShredders,
} from "../paper-shredder-calc.js";

describe("securityLevel", () => {
  it("disintegrator gov highest security", () => {
    expect(securityLevel("disintegrator_gov")).toBeGreaterThan(securityLevel("strip_cut_basic"));
  });
});

describe("sheetCapacity", () => {
  it("strip cut basic highest sheet capacity", () => {
    expect(sheetCapacity("strip_cut_basic")).toBeGreaterThan(sheetCapacity("disintegrator_gov"));
  });
});

describe("shredSpeed", () => {
  it("strip cut basic fastest shred", () => {
    expect(shredSpeed("strip_cut_basic")).toBeGreaterThan(shredSpeed("diamond_cut_high"));
  });
});

describe("binVolume", () => {
  it("disintegrator gov largest bin", () => {
    expect(binVolume("disintegrator_gov")).toBeGreaterThan(binVolume("strip_cut_basic"));
  });
});

describe("shredderCost", () => {
  it("disintegrator gov most expensive", () => {
    expect(shredderCost("disintegrator_gov")).toBeGreaterThan(shredderCost("strip_cut_basic"));
  });
});

describe("shredsCards", () => {
  it("cross cut standard shreds cards", () => {
    expect(shredsCards("cross_cut_standard")).toBe(true);
  });
  it("strip cut basic does not", () => {
    expect(shredsCards("strip_cut_basic")).toBe(false);
  });
});

describe("jamProof", () => {
  it("micro cut secure is jam proof", () => {
    expect(jamProof("micro_cut_secure")).toBe(true);
  });
  it("cross cut standard is not", () => {
    expect(jamProof("cross_cut_standard")).toBe(false);
  });
});

describe("cutPattern", () => {
  it("micro cut secure uses tiny particle dust", () => {
    expect(cutPattern("micro_cut_secure")).toBe("tiny_particle_dust");
  });
});

describe("bestOffice", () => {
  it("diamond cut high for legal medical hipaa", () => {
    expect(bestOffice("diamond_cut_high")).toBe("legal_medical_hipaa");
  });
});

describe("paperShredders", () => {
  it("returns 5 types", () => {
    expect(paperShredders()).toHaveLength(5);
  });
});
