import { describe, it, expect } from "vitest";
import {
  throughput, security, interop, determinism,
  spCost, encrypted, forUtility, transport,
  bestUse, scadaProtocolTypes,
} from "../scada-protocol-calc.js";

describe("throughput", () => {
  it("iec 61850 highest throughput", () => {
    expect(throughput("iec_61850_substation")).toBeGreaterThan(throughput("modbus_rtu_serial"));
  });
});

describe("security", () => {
  it("opc ua best security", () => {
    expect(security("opc_ua_unified_arch")).toBeGreaterThan(security("modbus_rtu_serial"));
  });
});

describe("interop", () => {
  it("opc ua best interop", () => {
    expect(interop("opc_ua_unified_arch")).toBeGreaterThan(interop("profinet_io_realtime"));
  });
});

describe("determinism", () => {
  it("iec 61850 most deterministic", () => {
    expect(determinism("iec_61850_substation")).toBeGreaterThan(determinism("opc_ua_unified_arch"));
  });
});

describe("spCost", () => {
  it("iec 61850 most expensive", () => {
    expect(spCost("iec_61850_substation")).toBeGreaterThan(spCost("modbus_rtu_serial"));
  });
});

describe("encrypted", () => {
  it("dnp3 is encrypted", () => {
    expect(encrypted("dnp3_distributed_network")).toBe(true);
  });
  it("modbus not encrypted", () => {
    expect(encrypted("modbus_rtu_serial")).toBe(false);
  });
});

describe("forUtility", () => {
  it("dnp3 for utility", () => {
    expect(forUtility("dnp3_distributed_network")).toBe(true);
  });
  it("modbus not for utility", () => {
    expect(forUtility("modbus_rtu_serial")).toBe(false);
  });
});

describe("transport", () => {
  it("profinet uses ethernet cyclic", () => {
    expect(transport("profinet_io_realtime")).toBe("ethernet_cyclic_isochronous_rt");
  });
});

describe("bestUse", () => {
  it("modbus for legacy plc", () => {
    expect(bestUse("modbus_rtu_serial")).toBe("legacy_plc_simple_register_poll");
  });
});

describe("scadaProtocolTypes", () => {
  it("returns 5 types", () => {
    expect(scadaProtocolTypes()).toHaveLength(5);
  });
});
