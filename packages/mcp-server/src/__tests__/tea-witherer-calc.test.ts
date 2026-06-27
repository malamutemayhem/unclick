import { describe, it, expect } from "vitest";
import {
  moistureLoss, uniformity, throughput, aroma,
  twCost, forced, forOolong, withererConfig,
  bestUse, teaWithererTypes,
} from "../tea-witherer-calc.js";

describe("moistureLoss", () => {
  it("drum witherer best moisture loss", () => {
    expect(moistureLoss("drum_witherer")).toBeGreaterThan(moistureLoss("solar_witherer"));
  });
});

describe("uniformity", () => {
  it("tunnel witherer best uniformity", () => {
    expect(uniformity("tunnel_witherer")).toBeGreaterThan(uniformity("solar_witherer"));
  });
});

describe("throughput", () => {
  it("drum witherer highest throughput", () => {
    expect(throughput("drum_witherer")).toBeGreaterThan(throughput("indoor_rack"));
  });
});

describe("aroma", () => {
  it("indoor rack best aroma", () => {
    expect(aroma("indoor_rack")).toBeGreaterThan(aroma("drum_witherer"));
  });
});

describe("twCost", () => {
  it("tunnel witherer most expensive", () => {
    expect(twCost("tunnel_witherer")).toBeGreaterThan(twCost("solar_witherer"));
  });
});

describe("forced", () => {
  it("trough witherer is forced air", () => {
    expect(forced("trough_witherer")).toBe(true);
  });
  it("solar witherer not forced", () => {
    expect(forced("solar_witherer")).toBe(false);
  });
});

describe("forOolong", () => {
  it("indoor rack for oolong", () => {
    expect(forOolong("indoor_rack")).toBe(true);
  });
  it("trough witherer not for oolong", () => {
    expect(forOolong("trough_witherer")).toBe(false);
  });
});

describe("withererConfig", () => {
  it("solar witherer uses outdoor tray sunlight natural", () => {
    expect(withererConfig("solar_witherer")).toBe("solar_witherer_outdoor_tray_sunlight_natural_slow_oolong_white");
  });
});

describe("bestUse", () => {
  it("indoor rack for premium oolong", () => {
    expect(bestUse("indoor_rack")).toBe("premium_oolong_indoor_rack_wither_bamboo_shelf_slow_aroma_complex");
  });
});

describe("teaWithererTypes", () => {
  it("returns 5 types", () => {
    expect(teaWithererTypes()).toHaveLength(5);
  });
});
