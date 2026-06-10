import { describe, it, expect } from "vitest";
import {
  coverageRange, throughput, setupEase, seamlessRoaming,
  extenderCost, dualBand, ethernetBackhaul, connectionMethod,
  bestScenario, wifiExtenders,
} from "../wifi-extender-calc.js";

describe("coverageRange", () => {
  it("mesh node system best coverage range", () => {
    expect(coverageRange("mesh_node_system")).toBeGreaterThan(coverageRange("plug_in_repeater"));
  });
});

describe("throughput", () => {
  it("mesh node system best throughput", () => {
    expect(throughput("mesh_node_system")).toBeGreaterThan(throughput("plug_in_repeater"));
  });
});

describe("setupEase", () => {
  it("plug in repeater easiest setup", () => {
    expect(setupEase("plug_in_repeater")).toBeGreaterThan(setupEase("outdoor_bridge"));
  });
});

describe("seamlessRoaming", () => {
  it("mesh node system best seamless roaming", () => {
    expect(seamlessRoaming("mesh_node_system")).toBeGreaterThan(seamlessRoaming("plug_in_repeater"));
  });
});

describe("extenderCost", () => {
  it("mesh node system most expensive", () => {
    expect(extenderCost("mesh_node_system")).toBeGreaterThan(extenderCost("plug_in_repeater"));
  });
});

describe("dualBand", () => {
  it("mesh node system is dual band", () => {
    expect(dualBand("mesh_node_system")).toBe(true);
  });
  it("powerline adapter is not", () => {
    expect(dualBand("powerline_adapter")).toBe(false);
  });
});

describe("ethernetBackhaul", () => {
  it("mesh node system has ethernet backhaul", () => {
    expect(ethernetBackhaul("mesh_node_system")).toBe(true);
  });
  it("plug in repeater does not", () => {
    expect(ethernetBackhaul("plug_in_repeater")).toBe(false);
  });
});

describe("connectionMethod", () => {
  it("powerline adapter uses electrical wiring bridge", () => {
    expect(connectionMethod("powerline_adapter")).toBe("electrical_wiring_bridge");
  });
});

describe("bestScenario", () => {
  it("mesh node system for whole home coverage", () => {
    expect(bestScenario("mesh_node_system")).toBe("whole_home_coverage");
  });
});

describe("wifiExtenders", () => {
  it("returns 5 types", () => {
    expect(wifiExtenders()).toHaveLength(5);
  });
});
