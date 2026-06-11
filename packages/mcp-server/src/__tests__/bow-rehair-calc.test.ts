import { describe, it, expect } from "vitest";
import {
  gripBite, toneWarm, durability, responseQuick,
  hairCost, natural, forBass, hairSource,
  bestUse, bowRehairs,
} from "../bow-rehair-calc.js";

describe("gripBite", () => {
  it("stallion black coarse most grip bite", () => {
    expect(gripBite("stallion_black_coarse")).toBeGreaterThan(gripBite("synthetic_nylon_durable"));
  });
});

describe("toneWarm", () => {
  it("siberian silver fine warmest tone", () => {
    expect(toneWarm("siberian_silver_fine")).toBeGreaterThan(toneWarm("synthetic_nylon_durable"));
  });
});

describe("durability", () => {
  it("synthetic nylon durable most durable", () => {
    expect(durability("synthetic_nylon_durable")).toBeGreaterThan(durability("siberian_silver_fine"));
  });
});

describe("responseQuick", () => {
  it("siberian silver fine quickest response", () => {
    expect(responseQuick("siberian_silver_fine")).toBeGreaterThan(responseQuick("synthetic_nylon_durable"));
  });
});

describe("hairCost", () => {
  it("siberian silver fine most expensive", () => {
    expect(hairCost("siberian_silver_fine")).toBeGreaterThan(hairCost("synthetic_nylon_durable"));
  });
});

describe("natural", () => {
  it("mongolian white standard is natural", () => {
    expect(natural("mongolian_white_standard")).toBe(true);
  });
  it("synthetic nylon durable not natural", () => {
    expect(natural("synthetic_nylon_durable")).toBe(false);
  });
});

describe("forBass", () => {
  it("stallion black coarse is for bass", () => {
    expect(forBass("stallion_black_coarse")).toBe(true);
  });
  it("mongolian white standard not for bass", () => {
    expect(forBass("mongolian_white_standard")).toBe(false);
  });
});

describe("hairSource", () => {
  it("siberian silver fine uses siberian mare select", () => {
    expect(hairSource("siberian_silver_fine")).toBe("siberian_mare_select");
  });
});

describe("bestUse", () => {
  it("mongolian white standard best for general violin rehair", () => {
    expect(bestUse("mongolian_white_standard")).toBe("general_violin_rehair");
  });
});

describe("bowRehairs", () => {
  it("returns 5 types", () => {
    expect(bowRehairs()).toHaveLength(5);
  });
});
