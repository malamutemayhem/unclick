import { describe, it, expect } from "vitest";
import {
  uniformity, intensity, throughput, gentleness,
  pmCost, continuous, forWet, element,
  bestUse, paddleMixTypes,
} from "../paddle-mix-calc.js";

describe("uniformity", () => {
  it("ploughshare and fluidized zone highest uniformity", () => {
    expect(uniformity("ploughshare_batch")).toBeGreaterThan(uniformity("gravity_tumble_drum"));
  });
});

describe("intensity", () => {
  it("fluidized zone most intense", () => {
    expect(intensity("fluidized_zone_rapid")).toBeGreaterThan(intensity("gravity_tumble_drum"));
  });
});

describe("throughput", () => {
  it("twin shaft highest throughput", () => {
    expect(throughput("twin_shaft_continuous")).toBeGreaterThan(throughput("ploughshare_batch"));
  });
});

describe("gentleness", () => {
  it("gravity tumble most gentle", () => {
    expect(gentleness("gravity_tumble_drum")).toBeGreaterThan(gentleness("pugmill_clay_paste"));
  });
});

describe("pmCost", () => {
  it("fluidized zone most expensive", () => {
    expect(pmCost("fluidized_zone_rapid")).toBeGreaterThan(pmCost("gravity_tumble_drum"));
  });
});

describe("continuous", () => {
  it("twin shaft is continuous", () => {
    expect(continuous("twin_shaft_continuous")).toBe(true);
  });
  it("ploughshare not continuous", () => {
    expect(continuous("ploughshare_batch")).toBe(false);
  });
});

describe("forWet", () => {
  it("ploughshare for wet", () => {
    expect(forWet("ploughshare_batch")).toBe(true);
  });
  it("gravity tumble not for wet", () => {
    expect(forWet("gravity_tumble_drum")).toBe(false);
  });
});

describe("element", () => {
  it("twin shaft uses counter rotate paddle", () => {
    expect(element("twin_shaft_continuous")).toBe("twin_counter_rotate_paddle_shaft");
  });
});

describe("bestUse", () => {
  it("gravity tumble for fragile granule", () => {
    expect(bestUse("gravity_tumble_drum")).toBe("fragile_granule_tablet_coat_gentle");
  });
});

describe("paddleMixTypes", () => {
  it("returns 5 types", () => {
    expect(paddleMixTypes()).toHaveLength(5);
  });
});
