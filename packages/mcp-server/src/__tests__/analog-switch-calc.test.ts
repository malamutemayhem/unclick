import { describe, it, expect } from "vitest";
import {
  onResist, offIsolation, bandwidth, chargeInject,
  asCost, bidirectional, forAudio, topology,
  bestUse, analogSwitches,
} from "../analog-switch-calc.js";

describe("onResist", () => {
  it("t gate lowest on resistance", () => {
    expect(onResist("t_gate_transmission")).toBeGreaterThan(onResist("high_voltage_nmos"));
  });
});

describe("offIsolation", () => {
  it("high voltage nmos best off isolation", () => {
    expect(offIsolation("high_voltage_nmos")).toBeGreaterThan(offIsolation("spst_nmos_single"));
  });
});

describe("bandwidth", () => {
  it("t gate highest bandwidth", () => {
    expect(bandwidth("t_gate_transmission")).toBeGreaterThan(bandwidth("mux_4to1_cmos"));
  });
});

describe("chargeInject", () => {
  it("t gate best charge injection", () => {
    expect(chargeInject("t_gate_transmission")).toBeGreaterThan(chargeInject("high_voltage_nmos"));
  });
});

describe("asCost", () => {
  it("high voltage nmos most expensive", () => {
    expect(asCost("high_voltage_nmos")).toBeGreaterThan(asCost("spst_nmos_single"));
  });
});

describe("bidirectional", () => {
  it("spdt cmos is bidirectional", () => {
    expect(bidirectional("spdt_cmos_complementary")).toBe(true);
  });
  it("high voltage nmos not bidirectional", () => {
    expect(bidirectional("high_voltage_nmos")).toBe(false);
  });
});

describe("forAudio", () => {
  it("t gate for audio", () => {
    expect(forAudio("t_gate_transmission")).toBe(true);
  });
  it("mux 4to1 not for audio", () => {
    expect(forAudio("mux_4to1_cmos")).toBe(false);
  });
});

describe("topology", () => {
  it("t gate uses parallel nmos pmos pair", () => {
    expect(topology("t_gate_transmission")).toBe("parallel_nmos_pmos_pair");
  });
});

describe("bestUse", () => {
  it("mux 4to1 best for sensor multiplex", () => {
    expect(bestUse("mux_4to1_cmos")).toBe("sensor_channel_multiplex");
  });
});

describe("analogSwitches", () => {
  it("returns 5 types", () => {
    expect(analogSwitches()).toHaveLength(5);
  });
});
