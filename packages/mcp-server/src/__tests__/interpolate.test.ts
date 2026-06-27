import { describe, it, expect } from "vitest";
import { lerp, inverseLerp, remap, clamp, smoothstep, easeInQuad, easeOutQuad, easeInOutQuad, bezier } from "../interpolate.js";

describe("interpolate", () => {
  it("lerp", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("inverseLerp", () => {
    expect(inverseLerp(0, 10, 5)).toBe(0.5);
    expect(inverseLerp(0, 10, 0)).toBe(0);
    expect(inverseLerp(5, 5, 5)).toBe(0);
  });

  it("remap", () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50);
    expect(remap(0, 0, 10, 20, 40)).toBe(20);
  });

  it("clamp", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("smoothstep", () => {
    expect(smoothstep(0, 1, 0)).toBe(0);
    expect(smoothstep(0, 1, 1)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5);
  });

  it("easeInQuad", () => {
    expect(easeInQuad(0)).toBe(0);
    expect(easeInQuad(1)).toBe(1);
    expect(easeInQuad(0.5)).toBe(0.25);
  });

  it("easeOutQuad", () => {
    expect(easeOutQuad(0)).toBe(0);
    expect(easeOutQuad(1)).toBe(1);
    expect(easeOutQuad(0.5)).toBe(0.75);
  });

  it("easeInOutQuad", () => {
    expect(easeInOutQuad(0)).toBe(0);
    expect(easeInOutQuad(1)).toBe(1);
    expect(easeInOutQuad(0.5)).toBe(0.5);
  });

  it("bezier", () => {
    expect(bezier(0, 0, 1, 1, 0)).toBe(0);
    expect(bezier(0, 0, 1, 1, 1)).toBe(1);
  });
});
