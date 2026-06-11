import { describe, it, expect } from "vitest";
import {
  waterAbsorb, smoothFinish, durability, controlWet,
  spongeCost, natural, compressed, poreSize,
  bestUse, spongeTools,
} from "../sponge-tool-calc.js";

describe("waterAbsorb", () => {
  it("natural sea standard best water absorb", () => {
    expect(waterAbsorb("natural_sea_standard")).toBeGreaterThan(waterAbsorb("synthetic_foam_durable"));
  });
});

describe("smoothFinish", () => {
  it("silk sponge fine smoothest finish", () => {
    expect(smoothFinish("silk_sponge_fine")).toBeGreaterThan(smoothFinish("pop_up_compressed"));
  });
});

describe("durability", () => {
  it("synthetic foam durable most durable", () => {
    expect(durability("synthetic_foam_durable")).toBeGreaterThan(durability("silk_sponge_fine"));
  });
});

describe("controlWet", () => {
  it("silk sponge fine best wet control", () => {
    expect(controlWet("silk_sponge_fine")).toBeGreaterThan(controlWet("pop_up_compressed"));
  });
});

describe("spongeCost", () => {
  it("silk sponge fine most expensive", () => {
    expect(spongeCost("silk_sponge_fine")).toBeGreaterThan(spongeCost("pop_up_compressed"));
  });
});

describe("natural", () => {
  it("natural sea standard is natural", () => {
    expect(natural("natural_sea_standard")).toBe(true);
  });
  it("synthetic foam durable not natural", () => {
    expect(natural("synthetic_foam_durable")).toBe(false);
  });
});

describe("compressed", () => {
  it("elephant ear large is compressed", () => {
    expect(compressed("elephant_ear_large")).toBe(true);
  });
  it("natural sea standard not compressed", () => {
    expect(compressed("natural_sea_standard")).toBe(false);
  });
});

describe("poreSize", () => {
  it("silk sponge fine uses fine dense pore", () => {
    expect(poreSize("silk_sponge_fine")).toBe("fine_dense_pore");
  });
});

describe("bestUse", () => {
  it("natural sea standard best for general wheel smooth", () => {
    expect(bestUse("natural_sea_standard")).toBe("general_wheel_smooth");
  });
});

describe("spongeTools", () => {
  it("returns 5 types", () => {
    expect(spongeTools()).toHaveLength(5);
  });
});
