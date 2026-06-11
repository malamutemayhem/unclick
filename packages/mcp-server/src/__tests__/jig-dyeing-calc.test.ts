import { describe, it, expect } from "vitest";
import {
  dyeEvenness, fabricCapacity, waterUsage, cycleTime,
  jgCost, enclosed, forHeavy, jigConfig,
  bestUse, jigDyeingTypes,
} from "../jig-dyeing-calc.js";

describe("dyeEvenness", () => {
  it("pressurized closed best dye evenness", () => {
    expect(dyeEvenness("pressurized_closed")).toBeGreaterThan(dyeEvenness("open_width_standard"));
  });
});

describe("fabricCapacity", () => {
  it("jumbo high capacity largest fabric capacity", () => {
    expect(fabricCapacity("jumbo_high_capacity")).toBeGreaterThan(fabricCapacity("hot_air_jig"));
  });
});

describe("waterUsage", () => {
  it("combined wash jig best water usage efficiency", () => {
    expect(waterUsage("combined_wash_jig")).toBeGreaterThan(waterUsage("jumbo_high_capacity"));
  });
});

describe("cycleTime", () => {
  it("hot air jig fastest cycle time", () => {
    expect(cycleTime("hot_air_jig")).toBeGreaterThan(cycleTime("jumbo_high_capacity"));
  });
});

describe("jgCost", () => {
  it("combined wash jig most expensive", () => {
    expect(jgCost("combined_wash_jig")).toBeGreaterThan(jgCost("open_width_standard"));
  });
});

describe("enclosed", () => {
  it("pressurized closed is enclosed", () => {
    expect(enclosed("pressurized_closed")).toBe(true);
  });
  it("open width standard not enclosed", () => {
    expect(enclosed("open_width_standard")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("jumbo high capacity for heavy fabric", () => {
    expect(forHeavy("jumbo_high_capacity")).toBe(true);
  });
  it("open width standard not for heavy", () => {
    expect(forHeavy("open_width_standard")).toBe(false);
  });
});

describe("jigConfig", () => {
  it("hot air jig uses hot air circulation", () => {
    expect(jigConfig("hot_air_jig")).toBe("hot_air_circulation_jig_fast_dry_cure_dye_fixation_combined");
  });
});

describe("bestUse", () => {
  it("open width standard for woven cotton batch", () => {
    expect(bestUse("open_width_standard")).toBe("woven_cotton_open_width_dyeing_batch_process_medium_volume");
  });
});

describe("jigDyeingTypes", () => {
  it("returns 5 types", () => {
    expect(jigDyeingTypes()).toHaveLength(5);
  });
});
