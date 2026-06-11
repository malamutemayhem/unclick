import { describe, it, expect } from "vitest";
import {
  maxSpeed, maxDistance, noiseImmunity, multiDrop,
  configCost, differential, forIndustrial, signalLevel,
  bestUse, uartConfigs,
} from "../uart-config-calc.js";

describe("maxSpeed", () => {
  it("usb to uart bridge fastest", () => {
    expect(maxSpeed("usb_to_uart_bridge")).toBeGreaterThan(maxSpeed("rs232_standard"));
  });
});

describe("maxDistance", () => {
  it("rs485 differential longest distance", () => {
    expect(maxDistance("rs485_differential")).toBeGreaterThan(maxDistance("ttl_logic_level"));
  });
});

describe("noiseImmunity", () => {
  it("rs485 differential best noise immunity", () => {
    expect(noiseImmunity("rs485_differential")).toBeGreaterThan(noiseImmunity("ttl_logic_level"));
  });
});

describe("multiDrop", () => {
  it("rs485 differential best multi drop", () => {
    expect(multiDrop("rs485_differential")).toBeGreaterThan(multiDrop("rs232_standard"));
  });
});

describe("configCost", () => {
  it("rs422 full duplex most expensive", () => {
    expect(configCost("rs422_full_duplex")).toBeGreaterThan(configCost("ttl_logic_level"));
  });
});

describe("differential", () => {
  it("rs485 differential is differential", () => {
    expect(differential("rs485_differential")).toBe(true);
  });
  it("rs232 standard not differential", () => {
    expect(differential("rs232_standard")).toBe(false);
  });
});

describe("forIndustrial", () => {
  it("rs485 differential is for industrial", () => {
    expect(forIndustrial("rs485_differential")).toBe(true);
  });
  it("ttl logic level not for industrial", () => {
    expect(forIndustrial("ttl_logic_level")).toBe(false);
  });
});

describe("signalLevel", () => {
  it("ttl logic level uses logic 3v3 or 5v", () => {
    expect(signalLevel("ttl_logic_level")).toBe("logic_3v3_or_5v");
  });
});

describe("bestUse", () => {
  it("rs485 differential best for industrial bus modbus", () => {
    expect(bestUse("rs485_differential")).toBe("industrial_bus_modbus");
  });
});

describe("uartConfigs", () => {
  it("returns 5 types", () => {
    expect(uartConfigs()).toHaveLength(5);
  });
});
