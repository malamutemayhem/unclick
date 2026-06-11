import { describe, it, expect } from "vitest";
import {
  dataRate, determinism, deviceCount, itConvergence,
  ieCost, realTime, forMotionControl, transport,
  bestUse, industrialEthernetTypes,
} from "../industrial-ethernet-calc.js";

describe("dataRate", () => {
  it("ethercat highest data rate", () => {
    expect(dataRate("ethercat_distributed")).toBeGreaterThan(dataRate("modbus_tcp_ip"));
  });
});

describe("determinism", () => {
  it("ethercat most deterministic", () => {
    expect(determinism("ethercat_distributed")).toBeGreaterThan(determinism("modbus_tcp_ip"));
  });
});

describe("deviceCount", () => {
  it("ethernet ip highest device count", () => {
    expect(deviceCount("ethernet_ip_cip")).toBeGreaterThan(deviceCount("ethercat_distributed"));
  });
});

describe("itConvergence", () => {
  it("opc ua tsn best it convergence", () => {
    expect(itConvergence("opc_ua_tsn")).toBeGreaterThan(itConvergence("ethercat_distributed"));
  });
});

describe("ieCost", () => {
  it("opc ua tsn most expensive", () => {
    expect(ieCost("opc_ua_tsn")).toBeGreaterThan(ieCost("modbus_tcp_ip"));
  });
});

describe("realTime", () => {
  it("profinet is real time", () => {
    expect(realTime("profinet_rt_irt")).toBe(true);
  });
  it("modbus tcp not real time", () => {
    expect(realTime("modbus_tcp_ip")).toBe(false);
  });
});

describe("forMotionControl", () => {
  it("ethercat for motion control", () => {
    expect(forMotionControl("ethercat_distributed")).toBe(true);
  });
  it("ethernet ip not for motion control", () => {
    expect(forMotionControl("ethernet_ip_cip")).toBe(false);
  });
});

describe("transport", () => {
  it("ethercat uses processing on fly", () => {
    expect(transport("ethercat_distributed")).toBe("processing_on_fly_slave_fmmu_distributed_clock");
  });
});

describe("bestUse", () => {
  it("opc ua tsn for industry 4 0", () => {
    expect(bestUse("opc_ua_tsn")).toBe("industry_4_0_vendor_neutral_it_ot_converged_network");
  });
});

describe("industrialEthernetTypes", () => {
  it("returns 5 types", () => {
    expect(industrialEthernetTypes()).toHaveLength(5);
  });
});
