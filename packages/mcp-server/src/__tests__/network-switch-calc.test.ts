import { describe, it, expect } from "vitest";
import {
  ports, throughput, management, reliability,
  nsCost, managed, forDataCenter, backplane,
  bestUse, networkSwitchTypes,
} from "../network-switch-calc.js";

describe("ports", () => {
  it("core most ports", () => {
    expect(ports("layer3_core_modular")).toBeGreaterThan(ports("unmanaged_desktop_8_port"));
  });
});

describe("throughput", () => {
  it("core highest throughput", () => {
    expect(throughput("layer3_core_modular")).toBeGreaterThan(throughput("unmanaged_desktop_8_port"));
  });
});

describe("management", () => {
  it("core best management", () => {
    expect(management("layer3_core_modular")).toBeGreaterThan(management("unmanaged_desktop_8_port"));
  });
});

describe("reliability", () => {
  it("core most reliable", () => {
    expect(reliability("layer3_core_modular")).toBeGreaterThan(reliability("unmanaged_desktop_8_port"));
  });
});

describe("nsCost", () => {
  it("core most expensive", () => {
    expect(nsCost("layer3_core_modular")).toBeGreaterThan(nsCost("unmanaged_desktop_8_port"));
  });
});

describe("managed", () => {
  it("layer2 is managed", () => {
    expect(managed("managed_layer2_48_port")).toBe(true);
  });
  it("desktop not managed", () => {
    expect(managed("unmanaged_desktop_8_port")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("core for data center", () => {
    expect(forDataCenter("layer3_core_modular")).toBe(true);
  });
  it("poe not data center", () => {
    expect(forDataCenter("poe_plus_access_switch")).toBe(false);
  });
});

describe("backplane", () => {
  it("industrial uses din rail", () => {
    expect(backplane("industrial_din_rail")).toBe("din_rail_ip67_wide_temp_ring");
  });
});

describe("bestUse", () => {
  it("poe for ip camera voip", () => {
    expect(bestUse("poe_plus_access_switch")).toBe("ip_camera_voip_phone_floor");
  });
});

describe("networkSwitchTypes", () => {
  it("returns 5 types", () => {
    expect(networkSwitchTypes()).toHaveLength(5);
  });
});
