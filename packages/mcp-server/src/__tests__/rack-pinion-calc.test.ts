import { describe, it, expect } from "vitest";
import {
  forceCapacity, throughput, posAccuracy, travelLength,
  rpCost, preloaded, forGantry, rackConfig,
  bestUse, rackPinionTypes,
} from "../rack-pinion-calc.js";

describe("forceCapacity", () => {
  it("planetary best force capacity", () => {
    expect(forceCapacity("planetary_rack")).toBeGreaterThan(forceCapacity("spur_rack"));
  });
});

describe("throughput", () => {
  it("spur rack highest throughput", () => {
    expect(throughput("spur_rack")).toBeGreaterThan(throughput("planetary_rack"));
  });
});

describe("posAccuracy", () => {
  it("precision rack best pos accuracy", () => {
    expect(posAccuracy("precision_rack")).toBeGreaterThan(posAccuracy("spur_rack"));
  });
});

describe("travelLength", () => {
  it("spur rack best travel length", () => {
    expect(travelLength("spur_rack")).toBeGreaterThan(travelLength("planetary_rack"));
  });
});

describe("rpCost", () => {
  it("planetary most expensive", () => {
    expect(rpCost("planetary_rack")).toBeGreaterThan(rpCost("spur_rack"));
  });
});

describe("preloaded", () => {
  it("precision rack is preloaded", () => {
    expect(preloaded("precision_rack")).toBe(true);
  });
  it("spur rack not preloaded", () => {
    expect(preloaded("spur_rack")).toBe(false);
  });
});

describe("forGantry", () => {
  it("helical rack for gantry", () => {
    expect(forGantry("helical_rack")).toBe(true);
  });
  it("planetary not for gantry", () => {
    expect(forGantry("planetary_rack")).toBe(false);
  });
});

describe("rackConfig", () => {
  it("dual pinion uses anti backlash preload split pinion precision", () => {
    expect(rackConfig("dual_pinion_rack")).toBe("dual_pinion_rack_anti_backlash_preload_split_pinion_precision");
  });
});

describe("bestUse", () => {
  it("helical for cnc gantry smooth quiet high force axis", () => {
    expect(bestUse("helical_rack")).toBe("cnc_gantry_helical_rack_pinion_smooth_quiet_high_force_axis");
  });
});

describe("rackPinionTypes", () => {
  it("returns 5 types", () => {
    expect(rackPinionTypes()).toHaveLength(5);
  });
});
