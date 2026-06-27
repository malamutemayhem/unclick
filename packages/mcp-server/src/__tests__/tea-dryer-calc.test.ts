import { describe, it, expect } from "vitest";
import {
  moistureControl, throughput, flavorPreserve, energyEfficiency,
  tdCost, continuous, forGreen, dryerConfig,
  bestUse, teaDryerTypes,
} from "../tea-dryer-calc.js";

describe("moistureControl", () => {
  it("fluidized bed best moisture control", () => {
    expect(moistureControl("fluidized_bed")).toBeGreaterThan(moistureControl("sun_dried"));
  });
});

describe("throughput", () => {
  it("endless chain highest throughput", () => {
    expect(throughput("endless_chain")).toBeGreaterThan(throughput("pan_fired"));
  });
});

describe("flavorPreserve", () => {
  it("pan fired best flavor preserve", () => {
    expect(flavorPreserve("pan_fired")).toBeGreaterThan(flavorPreserve("rotary_drum"));
  });
});

describe("energyEfficiency", () => {
  it("sun dried best energy efficiency", () => {
    expect(energyEfficiency("sun_dried")).toBeGreaterThan(energyEfficiency("pan_fired"));
  });
});

describe("tdCost", () => {
  it("fluidized bed most expensive", () => {
    expect(tdCost("fluidized_bed")).toBeGreaterThan(tdCost("sun_dried"));
  });
});

describe("continuous", () => {
  it("fluidized bed is continuous", () => {
    expect(continuous("fluidized_bed")).toBe(true);
  });
  it("pan fired not continuous", () => {
    expect(continuous("pan_fired")).toBe(false);
  });
});

describe("forGreen", () => {
  it("pan fired for green tea", () => {
    expect(forGreen("pan_fired")).toBe(true);
  });
  it("endless chain not for green", () => {
    expect(forGreen("endless_chain")).toBe(false);
  });
});

describe("dryerConfig", () => {
  it("sun dried uses bamboo tray outdoor natural", () => {
    expect(dryerConfig("sun_dried")).toBe("sun_dried_tea_bamboo_tray_outdoor_natural_slow_white_pu_erh");
  });
});

describe("bestUse", () => {
  it("pan fired for chinese green tea", () => {
    expect(bestUse("pan_fired")).toBe("chinese_green_tea_pan_fired_wok_kill_green_enzyme_halt_aroma_fix");
  });
});

describe("teaDryerTypes", () => {
  it("returns 5 types", () => {
    expect(teaDryerTypes()).toHaveLength(5);
  });
});
