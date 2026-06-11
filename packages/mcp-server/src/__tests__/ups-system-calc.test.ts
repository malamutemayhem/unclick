import { describe, it, expect } from "vitest";
import {
  protection, throughput, efficiency, transferTime,
  usCost, trueOnline, forDataCenter, systemConfig,
  bestUse, upsSystemTypes,
} from "../ups-system-calc.js";

describe("protection", () => {
  it("online double best protection", () => {
    expect(protection("online_double")).toBeGreaterThan(protection("standby_offline"));
  });
});

describe("throughput", () => {
  it("standby offline highest throughput", () => {
    expect(throughput("standby_offline")).toBeGreaterThan(throughput("line_interactive"));
  });
});

describe("efficiency", () => {
  it("standby offline best efficiency", () => {
    expect(efficiency("standby_offline")).toBeGreaterThan(efficiency("online_double"));
  });
});

describe("transferTime", () => {
  it("online double best transfer time", () => {
    expect(transferTime("online_double")).toBeGreaterThan(transferTime("standby_offline"));
  });
});

describe("usCost", () => {
  it("rotary ups most expensive", () => {
    expect(usCost("rotary_ups")).toBeGreaterThan(usCost("standby_offline"));
  });
});

describe("trueOnline", () => {
  it("online double is true online", () => {
    expect(trueOnline("online_double")).toBe(true);
  });
  it("line interactive not true online", () => {
    expect(trueOnline("line_interactive")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("online double for data center", () => {
    expect(forDataCenter("online_double")).toBe(true);
  });
  it("standby offline not for data center", () => {
    expect(forDataCenter("standby_offline")).toBe(false);
  });
});

describe("systemConfig", () => {
  it("rotary ups uses flywheel motor generator kinetic energy store", () => {
    expect(systemConfig("rotary_ups")).toBe("rotary_ups_system_flywheel_motor_generator_kinetic_energy_store");
  });
});

describe("bestUse", () => {
  it("modular scalable for cloud dc hot swap grow as needed", () => {
    expect(bestUse("modular_scalable")).toBe("cloud_dc_modular_scalable_ups_system_hot_swap_grow_as_needed");
  });
});

describe("upsSystemTypes", () => {
  it("returns 5 types", () => {
    expect(upsSystemTypes()).toHaveLength(5);
  });
});
