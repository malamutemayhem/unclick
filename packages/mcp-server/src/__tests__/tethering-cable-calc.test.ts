import { describe, it, expect } from "vitest";
import {
  transferSpeed, cableReliability, flexibility, portStress,
  cableCost, powersCamera, lockingConnector, connectorType,
  bestSetup, tetheringCables,
} from "../tethering-cable-calc.js";

describe("transferSpeed", () => {
  it("thunderbolt max throughput fastest transfer", () => {
    expect(transferSpeed("thunderbolt_max_throughput")).toBeGreaterThan(transferSpeed("usb_a_standard_legacy"));
  });
});

describe("cableReliability", () => {
  it("thunderbolt max throughput most reliable", () => {
    expect(cableReliability("thunderbolt_max_throughput")).toBeGreaterThan(cableReliability("coiled_stretch_flexible"));
  });
});

describe("flexibility", () => {
  it("coiled stretch flexible most flexible", () => {
    expect(flexibility("coiled_stretch_flexible")).toBeGreaterThan(flexibility("thunderbolt_max_throughput"));
  });
});

describe("portStress", () => {
  it("right angle low profile least port stress", () => {
    expect(portStress("right_angle_low_profile")).toBeGreaterThan(portStress("usb_a_standard_legacy"));
  });
});

describe("cableCost", () => {
  it("thunderbolt max throughput most expensive", () => {
    expect(cableCost("thunderbolt_max_throughput")).toBeGreaterThan(cableCost("usb_a_standard_legacy"));
  });
});

describe("powersCamera", () => {
  it("usb c high speed powers camera", () => {
    expect(powersCamera("usb_c_high_speed")).toBe(true);
  });
  it("usb a standard legacy does not power camera", () => {
    expect(powersCamera("usb_a_standard_legacy")).toBe(false);
  });
});

describe("lockingConnector", () => {
  it("thunderbolt max throughput has locking connector", () => {
    expect(lockingConnector("thunderbolt_max_throughput")).toBe(true);
  });
  it("usb c high speed has no locking connector", () => {
    expect(lockingConnector("usb_c_high_speed")).toBe(false);
  });
});

describe("connectorType", () => {
  it("right angle low profile uses usb c 90 degree angle", () => {
    expect(connectorType("right_angle_low_profile")).toBe("usb_c_90_degree_angle");
  });
});

describe("bestSetup", () => {
  it("thunderbolt max throughput best for high res medium format", () => {
    expect(bestSetup("thunderbolt_max_throughput")).toBe("high_res_medium_format");
  });
});

describe("tetheringCables", () => {
  it("returns 5 types", () => {
    expect(tetheringCables()).toHaveLength(5);
  });
});
