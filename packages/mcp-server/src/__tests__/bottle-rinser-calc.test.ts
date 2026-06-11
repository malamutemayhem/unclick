import { describe, it, expect } from "vitest";
import {
  cleanLevel, throughput, waterUsage, dryness,
  brCost, contactFree, forPharma, rinserConfig,
  bestUse, bottleRinserTypes,
} from "../bottle-rinser-calc.js";

describe("cleanLevel", () => {
  it("ozone rinse best clean level", () => {
    expect(cleanLevel("ozone_rinse")).toBeGreaterThan(cleanLevel("air_rinse"));
  });
});

describe("throughput", () => {
  it("air rinse highest throughput", () => {
    expect(throughput("air_rinse")).toBeGreaterThan(throughput("ozone_rinse"));
  });
});

describe("waterUsage", () => {
  it("air rinse best water usage (least water)", () => {
    expect(waterUsage("air_rinse")).toBeGreaterThan(waterUsage("water_rinse"));
  });
});

describe("dryness", () => {
  it("air rinse best dryness", () => {
    expect(dryness("air_rinse")).toBeGreaterThan(dryness("water_rinse"));
  });
});

describe("brCost", () => {
  it("ozone rinse most expensive", () => {
    expect(brCost("ozone_rinse")).toBeGreaterThan(brCost("air_rinse"));
  });
});

describe("contactFree", () => {
  it("air rinse is contact free", () => {
    expect(contactFree("air_rinse")).toBe(true);
  });
  it("water rinse not contact free", () => {
    expect(contactFree("water_rinse")).toBe(false);
  });
});

describe("forPharma", () => {
  it("ionized air for pharma", () => {
    expect(forPharma("ionized_air")).toBe(true);
  });
  it("air rinse not for pharma", () => {
    expect(forPharma("air_rinse")).toBe(false);
  });
});

describe("rinserConfig", () => {
  it("vacuum rinse uses suction extract debris particle dry", () => {
    expect(rinserConfig("vacuum_rinse")).toBe("vacuum_rinse_bottle_rinser_suction_extract_debris_particle_dry");
  });
});

describe("bestUse", () => {
  it("water rinse for glass bottle reuse recirculate clean", () => {
    expect(bestUse("water_rinse")).toBe("glass_bottle_water_rinse_bottle_rinser_reuse_recirculate_clean");
  });
});

describe("bottleRinserTypes", () => {
  it("returns 5 types", () => {
    expect(bottleRinserTypes()).toHaveLength(5);
  });
});
