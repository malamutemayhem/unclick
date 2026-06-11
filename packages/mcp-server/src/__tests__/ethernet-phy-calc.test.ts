import { describe, it, expect } from "vitest";
import {
  dataRate, reach, latency, powerEff,
  phyCost, magsafe, forIndustrial, medium,
  bestUse, ethernetPhys,
} from "../ethernet-phy-calc.js";

describe("dataRate", () => {
  it("base cr dac highest data rate", () => {
    expect(dataRate("base_cr_dac")).toBeGreaterThan(dataRate("base_t_copper"));
  });
});

describe("reach", () => {
  it("base lr singlemode longest reach", () => {
    expect(reach("base_lr_singlemode")).toBeGreaterThan(reach("base_cr_dac"));
  });
});

describe("latency", () => {
  it("base cr dac lowest latency", () => {
    expect(latency("base_cr_dac")).toBeGreaterThan(latency("base_t1_automotive"));
  });
});

describe("powerEff", () => {
  it("base cr dac most power efficient", () => {
    expect(powerEff("base_cr_dac")).toBeGreaterThan(powerEff("base_t_copper"));
  });
});

describe("phyCost", () => {
  it("base lr singlemode most expensive", () => {
    expect(phyCost("base_lr_singlemode")).toBeGreaterThan(phyCost("base_t_copper"));
  });
});

describe("magsafe", () => {
  it("base t copper has mag jack", () => {
    expect(magsafe("base_t_copper")).toBe(true);
  });
  it("base sr multimode no mag jack", () => {
    expect(magsafe("base_sr_multimode")).toBe(false);
  });
});

describe("forIndustrial", () => {
  it("base t1 automotive for industrial", () => {
    expect(forIndustrial("base_t1_automotive")).toBe(true);
  });
  it("base sr multimode not for industrial", () => {
    expect(forIndustrial("base_sr_multimode")).toBe(false);
  });
});

describe("medium", () => {
  it("base cr dac uses twinax copper passive", () => {
    expect(medium("base_cr_dac")).toBe("twinax_copper_passive");
  });
});

describe("bestUse", () => {
  it("base t1 automotive best for vehicle sensor backbone", () => {
    expect(bestUse("base_t1_automotive")).toBe("vehicle_sensor_backbone");
  });
});

describe("ethernetPhys", () => {
  it("returns 5 types", () => {
    expect(ethernetPhys()).toHaveLength(5);
  });
});
