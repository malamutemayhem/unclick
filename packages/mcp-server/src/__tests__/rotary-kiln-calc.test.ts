import { describe, it, expect } from "vitest";
import {
  temperature, throughput, retention, versatility,
  rkCost, indirect, forCement, heating,
  bestUse, rotaryKilnTypes,
} from "../rotary-kiln-calc.js";

describe("temperature", () => {
  it("calcination highest temperature", () => {
    expect(temperature("calcination_high_temp")).toBeGreaterThan(temperature("direct_fired_co_current"));
  });
});

describe("throughput", () => {
  it("direct fired highest throughput", () => {
    expect(throughput("direct_fired_co_current")).toBeGreaterThan(throughput("indirect_fired_shell"));
  });
});

describe("retention", () => {
  it("incineration longest retention", () => {
    expect(retention("incineration_waste")).toBeGreaterThan(retention("direct_fired_co_current"));
  });
});

describe("versatility", () => {
  it("incineration most versatile", () => {
    expect(versatility("incineration_waste")).toBeGreaterThan(versatility("reduction_metallurgical"));
  });
});

describe("rkCost", () => {
  it("reduction most expensive", () => {
    expect(rkCost("reduction_metallurgical")).toBeGreaterThan(rkCost("direct_fired_co_current"));
  });
});

describe("indirect", () => {
  it("indirect fired is indirect", () => {
    expect(indirect("indirect_fired_shell")).toBe(true);
  });
  it("direct fired not indirect", () => {
    expect(indirect("direct_fired_co_current")).toBe(false);
  });
});

describe("forCement", () => {
  it("calcination for cement", () => {
    expect(forCement("calcination_high_temp")).toBe(true);
  });
  it("incineration not for cement", () => {
    expect(forCement("incineration_waste")).toBe(false);
  });
});

describe("heating", () => {
  it("incineration uses co fired waste burner", () => {
    expect(heating("incineration_waste")).toBe("co_fired_waste_auxiliary_burner");
  });
});

describe("bestUse", () => {
  it("reduction for iron ore titanium", () => {
    expect(bestUse("reduction_metallurgical")).toBe("iron_ore_reduction_titanium_process");
  });
});

describe("rotaryKilnTypes", () => {
  it("returns 5 types", () => {
    expect(rotaryKilnTypes()).toHaveLength(5);
  });
});
