import { describe, it, expect } from "vitest";
import {
  protocolSupport, throughput, security, manageability,
  igCost, edgeCompute, forCloudConnect, architecture,
  bestUse, industrialGatewayTypes,
} from "../industrial-gateway-calc.js";

describe("protocolSupport", () => {
  it("iot edge gateway widest protocol support", () => {
    expect(protocolSupport("iot_edge_gateway")).toBeGreaterThan(protocolSupport("remote_io_gateway"));
  });
});

describe("throughput", () => {
  it("remote io gateway highest throughput", () => {
    expect(throughput("remote_io_gateway")).toBeGreaterThan(throughput("protocol_converter_serial"));
  });
});

describe("security", () => {
  it("firewall dmz gateway best security", () => {
    expect(security("firewall_dmz_gateway")).toBeGreaterThan(security("protocol_converter_serial"));
  });
});

describe("manageability", () => {
  it("iot edge gateway best manageability", () => {
    expect(manageability("iot_edge_gateway")).toBeGreaterThan(manageability("protocol_converter_serial"));
  });
});

describe("igCost", () => {
  it("firewall dmz gateway most expensive", () => {
    expect(igCost("firewall_dmz_gateway")).toBeGreaterThan(igCost("protocol_converter_serial"));
  });
});

describe("edgeCompute", () => {
  it("iot edge gateway has edge compute", () => {
    expect(edgeCompute("iot_edge_gateway")).toBe(true);
  });
  it("protocol converter no edge compute", () => {
    expect(edgeCompute("protocol_converter_serial")).toBe(false);
  });
});

describe("forCloudConnect", () => {
  it("cloud historian bridge for cloud connect", () => {
    expect(forCloudConnect("cloud_historian_bridge")).toBe(true);
  });
  it("remote io gateway not for cloud connect", () => {
    expect(forCloudConnect("remote_io_gateway")).toBe(false);
  });
});

describe("architecture", () => {
  it("firewall dmz uses data diode ot it boundary", () => {
    expect(architecture("firewall_dmz_gateway")).toBe("industrial_firewall_dmz_data_diode_ot_it_boundary");
  });
});

describe("bestUse", () => {
  it("protocol converter for legacy plc integration", () => {
    expect(bestUse("protocol_converter_serial")).toBe("legacy_plc_integration_serial_to_ethernet_bridge");
  });
});

describe("industrialGatewayTypes", () => {
  it("returns 5 types", () => {
    expect(industrialGatewayTypes()).toHaveLength(5);
  });
});
