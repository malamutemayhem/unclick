import { describe, it, expect } from "vitest";
import {
  wrapQuality, throughput, filmRange, shrinkUniformity,
  swCost, automated, forMultiPack, wrapperConfig,
  bestUse, shrinkWrapperTypes,
} from "../shrink-wrapper-calc.js";

describe("wrapQuality", () => {
  it("steam tunnel best wrap quality", () => {
    expect(wrapQuality("steam_tunnel")).toBeGreaterThan(wrapQuality("shrink_gun"));
  });
});

describe("throughput", () => {
  it("heat tunnel highest throughput", () => {
    expect(throughput("heat_tunnel")).toBeGreaterThan(throughput("shrink_gun"));
  });
});

describe("filmRange", () => {
  it("shrink gun best film range", () => {
    expect(filmRange("shrink_gun")).toBeGreaterThan(filmRange("steam_tunnel"));
  });
});

describe("shrinkUniformity", () => {
  it("steam tunnel best shrink uniformity", () => {
    expect(shrinkUniformity("steam_tunnel")).toBeGreaterThan(shrinkUniformity("shrink_gun"));
  });
});

describe("swCost", () => {
  it("steam tunnel most expensive", () => {
    expect(swCost("steam_tunnel")).toBeGreaterThan(swCost("shrink_gun"));
  });
});

describe("automated", () => {
  it("heat tunnel is automated", () => {
    expect(automated("heat_tunnel")).toBe(true);
  });
  it("shrink gun not automated", () => {
    expect(automated("shrink_gun")).toBe(false);
  });
});

describe("forMultiPack", () => {
  it("heat tunnel for multi pack", () => {
    expect(forMultiPack("heat_tunnel")).toBe(true);
  });
  it("steam tunnel not for multi pack", () => {
    expect(forMultiPack("steam_tunnel")).toBe(false);
  });
});

describe("wrapperConfig", () => {
  it("sleeve wrapper uses film sleeve seal cut tunnel shrink", () => {
    expect(wrapperConfig("sleeve_wrapper")).toBe("sleeve_wrapper_shrink_wrapper_film_sleeve_seal_cut_tunnel_shrink");
  });
});

describe("bestUse", () => {
  it("heat tunnel for tray bundle multi pack beverage wrap", () => {
    expect(bestUse("heat_tunnel")).toBe("tray_bundle_heat_tunnel_shrink_wrapper_multi_pack_beverage_wrap");
  });
});

describe("shrinkWrapperTypes", () => {
  it("returns 5 types", () => {
    expect(shrinkWrapperTypes()).toHaveLength(5);
  });
});
