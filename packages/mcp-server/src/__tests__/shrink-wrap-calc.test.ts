import { describe, it, expect } from "vitest";
import {
  speed, filmUsage, sealQuality, flexibility,
  swCost, continuous, forRetail, film,
  bestUse, shrinkWrapTypes,
} from "../shrink-wrap-calc.js";

describe("speed", () => {
  it("sleeve sealer and side sealer fastest", () => {
    expect(speed("sleeve_sealer")).toBeGreaterThan(speed("l_bar_sealer"));
    expect(speed("side_sealer")).toBeGreaterThan(speed("l_bar_sealer"));
  });
});

describe("filmUsage", () => {
  it("side sealer best film usage", () => {
    expect(filmUsage("side_sealer")).toBeGreaterThan(filmUsage("l_bar_sealer"));
  });
});

describe("sealQuality", () => {
  it("sleeve sealer highest seal quality", () => {
    expect(sealQuality("sleeve_sealer")).toBeGreaterThan(sealQuality("shrink_bundler"));
  });
});

describe("flexibility", () => {
  it("l bar sealer most flexible", () => {
    expect(flexibility("l_bar_sealer")).toBeGreaterThan(flexibility("side_sealer"));
  });
});

describe("swCost", () => {
  it("side sealer most expensive", () => {
    expect(swCost("side_sealer")).toBeGreaterThan(swCost("l_bar_sealer"));
  });
});

describe("continuous", () => {
  it("sleeve sealer is continuous", () => {
    expect(continuous("sleeve_sealer")).toBe(true);
  });
  it("l bar sealer not continuous", () => {
    expect(continuous("l_bar_sealer")).toBe(false);
  });
});

describe("forRetail", () => {
  it("heat tunnel for retail", () => {
    expect(forRetail("heat_tunnel")).toBe(true);
  });
  it("shrink bundler not for retail", () => {
    expect(forRetail("shrink_bundler")).toBe(false);
  });
});

describe("film", () => {
  it("l bar sealer uses flat polyolefin sheet", () => {
    expect(film("l_bar_sealer")).toBe("flat_polyolefin_sheet_l_bar_cut_seal_manual_semi_auto");
  });
});

describe("bestUse", () => {
  it("shrink bundler for beverage multipack", () => {
    expect(bestUse("shrink_bundler")).toBe("beverage_multipack_canned_food_collation_bundle_no_tray");
  });
});

describe("shrinkWrapTypes", () => {
  it("returns 5 types", () => {
    expect(shrinkWrapTypes()).toHaveLength(5);
  });
});
