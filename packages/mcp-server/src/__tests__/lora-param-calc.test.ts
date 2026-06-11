import { describe, it, expect } from "vitest";
import {
  range, powerEff, throughput, latency,
  loraCost, alwaysOn, forMeter, access,
  bestUse, loraParams,
} from "../lora-param-calc.js";

describe("range", () => {
  it("lr fhss satellite longest range", () => {
    expect(range("lr_fhss_satellite")).toBeGreaterThan(range("lora_mesh_p2p"));
  });
});

describe("powerEff", () => {
  it("lora wan class a most power efficient", () => {
    expect(powerEff("lora_wan_class_a")).toBeGreaterThan(powerEff("lora_wan_class_c"));
  });
});

describe("throughput", () => {
  it("lora wan class c highest throughput", () => {
    expect(throughput("lora_wan_class_c")).toBeGreaterThan(throughput("lora_wan_class_a"));
  });
});

describe("latency", () => {
  it("lora wan class c lowest latency", () => {
    expect(latency("lora_wan_class_c")).toBeGreaterThan(latency("lora_wan_class_a"));
  });
});

describe("loraCost", () => {
  it("lr fhss satellite most expensive", () => {
    expect(loraCost("lr_fhss_satellite")).toBeGreaterThan(loraCost("lora_wan_class_a"));
  });
});

describe("alwaysOn", () => {
  it("lora wan class c is always on", () => {
    expect(alwaysOn("lora_wan_class_c")).toBe(true);
  });
  it("lora wan class a not always on", () => {
    expect(alwaysOn("lora_wan_class_a")).toBe(false);
  });
});

describe("forMeter", () => {
  it("lora wan class b for meter", () => {
    expect(forMeter("lora_wan_class_b")).toBe(true);
  });
  it("lora mesh p2p not for meter", () => {
    expect(forMeter("lora_mesh_p2p")).toBe(false);
  });
});

describe("access", () => {
  it("lr fhss satellite uses freq hopping leo uplink", () => {
    expect(access("lr_fhss_satellite")).toBe("freq_hopping_leo_uplink");
  });
});

describe("bestUse", () => {
  it("lora wan class a best for remote sensor battery", () => {
    expect(bestUse("lora_wan_class_a")).toBe("remote_sensor_battery");
  });
});

describe("loraParams", () => {
  it("returns 5 types", () => {
    expect(loraParams()).toHaveLength(5);
  });
});
