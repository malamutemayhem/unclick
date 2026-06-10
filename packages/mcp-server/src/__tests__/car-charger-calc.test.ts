import { describe, it, expect } from "vitest";
import {
  chargingSpeed, portCount, compactSize, deviceCompat,
  chargerCost, handsFree, fastChargeProto, connectorType,
  bestDriver, carChargers,
} from "../car-charger-calc.js";

describe("chargingSpeed", () => {
  it("inverter ac outlet fastest charging", () => {
    expect(chargingSpeed("inverter_ac_outlet")).toBeGreaterThan(chargingSpeed("single_usb_a_basic"));
  });
});

describe("portCount", () => {
  it("multi port hub most ports", () => {
    expect(portCount("multi_port_hub")).toBeGreaterThan(portCount("single_usb_a_basic"));
  });
});

describe("compactSize", () => {
  it("single usb a basic most compact", () => {
    expect(compactSize("single_usb_a_basic")).toBeGreaterThan(compactSize("inverter_ac_outlet"));
  });
});

describe("deviceCompat", () => {
  it("inverter ac outlet widest compatibility", () => {
    expect(deviceCompat("inverter_ac_outlet")).toBeGreaterThan(deviceCompat("wireless_qi_mount"));
  });
});

describe("chargerCost", () => {
  it("inverter ac outlet most expensive", () => {
    expect(chargerCost("inverter_ac_outlet")).toBeGreaterThan(chargerCost("single_usb_a_basic"));
  });
});

describe("handsFree", () => {
  it("wireless qi mount is hands free", () => {
    expect(handsFree("wireless_qi_mount")).toBe(true);
  });
  it("dual usb c fast is not", () => {
    expect(handsFree("dual_usb_c_fast")).toBe(false);
  });
});

describe("fastChargeProto", () => {
  it("dual usb c fast supports fast charge", () => {
    expect(fastChargeProto("dual_usb_c_fast")).toBe(true);
  });
  it("single usb a basic does not", () => {
    expect(fastChargeProto("single_usb_a_basic")).toBe(false);
  });
});

describe("connectorType", () => {
  it("wireless qi mount uses qi 15w magnetic coil", () => {
    expect(connectorType("wireless_qi_mount")).toBe("qi_15w_magnetic_coil");
  });
});

describe("bestDriver", () => {
  it("multi port hub best for family road trip", () => {
    expect(bestDriver("multi_port_hub")).toBe("family_road_trip");
  });
});

describe("carChargers", () => {
  it("returns 5 types", () => {
    expect(carChargers()).toHaveLength(5);
  });
});
