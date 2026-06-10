import { describe, it, expect } from "vitest";
import {
  sleepComfort, packSize, noiseFree, adjustability,
  pillowCost, punctureProof, selfInflating, fillType,
  bestCamper, campPillows,
} from "../camp-pillow-calc.js";

describe("sleepComfort", () => {
  it("hybrid air foam top most sleep comfort", () => {
    expect(sleepComfort("hybrid_air_foam_top")).toBeGreaterThan(sleepComfort("stuff_sack_clothes_fill"));
  });
});

describe("packSize", () => {
  it("inflatable air valve smallest pack size", () => {
    expect(packSize("inflatable_air_valve")).toBeGreaterThan(packSize("compressible_foam_stuff"));
  });
});

describe("noiseFree", () => {
  it("compressible foam stuff most noise free", () => {
    expect(noiseFree("compressible_foam_stuff")).toBeGreaterThan(noiseFree("inflatable_air_valve"));
  });
});

describe("adjustability", () => {
  it("inflatable air valve most adjustable", () => {
    expect(adjustability("inflatable_air_valve")).toBeGreaterThan(adjustability("compressible_foam_stuff"));
  });
});

describe("pillowCost", () => {
  it("hybrid air foam top most expensive", () => {
    expect(pillowCost("hybrid_air_foam_top")).toBeGreaterThan(pillowCost("stuff_sack_clothes_fill"));
  });
});

describe("punctureProof", () => {
  it("compressible foam stuff is puncture proof", () => {
    expect(punctureProof("compressible_foam_stuff")).toBe(true);
  });
  it("inflatable air valve is not puncture proof", () => {
    expect(punctureProof("inflatable_air_valve")).toBe(false);
  });
});

describe("selfInflating", () => {
  it("self inflating open cell is self inflating", () => {
    expect(selfInflating("self_inflating_open_cell")).toBe(true);
  });
  it("inflatable air valve is not self inflating", () => {
    expect(selfInflating("inflatable_air_valve")).toBe(false);
  });
});

describe("fillType", () => {
  it("compressible foam stuff uses shredded memory foam", () => {
    expect(fillType("compressible_foam_stuff")).toBe("shredded_memory_foam");
  });
});

describe("bestCamper", () => {
  it("inflatable air valve best for ultralight gram counter", () => {
    expect(bestCamper("inflatable_air_valve")).toBe("ultralight_gram_counter");
  });
});

describe("campPillows", () => {
  it("returns 5 types", () => {
    expect(campPillows()).toHaveLength(5);
  });
});
