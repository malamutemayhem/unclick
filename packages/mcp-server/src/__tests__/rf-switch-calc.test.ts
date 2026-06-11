import { describe, it, expect } from "vitest";
import {
  insertionLoss, isolation, linearity, switchSpeed,
  swCost, hotSwitch, forMmwave, technology,
  bestUse, rfSwitches,
} from "../rf-switch-calc.js";

describe("insertionLoss", () => {
  it("mems mechanical lowest insertion loss", () => {
    expect(insertionLoss("mems_mechanical")).toBeGreaterThan(insertionLoss("pin_diode"));
  });
});

describe("isolation", () => {
  it("mems mechanical best isolation", () => {
    expect(isolation("mems_mechanical")).toBeGreaterThan(isolation("soi_cmos"));
  });
});

describe("linearity", () => {
  it("mems mechanical best linearity", () => {
    expect(linearity("mems_mechanical")).toBeGreaterThan(linearity("soi_cmos"));
  });
});

describe("switchSpeed", () => {
  it("soi cmos fastest switch speed", () => {
    expect(switchSpeed("soi_cmos")).toBeGreaterThan(switchSpeed("mems_mechanical"));
  });
});

describe("swCost", () => {
  it("mems mechanical most expensive", () => {
    expect(swCost("mems_mechanical")).toBeGreaterThan(swCost("soi_cmos"));
  });
});

describe("hotSwitch", () => {
  it("soi cmos supports hot switch", () => {
    expect(hotSwitch("soi_cmos")).toBe(true);
  });
  it("mems mechanical no hot switch", () => {
    expect(hotSwitch("mems_mechanical")).toBe(false);
  });
});

describe("forMmwave", () => {
  it("mems mechanical is for mmwave", () => {
    expect(forMmwave("mems_mechanical")).toBe(true);
  });
  it("pin diode not for mmwave", () => {
    expect(forMmwave("pin_diode")).toBe(false);
  });
});

describe("technology", () => {
  it("mems mechanical uses cantilever contact", () => {
    expect(technology("mems_mechanical")).toBe("cantilever_contact");
  });
});

describe("bestUse", () => {
  it("soi cmos best for phone antenna tuner", () => {
    expect(bestUse("soi_cmos")).toBe("phone_antenna_tuner");
  });
});

describe("rfSwitches", () => {
  it("returns 5 types", () => {
    expect(rfSwitches()).toHaveLength(5);
  });
});
