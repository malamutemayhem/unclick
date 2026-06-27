import { describe, it, expect } from "vitest";
import {
  printSpeed, colorRegistration, detailResolution, repeatLength,
  rspCost, continuous, forStretch, screenConfig,
  bestUse, rotaryScreenPrintTypes,
} from "../rotary-screen-print-calc.js";

describe("printSpeed", () => {
  it("multi color inline fastest print speed", () => {
    expect(printSpeed("multi_color_inline")).toBeGreaterThan(printSpeed("high_mesh_fine"));
  });
});

describe("colorRegistration", () => {
  it("multi color inline best color registration", () => {
    expect(colorRegistration("multi_color_inline")).toBeGreaterThan(colorRegistration("lacquer_mesh"));
  });
});

describe("detailResolution", () => {
  it("high mesh fine best detail resolution", () => {
    expect(detailResolution("high_mesh_fine")).toBeGreaterThan(detailResolution("lacquer_mesh"));
  });
});

describe("repeatLength", () => {
  it("magnetic rod good repeat length", () => {
    expect(repeatLength("magnetic_rod")).toBeGreaterThan(repeatLength("lacquer_mesh"));
  });
});

describe("rspCost", () => {
  it("multi color inline most expensive", () => {
    expect(rspCost("multi_color_inline")).toBeGreaterThan(rspCost("lacquer_mesh"));
  });
});

describe("continuous", () => {
  it("all types are continuous", () => {
    expect(continuous("nickel_galvano")).toBe(true);
    expect(continuous("multi_color_inline")).toBe(true);
  });
});

describe("forStretch", () => {
  it("magnetic rod for stretch", () => {
    expect(forStretch("magnetic_rod")).toBe(true);
  });
  it("nickel galvano not for stretch", () => {
    expect(forStretch("nickel_galvano")).toBe(false);
  });
});

describe("screenConfig", () => {
  it("high mesh fine uses ultra fine mesh", () => {
    expect(screenConfig("high_mesh_fine")).toBe("ultra_fine_mesh_125_plus_high_detail_halftone_photographic");
  });
});

describe("bestUse", () => {
  it("lacquer mesh for home textile bedding", () => {
    expect(bestUse("lacquer_mesh")).toBe("home_textile_bedding_curtain_medium_detail_cost_effective_run");
  });
});

describe("rotaryScreenPrintTypes", () => {
  it("returns 5 types", () => {
    expect(rotaryScreenPrintTypes()).toHaveLength(5);
  });
});
