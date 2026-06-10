import { describe, it, expect } from "vitest";
import {
  tonalEffect, installDifficulty, visualAppeal, durability,
  purflingCost, naturalMaterial, flexible, stripComposition,
  bestUse, purflings,
} from "../purfling-calc.js";

describe("tonalEffect", () => {
  it("wood strip classic best tonal effect", () => {
    expect(tonalEffect("wood_strip_classic")).toBeGreaterThan(tonalEffect("plastic_strip_student"));
  });
});

describe("installDifficulty", () => {
  it("marquetry inlay deco hardest to install", () => {
    expect(installDifficulty("marquetry_inlay_deco")).toBeGreaterThan(installDifficulty("plastic_strip_student"));
  });
});

describe("visualAppeal", () => {
  it("abalone shell ornate best visual appeal", () => {
    expect(visualAppeal("abalone_shell_ornate")).toBeGreaterThan(visualAppeal("plastic_strip_student"));
  });
});

describe("durability", () => {
  it("wood strip classic most durable", () => {
    expect(durability("wood_strip_classic")).toBeGreaterThan(durability("abalone_shell_ornate"));
  });
});

describe("purflingCost", () => {
  it("abalone shell ornate most expensive", () => {
    expect(purflingCost("abalone_shell_ornate")).toBeGreaterThan(purflingCost("fiber_black_white"));
  });
});

describe("naturalMaterial", () => {
  it("wood strip classic is natural", () => {
    expect(naturalMaterial("wood_strip_classic")).toBe(true);
  });
  it("plastic strip student not natural", () => {
    expect(naturalMaterial("plastic_strip_student")).toBe(false);
  });
});

describe("flexible", () => {
  it("wood strip classic is flexible", () => {
    expect(flexible("wood_strip_classic")).toBe(true);
  });
  it("marquetry inlay deco not flexible", () => {
    expect(flexible("marquetry_inlay_deco")).toBe(false);
  });
});

describe("stripComposition", () => {
  it("wood strip classic uses maple ebony maple", () => {
    expect(stripComposition("wood_strip_classic")).toBe("maple_ebony_maple");
  });
});

describe("bestUse", () => {
  it("wood strip classic best for professional violin", () => {
    expect(bestUse("wood_strip_classic")).toBe("professional_violin");
  });
});

describe("purflings", () => {
  it("returns 5 types", () => {
    expect(purflings()).toHaveLength(5);
  });
});
