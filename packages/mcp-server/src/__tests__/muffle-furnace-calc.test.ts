import { describe, it, expect } from "vitest";
import {
  maxTemp, throughput, uniformity, rampRate,
  mfCost, programmable, forAsh, furnaceConfig,
  bestUse, muffleFurnaceTypes,
} from "../muffle-furnace-calc.js";

describe("maxTemp", () => {
  it("high temp best max temp", () => {
    expect(maxTemp("high_temp_muffle")).toBeGreaterThan(maxTemp("electric_muffle"));
  });
});

describe("throughput", () => {
  it("electric muffle highest throughput", () => {
    expect(throughput("electric_muffle")).toBeGreaterThan(throughput("vacuum_muffle"));
  });
});

describe("uniformity", () => {
  it("vacuum muffle best uniformity", () => {
    expect(uniformity("vacuum_muffle")).toBeGreaterThan(uniformity("electric_muffle"));
  });
});

describe("rampRate", () => {
  it("programmable best ramp rate", () => {
    expect(rampRate("programmable_muffle")).toBeGreaterThan(rampRate("electric_muffle"));
  });
});

describe("mfCost", () => {
  it("vacuum muffle most expensive", () => {
    expect(mfCost("vacuum_muffle")).toBeGreaterThan(mfCost("electric_muffle"));
  });
});

describe("programmable", () => {
  it("programmable muffle is programmable", () => {
    expect(programmable("programmable_muffle")).toBe(true);
  });
  it("electric muffle not programmable", () => {
    expect(programmable("electric_muffle")).toBe(false);
  });
});

describe("forAsh", () => {
  it("electric muffle for ash", () => {
    expect(forAsh("electric_muffle")).toBe(true);
  });
  it("vacuum muffle not for ash", () => {
    expect(forAsh("vacuum_muffle")).toBe(false);
  });
});

describe("furnaceConfig", () => {
  it("clean room uses hepa filtered low particle process", () => {
    expect(furnaceConfig("clean_room_muffle")).toBe("clean_room_muffle_furnace_hepa_filtered_low_particle_process");
  });
});

describe("bestUse", () => {
  it("high temp for ceramic sinter mosi2 element", () => {
    expect(bestUse("high_temp_muffle")).toBe("ceramic_sinter_high_temp_muffle_furnace_mosi2_element_1800c");
  });
});

describe("muffleFurnaceTypes", () => {
  it("returns 5 types", () => {
    expect(muffleFurnaceTypes()).toHaveLength(5);
  });
});
