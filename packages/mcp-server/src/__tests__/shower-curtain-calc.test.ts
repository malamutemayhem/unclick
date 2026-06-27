import { describe, it, expect } from "vitest";
import {
  waterResistance, styleAppeal, easyClean, airflow,
  curtainCost, machineWash, needsLiner, hangMethod,
  bestBathroom, showerCurtains,
} from "../shower-curtain-calc.js";

describe("waterResistance", () => {
  it("vinyl peva best water resistance", () => {
    expect(waterResistance("vinyl_peva")).toBeGreaterThan(waterResistance("linen_cotton"));
  });
});

describe("styleAppeal", () => {
  it("glass panel fixed most style appeal", () => {
    expect(styleAppeal("glass_panel_fixed")).toBeGreaterThan(styleAppeal("vinyl_peva"));
  });
});

describe("easyClean", () => {
  it("hookless snap easiest to clean", () => {
    expect(easyClean("hookless_snap")).toBeGreaterThan(easyClean("linen_cotton"));
  });
});

describe("airflow", () => {
  it("linen cotton best airflow", () => {
    expect(airflow("linen_cotton")).toBeGreaterThan(airflow("glass_panel_fixed"));
  });
});

describe("curtainCost", () => {
  it("glass panel fixed most expensive", () => {
    expect(curtainCost("glass_panel_fixed")).toBeGreaterThan(curtainCost("vinyl_peva"));
  });
});

describe("machineWash", () => {
  it("fabric polyester is machine washable", () => {
    expect(machineWash("fabric_polyester")).toBe(true);
  });
  it("vinyl peva is not", () => {
    expect(machineWash("vinyl_peva")).toBe(false);
  });
});

describe("needsLiner", () => {
  it("linen cotton needs liner", () => {
    expect(needsLiner("linen_cotton")).toBe(true);
  });
  it("vinyl peva does not", () => {
    expect(needsLiner("vinyl_peva")).toBe(false);
  });
});

describe("hangMethod", () => {
  it("hookless snap uses built in hook snap liner", () => {
    expect(hangMethod("hookless_snap")).toBe("built_in_hook_snap_liner");
  });
});

describe("bestBathroom", () => {
  it("glass panel fixed for modern walk in remodel", () => {
    expect(bestBathroom("glass_panel_fixed")).toBe("modern_walk_in_remodel");
  });
});

describe("showerCurtains", () => {
  it("returns 5 types", () => {
    expect(showerCurtains()).toHaveLength(5);
  });
});
