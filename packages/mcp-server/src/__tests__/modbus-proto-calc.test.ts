import { describe, it, expect } from "vitest";
import {
  throughput, deviceCount, reliability, latency,
  protoCost, ethernet, forPlc, transport,
  bestUse, modbusProtos,
} from "../modbus-proto-calc.js";

describe("throughput", () => {
  it("modbus udp fast highest throughput", () => {
    expect(throughput("modbus_udp_fast")).toBeGreaterThan(throughput("modbus_ascii_text"));
  });
});

describe("deviceCount", () => {
  it("modbus tcp ip most devices", () => {
    expect(deviceCount("modbus_tcp_ip")).toBeGreaterThan(deviceCount("modbus_rtu_serial"));
  });
});

describe("reliability", () => {
  it("modbus plus token most reliable", () => {
    expect(reliability("modbus_plus_token")).toBeGreaterThan(reliability("modbus_udp_fast"));
  });
});

describe("latency", () => {
  it("modbus udp fast best latency", () => {
    expect(latency("modbus_udp_fast")).toBeGreaterThan(latency("modbus_ascii_text"));
  });
});

describe("protoCost", () => {
  it("modbus plus token most expensive", () => {
    expect(protoCost("modbus_plus_token")).toBeGreaterThan(protoCost("modbus_rtu_serial"));
  });
});

describe("ethernet", () => {
  it("modbus tcp ip uses ethernet", () => {
    expect(ethernet("modbus_tcp_ip")).toBe(true);
  });
  it("modbus rtu serial not ethernet", () => {
    expect(ethernet("modbus_rtu_serial")).toBe(false);
  });
});

describe("forPlc", () => {
  it("modbus rtu serial is for plc", () => {
    expect(forPlc("modbus_rtu_serial")).toBe(true);
  });
  it("modbus udp fast not for plc", () => {
    expect(forPlc("modbus_udp_fast")).toBe(false);
  });
});

describe("transport", () => {
  it("modbus rtu serial uses rs485 binary frame", () => {
    expect(transport("modbus_rtu_serial")).toBe("rs485_binary_frame");
  });
});

describe("bestUse", () => {
  it("modbus tcp ip best for scada ethernet gateway", () => {
    expect(bestUse("modbus_tcp_ip")).toBe("scada_ethernet_gateway");
  });
});

describe("modbusProtos", () => {
  it("returns 5 types", () => {
    expect(modbusProtos()).toHaveLength(5);
  });
});
