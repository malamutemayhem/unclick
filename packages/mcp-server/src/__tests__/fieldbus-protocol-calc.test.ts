import { describe, it, expect } from "vitest";
import {
  dataRate, deviceCount, diagnostics, interoperability,
  fpCost, busPowered, forProcessControl, medium,
  bestUse, fieldbusProtocolTypes,
} from "../fieldbus-protocol-calc.js";

describe("dataRate", () => {
  it("profibus dp pa highest data rate", () => {
    expect(dataRate("profibus_dp_pa")).toBeGreaterThan(dataRate("hart_4_20ma_digital"));
  });
});

describe("deviceCount", () => {
  it("profibus dp pa highest device count", () => {
    expect(deviceCount("profibus_dp_pa")).toBeGreaterThan(deviceCount("hart_4_20ma_digital"));
  });
});

describe("diagnostics", () => {
  it("foundation fieldbus best diagnostics", () => {
    expect(diagnostics("foundation_fieldbus_h1")).toBeGreaterThan(diagnostics("modbus_rtu_485"));
  });
});

describe("interoperability", () => {
  it("modbus rtu highest interoperability", () => {
    expect(interoperability("modbus_rtu_485")).toBeGreaterThanOrEqual(interoperability("hart_4_20ma_digital"));
  });
});

describe("fpCost", () => {
  it("foundation fieldbus most expensive", () => {
    expect(fpCost("foundation_fieldbus_h1")).toBeGreaterThan(fpCost("modbus_rtu_485"));
  });
});

describe("busPowered", () => {
  it("hart is bus powered", () => {
    expect(busPowered("hart_4_20ma_digital")).toBe(true);
  });
  it("modbus rtu not bus powered", () => {
    expect(busPowered("modbus_rtu_485")).toBe(false);
  });
});

describe("forProcessControl", () => {
  it("foundation fieldbus for process control", () => {
    expect(forProcessControl("foundation_fieldbus_h1")).toBe(true);
  });
  it("modbus rtu not for process control", () => {
    expect(forProcessControl("modbus_rtu_485")).toBe(false);
  });
});

describe("medium", () => {
  it("canopen uses can bus trunk drop", () => {
    expect(medium("canopen_device_net")).toBe("can_bus_trunk_drop_topology_device_profile_object");
  });
});

describe("bestUse", () => {
  it("hart for retrofit analog loop", () => {
    expect(bestUse("hart_4_20ma_digital")).toBe("retrofit_analog_loop_add_diagnostics_no_rewire");
  });
});

describe("fieldbusProtocolTypes", () => {
  it("returns 5 types", () => {
    expect(fieldbusProtocolTypes()).toHaveLength(5);
  });
});
