import { describe, it, expect } from "vitest";
import {
  comfort, portability, weightCapacity, setupSpeed,
  chairCost, hasCupHolder, hasBackRest, frameMaterial,
  bestScene, campChairs,
} from "../camp-chair-calc.js";

describe("comfort", () => {
  it("zero gravity recline most comfortable", () => {
    expect(comfort("zero_gravity_recline")).toBeGreaterThan(comfort("stool_tripod_compact"));
  });
});

describe("portability", () => {
  it("backpacking ultralight most portable", () => {
    expect(portability("backpacking_ultralight")).toBeGreaterThan(portability("zero_gravity_recline"));
  });
});

describe("weightCapacity", () => {
  it("zero gravity recline highest weight capacity", () => {
    expect(weightCapacity("zero_gravity_recline")).toBeGreaterThan(weightCapacity("backpacking_ultralight"));
  });
});

describe("setupSpeed", () => {
  it("folding quad standard fastest setup", () => {
    expect(setupSpeed("folding_quad_standard")).toBeGreaterThan(setupSpeed("zero_gravity_recline"));
  });
});

describe("chairCost", () => {
  it("zero gravity recline most expensive", () => {
    expect(chairCost("zero_gravity_recline")).toBeGreaterThan(chairCost("stool_tripod_compact"));
  });
});

describe("hasCupHolder", () => {
  it("folding quad standard has cup holder", () => {
    expect(hasCupHolder("folding_quad_standard")).toBe(true);
  });
  it("backpacking ultralight does not", () => {
    expect(hasCupHolder("backpacking_ultralight")).toBe(false);
  });
});

describe("hasBackRest", () => {
  it("folding quad standard has back rest", () => {
    expect(hasBackRest("folding_quad_standard")).toBe(true);
  });
  it("stool tripod compact does not", () => {
    expect(hasBackRest("stool_tripod_compact")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("backpacking ultralight uses dac aluminum alloy", () => {
    expect(frameMaterial("backpacking_ultralight")).toBe("dac_aluminum_alloy");
  });
});

describe("bestScene", () => {
  it("zero gravity recline best for beach patio stargazing", () => {
    expect(bestScene("zero_gravity_recline")).toBe("beach_patio_stargazing");
  });
});

describe("campChairs", () => {
  it("returns 5 types", () => {
    expect(campChairs()).toHaveLength(5);
  });
});
