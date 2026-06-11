import { describe, it, expect } from "vitest";
import {
  range, batteryLife, dataRate, coverage,
  techCost, licensed, forMassive, spectrum,
  bestUse, lpwanTechs,
} from "../lpwan-tech-calc.js";

describe("range", () => {
  it("sigfox ultra nb longest range", () => {
    expect(range("sigfox_ultra_nb")).toBeGreaterThan(range("lte_m_cat_m1"));
  });
});

describe("batteryLife", () => {
  it("sigfox ultra nb best battery life", () => {
    expect(batteryLife("sigfox_ultra_nb")).toBeGreaterThan(batteryLife("lte_m_cat_m1"));
  });
});

describe("dataRate", () => {
  it("lte m cat m1 highest data rate", () => {
    expect(dataRate("lte_m_cat_m1")).toBeGreaterThan(dataRate("sigfox_ultra_nb"));
  });
});

describe("coverage", () => {
  it("nbiot cellular best coverage", () => {
    expect(coverage("nbiot_cellular")).toBeGreaterThan(coverage("lorawan_class_a"));
  });
});

describe("techCost", () => {
  it("lte m cat m1 most expensive", () => {
    expect(techCost("lte_m_cat_m1")).toBeGreaterThan(techCost("sigfox_ultra_nb"));
  });
});

describe("licensed", () => {
  it("nbiot cellular is licensed", () => {
    expect(licensed("nbiot_cellular")).toBe(true);
  });
  it("lorawan class a not licensed", () => {
    expect(licensed("lorawan_class_a")).toBe(false);
  });
});

describe("forMassive", () => {
  it("sigfox ultra nb is for massive", () => {
    expect(forMassive("sigfox_ultra_nb")).toBe(true);
  });
  it("lte m cat m1 not for massive", () => {
    expect(forMassive("lte_m_cat_m1")).toBe(false);
  });
});

describe("spectrum", () => {
  it("lorawan class a uses ism sub ghz unlicensed", () => {
    expect(spectrum("lorawan_class_a")).toBe("ism_sub_ghz_unlicensed");
  });
});

describe("bestUse", () => {
  it("nbiot cellular best for smart meter cellular", () => {
    expect(bestUse("nbiot_cellular")).toBe("smart_meter_cellular");
  });
});

describe("lpwanTechs", () => {
  it("returns 5 types", () => {
    expect(lpwanTechs()).toHaveLength(5);
  });
});
