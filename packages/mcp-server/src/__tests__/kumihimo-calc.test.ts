import { describe, it, expect } from "vitest";
import {
  cordRound, patternRange, portability, tensionControl,
  braidCost, forBeginner, freestanding, braidMaterial,
  bestUse, kumihimoTools,
} from "../kumihimo-calc.js";

describe("cordRound", () => {
  it("marudai wood stand best cord round", () => {
    expect(cordRound("marudai_wood_stand")).toBeGreaterThan(cordRound("takadai_frame_braid"));
  });
});

describe("patternRange", () => {
  it("takadai frame braid widest pattern range", () => {
    expect(patternRange("takadai_frame_braid")).toBeGreaterThan(patternRange("round_foam_disk"));
  });
});

describe("portability", () => {
  it("round foam disk most portable", () => {
    expect(portability("round_foam_disk")).toBeGreaterThan(portability("takadai_frame_braid"));
  });
});

describe("tensionControl", () => {
  it("marudai wood stand best tension control", () => {
    expect(tensionControl("marudai_wood_stand")).toBeGreaterThan(tensionControl("round_foam_disk"));
  });
});

describe("braidCost", () => {
  it("marudai wood stand most expensive", () => {
    expect(braidCost("marudai_wood_stand")).toBeGreaterThan(braidCost("round_foam_disk"));
  });
});

describe("forBeginner", () => {
  it("round foam disk for beginner", () => {
    expect(forBeginner("round_foam_disk")).toBe(true);
  });
  it("marudai wood stand not for beginner", () => {
    expect(forBeginner("marudai_wood_stand")).toBe(false);
  });
});

describe("freestanding", () => {
  it("marudai wood stand is freestanding", () => {
    expect(freestanding("marudai_wood_stand")).toBe(true);
  });
  it("round foam disk not freestanding", () => {
    expect(freestanding("round_foam_disk")).toBe(false);
  });
});

describe("braidMaterial", () => {
  it("marudai wood stand uses hardwood mirror top", () => {
    expect(braidMaterial("marudai_wood_stand")).toBe("hardwood_mirror_top");
  });
});

describe("bestUse", () => {
  it("round foam disk best for simple round braid", () => {
    expect(bestUse("round_foam_disk")).toBe("simple_round_braid");
  });
});

describe("kumihimoTools", () => {
  it("returns 5 types", () => {
    expect(kumihimoTools()).toHaveLength(5);
  });
});
