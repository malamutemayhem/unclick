import { describe, it, expect } from "vitest";
import {
  bobbinLengthMm, bobbinDiameterMm, yarnCapacityM, windingSpeedRpm,
  windingTimeMinutes, tensionGrams, bobbinsPerWarp, weightFullG,
  costPerBobbin, bobbinTypes,
} from "../bobbin-calc.js";

describe("bobbinLengthMm", () => {
  it("quill is longest", () => {
    expect(bobbinLengthMm("quill")).toBeGreaterThan(bobbinLengthMm("cop"));
  });
});

describe("bobbinDiameterMm", () => {
  it("flanged is widest", () => {
    expect(bobbinDiameterMm("flanged")).toBeGreaterThan(bobbinDiameterMm("quill"));
  });
});

describe("yarnCapacityM", () => {
  it("higher yarn count = more capacity", () => {
    expect(yarnCapacityM("pirn", 20)).toBeGreaterThan(yarnCapacityM("pirn", 10));
  });
});

describe("windingSpeedRpm", () => {
  it("pirn winds fastest", () => {
    expect(windingSpeedRpm("pirn")).toBeGreaterThan(windingSpeedRpm("quill"));
  });
});

describe("windingTimeMinutes", () => {
  it("more yarn = more time", () => {
    expect(windingTimeMinutes(500, 2000)).toBeGreaterThan(windingTimeMinutes(100, 2000));
  });
  it("zero speed returns 0", () => {
    expect(windingTimeMinutes(100, 0)).toBe(0);
  });
});

describe("tensionGrams", () => {
  it("finer yarn = less tension", () => {
    expect(tensionGrams(10)).toBeGreaterThan(tensionGrams(20));
  });
});

describe("bobbinsPerWarp", () => {
  it("more shuttles = fewer bobbins each", () => {
    expect(bobbinsPerWarp(400, 2)).toBeLessThan(bobbinsPerWarp(400, 1));
  });
  it("zero shuttles returns 0", () => {
    expect(bobbinsPerWarp(400, 0)).toBe(0);
  });
});

describe("weightFullG", () => {
  it("flanged is heaviest", () => {
    expect(weightFullG("flanged")).toBeGreaterThan(weightFullG("quill"));
  });
});

describe("costPerBobbin", () => {
  it("quill is most expensive", () => {
    expect(costPerBobbin("quill")).toBeGreaterThan(costPerBobbin("paper_tube"));
  });
});

describe("bobbinTypes", () => {
  it("returns 5 types", () => {
    expect(bobbinTypes()).toHaveLength(5);
  });
});
