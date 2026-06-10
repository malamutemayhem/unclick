import { describe, it, expect } from "vitest";
import {
  durability, comfort, adjustability, safety,
  collarCost, reflective, hasGps, collarMaterial,
  bestPet, petCollars,
} from "../pet-collar-calc.js";

describe("durability", () => {
  it("leather rolled classic most durable", () => {
    expect(durability("leather_rolled_classic")).toBeGreaterThan(durability("breakaway_safety_cat"));
  });
});

describe("comfort", () => {
  it("leather rolled classic most comfortable", () => {
    expect(comfort("leather_rolled_classic")).toBeGreaterThan(comfort("smart_gps_tracker"));
  });
});

describe("adjustability", () => {
  it("martingale limited slip most adjustable", () => {
    expect(adjustability("martingale_limited_slip")).toBeGreaterThan(adjustability("leather_rolled_classic"));
  });
});

describe("safety", () => {
  it("breakaway safety cat safest", () => {
    expect(safety("breakaway_safety_cat")).toBeGreaterThan(safety("nylon_buckle_basic"));
  });
});

describe("collarCost", () => {
  it("smart gps tracker most expensive", () => {
    expect(collarCost("smart_gps_tracker")).toBeGreaterThan(collarCost("nylon_buckle_basic"));
  });
});

describe("reflective", () => {
  it("nylon buckle basic is reflective", () => {
    expect(reflective("nylon_buckle_basic")).toBe(true);
  });
  it("leather rolled classic is not", () => {
    expect(reflective("leather_rolled_classic")).toBe(false);
  });
});

describe("hasGps", () => {
  it("smart gps tracker has gps", () => {
    expect(hasGps("smart_gps_tracker")).toBe(true);
  });
  it("nylon buckle basic does not", () => {
    expect(hasGps("nylon_buckle_basic")).toBe(false);
  });
});

describe("collarMaterial", () => {
  it("martingale limited slip uses nylon chain loop combo", () => {
    expect(collarMaterial("martingale_limited_slip")).toBe("nylon_chain_loop_combo");
  });
});

describe("bestPet", () => {
  it("breakaway safety cat best for indoor outdoor cat", () => {
    expect(bestPet("breakaway_safety_cat")).toBe("indoor_outdoor_cat");
  });
});

describe("petCollars", () => {
  it("returns 5 types", () => {
    expect(petCollars()).toHaveLength(5);
  });
});
