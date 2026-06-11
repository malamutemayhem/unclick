import { describe, it, expect } from "vitest";
import {
  tempAccuracy, throughput, uniformity, rampControl,
  kcCost, programmable, forCeramics, kilnConfig,
  bestUse, kilnControllerTypes,
} from "../kiln-controller-calc.js";

describe("tempAccuracy", () => {
  it("programmable ramp best temp accuracy", () => {
    expect(tempAccuracy("programmable_ramp")).toBeGreaterThan(tempAccuracy("rotary_kiln"));
  });
});

describe("throughput", () => {
  it("rotary kiln highest throughput", () => {
    expect(throughput("rotary_kiln")).toBeGreaterThan(throughput("microwave_sinter"));
  });
});

describe("uniformity", () => {
  it("gas atmosphere best uniformity", () => {
    expect(uniformity("gas_atmosphere")).toBeGreaterThan(uniformity("pid_electric"));
  });
});

describe("rampControl", () => {
  it("programmable ramp best ramp control", () => {
    expect(rampControl("programmable_ramp")).toBeGreaterThan(rampControl("rotary_kiln"));
  });
});

describe("kcCost", () => {
  it("microwave sinter most expensive", () => {
    expect(kcCost("microwave_sinter")).toBeGreaterThan(kcCost("pid_electric"));
  });
});

describe("programmable", () => {
  it("programmable ramp is programmable", () => {
    expect(programmable("programmable_ramp")).toBe(true);
  });
  it("pid electric not programmable", () => {
    expect(programmable("pid_electric")).toBe(false);
  });
});

describe("forCeramics", () => {
  it("pid electric for ceramics", () => {
    expect(forCeramics("pid_electric")).toBe(true);
  });
  it("gas atmosphere not for ceramics", () => {
    expect(forCeramics("gas_atmosphere")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("microwave sinter uses 2450mhz rapid heat dense body", () => {
    expect(kilnConfig("microwave_sinter")).toBe("microwave_sinter_kiln_controller_2450mhz_rapid_heat_dense_body");
  });
});

describe("bestUse", () => {
  it("rotary kiln for cement calcine drum continuous feed dry", () => {
    expect(bestUse("rotary_kiln")).toBe("cement_calcine_rotary_kiln_controller_drum_continuous_feed_dry");
  });
});

describe("kilnControllerTypes", () => {
  it("returns 5 types", () => {
    expect(kilnControllerTypes()).toHaveLength(5);
  });
});
