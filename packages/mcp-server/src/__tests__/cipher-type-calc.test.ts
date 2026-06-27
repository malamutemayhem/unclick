import { describe, it, expect } from "vitest";
import {
  keySpaceSize, computationalCost, breakDifficulty,
  throughputRating, inventionYear, symmetric,
  digital, bestApplication, securityLevel, cipherTypes,
} from "../cipher-type-calc.js";

describe("keySpaceSize", () => {
  it("aes has largest key space", () => {
    expect(keySpaceSize("aes")).toBeGreaterThan(keySpaceSize("caesar"));
  });
});

describe("computationalCost", () => {
  it("rsa has highest computational cost", () => {
    expect(computationalCost("rsa")).toBeGreaterThan(
      computationalCost("caesar")
    );
  });
});

describe("breakDifficulty", () => {
  it("aes is hardest to break", () => {
    expect(breakDifficulty("aes")).toBeGreaterThan(
      breakDifficulty("caesar")
    );
  });
});

describe("throughputRating", () => {
  it("caesar has highest throughput", () => {
    expect(throughputRating("caesar")).toBeGreaterThan(
      throughputRating("rsa")
    );
  });
});

describe("inventionYear", () => {
  it("caesar is oldest", () => {
    expect(inventionYear("caesar")).toBeLessThan(
      inventionYear("aes")
    );
  });
});

describe("symmetric", () => {
  it("aes is symmetric", () => {
    expect(symmetric("aes")).toBe(true);
  });
  it("rsa is not symmetric", () => {
    expect(symmetric("rsa")).toBe(false);
  });
});

describe("digital", () => {
  it("aes is digital", () => {
    expect(digital("aes")).toBe(true);
  });
  it("caesar is not digital", () => {
    expect(digital("caesar")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("aes for data encryption", () => {
    expect(bestApplication("aes")).toBe("data_encryption");
  });
});

describe("securityLevel", () => {
  it("aes is military grade", () => {
    expect(securityLevel("aes")).toBe("military_grade");
  });
});

describe("cipherTypes", () => {
  it("returns 5 types", () => {
    expect(cipherTypes()).toHaveLength(5);
  });
});
